export interface CodingProjectFact {
  label: string;
  value: string;
}

export interface CodingProjectStat {
  value: string;
  label: string;
}

export interface CodingProjectFeature {
  title: string;
  description: string;
}

export interface CodingProjectStep {
  title: string;
  description: string;
}

export interface CodingProjectPersona {
  name: string;
  detail: string;
  goal: string;
  painPoints: string;
}

export interface CodingProjectDetail {
  id: string;
  title: string;
  tagline: string;
  image: string;
  tags: string[];
  facts: CodingProjectFact[];
  overview: string[];
  problem: string[];
  problemPoints?: string[];
  research?: string[];
  researchStats?: CodingProjectStat[];
  personas?: CodingProjectPersona[];
  solution: string[];
  features?: CodingProjectFeature[];
  role: string[];
  process?: CodingProjectStep[];
  deliverables?: string[];
  techStack?: { category: string; items: string[] }[];
  outcome?: string;
  kpis?: CodingProjectStat[];
  vision: string[];
  tools?: { name: string; src: string }[];
}

export const codingProjectDetails: CodingProjectDetail[] = [
  {
    id: 'task-dashboard',
    title: 'Parago: Fleet Management & Approval Dashboard',
    tagline: 'From fragmented chaos to unified operational clarity.',
    image: '/img/coding/parago-pict.png',
    tags: ['Backend', 'Frontend', 'SQL', 'Workflow', 'RBAC'],
    facts: [
      { label: 'Project type', value: 'Capstone System (Internal Tool)' },
      { label: 'Created', value: '2026' },
      { label: 'Duration', value: '8–10 Weeks (4 Sprints)' },
      { label: 'Role', value: 'Full Stack Developer' },
      { label: 'Target release', value: 'Q3 2026 (MVP)' },
    ],
    overview: [
      'Teams operating with Jira, Slack, and email in parallel spend enormous cycles just keeping everyone aligned. Status updates scatter across threads, approvals stall in inboxes, and sprint overdue rates surface only at review—too late to act.',
      'The Task Monitoring & Approval Dashboard is an internal operational tool that consolidates task tracking, approval workflows, sprint visibility, and stakeholder reporting into a single surface. It eliminates the fragmentation that costs product managers 2–3 hours per week in manual status aggregation.',
      'Built across four sprints with a team of 2 backend engineers, 2 frontend engineers, 1 designer, and 1 QA engineer, the system targets verifiable operational improvements backed by a 98-case test suite.',
    ],
    problem: [
      'The organization ran task coordination across three disconnected systems: Jira for ticket tracking, Slack for approvals, and email for stakeholder delivery confirmation. This fragmentation created predictable, measurable failure modes.',
      'Sprint predictability sat at 55%. Approval cycles averaged 3–5 days. 30% of overdue tasks were discovered only at sprint review, with no proactive detection in between.',
    ],
    problemPoints: [
      '2–3 hours/week burned by PMs manually aggregating task status from multiple sources',
      '3–5 day approval delays caused by approval requests buried in Slack and email',
      '30% of tasks discovered overdue only at the sprint retrospective',
      '4–6 redundant status meetings per month exist solely to surface information already in the system',
      '55% sprint predictability due to lack of real-time overdue detection',
    ],
    research: [
      'The product definition phase included structured interviews with four distinct personas covering every dimension of operational workflow: a Senior PM who owns sprint health, a Team Lead who submits approvals, a VP-level stakeholder who reviews deliveries, and an Ops Specialist managing daily task queues.',
      'Each persona produced a detailed journey map across authentication, task management, approval, notification, and reporting flows. Role-based pain points were translated directly into prioritized requirements.',
    ],
    researchStats: [
      { value: '2–3 hrs', label: 'PM status aggregation per week' },
      { value: '3–5 days', label: 'average approval cycle' },
      { value: '30%', label: 'tasks overdue at sprint review' },
      { value: '55%', label: 'sprint predictability baseline' },
      { value: '4–6×', label: 'excess status meetings per month' },
    ],
    personas: [
      {
        name: 'Priya — Senior PM, 34',
        detail: 'Owns sprint health and delivery predictability',
        goal: 'Monitor all task statuses and sprint progress from a single dashboard without chasing teams on Slack.',
        painPoints: 'Spends 2–3 hours each week manually aggregating status from Jira, Slack threads, and email chains.',
      },
      {
        name: 'Reza — Team Lead, 29',
        detail: 'Submits task completions for stakeholder approval',
        goal: 'Submit approval requests and get decisions within 24 hours so work can proceed without stalling.',
        painPoints: 'Approval requests get buried in Slack. No visibility into whether the request was even seen.',
      },
      {
        name: 'Sandra — VP Operations, 45',
        detail: 'Reviews sprint delivery and signs off on task completions',
        goal: 'Quickly review and approve delivery confirmations without attending status meetings or reading threads.',
        painPoints: 'Gets pulled into 4–6 status meetings per month that exist only to show her information she could read herself.',
      },
      {
        name: 'Adam — Ops Specialist, 26',
        detail: 'Manages assigned task queue and status updates',
        goal: 'Know exactly which tasks are assigned and pending, and update status without navigating multiple tools.',
        painPoints: 'Task assignments and status expectations arrive via email and Slack with no single source of truth.',
      },
    ],
    solution: [
      'A unified internal dashboard that surfaces the full task lifecycle—from creation and assignment through status updates, approval, and audit—on a single platform with role-scoped access.',
      'The system uses a structured approval workflow with SLA tracking, escalation triggers, and WebSocket-based real-time notifications so stakeholders see changes immediately without polling or meetings.',
      'Overdue detection runs every 15 minutes via a scheduled cron job. Sprint health widgets give PMs live visibility into completion rates, velocity, and blocker distribution without leaving the dashboard.',
    ],
    features: [
      {
        title: 'Task List & Detail View',
        description: 'Full-lifecycle task management with status transitions (Todo → In Progress → Review → Approved/Rejected), assignees, priority, and due dates.',
      },
      {
        title: 'Approval Workflow Engine',
        description: 'Structured approval submission, stakeholder review queue, SLA countdown, and escalation triggers when approvals exceed threshold time.',
      },
      {
        title: 'Real-time Notifications',
        description: 'WebSocket-based push notifications for status changes, approval decisions, overdue flags, and escalation events.',
      },
      {
        title: 'Sprint Widget',
        description: 'Live sprint health view: completion %, velocity trend, overdue count, and blocker list visible to PMs and stakeholders.',
      },
      {
        title: 'RBAC with SSO',
        description: 'Role-based access control scoped to PM, Team Lead, Stakeholder, Ops Member, and Admin. SSO integration via standard OAuth2 flow.',
      },
      {
        title: 'Audit Log & Export',
        description: 'Full audit trail of all status transitions and approval decisions. CSV and PDF export with scheduled cleanup at 02:00 daily.',
      },
    ],
    role: [
      'As Full Stack Developer, I owned the end-to-end system: database schema design, REST API implementation, frontend task and approval views, cron job scheduling, and RBAC middleware.',
      'I authored the Product Requirements Document across all three parts—Test Plan (TC-001 to TC-098, NF-01 to NF-18), Product Journey (persona research, journey maps, flow diagrams), and Product Execution (sprint plan, risk register, rollout strategy).',
      'I coordinated sprint planning across the 6-person team and drove the prioritization framework that separated P0 must-haves from P1 and P2 scope to protect the MVP timeline.',
    ],
    process: [
      {
        title: 'Sprint 1 — Foundation & Auth (42 pts)',
        description: 'Database schema, authentication (SSO/OAuth2), task list read-only view, and RBAC middleware. Exit: users can log in and view tasks.',
      },
      {
        title: 'Sprint 2 — Core Workflow (44 pts)',
        description: 'Task status updates, approval submission and review flow, WebSocket notifications, and email notification fallback.',
      },
      {
        title: 'Sprint 3 — Intelligence Layer (39 pts)',
        description: 'Overdue detection cron (15 min), SLA checker (hourly), sprint widget, audit log, and escalation triggers.',
      },
      {
        title: 'Sprint 4 — Export, Polish & Security (42 pts)',
        description: 'CSV/PDF export, regression testing, accessibility audit, security hardening, and UAT sign-off. Total: 167 story points.',
      },
    ],
    deliverables: [
      'Full REST API: GET/PATCH tasks, POST/PATCH approvals, GET notifications, GET sprints/current, GET audit-log, GET export',
      'Scheduled cron jobs: overdue detector (15 min), SLA checker (hourly), escalation handler (hourly), export cleaner (02:00 daily)',
      'Test suite: TC-001–TC-098 (functional) + NF-01–NF-18 (non-functional, performance, security)',
      'PRD documentation: 3-part Test Plan, Product Journey, and Product Execution specification',
      'Risk register: R1–R8 covering adoption, Jira import, notification overload, WebSocket stability, escalation, scope creep, performance, RBAC',
    ],
    techStack: [
      { category: 'Backend', items: ['Node.js', 'Express', 'REST API', 'WebSocket', 'Cron Jobs'] },
      { category: 'Frontend', items: ['JavaScript', 'React', 'Dashboard UI'] },
      { category: 'Database', items: ['SQL', 'Relational Schema', 'Audit Logging'] },
      { category: 'DevOps', items: ['GitHub', 'CI/CD', 'Environment Config'] },
    ],
    kpis: [
      { value: '≤2 days', label: 'approval cycle target' },
      { value: '≤10%', label: 'overdue rate target' },
      { value: '≥80%', label: 'weekly active users' },
      { value: '≤30 min', label: 'PM aggregation time/week' },
      { value: '≤2×', label: 'status meetings per month' },
    ],
    vision: [
      'The dashboard is designed to become the single source of operational truth for any team managing task-based delivery workflows at scale.',
      'With deferred features—native mobile app, two-way Jira sync, AI-powered workload prediction, Gantt view, and external stakeholder portal—the system has a clear expansion path without accumulating technical debt.',
      'The architecture prioritizes audit integrity, role isolation, and observability so the platform can grow from a 10-person team to an organization-wide deployment without structural changes.',
    ],
    tools: [
      { name: 'Node.js', src: '/img/tools/node-js-logo.png' },
      { name: 'JavaScript', src: '/img/tools/javascript-logo.png' },
      { name: 'SQL', src: '/img/tools/sql-logo.png' },
      { name: 'GitHub', src: '/img/tools/github-logo.png' },
    ],
  },
  {
    id: 'data-pipeline',
    title: 'DataForge: Data Pipeline & Reporting System',
    tagline: 'Raw data in. Actionable insight out.',
    image: '/img/coding/dataforge-pict.png',
    tags: ['ETL', 'Data Warehouse', 'Analytics'],
    facts: [
      { label: 'Project type', value: 'Data Engineering' },
      { label: 'Created', value: '2026' },
      { label: 'Duration', value: '2 Months' },
      { label: 'Role', value: 'Data Engineer' },
      { label: 'Focus', value: 'ETL, Warehousing, Visualization' },
    ],
    overview: [
      'Raw operational data distributed across multiple source systems cannot be queried, aggregated, or visualized without an extraction and transformation layer. Manual reporting from these sources introduces delays and errors.',
      'The Data Pipeline & Reporting System is an end-to-end ETL solution that extracts data from heterogeneous sources, transforms it into a consistent warehouse schema, and powers a live Power BI reporting layer for business analytics.',
    ],
    problem: [
      'Business reporting relied on manual data exports and ad-hoc SQL queries run against production databases. This created reporting lag, inconsistent metric definitions across teams, and load on production systems.',
    ],
    problemPoints: [
      'No centralized data warehouse—each team queried production directly with inconsistent schemas',
      'Reporting lag of 24–48 hours due to manual export and transformation steps',
      'Metric definitions diverged across departments with no single source of truth',
      'Production database load increased during reporting cycles, affecting application performance',
    ],
    solution: [
      'An automated ETL pipeline that extracts from source systems on a configurable schedule, applies transformation logic to normalize and enrich the data, and loads it into a structured warehouse schema optimized for analytics queries.',
      'Power BI connects to the warehouse layer for self-service dashboards. All pipeline runs are logged with row counts and error states for observability.',
    ],
    features: [
      {
        title: 'Extract Layer',
        description: 'Scheduled extraction from multiple source systems via Python scripts with configurable connection parameters and incremental load support.',
      },
      {
        title: 'Transform Layer',
        description: 'Data cleaning, type normalization, business rule application, and dimension table population in Python. Idempotent transforms safe for rerun.',
      },
      {
        title: 'Load & Warehouse',
        description: 'Structured SQL warehouse schema with fact and dimension tables. Upsert logic prevents duplicate rows on reruns.',
      },
      {
        title: 'Pipeline Observability',
        description: 'Run logs with timestamps, row counts, error capture, and pipeline health status available for each scheduled execution.',
      },
      {
        title: 'Power BI Reporting Layer',
        description: 'Live Power BI dashboards connected to the warehouse for business KPI tracking, trend analysis, and self-service data exploration.',
      },
    ],
    role: [
      'As Data Engineer, I designed the warehouse schema, wrote the extraction and transformation scripts in Python, configured the SQL load targets, and built the Power BI report layer.',
      'I also documented the pipeline architecture, defined the scheduling strategy, and established the error handling and retry logic for production reliability.',
    ],
    process: [
      {
        title: 'Source Analysis & Schema Design',
        description: 'Catalogued source systems, identified key entities, and designed a star-schema warehouse with fact and dimension tables.',
      },
      {
        title: 'Extract & Transform Scripts',
        description: 'Python scripts for each source connection with parameterized queries, incremental load markers, and transformation logic.',
      },
      {
        title: 'Warehouse Load & Validation',
        description: 'SQL upsert procedures, row count reconciliation, and data quality checks between source and target.',
      },
      {
        title: 'Reporting & Delivery',
        description: 'Power BI dashboards connected to warehouse views. Delivery to business stakeholders with documentation.',
      },
    ],
    deliverables: [
      'Python ETL scripts for extraction, transformation, and load stages',
      'SQL warehouse schema: fact tables, dimension tables, and analytical views',
      'Pipeline run log table with execution metadata',
      'Power BI report files connected to the warehouse layer',
      'Pipeline architecture documentation and scheduling configuration',
    ],
    techStack: [
      { category: 'Pipeline', items: ['Python', 'ETL Scripts', 'Incremental Load'] },
      { category: 'Warehouse', items: ['SQL', 'Star Schema', 'Upsert Logic'] },
      { category: 'Reporting', items: ['Power BI', 'DAX', 'Warehouse Views'] },
      { category: 'DevOps', items: ['GitHub', 'Scheduling', 'Run Logs'] },
    ],
    vision: [
      'The pipeline is built to extend: new source connectors can be added without touching the transform or load stages, and the warehouse schema supports additional subject areas via new fact tables.',
      'Future additions include streaming ingestion for near-real-time metrics, automated data quality scoring, and dbt-based transform documentation for team-wide schema literacy.',
    ],
    tools: [
      { name: 'Python', src: '/img/tools/python-logo.png' },
      { name: 'SQL', src: '/img/tools/sql-logo.png' },
      { name: 'Power BI', src: '/img/tools/powerbi-logo.png' },
      { name: 'GitHub', src: '/img/tools/github-logo.png' },
    ],
  },
];

export function getCodingProjectDetail(id?: string): CodingProjectDetail | undefined {
  return codingProjectDetails.find((p) => p.id === id);
}
