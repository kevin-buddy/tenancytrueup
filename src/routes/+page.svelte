<svelte:head>
  <title>TenancyTrueup | Automated Commercial CAM Reconciliation</title>
  <meta
    name="description"
    content="TenancyTrueup is the intelligent reconciliation engine for commercial landlords. Allocate expenses, enforce lease complexities, and generate auditor-ready tenant statements in minutes, not months."
  />
</svelte:head>

<div class="page">
  <header class="site-header">
    <div class="container header-inner">
      <a class="brand" href="/">
        <span class="brand-mark"></span>
        TenancyTrueup
      </a>

      <nav class="desktop-nav" aria-label="Primary navigation">
        <a href="#features">Features</a>
        <a href="#how-it-works">How it Works</a>
        <a href="#benefits">Benefits</a>
      </nav>

      <div class="header-actions">
        <a class="button ghost" href="/login">Log in</a>
        <a class="button primary" href="#demo">Book a Demo</a>
      </div>

      <details class="mobile-nav">
        <summary aria-label="Open navigation menu">☰</summary>
        <div class="mobile-panel">
          <a href="#features">Features</a>
          <a href="#how-it-works">How it Works</a>
          <a href="#benefits">Benefits</a>
          <a class="button ghost" href="/login">Log in</a>
          <a class="button primary" href="#demo">Book a Demo</a>
        </div>
      </details>
    </div>
  </header>

  <main>
    <!-- Hero -->
    <section class="hero">
      <div class="container hero-grid">
        <div class="hero-copy">
          <span class="eyebrow">The New Standard in Commercial Property</span>

          <h1>
            Stop fighting spreadsheets.
            <span>Automate your CAM true-ups.</span>
          </h1>

          <p class="hero-text">
            TenancyTrueup is the intelligent reconciliation engine for
            commercial landlords. Allocate expenses, enforce lease complexities,
            and generate auditor-ready tenant statements in minutes, not months.
          </p>

          <div class="hero-actions">
            <a class="button primary large" href="#demo">
              Start True-Up Workflow
            </a>
            <a class="button ghost large" href="#features">
              Explore Features
            </a>
          </div>

          <div class="social-proof">
            <div class="avatars">
              <img src="https://i.pravatar.cc/100?img=1" alt="" />
              <img src="https://i.pravatar.cc/100?img=2" alt="" />
              <img src="https://i.pravatar.cc/100?img=3" alt="" />
            </div>
            <span>Trusted by 500+ portfolio managers.</span>
          </div>
        </div>

        <div class="hero-panel">
          <div class="app-window">
            <div class="app-titlebar">
              <span class="dot red"></span>
              <span class="dot yellow"></span>
              <span class="dot green"></span>
              <span class="app-title">Reconciliation_Dashboard_Q4.app</span>
            </div>

            <div class="app-body">
              <div class="metric-grid">
                <article class="metric">
                  <span>Total CAM Expenses</span>
                  <strong>$1,245,000</strong>
                </article>

                <article class="metric">
                  <span>Recovered (True-Up)</span>
                  <strong>$1,180,500</strong>
                </article>

                <article class="metric">
                  <span>Variance</span>
                  <strong class="negative">-$64,500</strong>
                </article>
              </div>

              <div class="table-card">
                <div class="table-top">
                  <h2>Tenant Allocation - 100 Main St.</h2>
                  <span class="badge subtle">Auto-calculated</span>
                </div>

                <div class="table-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th>Tenant</th>
                        <th>Status</th>
                        <th>Allocation</th>
                        <th class="right">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <strong>A1</strong>
                          Acme Corp
                        </td>
                        <td><span class="badge success">Verified</span></td>
                        <td>Pro Rata: 15.4% • Gross Up: Yes</td>
                        <td class="right">$181,730.00</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>B2</strong>
                          TechFlow Inc
                        </td>
                        <td><span class="badge success">Verified</span></td>
                        <td>Pro Rata: 8.2% • Base Year: 2024</td>
                        <td class="right">$96,760.00</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>C3</strong>
                          Vacant Space
                        </td>
                        <td
                          ><span class="badge neutral">Landlord Resp.</span></td
                        >
                        <td>Pro Rata: 4.1%</td>
                        <td class="right">$0.00</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Logo strip -->
    <section class="logos">
      <div class="container">
        <p>Reconciling millions in CAM across top commercial portfolios</p>

        <div class="logo-row">
          <span>EquinoxProperties</span>
          <span>VANGUARD REALTY</span>
          <span>Cornerstone</span>
          <span>ApexCommercial</span>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section id="features" class="section">
      <div class="container">
        <div class="section-head">
          <span class="eyebrow">The Engine Room</span>
          <h2>Built for the complexity of commercial leases.</h2>
          <p>
            TenancyTrueup replaces fragile spreadsheets with a robust,
            rule-based engine. Handle caps, floors, base years, and exclusions
            without writing a single formula.
          </p>
        </div>

        <div class="grid three">
          <article class="card feature-card">
            <div class="feature-icon">🗂️</div>
            <h3>Dynamic Expense Pools</h3>
            <p>
              Create unlimited expense categories. Automatically route general
              ledger line items into specific pools (e.g., HVAC, Parking, Taxes)
              based on custom rules.
            </p>
          </article>

          <article class="card feature-card">
            <div class="feature-icon">📐</div>
            <h3>Complex Pro-Rata Logic</h3>
            <p>
              Handle gross-ups for variable expenses flawlessly. The engine
              automatically recalculates tenant shares based on occupancy
              fluctuations throughout the year.
            </p>
          </article>

          <article class="card feature-card">
            <div class="feature-icon">🛡️</div>
            <h3>Lease Compliance Guardrails</h3>
            <p>
              Encode lease constraints directly. Apply base year stops,
              cumulative or non-cumulative caps, and specific expense exclusions
              on a per-tenant basis.
            </p>
          </article>

          <article class="card feature-card">
            <div class="feature-icon">📄</div>
            <h3>Transparent Tenant Statements</h3>
            <p>
              Generate crystal-clear, professional true-up letters. Reduce
              tenant disputes by providing detailed, easily understandable
              breakdowns of their specific charges.
            </p>
          </article>

          <article class="card feature-card">
            <div class="feature-icon">🔌</div>
            <h3>Seamless ERP Integration</h3>
            <p>
              Sync directly with Yardi, MRI, AppFolio, or your existing
              accounting system. Pull GL data in, and push billed amounts out
              with one click.
            </p>
          </article>

          <article class="card feature-card">
            <div class="feature-icon">🕒</div>
            <h3>Audit Trail &amp; History</h3>
            <p>
              Every calculation, manual override, and variance is logged.
              Perfect for internal reviews, month-end closing, and external
              audits.
            </p>
          </article>
        </div>
      </div>
    </section>

    <!-- Workflow -->
    <section id="how-it-works" class="section alt">
      <div class="container">
        <div class="section-head">
          <span class="eyebrow">Workflow</span>
          <h2>From GL to Tenant Statement in 3 Steps</h2>
          <p>
            We've distilled the complex true-up process into a streamlined,
            automated workflow.
          </p>
        </div>

        <div class="grid three steps">
          <article class="card step-card">
            <span class="step-number">1</span>
            <h3>Extract &amp; Categorize</h3>
            <p>
              Connect your ERP. TenancyTrueup pulls your General Ledger data and
              automatically maps expenses into predefined CAM pools based on
              your rules.
            </p>
          </article>

          <article class="card step-card">
            <span class="step-number">2</span>
            <h3>Apply Lease Logic</h3>
            <p>
              The engine runs. It calculates gross-ups, applies base year stops,
              enforces caps, and determines exact pro-rata shares for every
              single tenant.
            </p>
          </article>

          <article class="card step-card">
            <span class="step-number">3</span>
            <h3>Reconcile &amp; Bill</h3>
            <p>
              Review variances against estimated payments. Generate branded,
              detailed tenant statements and push the final true-up charges back
              to your accounting system.
            </p>
          </article>
        </div>
      </div>
    </section>

    <!-- Benefits -->
    <section id="benefits" class="section">
      <div class="container benefits-grid">
        <div class="benefits-copy">
          <span class="eyebrow">Portfolio Intelligence</span>
          <h2>Gain portfolio-wide visibility.</h2>
          <p>
            Stop hunting through hundreds of tabs. Our central dashboard gives
            property managers and accounting teams a real-time view of true-up
            progress, recovered expenses, and pending approvals across the
            entire portfolio.
          </p>

          <div class="benefit-list">
            <article class="benefit-item">
              <h3>Recovery Analytics</h3>
              <p>
                Track estimated vs. actual expenses and monitor your total
                recovery percentage.
              </p>
            </article>

            <article class="benefit-item">
              <h3>Anomaly Detection</h3>
              <p>
                Automatically flag large year-over-year expense jumps before
                they reach the tenant.
              </p>
            </article>

            <article class="benefit-item">
              <h3>Approval Workflows</h3>
              <p>
                Route completed reconciliations to property managers for
                sign-off before final billing.
              </p>
            </article>
          </div>
        </div>

        <aside class="panel overview-panel">
          <div class="panel-head">
            <h3>Portfolio Overview</h3>
            <span class="badge success">System Operational</span>
          </div>

          <div class="quarter-tabs" aria-label="Quarter selection">
            <span>Q1</span>
            <span>Q2</span>
            <span>Q3</span>
            <span class="active">Q4 True-Up</span>
          </div>

          <div class="stat-list">
            <div class="stat">
              <span>Properties Reconciled</span>
              <strong>42 / 50</strong>
            </div>

            <div class="stat">
              <span>Total Recoverable</span>
              <strong>$4.2M</strong>
            </div>

            <div class="stat">
              <span>Performance</span>
              <strong class="positive">8.4% vs last year</strong>
            </div>
          </div>

          <div class="mini-chart" aria-hidden="true">
            <span style="--height: 32%"></span>
            <span style="--height: 48%"></span>
            <span style="--height: 41%"></span>
            <span style="--height: 63%"></span>
            <span style="--height: 56%"></span>
            <span style="--height: 74%"></span>
            <span style="--height: 88%"></span>
            <span style="--height: 79%"></span>
          </div>
        </aside>
      </div>
    </section>

    <!-- Testimonial -->
    <section class="section testimonial">
      <div class="container">
        <figure class="card testimonial-card">
          <blockquote>
            “We used to spend three months every year managing CAM
            reconciliations across our 60-building portfolio using massive Excel
            models. With TenancyTrueup, we close the year out in under three
            weeks, with zero calculation errors and significantly fewer tenant
            pushbacks.”
          </blockquote>

          <figcaption class="testimonial-author">
            <img
              src="https://i.pravatar.cc/150?img=11"
              alt="Portrait of Sarah Jenkins"
            />
            <div>
              <strong>Sarah Jenkins</strong>
              <span>VP of Property Accounting, Meridian Commercial</span>
            </div>
          </figcaption>
        </figure>
      </div>
    </section>

    <!-- CTA -->
    <section id="demo" class="section cta">
      <div class="container">
        <div class="cta-card">
          <span class="eyebrow">Get Started</span>
          <h2>Ready to automate your CAM reconciliations?</h2>
          <p>
            See how TenancyTrueup can handle your most complex leases and save
            your accounting team hundreds of hours.
          </p>

          <a class="button primary large" href="#">Get a Demo</a>

          <p class="fineprint">
            No credit card required. Implement in days, not months.
          </p>
        </div>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <div class="container footer-grid">
      <div class="footer-brand">
        <a class="brand" href="/">
          <span class="brand-mark"></span>
          TenancyTrueup
        </a>
        <p>
          The intelligent reconciliation engine for modern commercial real
          estate portfolios.
        </p>
      </div>

      <nav class="footer-col" aria-label="Product links">
        <h3>Product</h3>
        <a href="#">Features</a>
        <a href="#">Integrations</a>
        <a href="#">Security</a>
        <a href="#">Pricing</a>
      </nav>

      <nav class="footer-col" aria-label="Resources links">
        <h3>Resources</h3>
        <a href="#">Documentation</a>
        <a href="#">CAM Best Practices</a>
        <a href="#">Case Studies</a>
        <a href="#">Blog</a>
      </nav>

      <nav class="footer-col" aria-label="Company links">
        <h3>Company</h3>
        <a href="#">About Us</a>
        <a href="#">Careers</a>
        <a href="#">Contact</a>
      </nav>
    </div>

    <div class="container footer-bottom">
      <p>© 2026 TenancyTrueup Inc. All rights reserved.</p>

      <div class="legal-links">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
      </div>
    </div>
  </footer>
