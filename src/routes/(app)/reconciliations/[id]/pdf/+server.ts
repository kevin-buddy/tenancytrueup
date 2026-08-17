import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import PDFDocument from 'pdfkit';

import { supabaseAdmin } from '$lib/server/supabase';

function money(value: string | number | null | undefined): string {
  return Number(value ?? 0).toFixed(2);
}

export const GET: RequestHandler = async ({ params }) => {
  const { data: reconciliation, error: reconciliationError } =
    await supabaseAdmin
      .from('reconciliations')
      .select('*')
      .eq('id', params.id)
      .maybeSingle();

  if (reconciliationError) {
    error(500, reconciliationError.message);
  }

  if (!reconciliation) {
    error(404, 'Reconciliation not found');
  }

  const { data: lease, error: leaseError } = await supabaseAdmin
    .from('leases')
    .select('*')
    .eq('id', reconciliation.lease_id)
    .maybeSingle();

  if (leaseError) {
    error(500, leaseError.message);
  }

  if (!lease) {
    error(404, 'Lease not found');
  }

  const { data: building, error: buildingError } = await supabaseAdmin
    .from('buildings')
    .select('*')
    .eq('id', lease.building_id)
    .maybeSingle();

  if (buildingError) {
    error(500, buildingError.message);
  }

  if (!building) {
    error(404, 'Building not found');
  }

  const { data: lines, error: linesError } = await supabaseAdmin
    .from('reconciliation_lines')
    .select('*')
    .eq('reconciliation_id', reconciliation.id)
    .order('created_at', { ascending: true });

  if (linesError) {
    error(500, linesError.message);
  }

  const pdf = await new Promise<Buffer>((resolve, reject) => {
    const doc = new PDFDocument({
      size: 'A4',
      margin: 50
    });

    const buffers: Uint8Array[] = [];

    doc.on('data', (chunk) => buffers.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(buffers)));
    doc.on('error', reject);

    doc.fontSize(18).text('CAM True-Up Statement', {
      align: 'center'
    });

    doc.moveDown();

    doc.fontSize(12);
    doc.text(`Tenant: ${lease.tenant_name}`);
    doc.text(`Building: ${building.name}`);
    doc.text(`Reconciliation year: ${reconciliation.year}`);
    doc.text(`Status: ${reconciliation.status}`);

    doc.moveDown();

    doc.text(
      `Actual recoverable expense pool: ${money(
        reconciliation.actual_recoverable_pool
      )}`
    );

    doc.text(
      `Tenant pro-rata share: ${(
        Number(reconciliation.tenant_share_percent) * 100
      ).toFixed(6)}%`
    );

    doc.text(
      `Tenant actual share: ${money(
        reconciliation.tenant_share_amount
      )}`
    );

    doc.text(
      `Estimated charges billed: ${money(
        reconciliation.estimated_charges
      )}`
    );

    doc.text(
      `True-up amount: ${money(reconciliation.true_up_amount)}`
    );

    doc.moveDown();

    doc.fontSize(14).text('Line items', {
      underline: true
    });

    doc.moveDown(0.5);

    doc.fontSize(9);

    for (const line of lines ?? []) {
      doc.text(
        `${line.category_name} (${line.cost_type}) ` +
          `actual: ${money(line.actual_amount)} | ` +
          `grossed: ${money(line.grossed_up_amount)} | ` +
          `allowed: ${money(line.allowed_amount)} | ` +
          `excluded: ${money(line.excluded_amount)} | ` +
          `cap adjustment: ${money(line.cap_adjustment)}`
      );

      doc.moveDown(0.3);
    }

    doc.end();
  });

  const pdfArrayBuffer = new ArrayBuffer(pdf.byteLength);
  new Uint8Array(pdfArrayBuffer).set(new Uint8Array(pdf));

  return new Response(pdfArrayBuffer, {
    headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="true-up-${reconciliation.id}.pdf"`
    }
  });
};