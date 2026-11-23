export interface DeliverableFact {
  label: string;
  value: string;
}

export interface DeliverableFeature {
  title: string;
  description: string;
}

export interface DeliverableStat {
  value: string;
  label: string;
}

export interface DeliverableTable {
  headers: string[];
  rows: string[][];
}

export interface DeliverableFlowStep {
  step: string;
  title: string;
  desc: string;
}

export interface DeliverablePersona {
  name: string;
  role: string;
  quote: string;
  need: string;
  pain: string;
  features: string;
}

export interface DeliverableSection {
  heading: string;
  icon: string;
  badge?: string;
  paragraphs?: string[];
  bullets?: string[];
  features?: DeliverableFeature[];
  stats?: DeliverableStat[];
  table?: DeliverableTable;
  flowSteps?: DeliverableFlowStep[];
}

export interface DeliverableDetail {
  id: string;
  title: string;
  subtitle: string;
  partBadge: string;
  image: string;
  tags: string[];
  heroPurpose: string;
  facts: DeliverableFact[];
  keyMetrics: DeliverableStat[];
  sections: DeliverableSection[];
  source: {
    part: string;
    document: string;
    version: string;
    status: string;
  };
}

export const deliverableDetails: DeliverableDetail[] = [
  {
    id: 'product-initiation-document',
    title: 'Product Initiatives Document',
    subtitle: 'Part A: Test Plan & Quality Assurance Strategy — Task Monitoring & Approval Dashboard MVP',
    partBadge: 'Part A • Test Plan v0.1 Draft',
    image: '/img/product/testplan-banner.png',
    tags: ['Quality Assurance', 'PRD v1.0', 'Test Strategy', 'RBAC Security', 'Non-Functional Targets', 'Defect Management'],
    heroPurpose:
      'Defines how the MVP will be rigorously verified against PRD functional requirements (FR01-FR20), non-functional targets, acceptance criteria (AC-01 to AC-08), and edge cases (EC01-EC10). Confirms centralized task visibility, automated overdue sweeps, and server-side RBAC integrity before launch.',
    facts: [
      { label: 'Product', value: 'Task Monitoring & Approval Dashboard (MVP)' },
      { label: 'Source Document', value: 'PRD v1.0 (Draft, Nov 2025)' },
      { label: 'Document Type', value: 'Part A: Test Plan v0.1 Draft' },
      { label: 'Owners', value: 'QA Engineer with Product Management Team' },
      { label: 'Reviewers', value: 'Product Manager, Engineering Lead, IT/Security' },
      { label: 'Target Release', value: 'Q3 2026 (Re-baseline recommended)' },
      { label: 'Status', value: 'Draft for Review' },
    ],
    keyMetrics: [
      { value: '100%', label: 'P0 Test Pass Target' },
      { value: '500', label: 'Concurrent Users Load' },
      { value: '10,000', label: 'Active Tasks Scale' },
      { value: '≤ 2.0s', label: 'Dashboard Initial Load' },
    ],
    sections: [
      {
        heading: '1. Document Purpose & Core Objectives',
        icon: 'Target',
        badge: 'Verification Goals',
        paragraphs: [
          'This plan defines how the MVP is verified against PRD functional requirements (FR01-FR20), non-functional requirements, acceptance criteria (AC-01 to AC-08), and edge cases (EC01-EC10). It ensures centralized task visibility, enforced approval workflows, proactive alerts, and reliable sprint predictability.',
        ],
        bullets: [
          '1. Verify every P0 requirement works as specified prior to release candidate sign-off.',
          '2. Verify P1 requirements work or have formally documented, accepted gaps signed off by the PM.',
          '3. Confirm server-side RBAC prevents any unauthorized cross-team data exposure.',
          '4. Confirm performance targets under MVP load (500 concurrent users, 10,000 active tasks).',
          '5. Confirm the product supports measurement of primary KPIs through verified event tracking.',
        ],
      },
      {
        heading: '2. Functional Scope Boundaries',
        icon: 'Layers',
        badge: 'In vs Out of Scope',
        features: [
          {
            title: 'Task List View & Quick Updates (In Scope)',
            description: 'Filter, multi-sort, inline status updates within 3s, distinct overdue indicators, and pagination over 1,000+ items.',
          },
          {
            title: 'Approval Workflow & SLA Enforcement (In Scope)',
            description: 'Create, queue, approve, reject with mandatory reason, 24h reminders, and 48h automatic escalation to approver manager.',
          },
          {
            title: '15-Minute Overdue Detection Cron (In Scope)',
            description: 'Automated background cron runs every 15 minutes. T-24h warning applies At-Risk status; past-deadline flags Overdue badge.',
          },
          {
            title: 'Sprint Health Overview Widget (In Scope)',
            description: 'Live status counts, progress bar percentage, scope change counter, days remaining, and at-risk item tracker.',
          },
          {
            title: 'Server-Side Role-Based Access Control (In Scope)',
            description: '5 roles (PM, Team Lead, Stakeholder, Operations Member, Admin) enforced strictly at database and API levels.',
          },
          {
            title: 'Audit Log & Document Export (In Scope)',
            description: 'Immutable read-only change log recording actor, status change, and exact timestamp; async CSV and PDF export.',
          },
        ],
        bullets: [
          'Out of Scope for MVP: Native mobile application, two-way Jira/Linear sync (read-only import in scope), AI workload balancing, time tracking, external customer portal, and custom Gantt chart builders.',
        ],
      },
      {
        heading: '3. Multi-Level Test Strategy',
        icon: 'Search',
        badge: 'Testing Strategy',
        table: {
          headers: ['Test Level', 'Scope & Focus', 'Owner', 'Tooling / Approach'],
          rows: [
            ['Unit Testing', 'Business logic: status transitions, SLA calculations, permission checks', 'Backend & Frontend', 'Native framework test runner in CI'],
            ['API & Integration', 'All 11 endpoints in PRD 18.1, cron jobs, notification event flow', 'Backend & QA', 'API test client, CI pipeline fixtures'],
            ['End-to-End (E2E)', 'Full user journeys across UI, API, notifications, and email fallbacks', 'QA Engineer', 'Automated browser test suites'],
            ['Security & RBAC', 'RBAC matrix, JWT tokens, cross-team data isolation, session expiry', 'QA & Security Lead', 'Automated permission tests in CI'],
            ['Performance & Load', 'Load times, 500 concurrent users, 10,000 tasks, 1,000-row render', 'Backend & QA', 'Distributed load testing suite'],
            ['Accessibility Audit', 'WCAG 2.1 AA compliance audit, screen readers, keyboard nav', 'Frontend & QA', 'Automated scanner + manual heuristic review'],
            ['Usability & Heuristic', 'Key actions completed within 3 clicks or fewer, actionable error messages', 'Designer & QA', 'Heuristic evaluation & pilot observation'],
            ['User Acceptance (UAT)', 'Pilot team validation against the 4 defined user journeys', 'Product Manager', 'Scripted pilot scenarios with team leads'],
          ],
        },
      },
      {
        heading: '4. Functional Test Cases Matrix',
        icon: 'CheckCircle2',
        badge: 'FR Traceability',
        table: {
          headers: ['Case ID', 'Functional Area', 'Scenario & Expected Result', 'PRD Trace', 'Priority'],
          rows: [
            ['TC-001', 'Task List', 'PM opens Task List: active tasks displayed with status, assignee, priority, due date', 'FR01, AC-01', 'P0'],
            ['TC-002', 'Task Filter', 'Filter by status, priority, assignee, team, sprint; result count matches exact criteria', 'FR02', 'P0'],
            ['TC-004', 'Overdue Flag', 'View overdue task in list: distinct red indicator displayed instantly', 'FR03', 'P0'],
            ['TC-007', 'Inline Status', 'Update status inline with prompt: change reflects in UI within 3 seconds', 'FR05, Flow 8.1', 'P0'],
            ['TC-020', 'Approval Request', 'Team Lead creates request: appears immediately in designated approver queue', 'FR07, AC-03', 'P0'],
            ['TC-024', 'Reject Reason', 'Approver attempts reject without reason: validation blocks action with prompt', 'FR09, AC-05', 'P0'],
            ['TC-026', 'SLA Escalation', 'Approval pending past 48h SLA: auto-escalation alert sent to approver manager', 'FR11, Feature 3', 'P1'],
            ['TC-050', 'Overdue Cron', 'Task past due and not Done: 15-min cron applies overdue marker & sends alerts', 'FR20, AC-02', 'P0'],
            ['TC-060', 'Sprint Widget', '20-task sprint (12 Done, 5 In Progress, 2 Blocked, 1 Overdue): bar shows 60%', 'FR14, AC-07', 'P0'],
            ['TC-071', 'RBAC Isolation', 'Operations Member views Task List: only own tasks visible, View All Teams hidden', 'AC-06', 'P0'],
            ['TC-074', 'Audit Immutability', 'Attempt to edit or delete audit entry: action blocked through UI and API', 'FR17', 'P1'],
          ],
        },
      },
      {
        heading: '5. Non-Functional Requirements (NFR) Targets',
        icon: 'Wrench',
        badge: 'Performance & Security',
        stats: [
          { value: '≤ 2.0s', label: 'Initial Dashboard Load' },
          { value: '≤ 1.0s', label: '1,000-Row Render' },
          { value: '≤ 5.0s', label: 'In-App Notification' },
          { value: '99.5%', label: 'System Uptime Target' },
        ],
        bullets: [
          'NF-01: Dashboard initial load under 2 seconds (p95 on standard broadband).',
          'NF-02: Task list renders 1,000 rows in 1 second or less using virtualized windowing.',
          'NF-03: Status update changes broadcast across UI in 3 seconds or less.',
          'NF-05: Outbound email notification delivered within 2 minutes via SendGrid.',
          'NF-06: API response time p95 is under 500 ms across all endpoints.',
          'NF-11: Security requires TLS 1.2+ in transit, AES-256 at rest, and zero PII inside application logs.',
          'NF-13: Protected endpoints require valid JWT; unauthenticated calls rejected with 401 Unauthorized.',
          'NF-18: Real-time updates automatically fall back from WebSocket to SSE, then 30-second polling.',
        ],
      },
      {
        heading: '6. Edge Cases & Resilience Strategy',
        icon: 'ShieldAlert',
        badge: 'Resilience Matrix',
        bullets: [
          'EC01: Approver removed mid-approval → Auto-reassigned to approver manager; requestor notified.',
          'EC02: Task created with past deadline → Validation warning; flagged overdue immediately.',
          'EC03: Two users update same task concurrently → Last-write-wins; both notified of final state.',
          'EC04: User with no assigned role logs in → Access cleanly denied; prompted to contact Admin.',
          'EC05: Approval for a Done task → Warning dialog: "This task is already completed. Proceed?".',
          'EC06: Outbound email delivery fails → 3 automatic retries with exponential backoff and in-app fallback.',
          'EC08: Self-assigned approver → Blocked with error: "Approver must be a different user".',
          'EC10: Export of 10,000+ records → Generated asynchronously; download link delivered via notification.',
        ],
      },
      {
        heading: '7. Defect Severity & Resolution SLAs',
        icon: 'CheckCircle2',
        badge: 'Triage Criteria',
        table: {
          headers: ['Severity', 'Definition', 'Resolution Expectation'],
          rows: [
            ['Critical', 'Data exposure, RBAC bypass, data loss, system down', 'Immediate fix before further testing; release blocker'],
            ['High', 'P0 feature broken with no feasible workaround', 'Fix within current sprint; release blocker'],
            ['Medium', 'Feature impaired with documented workaround', 'Fix before launch or formal acceptance with PM sign-off'],
            ['Low', 'Cosmetic layout, minor alignment, copy typo', 'Scheduled in post-MVP backlog'],
          ],
        },
      },
      {
        heading: '8. Sprint Testing Schedule',
        icon: 'CalendarDays',
        badge: 'Execution Timeline',
        table: {
          headers: ['Sprint', 'Weeks', 'QA & Testing Focus'],
          rows: [
            ['Sprint 1', 'Weeks 1-2', 'Auth, RBAC, task list/detail read-only, API filter validation, test data seeding'],
            ['Sprint 2', 'Weeks 3-4', 'Status updates, approval workflow, rejection reasons, notification bus & SendGrid'],
            ['Sprint 3', 'Weeks 5-6', '15m overdue cron, sprint widget, audit log, change log, SLA reminders & escalation'],
            ['Sprint 4', 'Weeks 7-8', 'Async export, user preferences, load testing (500 users), regression, WCAG 2.1 AA'],
            ['Hardening & UAT', 'Weeks 9-10', 'Pilot team UAT, defect closure, final go/no-go release recommendation'],
          ],
        },
      },
    ],
    source: {
      part: 'Part A',
      document: 'Test Plan',
      version: 'v0.1 Draft',
      status: 'Ready for Review',
    },
  },
  {
    id: 'product-journey',
    title: 'Product Journey',
    subtitle: 'Part B: User Experience, Personas, Lifecycle & Workflows — Task Monitoring & Approval Dashboard',
    partBadge: 'Part B • Product Journey PRD v1.0',
    image: '/img/product/testcase-banner.png',
    tags: ['User Experience', 'Persona Mapping', 'Approval Flows', 'Lifecycle Stages', 'Moments of Truth', 'Role Matrix'],
    heroPurpose:
      'Maps the complete operational lifecycle across 9 stages and 4 key user personas (Priya, Reza, Sandra, Adam), eliminating status aggregation bottlenecks, approval black holes, and overdue blindness.',
    facts: [
      { label: 'Product', value: 'Task Monitoring & Approval Dashboard' },
      { label: 'Replaces', value: 'Fragmented Slack, Jira, spreadsheets, weekly standups' },
      { label: 'Target Personas', value: 'Senior PM, Team Lead, VP Operations, Ops Specialist' },
      { label: 'Lifecycle', value: '9 End-to-End Operational Stages' },
      { label: 'Primary KPI', value: 'Approval cycle time: 5 days → ≤ 2 days' },
      { label: 'Status Meetings', value: 'Reduced from 4-6 to ≤ 2 per month' },
    ],
    keyMetrics: [
      { value: '≥ 80%', label: 'Target WAU Adoption' },
      { value: '≤ 2 Days', label: 'Approval Cycle Time' },
      { value: '≤ 10%', label: 'Overdue Rate (was 30%)' },
      { value: '30 min', label: 'PM Weekly Status Prep' },
    ],
    sections: [
      {
        heading: '1. Problem Statement & Target Outcomes',
        icon: 'Target',
        badge: 'Why It Matters',
        paragraphs: [
          'Before this product, PMs spent 2-3 hours every week aggregating status across fragmented tools. Approvals stalled 3-5 business days with zero SLA or escalation, and ~30% of overdue tasks were discovered only at sprint reviews.',
        ],
        table: {
          headers: ['Current Operational Pain', 'Impact Today', 'Journey Target (After)'],
          rows: [
            ['Fragmented task visibility', '2-3 hrs/week spent compiling status', 'Real-time single source of truth across all 3 teams'],
            ['Approval bottlenecks', '3-5 business day delay without SLA', 'Tracked queue with 24h reminders & 48h escalation'],
            ['Overdue task blindness', '~30% tasks found overdue at sprint review', 'Proactive T-24h warning and instant overdue badge'],
            ['Stakeholder coordination overhead', '4-6 status meetings per month', 'Self-serve executive view & one-click PDF export'],
            ['Unclear sprint predictability', 'Sprint completion rate ~55%', 'Real-time health widget aiming for ≥ 75% completion'],
          ],
        },
      },
      {
        heading: '2. Four Target User Personas',
        icon: 'UserRound',
        badge: 'User Archetypes',
        features: [
          {
            title: 'Priya, 34 — Senior Product Manager',
            description: 'Core Need: Cross-team visibility across 3 engineering teams without chasing people. Main Pain: 3+ hours weekly chasing status, late awareness of blockers. Key Features: Sprint Health widget, overdue alerts, approval queue, burndown tracker.',
          },
          {
            title: 'Reza, 29 — Product Team Lead',
            description: 'Core Need: Keep engineering sprint work unblocked and track approvals. Main Pain: Requests vanish in Slack, zero visibility on who holds approvals. Key Features: 1-click approval submission, team filters, audit change log.',
          },
          {
            title: 'Sandra, 45 — VP Operations (Executive Stakeholder)',
            description: 'Core Need: High-level delivery posture and rapid sign-offs. Main Pain: Too many status sync meetings, unclear origin of delays. Key Features: Executive summary dashboard, 1-click approval panel, PDF board reports.',
          },
          {
            title: 'Adam, 26 — Operations Specialist',
            description: 'Core Need: Crystal clear personal priorities and feedback when approvals unblock. Main Pain: Unclear priorities, no confirmation when approvals complete. Key Features: My Tasks view, notification center, inline status update form.',
          },
        ],
      },
      {
        heading: '3. End-to-End Operational Lifecycle (9 Stages)',
        icon: 'Layers',
        badge: 'Lifecycle',
        flowSteps: [
          { step: '01', title: 'Onboarding & Role Setup', desc: 'User logs in via SAML SSO; role is assigned automatically; tasks seeded or imported read-only from Jira.' },
          { step: '02', title: 'Role-Based Orientation', desc: 'User lands on custom widget dashboard tailored specifically to their role and permissions.' },
          { step: '03', title: 'Daily Monitoring', desc: 'PM and Team Leads review sprint health, filter by at-risk tasks, and check real-time progress.' },
          { step: '04', title: 'Execution Updates', desc: 'Assignees update task status inline; change is logged with actor & timestamp; notifications dispatched.' },
          { step: '05', title: 'Approval Request Creation', desc: 'Lead submits approval card with deadline & context; approver notified in-app and via email.' },
          { step: '06', title: 'Approval Decision', desc: 'Approver approves or rejects with reason; task auto-updates to In Progress; requestor notified.' },
          { step: '07', title: 'Proactive Alerting', desc: 'System checks deadlines: T-24h warning, overdue red badge, and 48h escalation to manager.' },
          { step: '08', title: 'Executive Reporting', desc: 'Leaders self-serve executive summary, burndown indicators, and async PDF board exports.' },
          { step: '09', title: 'Sprint Retrospective', desc: 'Teams review immutable change log, scope additions, and audit trail for continuous improvement.' },
        ],
      },
      {
        heading: '4. Detailed User Journeys',
        icon: 'Play',
        badge: 'Step-by-Step Journeys',
        features: [
          {
            title: 'Journey 1: PM Monitors Sprint Progress (Priya)',
            description: 'Sprint kicks off Monday → Priya opens dashboard in <2s → Filters by "At Risk" to find 3 tasks near deadline → Opens Task #47 with linked approval pending 2 days → One-click escalates → Approver receives alert → Friday burndown shows 85% completion vs 55% baseline.',
          },
          {
            title: 'Journey 2: Team Lead Submits Approval Request (Reza)',
            description: 'Task needs budget sign-off → Reza opens approval panel with minimal required fields → Form validates approver is not self → Submits to Sandra with deadline → Sandra approves via dashboard or email link → Real-time alert: "Approval granted - Task #47 unblocked" → Task auto-moves to In Progress.',
          },
          {
            title: 'Journey 3: Stakeholder Reviews Delivery Status (Sandra)',
            description: 'Weekly leadership review prep → Sandra lands on Executive Summary → Reads clear posture: 12 in progress, 2 overdue, 1 pending her review → Opens Pending Approvals, reviews context, approves in 1 click → Exports summary PDF for board meeting → Cancels 4 unnecessary status meetings.',
          },
          {
            title: 'Journey 4: Operations Member Handles Daily Tasks (Adam)',
            description: 'Start of working day → Adam opens My Tasks sorted by due date → Updates task to In Progress with single click → Receives real-time notification when blocked approval is cleared → Closes the "did anyone act?" feedback loop.',
          },
        ],
      },
      {
        heading: '5. Role-Based Experience Map (RBAC)',
        icon: 'ShieldCheck',
        badge: 'Permissions Matrix',
        table: {
          headers: ['Role', 'View Tasks', 'Update Status', 'Create Approval', 'Action Approval', 'View All Teams', 'Export Reports'],
          rows: [
            ['Project Manager', 'All Teams', 'All Tasks', 'Yes', 'No', 'Yes', 'Yes (CSV & PDF)'],
            ['Team Lead', 'Own Team', 'Own Team', 'Yes', 'No', 'No', 'Own Team only'],
            ['Stakeholder (VP)', 'All Teams (Read)', 'No', 'No', 'Yes (if assigned)', 'Yes', 'Yes (Executive PDF)'],
            ['Operations Member', 'Own Tasks', 'Own Tasks', 'No', 'No', 'No', 'No'],
            ['Admin', 'All Teams', 'All Tasks', 'Yes', 'Yes', 'Yes', 'Yes (Full Access)'],
          ],
        },
      },
      {
        heading: '6. Four Moments of Truth',
        icon: 'Sparkles',
        badge: 'Critical Touchpoints',
        bullets: [
          'Moment 1: First Dashboard Load — User sees actual real data loaded within 2 seconds flat.',
          'Moment 2: First Approval Sent — Requestor sees the approval tracked and unblocked without a single follow-up message.',
          'Moment 3: First Proactive Alert — PM catches and remedies a bottleneck 24 hours before a deadline breach.',
          'Moment 4: First Meeting Skipped — VP gets high-level delivery status directly from the dashboard and cancels the meeting.',
        ],
      },
    ],
    source: {
      part: 'Part B',
      document: 'Product Journey',
      version: 'PRD v1.0',
      status: 'Baselined',
    },
  },
  {
    id: 'product-execution',
    title: 'Product Execution',
    subtitle: 'Part C: Sprint Delivery Roadmap, Engineering Architecture & Risk Register — Task Monitoring & Approval Dashboard',
    partBadge: 'Part C • Product Execution PRD v1.0',
    image: '/img/product/testreporting-banner.png',
    tags: ['Sprint Planning', 'Engineering Roadmap', 'Risk Register', 'Scheduled Crons', '167 Story Points', 'Launch Gates'],
    heroPurpose:
      'Defines the 8-10 week delivery plan across 4 two-week sprints (167 story points) managed by 2 backend, 2 frontend, 1 design, and 1 QA engineer. Focuses on strict P0-first sequencing, server-side RBAC, scheduled cron jobs, and pilot readiness.',
    facts: [
      { label: 'Product Scope', value: 'Task Monitoring & Approval Dashboard (MVP)' },
      { label: 'Timeline', value: '8-10 Weeks (4 Sprints + 2-Week Hardening)' },
      { label: 'Team Capacity', value: '2 Backend, 2 Frontend, 1 Designer, 1 QA' },
      { label: 'Total Effort', value: '167 Story Points' },
      { label: 'Executive Sponsor', value: 'VP Operations' },
      { label: 'Primary Target', value: 'Approval SLA Cycle Time ≤ 2 Days' },
    ],
    keyMetrics: [
      { value: '167 pts', label: 'Total Story Points' },
      { value: '4', label: 'Two-Week Sprints' },
      { value: '15 min', label: 'Overdue Cron Interval' },
      { value: '5 Roles', label: 'Server-Side RBAC' },
    ],
    sections: [
      {
        heading: '1. Execution Principles',
        icon: 'Target',
        badge: 'Engineering Pillars',
        bullets: [
          '1. P0 first: No P1 or P2 work begins until all sprint P0 deliverables are verified and passing.',
          '2. No mid-sprint additions: Unplanned change requests strictly require PM sign-off (Mitigating Risk R6).',
          '3. Server-side security from day one: RBAC and SAML/JWT authentication built during Sprint 1.',
          '4. Pilot before wide rollout: Launch to one single engineering team first before expanding across the org.',
          '5. Instrument from day one: Analytics event tracking ships directly alongside each functional feature.',
        ],
      },
      {
        heading: '2. Four-Sprint Delivery Plan (167 Story Points)',
        icon: 'Layers',
        badge: 'Sprint Breakdown',
        features: [
          {
            title: 'Sprint 1 (Weeks 1-2): Foundation & Core Task View — 42 pts',
            description: 'Project architecture & DB schema (5 pts), SSO and authentication SAML/JWT (8 pts), Task List UI with filters (8 pts), GET /tasks endpoint (5 pts), Read-only Task Detail drawer (5 pts), Server-side RBAC with 5 roles (8 pts), Design tokens & component library setup (3 pts).',
          },
          {
            title: 'Sprint 2 (Weeks 3-4): Task Updates, Approvals & Notifications — 44 pts',
            description: 'Inline task status update (5 pts), Approval request creation UI & API (8 pts), Approval queue view (5 pts), Approve/Reject with reason enforcement (5 pts), Notification service & worker (8 pts), In-app notifications via WebSocket (8 pts), SendGrid email delivery (5 pts).',
          },
          {
            title: 'Sprint 3 (Weeks 5-6): Overdue Detection, Sprint Widget & Audit Log — 39 pts',
            description: '15-minute overdue detection cron (5 pts), Overdue alert notifications (3 pts), Sprint Overview widget UI & API (8 pts), Approval SLA hourly cron reminders & escalation (8 pts), Audit Log UI & API (5 pts), Change log in task detail (5 pts), Scope change tracker (5 pts).',
          },
          {
            title: 'Sprint 4 (Weeks 7-8): Export, Polish & Launch Readiness — 42 pts',
            description: 'CSV export for task list & approvals (5 pts), Async PDF export with notification (8 pts), Notification preferences UI (5 pts), Load testing & optimization (5 pts), End-to-end regression testing (8 pts), WCAG 2.1 AA audit (3 pts), Security RBAC review (5 pts), Onboarding guide (3 pts).',
          },
        ],
        paragraphs: [
          'Proposed Weeks 9-10 (Hardening & Pilot): Dedicated 2-week buffer for pilot team UAT, defect closure, and executive sponsor go/no-go recommendation.',
        ],
      },
      {
        heading: '3. Technical Architecture & Scheduled Cron Jobs',
        icon: 'Wrench',
        badge: 'Infrastructure',
        table: {
          headers: ['Scheduled Job', 'Interval', 'Purpose & Target Handler'],
          rows: [
            ['Overdue Task Detector', 'Every 15 minutes', 'Sweeps non-Done tasks past due; applies overdue badge and notifies PM, Assignee, and Lead'],
            ['Approval SLA Checker', 'Hourly', 'Identifies requests pending > 24 hours; dispatches reminders and sets Reminder Sent badge'],
            ['Approval Escalation', 'Hourly', 'Detects requests breaching 48-hour SLA; triggers escalation alert to approver manager'],
            ['Export Cleaner', 'Daily at 02:00', 'Purges temporary CSV and PDF export artifacts older than 7 calendar days'],
          ],
        },
      },
      {
        heading: '4. REST API Endpoints Specification',
        icon: 'Search',
        badge: 'API 18.1 Reference',
        table: {
          headers: ['Method', 'Endpoint', 'Purpose & RBAC Access'],
          rows: [
            ['GET', '/api/v1/tasks', 'Task list with multi-filters and pagination'],
            ['GET', '/api/v1/tasks/{id}', 'Task detail with change log and linked approvals'],
            ['PATCH', '/api/v1/tasks/{id}/status', 'Update task status inline with actor timestamp'],
            ['POST', '/api/v1/approvals', 'Submit new approval request to target approver'],
            ['GET', '/api/v1/approvals', 'Filterable approval queue for approvers and PMs'],
            ['PATCH', '/api/v1/approvals/{id}/action', 'Action approval (approve or reject with reason)'],
            ['GET', '/api/v1/notifications', 'Retrieve unread user notifications'],
            ['PATCH', '/api/v1/notifications/{id}/read', 'Mark specific notification as read'],
            ['GET', '/api/v1/sprints/current', 'Fetch current sprint overview and burndown stats'],
            ['GET', '/api/v1/audit-log', 'Immutable audit log (restricted to PM and Admin)'],
            ['GET', '/api/v1/export/tasks', 'Trigger async CSV/PDF export with download link'],
          ],
        },
      },
      {
        heading: '5. Risk Register & Mitigation Strategies',
        icon: 'ShieldAlert',
        badge: 'Risk Matrix',
        table: {
          headers: ['Risk ID & Description', 'Likelihood', 'Impact', 'Mitigation Strategy', 'Owner'],
          rows: [
            ['R1: Low adoption from change fatigue', 'High', 'High', 'Roll out to 1 pilot team first, involve leads in UAT, build interactive onboarding', 'Product Manager'],
            ['R2: Poor Jira import quality', 'Medium', 'High', 'Implement strict validation sanitization layer with fallback manual task seeding', 'Engineering Lead'],
            ['R3: Notification overload / fatigue', 'Medium', 'Medium', 'Smart grouping, batching, and per-user preferences UI available from Sprint 2', 'Product Manager'],
            ['R4: WebSocket instability / dropouts', 'Low', 'Medium', 'Automatic fallback to Server-Sent Events (SSE), followed by 30-second polling', 'Backend Lead'],
            ['R6: Scope creep during sprints', 'High', 'High', 'Strict P0/P1 prioritization; zero mid-sprint additions without PM sign-off', 'Product Manager'],
            ['R8: RBAC misconfiguration data leak', 'Low', 'Critical', 'Enforce permissions server-side on all endpoints; run automated CI permission tests', 'Backend & Security'],
          ],
        },
      },
      {
        heading: '6. Seven-Stage Rollout Plan',
        icon: 'CheckCircle2',
        badge: 'Rollout Strategy',
        flowSteps: [
          { step: '01', title: 'Internal Readiness', desc: 'Complete regression testing, load testing, security review, and accessibility audit.' },
          { step: '02', title: 'Pilot Team Launch', desc: 'Deploy to 1 pilot team; run weekly feedback sessions; resolve all High/Critical defects.' },
          { step: '03', title: 'Targeted Expansion', desc: 'Expand to 3 PM groups and Product Team Leads; verify SLA tracking and adoption.' },
          { step: '04', title: 'Full Organization Rollout', desc: 'Launch to all target operations members and executive stakeholders.' },
          { step: '05', title: '30-Day Milestone Review', desc: 'Survey user NPS (target ≥ 40) and evaluate baseline sprint predictability improvements.' },
          { step: '06', title: '60-Day Workflow Check', desc: 'Verify 70% or more of PMs submit at least 1 approval per sprint.' },
          { step: '07', title: '6-Month KPI Evaluation', desc: 'Full review of approval cycle time reduction (target: 5 days down to ≤ 2 days).' },
        ],
      },
      {
        heading: '7. Launch Readiness Checklist',
        icon: 'CheckCircle2',
        badge: 'Go/No-Go Gate',
        bullets: [
          'All P0 features functionally complete, tested, and accepted.',
          'All P1 features complete or formally accepted as post-MVP backlog by the PM.',
          'Test plan exit criteria met: zero open Critical or High severity defects.',
          'Performance targets verified: dashboard initial load < 2.0s with 500 concurrent users.',
          'Security review and server-side RBAC penetration signed off by IT/Security.',
          'WCAG 2.1 AA accessibility audit completed without blocking violations.',
          'Event tracking verified for all primary and secondary KPI events.',
          'Notification delivery and email failover with exponential backoff verified.',
          'Guided onboarding walkthrough and user documentation ready.',
          'Pilot team trained and UAT formal sign-off achieved.',
          'Support and escalation path defined for launch week with documented rollback plan.',
          'Executive sponsor go/no-go signed off by VP Operations.',
        ],
      },
    ],
    source: {
      part: 'Part C',
      document: 'Product Execution',
      version: 'PRD v1.0',
      status: 'Execution Ready',
    },
  },
];

export const getDeliverableDetail = (id?: string): DeliverableDetail | undefined => {
  if (!id) return undefined;
  // Support both canonical ids and common aliases
  if (id === 'product-initiatives-document' || id === 'product-initiation-document') {
    return deliverableDetails.find((item) => item.id === 'product-initiation-document');
  }
  return deliverableDetails.find((item) => item.id === id);
};