</div>

<style>
  :global(html) {
    scroll-behavior: smooth;
  }

  :global(body) {
    margin: 0;
  }

  :global(img) {
    max-width: 100%;
    display: block;
  }

  .page {
    --bg: #050b16;
    --bg-soft: #081120;
    --panel: rgba(255, 255, 255, 0.055);
    --panel-strong: rgba(255, 255, 255, 0.09);
    --line: rgba(255, 255, 255, 0.12);
    --text: #f8fafc;
    --muted: #9aa8ba;
    --accent: #4f8cff;
    --accent-2: #22c55e;
    --danger: #fb7185;
    --success: #4ade80;
    --shadow: 0 20px 60px rgba(0, 0, 0, 0.35);

    min-height: 100vh;
    color: var(--text);
    background: radial-gradient(
        circle at top left,
        rgba(79, 140, 255, 0.22),
        transparent 32%
      ),
      radial-gradient(
        circle at top right,
        rgba(34, 197, 94, 0.16),
        transparent 28%
      ),
      linear-gradient(180deg, #050b16 0%, #07101d 100%);
    font-family:
      Inter,
      ui-sans-serif,
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      sans-serif;
    line-height: 1.5;
  }

  .container {
    width: min(1180px, calc(100% - 32px));
    margin-inline: auto;
  }

  .section {
    padding: 88px 0;
    scroll-margin-top: 88px;
  }

  .section.alt {
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.03),
      rgba(255, 255, 255, 0.015)
    );
    border-block: 1px solid rgba(255, 255, 255, 0.07);
  }

  .section-head {
    max-width: 760px;
    margin-bottom: 36px;
  }

  .eyebrow {
    display: inline-flex;
    align-items: center;
    padding: 8px 12px;
    border: 1px solid var(--line);
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.05);
    color: var(--muted);
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  h1,
  h2,
  h3 {
    margin: 0;
    line-height: 1.05;
    letter-spacing: -0.03em;
  }

  h2 {
    margin-top: 18px;
    font-size: clamp(2rem, 4vw, 3.2rem);
  }

  h3 {
    font-size: 1.08rem;
    line-height: 1.2;
  }

  p {
    margin: 0;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  .button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 44px;
    padding: 12px 18px;
    border: 1px solid transparent;
    border-radius: 12px;
    font-weight: 700;
    transition:
      transform 150ms ease,
      opacity 150ms ease,
      background 150ms ease;
  }

  .button:hover {
    transform: translateY(-1px);
    opacity: 0.96;
  }

  .button.primary {
    background: linear-gradient(135deg, var(--accent), var(--accent-2));
    color: #051018;
    box-shadow: 0 12px 30px rgba(34, 197, 94, 0.18);
  }

  .button.ghost {
    border-color: var(--line);
    background: rgba(255, 255, 255, 0.03);
    color: var(--text);
  }

  .button.large {
    min-height: 50px;
    padding: 14px 22px;
    font-size: 1rem;
  }

  .card {
    background: var(--panel);
    border: 1px solid var(--line);
    border-radius: 22px;
    box-shadow: var(--shadow);
  }

  .badge {
    display: inline-flex;
    align-items: center;
    padding: 6px 9px;
    border-radius: 999px;
    font-size: 0.75rem;
    font-weight: 800;
    white-space: nowrap;
  }

  .badge.success {
    background: rgba(74, 222, 128, 0.12);
    color: var(--success);
    border: 1px solid rgba(74, 222, 128, 0.18);
  }

  .badge.neutral {
    background: rgba(255, 255, 255, 0.07);
    color: var(--muted);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .badge.subtle {
    background: rgba(255, 255, 255, 0.06);
    color: var(--muted);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  /* Header */
  .site-header {
    position: sticky;
    top: 0;
    z-index: 50;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(4, 9, 18, 0.84);
    backdrop-filter: blur(14px);
  }

  .header-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 18px;
    min-height: 74px;
  }

  .brand {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-size: 1.05rem;
    font-weight: 800;
    letter-spacing: -0.02em;
  }

  .brand-mark {
    width: 14px;
    height: 14px;
    border-radius: 4px;
    background: linear-gradient(135deg, var(--accent), var(--accent-2));
    box-shadow: 0 0 0 5px rgba(79, 140, 255, 0.12);
  }

  .desktop-nav {
    display: flex;
    align-items: center;
    gap: 24px;
    color: var(--muted);
    font-weight: 600;
  }

  .desktop-nav a:hover {
    color: var(--text);
  }

  .header-actions {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .mobile-nav {
    display: none;
    position: relative;
  }

  .mobile-nav summary {
    list-style: none;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border: 1px solid var(--line);
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.04);
    font-size: 1.2rem;
  }

  .mobile-nav summary::-webkit-details-marker {
    display: none;
  }

  .mobile-panel {
    position: absolute;
    right: 0;
    top: calc(100% + 10px);
    display: grid;
    gap: 10px;
    width: min(320px, calc(100vw - 32px));
    padding: 16px;
    border: 1px solid var(--line);
    border-radius: 18px;
    background: rgba(6, 12, 23, 0.98);
    box-shadow: var(--shadow);
  }

  .mobile-panel a:not(.button) {
    padding: 8px 4px;
    color: var(--muted);
    font-weight: 600;
  }

  /* Hero */
  .hero {
    padding: 76px 0 44px;
  }

  .hero-grid {
    display: grid;
    grid-template-columns: 1.02fr 0.98fr;
    gap: 34px;
    align-items: center;
  }

  .hero-copy h1 {
    margin: 20px 0 18px;
    font-size: clamp(2.6rem, 5.3vw, 5rem);
    max-width: 11ch;
  }

  .hero-copy h1 span {
    background: linear-gradient(90deg, var(--accent), var(--accent-2));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .hero-text {
    max-width: 620px;
    color: var(--muted);
    font-size: 1.05rem;
  }

  .hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 26px;
  }

  .social-proof {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-top: 28px;
    color: var(--muted);
    font-size: 0.95rem;
  }

  .avatars {
    display: flex;
  }

  .avatars img {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    border: 2px solid #081120;
    margin-right: -10px;
  }

  .hero-panel {
    position: relative;
  }

  .app-window {
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 26px;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.09),
      rgba(255, 255, 255, 0.045)
    );
    box-shadow: var(--shadow);
  }

  .app-titlebar {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 14px 16px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(255, 255, 255, 0.04);
  }

  .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }

  .dot.red {
    background: #fb7185;
  }

  .dot.yellow {
    background: #fbbf24;
  }

  .dot.green {
    background: #34d399;
  }

  .app-title {
    margin-left: 8px;
    color: var(--muted);
    font-size: 0.88rem;
    font-weight: 600;
  }

  .app-body {
    display: grid;
    gap: 14px;
    padding: 16px;
  }

  .metric-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
  }

  .metric {
    padding: 14px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.045);
  }

  .metric span {
    display: block;
    margin-bottom: 8px;
    color: var(--muted);
    font-size: 0.82rem;
    font-weight: 600;
  }

  .metric strong {
    font-size: 1.12rem;
    letter-spacing: -0.02em;
  }

  .negative {
    color: var(--danger);
  }

  .positive {
    color: var(--success);
  }

  .table-card {
    padding: 14px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 18px;
    background: rgba(4, 10, 20, 0.35);
  }

  .table-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 12px;
  }

  .table-top h2 {
    margin: 0;
    font-size: 1rem;
  }

  .table-wrap {
    overflow-x: auto;
  }

  table {
    width: 100%;
    min-width: 620px;
    border-collapse: collapse;
  }

  th,
  td {
    padding: 12px 10px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.07);
    text-align: left;
    font-size: 0.92rem;
  }

  th {
    color: var(--muted);
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  td {
    color: var(--text);
  }

  tr:last-child td {
    border-bottom: 0;
  }

  .right {
    text-align: right;
  }

  /* Logos */
  .logos {
    padding: 26px 0 6px;
  }

  .logos p {
    margin-bottom: 16px;
    color: var(--muted);
    text-align: center;
    font-size: 0.92rem;
    font-weight: 600;
  }

  .logo-row {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 14px 34px;
    opacity: 0.78;
  }

  .logo-row span {
    font-size: 1rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(248, 250, 252, 0.68);
  }

  /* Grids */
  .grid.three {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 18px;
  }

  .feature-card,
  .step-card {
    padding: 22px;
  }

  .feature-icon {
    display: inline-grid;
    place-items: center;
    width: 50px;
    height: 50px;
    margin-bottom: 18px;
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.07);
    border: 1px solid rgba(255, 255, 255, 0.09);
    font-size: 1.35rem;
  }

  .feature-card h3,
  .step-card h3 {
    margin-bottom: 10px;
  }

  .feature-card p,
  .step-card p,
  .benefits-copy p,
  .benefit-item p,
  .footer-brand p,
  .section-head p {
    color: var(--muted);
  }

  .section-head p {
    margin-top: 16px;
    max-width: 700px;
    font-size: 1rem;
  }

  .steps {
    counter-reset: step;
  }

  .step-number {
    display: inline-grid;
    place-items: center;
    width: 44px;
    height: 44px;
    margin-bottom: 18px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--accent), var(--accent-2));
    color: #051018;
    font-weight: 900;
  }

  /* Benefits */
  .benefits-grid {
    display: grid;
    grid-template-columns: 1.05fr 0.95fr;
    gap: 28px;
    align-items: start;
  }

  .benefit-list {
    display: grid;
    gap: 16px;
    margin-top: 28px;
  }

  .benefit-item {
    padding: 18px;
    border: 1px solid var(--line);
    border-radius: 18px;
    background: rgba(255, 255, 255, 0.04);
  }

  .benefit-item h3 {
    margin-bottom: 8px;
  }

  .overview-panel {
    position: sticky;
    top: 98px;
    padding: 20px;
  }

  .panel-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 18px;
  }

  .panel-head h3 {
    font-size: 1.15rem;
  }

  .quarter-tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 18px;
  }

  .quarter-tabs span {
    padding: 8px 10px;
    border: 1px solid var(--line);
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.04);
    color: var(--muted);
    font-size: 0.84rem;
    font-weight: 700;
  }

  .quarter-tabs .active {
    background: rgba(255, 255, 255, 0.1);
    color: var(--text);
  }

  .stat-list {
    display: grid;
    gap: 12px;
  }

  .stat {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 14px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 14px;
    background: rgba(255, 255, 255, 0.04);
  }

  .stat span {
    color: var(--muted);
    font-size: 0.9rem;
  }

  .stat strong {
    font-size: 1rem;
  }

  .mini-chart {
    display: flex;
    align-items: flex-end;
    gap: 8px;
    height: 120px;
    margin-top: 18px;
    padding-top: 12px;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
  }

  .mini-chart span {
    flex: 1;
    height: var(--height);
    border-radius: 999px;
    background: linear-gradient(
      180deg,
      rgba(79, 140, 255, 0.95),
      rgba(34, 197, 94, 0.95)
    );
    opacity: 0.86;
  }

  /* Testimonial */
  .testimonial {
    padding-top: 20px;
  }

  .testimonial-card {
    max-width: 920px;
    margin-inline: auto;
    padding: 32px;
  }

  .testimonial-card blockquote {
    margin: 0;
    font-size: clamp(1.15rem, 2.4vw, 1.7rem);
    line-height: 1.35;
    letter-spacing: -0.02em;
  }

  .testimonial-author {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-top: 24px;
  }

  .testimonial-author img {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, 0.14);
  }

  .testimonial-author span {
    display: block;
    color: var(--muted);
    font-size: 0.92rem;
  }

  /* CTA */
  .cta-card {
    max-width: 880px;
    margin-inline: auto;
    padding: 44px 28px;
    text-align: center;
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 28px;
    background: radial-gradient(
        circle at top center,
        rgba(79, 140, 255, 0.22),
        transparent 36%
      ),
      rgba(255, 255, 255, 0.05);
    box-shadow: var(--shadow);
  }

  .cta-card h2 {
    max-width: 18ch;
    margin-inline: auto;
  }

  .cta-card p {
    max-width: 680px;
    margin: 18px auto 24px;
    color: var(--muted);
  }

  .fineprint {
    margin-top: 14px;
    color: rgba(154, 168, 186, 0.82);
    font-size: 0.9rem;
  }

  /* Footer */
  .site-footer {
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(3, 7, 14, 0.65);
  }

  .footer-grid {
    display: grid;
    grid-template-columns: 1.3fr 0.7fr 0.7fr 0.7fr;
    gap: 28px;
    padding: 54px 0 28px;
  }

  .footer-brand p {
    margin-top: 14px;
    max-width: 300px;
  }

  .footer-col {
    display: grid;
    gap: 10px;
    align-content: start;
  }

  .footer-col h3 {
    margin-bottom: 4px;
    font-size: 0.95rem;
  }

  .footer-col a {
    color: var(--muted);
  }

  .footer-col a:hover {
    color: var(--text);
  }

  .footer-bottom {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 18px 0 26px;
    border-top: 1px solid rgba(255, 255, 255, 0.07);
    color: var(--muted);
    font-size: 0.92rem;
  }

  .legal-links {
    display: flex;
    gap: 16px;
  }

  /* Responsive */
  @media (max-width: 1020px) {
    .hero-grid,
    .benefits-grid {
      grid-template-columns: 1fr;
    }

    .grid.three {
      grid-template-columns: repeat(2, 1fr);
    }

    .overview-panel {
      position: static;
    }

    .footer-grid {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media (max-width: 860px) {
    .desktop-nav,
    .header-actions {
      display: none;
    }

    .mobile-nav {
      display: block;
    }
  }

  @media (max-width: 680px) {
    .section {
      padding: 68px 0;
    }

    .hero {
      padding-top: 52px;
    }

    .hero-actions {
      display: grid;
    }

    .button.large {
      width: 100%;
    }

    .metric-grid,
    .grid.three {
      grid-template-columns: 1fr;
    }

    .footer-grid {
      grid-template-columns: 1fr;
    }

    .footer-bottom {
      align-items: flex-start;
      flex-direction: column;
    }
  }
</style>
