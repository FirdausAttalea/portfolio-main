---
title: Task Monitoring & Approval Dashboard - Test Plan, Product Journey, and Product Execution
source_document: PRD v1.0 (Draft, Nov 2025)
document_type: Product initial documentation set
status: Draft for review
confidentiality: Internal use only
---

# Task Monitoring & Approval Dashboard

This set contains three documents derived from PRD v1.0:

1. Part A: Test Plan
2. Part B: Product Journey
3. Part C: Product Execution

---

# PART A: TEST PLAN

## 1. Document Control

| Field | Value |
|---|---|
| Product | Task Monitoring & Approval Dashboard (MVP) |
| Source PRD | PRD v1.0, Draft - Ready for Review |
| Test Plan Version | v0.1 Draft |
| Owner | QA Engineer, with Product Management Team |
| Reviewers | Product Manager, Engineering Lead, IT/Security |
| Target Release | Q3 2026 per PRD (to be re-baselined, see Part C) |

## 2. Purpose

This plan defines how the MVP will be verified against the PRD functional requirements (FR01-FR20), non-functional requirements, acceptance criteria (AC-01 to AC-08), and edge cases (EC01-EC10). It confirms that the product meets its goals: centralized task visibility, enforced approval workflows, proactive overdue alerts, and reliable sprint visibility.

## 3. Scope

### 3.1 In Scope

- Task list view: filter, sort, inline status update, overdue flag, pagination
- Task detail panel: metadata, comments, change log, linked approvals, URL attachments
- Approval workflow: create, queue, approve, reject with reason, SLA tracking, reminders, escalation
- Notification system: in-app and email, per-user preferences
- Sprint overview widget: status counts, progress bar, scope change counter, days remaining, at-risk count
- Role-Based Access Control (PM, Team Lead, Stakeholder, Operations Member, Admin)
- Audit log (read-only, immutable)
- Export to CSV and PDF (task list and approval log)
- Authentication: SAML SSO and email/password, JWT-protected APIs
- Cron jobs: overdue detector, approval SLA checker, approval escalation, export cleaner
- Event tracking (analytics events in PRD Section 19.2)
- Non-functional: performance, scalability, reliability, security, usability (WCAG 2.1 AA)

### 3.2 Out of Scope

- Native mobile application
- Two-way Jira/Linear sync (read-only import is in scope)
- AI workload balancing and predictive analytics
- Time tracking and capacity planning
- External customer-facing portal
- Custom report builder, Gantt view, billing or budget integration

## 4. Test Objectives

1. Verify every P0 requirement works as specified before launch.
2. Verify P1 requirements work or have documented, accepted gaps.
3. Confirm server-side RBAC prevents any unauthorized data exposure.
4. Confirm performance targets under MVP load (500 concurrent users, 10,000 active tasks).
5. Confirm the product supports measurement of the primary KPIs through correct event tracking.

## 5. Test Strategy

| Test Level | Description | Owner | Tooling (proposed) |
|---|---|---|---|
| Unit | Business logic: status transitions, SLA calculations, permission checks | Backend and Frontend engineers | Framework native test runner |
| API / Integration | All endpoints in PRD Section 18.1, cron jobs, notification event flow | Backend and QA | API test client, CI pipeline |
| End-to-end (E2E) | Full user journeys across UI, API, and notifications | QA | Browser automation |
| Permission / Security | RBAC matrix, JWT, data exposure, session expiry | QA and Security | Automated permission tests in CI, security review |
| Performance and Load | Load times, 500 concurrent users, 10,000 tasks, 1,000-row render | Backend and QA | Load testing tool |
| Accessibility | WCAG 2.1 AA audit | Frontend and QA | Automated scan plus manual review |
| Usability | Key actions in 3 clicks or fewer, readable error messages | Design and QA | Heuristic review, pilot observation |
| Regression | Re-run of critical paths each sprint and before launch | QA | Automated suite |
| User Acceptance (UAT) | Pilot team validation against journeys | Product Manager with pilot users | Scripted scenarios |

### 5.1 Approach Notes

- Shift-left: acceptance criteria are converted into automated tests as each story is built.
- Cron jobs are tested with controllable system time (clock injection or time-travel fixtures) so SLA and deadline logic can be verified without waiting.
- Notification tests verify both delivery and content, including the in-app fallback on email failure.
- RBAC tests are generated from the permission matrix so every role and action pair is covered.

## 6. Test Environments and Data

| Environment | Purpose |
|---|---|
| Dev | Developer testing, unit and integration |
| QA / Staging | Full regression, E2E, performance, UAT, mirrors production configuration |
| Production | Smoke test after deployment, pilot monitoring |

**Test data requirements**

- Users for each of the 5 roles, plus a user with no role (EC04)
- A user whose manager chain is set, and a user with no available manager (OQ02)
- Teams, sprints (2-week), and tasks in every status, including overdue and at-risk
- Seed volume sets: 1,000 tasks (list render), 10,000 tasks (scalability and export)
- Approval requests in each state: pending, approved, rejected, SLA reminder sent, escalated
- Mock Jira dataset including custom statuses (OQ07) and rate-limit simulation
- Email sandbox to capture outbound mail and simulate failures

## 7. Entry and Exit Criteria

### 7.1 Entry Criteria

- PRD baselined and open questions affecting testable behavior resolved (see Section 12)
- Feature built, deployed to QA, and unit tests passing
- Test data and environment ready

### 7.2 Exit Criteria (Launch Readiness)

- 100% of P0 test cases executed and passed
- No open Critical or High severity defects
- All P1 test cases executed, with any failures accepted in writing by the Product Manager
- Performance targets met (Section 9)
- Security review signed off by IT/Security, with RBAC automated tests green in CI
- WCAG 2.1 AA audit completed with no blocking issues
- Regression suite passing on the release candidate
- UAT sign-off from the pilot team

## 8. Functional Test Cases

Priority follows the PRD (P0 or P1). Each case traces to a PRD requirement.

### 8.1 Task List and Task Detail

| ID | Test Case | Expected Result | Trace | Priority |
|---|---|---|---|---|
| TC-001 | PM opens Task List | All active tasks across teams shown with status, assignee, priority badge, due date | FR01, AC-01 | P0 |
| TC-002 | Apply each filter (status, priority, assignee, team, sprint, due date) and combinations | Only matching tasks shown; result count correct | FR02 | P0 |
| TC-003 | Sort by due date, priority, status, last updated | Order correct in ascending and descending | Feature 1 | P0 |
| TC-004 | View an overdue task in the list | Distinct red indicator displayed | FR03 | P0 |
| TC-005 | Filter by "Overdue" | Only overdue tasks returned | Feature 1 user story | P0 |
| TC-006 | Open task detail panel | Title, description, assignee, priority, status, due date, sprint, created date, change log shown | FR04 | P0 |
| TC-007 | Update status inline with confirmation | Status changes, confirmation prompt appears, change appears in UI within 3 seconds | FR05, Journey flow 8.1 | P0 |
| TC-008 | Post and view a comment as internal user | Comment saved and visible to internal team only | FR06 | P1 |
| TC-009 | Add URL link or reference document | Link saved; file upload not offered | Feature 2 | P1 |
| TC-010 | Task with linked approval requests | Linked approvals displayed in the panel | Feature 2 | P0 |

### 8.2 Approval Workflow

| ID | Test Case | Expected Result | Trace | Priority |
|---|---|---|---|---|
| TC-020 | Team Lead creates request with linked task, approver, priority, deadline, context | Approval card appears in approver queue | FR07, AC-03 | P0 |
| TC-021 | Approver notification on creation | In-app and email notification delivered | FR08, AC-03 | P0 |
| TC-022 | Approver approves | Task unblocked, requestor notified, audit log updated | Flow 8.2 | P0 |
| TC-023 | Approver rejects with reason | Rejection saved, requestor notified, task flagged | Flow 8.2 | P0 |
| TC-024 | Approver rejects without reason | Validation error shown, submission blocked | FR09, AC-05 | P0 |
| TC-025 | Approval pending 24 hours | Reminder sent, "Reminder Sent" badge shown | FR10, AC-04 | P0 |
| TC-026 | Approval breaches 48-hour SLA | Escalation notification sent to approver's manager | FR11, Feature 3 | P1 |
| TC-027 | Approval queue filter by status | Only matching requests shown | Feature 3 | P0 |
| TC-028 | Role without approval authority attempts to action | Action blocked, no state change | Feature 6 | P0 |
| TC-029 | Approval by email action link (Journey 2) | Approval recorded once; link authenticated or tokenized; audit entry created | Journey 2 step 4 | P1 |
| TC-030 | Approval granted updates task status | Task moves to "In Progress" automatically | Journey 2 step 6 | P0 |

### 8.3 Notifications

| ID | Test Case | Expected Result | Trace | Priority |
|---|---|---|---|---|
| TC-040 | Task assigned | Assignee receives in-app and email | Feature 4 | P0 |
| TC-041 | Task reaches T-24 hours | Assignee and PM notified | Feature 4, Flow 8.3 | P0 |
| TC-042 | Task becomes overdue | Assignee, PM, Team Lead notified via in-app and email | FR12, AC-02 | P0 |
| TC-043 | Approval SLA breached | Approver and manager notified by email | Feature 4 | P1 |
| TC-044 | Approval actioned | Requestor notified in-app and email | Feature 4 | P0 |
| TC-045 | User changes notification preferences | Subsequent notifications honor settings | FR13 | P1 |
| TC-046 | Notification center read state | Mark as read updates unread count and `PATCH /notifications/{id}/read` | API 18.1 | P0 |

### 8.4 Overdue Detection and Cron Jobs

| ID | Test Case | Expected Result | Trace | Priority |
|---|---|---|---|---|
| TC-050 | Task past due and not Done, detector runs | Overdue marker applied, red indicator, alerts sent | FR20, AC-02 | P0 |
| TC-051 | Detector run frequency | Runs every 15 minutes | FR20 | P0 |
| TC-052 | Task already Done past due date | Not flagged overdue | AC-02 | P0 |
| TC-053 | Overdue more than 48 hours | Escalation to stakeholder triggered | Flow 8.3 | P1 |
| TC-054 | SLA checker and escalation jobs | Run hourly, no duplicate reminders for same approval | 18.2 | P0 |
| TC-055 | Export cleaner | Files older than 7 days deleted at 02:00 daily | 18.2 | P1 |
| TC-056 | Cron or notification service health check fails | Alert raised, core task management still works | 14.3 | P1 |

### 8.5 Sprint Overview Widget

| ID | Test Case | Expected Result | Trace | Priority |
|---|---|---|---|---|
| TC-060 | Sprint with 20 tasks (12 Done, 5 In Progress, 2 Blocked, 1 Overdue) | Counts correct, progress bar shows 60% | FR14, AC-07 | P0 |
| TC-061 | Add and remove tasks mid-sprint | Scope change counter reflects additions and removals | FR15 | P1 |
| TC-062 | Days remaining | Correct for 2-week sprint | Feature 5 | P0 |
| TC-063 | At-risk count | Counts unstarted tasks near deadline per agreed threshold | Feature 5 | P0 |
| TC-064 | Sprint with zero tasks | Empty state with call to action | EC07 | P1 |
| TC-065 | Widget updates after status change | Reflects change within 3 seconds | 14.1 | P0 |

### 8.6 RBAC, Audit Log, Export, Authentication

| ID | Test Case | Expected Result | Trace | Priority |
|---|---|---|---|---|
| TC-070 | Permission matrix, every role against every action | Matches PRD Feature 6 table exactly | FR16 | P0 |
| TC-071 | Operations Member opens Task List | Only own tasks; "View All Teams" filter hidden | AC-06 | P0 |
| TC-072 | Direct API call for another team's task (as Team Lead or Ops) | 403 or empty result; enforced server-side | FR16, R8 | P0 |
| TC-073 | Status change recorded | Log shows actor, old status, new status, exact timestamp | FR17, AC-08 | P1 |
| TC-074 | Attempt to edit or delete audit entry | Not possible through UI or API | FR17 | P1 |
| TC-075 | `GET /audit-log` as PM, Admin, other roles | Allowed for PM and Admin only | 18.1 | P1 |
| TC-076 | CSV and PDF export of task list and approval log | Files complete, role-scoped, correct format | FR18 | P1 |
| TC-077 | Export of 10,000+ records | Generated asynchronously, download link sent via notification | EC10 | P1 |
| TC-078 | Export rate limit | Sixth request in an hour rejected | 18.3 | P1 |
| TC-079 | SAML SSO login and email/password login | Both succeed with valid credentials; fail safely otherwise | FR19 | P0 |
| TC-080 | Session inactivity | Session expires after 8 hours | 14.4 | P0 |
| TC-081 | General API rate limit | 300 requests per minute per user enforced | 18.3 | P1 |

### 8.7 Edge Cases

| ID | Scenario | Expected Result | Trace |
|---|---|---|---|
| TC-090 | Approver removed mid-approval | Auto-reassigned to approver's manager; requestor notified | EC01 |
| TC-091 | Task created with past deadline | Validation warning; flagged overdue immediately | EC02 |
| TC-092 | Two users update same task at once | Last write wins; both notified of final state | EC03 |
| TC-093 | User with no role logs in | Access denied; prompt to contact Admin | EC04 |
| TC-094 | Approval for a Done task | Warning shown: "This task is already completed. Proceed?" | EC05 |
| TC-095 | Email delivery fails | 3 retries with exponential backoff; in-app notification created | EC06 |
| TC-096 | Self-assigned approver | Blocked: "Approver must be a different user" | EC08 |
| TC-097 | Task title over 255 characters | Limit enforced with visible counter | EC09 |
| TC-098 | Approver's manager also unavailable | Behavior per resolved OQ02 | OQ02 |

## 9. Non-Functional Test Cases

| ID | Area | Test | Target | Source |
|---|---|---|---|---|
| NF-01 | Performance | Dashboard initial load (p95, standard broadband) | 2 seconds or less | 14.1 |
| NF-02 | Performance | Task list render, 1,000 rows | 1 second or less | 14.1 |
| NF-03 | Performance | Status update reflected after save | 3 seconds or less | 14.1 |
| NF-04 | Performance | In-app notification delivery | 5 seconds or less | 14.1 |
| NF-05 | Performance | Email notification delivery | 2 minutes or less | 14.1 |
| NF-06 | Performance | API response time, p95 | 500 ms or less | 14.1 |
| NF-07 | Scalability | 500 concurrent users | No degradation beyond targets | 14.2 |
| NF-08 | Scalability | 10,000 active tasks | No degradation beyond targets | 14.2 |
| NF-09 | Reliability | Availability target | 99.5% excluding planned maintenance | 14.3 |
| NF-10 | Reliability | Notification service outage | Core task management remains functional | 14.3 |
| NF-11 | Security | TLS 1.2+ in transit, AES-256 at rest | Verified by configuration review | 14.4 |
| NF-12 | Security | No PII in application logs | Log inspection passes | 14.4 |
| NF-13 | Security | JWT required on protected endpoints | Unauthenticated calls rejected | 14.4 |
| NF-14 | Usability | WCAG 2.1 AA | No blocking violations | 14.5 |
| NF-15 | Usability | Key actions within 3 clicks from any dashboard view | Verified on defined action list | 14.5 |
| NF-16 | Usability | Minimum viewport 1024 px | Layout usable | 14.5 |
| NF-17 | Usability | Error messages | Human-readable and actionable | 14.5 |
| NF-18 | Real-time | WebSocket drop | Falls back to SSE, then 30-second polling | R4 |

## 10. Analytics and Event Tracking Verification

| Event | Verify |
|---|---|
| `dashboard_viewed` | Fires once per landing with `user_role`, `timestamp` |
| `task_status_updated` | Includes `task_id`, `old_status`, `new_status`, `user_role` |
| `approval_created` | Includes `approval_id`, `priority`, `approver_id` |
| `approval_actioned` | Includes `approval_id`, `action`, `time_to_action_hours` |
| `filter_applied` | Includes `filter_type`, `filter_value` |
| `notification_clicked` | Includes `notification_type`, `time_to_click_minutes` |
| `export_triggered` | Includes `export_type`, `row_count` |
| `overdue_alert_viewed` | Includes `task_id`, `days_overdue` |

These events feed the primary KPIs, so incorrect tracking blocks success measurement.

## 11. Defect Management

| Severity | Definition | Resolution Expectation |
|---|---|---|
| Critical | Data exposure, RBAC bypass, data loss, system down | Fix before any further testing, blocks release |
| High | P0 feature broken, no workaround | Fix within current sprint, blocks release |
| Medium | Feature impaired with workaround | Fix before launch or accept with sign-off |
| Low | Cosmetic or minor | Backlog |

Defects are logged in the project tracker with steps to reproduce, environment, severity, and linked requirement ID. A triage meeting runs twice weekly during Sprints 3 and 4.

## 12. Requirement Gaps and Conflicts to Resolve Before Test Baseline

| # | Observation in PRD | Impact on Testing | Suggested Resolution |
|---|---|---|---|
| 1 | AC-02 says status becomes "Overdue", but the status model is To Do, In Progress, Blocked, Done | Unclear whether Overdue is a status or a computed badge | Define Overdue as a computed flag or add it to the status model |
| 2 | At-risk is defined three ways: T-24 hours (Flow 8.3), under 2 days (Feature 5), under 48 hours (widget inventory) | Conflicting expected results | Confirm one threshold |
| 3 | FR10 (SLA reminders) is P0, FR11 (escalation) is P1, but escalation is in the Sprint 3 plan | Test priority unclear | Confirm scope of escalation in MVP |
| 4 | Audit log and comment thread are P1 but listed as MVP in scope (Sections 9.1 and 10) | Exit criteria ambiguity | Confirm whether P1 is a launch gate |
| 5 | AC-03 allows 5 minutes for approver notification; NFRs set in-app at 5 seconds and email at 2 minutes | Different pass thresholds | Align AC and NFR targets |
| 6 | Responsive minimum is 1024 px, yet mobile is out of scope and "Mobile-responsive design" is P2 | Viewport test range unclear | Confirm supported viewport range |
| 7 | Persona 4 is "Budi" in the table of contents and "Adam" in the body | Documentation only | Correct the PRD |
| 8 | OQ01 (source of task data), OQ02 (second-level escalation), OQ06 (Blocked tasks triggering approval), OQ07 (custom Jira statuses) unresolved | Direct impact on test cases TC-098 and import tests | Resolve before Sprint 1 or 2 per owner dates |
| 9 | Sprint plan covers Weeks 1-8; the PRD states 8-10 weeks | Buffer for testing unclear | Confirm whether Weeks 9-10 are reserved for UAT and hardening |
| 10 | Journey 2 mentions approval via email action link; no API or security requirement defined for it | Cannot fully test TC-029 | Add requirement or remove from the journey |

## 13. Schedule Aligned to Sprints

| Sprint | Weeks | Test Focus |
|---|---|---|
| Sprint 1 | 1-2 | Auth, RBAC, task list and detail read-only, API filters, test data and environment setup |
| Sprint 2 | 3-4 | Status updates, approval flow, rejection reason, notification delivery, email and WebSocket |
| Sprint 3 | 5-6 | Cron jobs with time control, sprint widget, audit log, change log, scope tracker, SLA reminders and escalation |
| Sprint 4 | 7-8 | Export, preferences, load test, full regression, accessibility audit, security review |
| Hardening and UAT | 9-10 (proposed) | Pilot UAT, defect closure, launch readiness |

## 14. Roles and Responsibilities

| Role | Responsibility |
|---|---|
| QA Engineer | Own test plan, automation, regression, reporting |
| Backend and Frontend Engineers | Unit and integration tests, defect fixes |
| Designer | Usability and accessibility review |
| Product Manager | Requirement clarification, UAT coordination, acceptance |
| IT / Security | RBAC and data exposure review, sign-off |
| Pilot Team | UAT participation and feedback |

## 15. Deliverables

- Test plan (this document)
- Test case repository linked to requirement IDs
- Automated test suites (API, E2E, permission)
- Weekly test status report
- Performance and load test report
- Accessibility audit report
- Security review sign-off
- Final test summary and go/no-go recommendation

## 16. Traceability Summary

| PRD Area | Requirements | Test Cases |
|---|---|---|
| Task List | FR01-FR03 | TC-001 to TC-005 |
| Task Detail | FR04-FR06 | TC-006 to TC-010 |
| Approval | FR07-FR11 | TC-020 to TC-030 |
| Notifications | FR12-FR13 | TC-040 to TC-046 |
| Sprint Widget | FR14-FR15 | TC-060 to TC-065 |
| RBAC | FR16 | TC-070 to TC-072 |
| Audit Log | FR17 | TC-073 to TC-075 |
| Export | FR18 | TC-076 to TC-078 |
| Auth | FR19 | TC-079, TC-080 |
| Overdue | FR20 | TC-050 to TC-056 |
| Edge Cases | EC01-EC10 | TC-090 to TC-098, TC-064 |
| NFRs | Section 14 | NF-01 to NF-18 |

---

# PART B: PRODUCT JOURNEY

## 1. Product Summary

The Task Monitoring & Approval Dashboard is an internal operational tool that consolidates task tracking, approval workflows, and sprint visibility into one interface. It replaces fragmented tracking across Jira or Linear, Slack, email, spreadsheets, and weekly standups.

## 2. Journey Context

### 2.1 The Problem the Journey Solves

| Problem | Impact Today |
|---|---|
| Fragmented task visibility | 2-3 hours per week per PM on status aggregation |
| Approval bottlenecks | 3-5 business day average delay, no SLA or escalation |
| Overdue task blindness | About 30% of tasks found overdue only at sprint review |
| Poor sprint visibility | Sprint predictability around 55% |
| Stakeholder coordination overhead | 4-6 unnecessary status meetings per month per team |

### 2.2 Journey Goals

| Goal | Journey Outcome |
|---|---|
| G1 Centralize task visibility | One place to see every active task |
| G2 Streamline approvals | Every request tracked with owner, SLA, and audit trail |
| G3 Proactive overdue identification | Alerts before and at deadline breach |
| G4 Reduce stakeholder overhead | Stakeholders self-serve status |
| G5 Improve sprint predictability | Real-time sprint health |

## 3. Personas

| Persona | Role | Core Need | Main Pain | Key Features |
|---|---|---|---|---|
| Priya, 34 | Senior Product Manager | Oversight of all tasks across 3 teams without chasing people | 3+ hours weekly compiling status, late awareness of blockers | Status overview, overdue alerts, approval queue, sprint burndown |
| Reza, 29 | Product Team Lead | Keep team unblocked, submit and track approvals | Requests vanish in Slack, no visibility on who holds approvals | Approval submission, team filters, change log |
| Sandra, 45 | VP Operations (Stakeholder) | High-level delivery view, quick approve or reject | Too many meetings, unclear origin of delays | Executive summary, approval panel, risk view |
| Adam, 26 | Operations Specialist | Clear personal task list and approval confirmation | Unclear priorities, no confirmation when approvals complete | My Tasks, notification center, status update form |

## 4. End-to-End Product Lifecycle Journey

| Stage | What Happens | Primary Actor | System Behavior |
|---|---|---|---|
| 1. Onboarding | User signs in via SSO, role is assigned, tasks are seeded or imported from Jira | Admin, all users | SAML or email login, role mapping, read-only Jira import |
| 2. Orientation | User lands on a role-based dashboard | All | Widgets shown per role (Section 7) |
| 3. Daily monitoring | User reviews tasks, filters, checks sprint health | PM, Team Lead, Ops | Real-time updates in 3 seconds or less |
| 4. Execution updates | Assignee updates status, adds comments | Ops, Team Lead | Change logged with actor and timestamp, notifications sent |
| 5. Approval request | Task needs sign-off, requestor submits approval | Team Lead, PM | Card in approver queue, in-app and email notice |
| 6. Approval decision | Approver approves or rejects with reason | Stakeholder, Admin | Task unblocked or flagged, requestor notified, audit updated |
| 7. Proactive alerting | Deadlines approach or pass | System | T-24 hours at-risk, overdue badge, alerts, 48-hour escalation |
| 8. Reporting | Leaders review summary and export | Stakeholder, PM | CSV or PDF export, burndown indicator |
| 9. Review and improvement | Retrospective uses change log, scope tracker, audit log | PM, Team Lead | Data-driven retrospective |

## 5. Detailed User Journeys

### 5.1 Journey 1: Product Manager Monitors Sprint Progress (Priya)

**Trigger:** Sprint starts on Monday morning.

| Step | Action | System Response | Emotion | Opportunity |
|---|---|---|---|---|
| 1 | Opens dashboard, views Sprint Overview widget | Task status breakdown and progress bar | Relieved, in control | Fast load, 2 seconds or less |
| 2 | Filters by "At Risk" | 3 tasks near deadline shown | Alert, informed | Saved filters (Phase 2) |
| 3 | Opens Task #47 | Detail panel with assignee, blockers, approval status | Confident | One-click context |
| 4 | Sees approval pending 2 days, escalates | Escalation action available | Proactive | Escalate without leaving the dashboard |
| 5 | Waits | Automated reminder sent to approver | Reassured | Visible "Reminder Sent" badge |
| 6 | Friday review | Burndown shows 85% completed versus 55% previous sprint | Satisfied | Trend widget and sprint summary |

### 5.2 Journey 2: Team Lead Submits an Approval Request (Reza)

**Trigger:** A task needs budget approval to proceed.

| Step | Action | System Response | Emotion | Opportunity |
|---|---|---|---|---|
| 1 | Opens approval workflow panel | Form displayed | Neutral | Minimal required fields |
| 2 | Creates request: approver (Sandra), priority, context, linked task | Validates approver is not self | Focused | Inline validation |
| 3 | Submits | Notification to Sandra with details and deadline | Hopeful | Clear confirmation to requestor |
| 4 | Sandra approves via dashboard or email link | Approval recorded, audit logged | Relieved | Secure email action link |
| 5 | Receives "Approval granted - Task #47 unblocked" | Real-time notification | Delighted | Link back to the task |
| 6 | Continues work | Task auto-updates to "In Progress" | Productive | No manual status change needed |

### 5.3 Journey 3: Stakeholder Reviews Delivery Status (Sandra)

**Trigger:** Weekly leadership review preparation.

| Step | Action | System Response | Emotion | Opportunity |
|---|---|---|---|---|
| 1 | Opens dashboard, lands on Executive Summary | Role-appropriate view | Calm | Single status view |
| 2 | Reads summary: 12 in progress, 2 overdue, 1 pending her approval | Counts and drill-down links | Informed | Risk visibility |
| 3 | Opens Pending Approvals, reviews, approves in one click | Decision recorded, requestor notified | Efficient | One-click action |
| 4 | Exports summary PDF for board meeting | Async export, link by notification when large | Confident | Ready-to-share report |
| 5 | No status meetings needed this week | n/a | Satisfied | Measure meeting reduction |

### 5.4 Journey 4: Operations Member Handles Daily Tasks (Adam)

**Trigger:** Start of the working day.

| Step | Action | System Response | Emotion | Opportunity |
|---|---|---|---|---|
| 1 | Opens My Tasks | List of own tasks sorted by due date | Clear | Priority badges |
| 2 | Updates a task to "In Progress" | Change logged, PM notified | Simple | Single-click status chip |
| 3 | Receives overdue or approval notification | In-app and email | Informed | Notification preferences |
| 4 | Sees approval actioned | Confirmation notification | Reassured | Closes the "did anyone act?" gap |

## 6. Flow Diagrams (Text Form)

### 6.1 Task Status Update

```
Open Dashboard -> Select task -> View detail panel -> Update status
(To Do / In Progress / Blocked / Done) -> Log change (actor, timestamp)
-> Notify PM and stakeholders -> Dashboard updates in real time
```

### 6.2 Approval Workflow

```
Requestor submits (approver, priority, deadline, context)
-> Approval card created in approver queue
-> In-app and email notification
-> Approver opens request
   -> APPROVE: task unblocked, requestor notified, audit updated
   -> REJECT: reason required, requestor notified, task flagged
   -> NO ACTION within SLA: reminder, then escalation to approver's manager
```

### 6.3 Overdue Alert

```
Cron every 15 minutes -> Deadline minus 24 hours: "At Risk" badge, PM notified
-> Deadline passed: "Overdue" badge, alert to assignee, PM, Team Lead
-> Overdue counter increments
-> Overdue more than 48 hours: escalate to stakeholder
```

## 7. Role-Based Experience Map

| Role | View Tasks | Update Status | Create Approval | Action Approval | View All Teams | Export |
|---|---|---|---|---|---|---|
| Project Manager | All | All | Yes | No | Yes | Yes |
| Team Lead | Own team | Own team | Yes | No | No | Own team |
| Stakeholder | All (read) | No | No | Yes, if assigned | Yes | Yes |
| Operations Member | Own tasks | Own tasks | No | No | No | No |
| Admin | All | All | Yes | Yes | Yes | Yes |

**Widgets by role**

| Widget | Audience |
|---|---|
| Sprint Health Summary | PM, Team Lead |
| Approval Queue | Stakeholder, PM |
| Overdue Tasks Alert | PM, Team Lead |
| My Tasks | All |
| Team Activity Feed | PM, Team Lead |
| Scope Change Tracker | PM |
| At-Risk Tasks | PM, Team Lead |
| Burndown Indicator | PM, Stakeholder |

## 8. Pain Points and Journey Opportunities

| Pain Point (Before) | Journey Improvement (After) |
|---|---|
| Chasing status on Slack | Real-time single source of truth |
| Lost approval requests | Tracked queue, SLA, reminders, escalation |
| Finding overdue work at sprint review | Proactive T-24 hour and overdue alerts |
| Unknown mid-sprint changes | Scope change tracker and change log |
| Excess status meetings | Self-serve executive summary and export |
| No confirmation of approval | Real-time notification to the requestor |

## 9. Moments of Truth

1. **First dashboard load:** the user sees their real data within 2 seconds.
2. **First approval sent:** the requestor sees it tracked and acted on without chasing.
3. **First proactive alert:** the PM is warned before a deadline breach.
4. **First meeting skipped:** the stakeholder gets status without a meeting.

## 10. Journey Metrics

| Journey Stage | Metric | Target |
|---|---|---|
| Adoption | Weekly Active Users | 80% or more of target users |
| Approval | Average approval cycle time | 5 days to 2 days or less |
| Alerting | Overdue task rate per sprint | 30% to 10% or less |
| Visibility | PM time on status aggregation | 3 hours per week to 30 minutes or less |
| Efficiency | Status meetings per team per month | 4-6 to 2 or fewer |
| Delivery | Sprint completion rate | 55% to 75% or more |
| Satisfaction | NPS at 30 days | 40 or more |

---

# PART C: PRODUCT EXECUTION

## 1. Execution Summary

| Item | Detail |
|---|---|
| Product | Task Monitoring & Approval Dashboard (MVP) |
| Duration | 8-10 weeks, 4 two-week sprints |
| Team | 2 backend engineers, 2 frontend engineers, 1 designer, 1 QA engineer |
| Target release | Q3 2026 per PRD (re-baseline required, see Section 11) |
| Primary KPI | Approval cycle time from 5 days to 2 days or less |
| Executive sponsor | VP Operations |

## 2. Execution Principles

1. P0 first. No P1 or P2 work starts until all P0 items for the sprint are on track.
2. No mid-sprint additions. Change requests require PM sign-off (Risk R6).
3. Server-side security from the start. RBAC and authentication are built in Sprint 1, not added later.
4. Pilot before wide rollout. Launch to one pilot team first (Risk R1).
5. Measure from day one. Event tracking ships with the features it measures.

## 3. Scope Baseline

**MVP in scope:** task list, task detail, approval workflow, notifications, sprint widget, overdue detection, RBAC, audit log, executive summary view, PDF and CSV export.

**Deferred:** native mobile, two-way Jira sync, AI features, time tracking, external portal, custom reports, Gantt, billing integration.

## 4. Prioritization

| Priority | Items |
|---|---|
| P0 Must Have | Task list with filters, status update, approval create and action, approval SLA reminders, overdue detection and alerts, RBAC, sprint widget, in-app and email notifications, SSO |
| P1 Should Have | Comment thread, approval escalation, audit log, scope change tracker, notification preferences, CSV and PDF export |
| P2 Nice to Have | Bulk approval, custom layouts, advanced trend charts, mobile-responsive design, two-way Jira sync |

## 5. Delivery Roadmap

| Phase | Timing | Focus |
|---|---|---|
| Sprint 0 | Before Week 1 | Resolve OQ01, OQ04, OQ07, OQ08, finalize environments, confirm dependencies |
| Sprint 1 | Weeks 1-2 | Foundation and core task view |
| Sprint 2 | Weeks 3-4 | Task updates, approvals, notifications |
| Sprint 3 | Weeks 5-6 | Overdue detection, sprint widget, audit log |
| Sprint 4 | Weeks 7-8 | Export, polish, launch readiness |
| Hardening and pilot (proposed) | Weeks 9-10 | UAT with pilot team, defect closure, go/no-go |
| Phase 2 | Q4 2026 | Two-way Jira/Linear sync, PWA, bulk approval, saved filters, custom layouts |
| Phase 3 | Q1 2027 | AI workload balancing, predictive overdue scoring, advanced analytics, capacity planning, Slack/Teams integration |

## 6. Sprint Plan

### Sprint 1 (Weeks 1-2): Foundation and Core Task View
**Goal:** Working task list with basic filters and authentication. **Total: 42 points**

| Story | Points | Owner |
|---|---|---|
| Project architecture (DB schema, API scaffolding) | 5 | Backend |
| SSO and authentication (SAML and JWT) | 8 | Backend |
| Task List UI with filters | 8 | Frontend |
| `GET /tasks` endpoint with filters | 5 | Backend |
| Task Detail panel (read-only) | 5 | Frontend |
| Server-side RBAC with 5 roles | 8 | Backend |
| Design tokens and component library setup | 3 | Design and Frontend |

### Sprint 2 (Weeks 3-4): Task Updates, Approvals and Notifications
**Goal:** Users can update task status; approval workflow operational. **Total: 44 points**

| Story | Points | Owner |
|---|---|---|
| Inline task status update | 5 | Backend |
| Approval request creation UI and API | 8 | Frontend and Backend |
| Approval queue view (filterable) | 5 | Frontend |
| Approve and reject with reason enforcement | 5 | Backend |
| Notification service (event bus and worker) | 8 | Backend |
| In-app notifications via WebSocket | 8 | Backend and Frontend |
| Email notifications (SendGrid) | 5 | Backend |

### Sprint 3 (Weeks 5-6): Overdue Detection, Sprint Widget and Audit Log
**Goal:** Proactive overdue detection live; sprint visibility complete. **Total: 39 points**

| Story | Points | Owner |
|---|---|---|
| Overdue detection cron (15-minute interval) | 5 | Backend |
| Overdue alert notification (in-app and email) | 3 | Backend |
| Sprint Overview widget UI and API | 8 | Frontend and Backend |
| Approval SLA cron (reminders and escalation) | 8 | Backend |
| Audit Log UI and API | 5 | Frontend and Backend |
| Change log in Task Detail panel | 5 | Frontend and Backend |
| Scope change tracker | 5 | Backend and Frontend |

### Sprint 4 (Weeks 7-8): Export, Polish and Launch Readiness
**Goal:** Export, notification preferences, bug fixes, launch readiness. **Total: 42 points**

| Story | Points | Owner |
|---|---|---|
| CSV export (task list and approval log) | 5 | Backend |
| Async PDF export with notification | 8 | Backend |
| Notification preferences UI | 5 | Frontend and Backend |
| Load testing and performance optimization | 5 | Backend and QA |
| End-to-end regression testing | 8 | QA |
| Accessibility audit (WCAG 2.1 AA) | 3 | Frontend and QA |
| Security review (RBAC, JWT, data exposure) | 5 | Backend and Security |
| User onboarding flow (first-login guide) | 3 | Frontend and Design |

**Total effort:** 167 story points across 4 sprints.

## 7. Technical Execution Reference

### 7.1 API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/v1/tasks` | Task list with filters |
| GET | `/api/v1/tasks/{id}` | Task detail with change log |
| PATCH | `/api/v1/tasks/{id}/status` | Update status |
| POST | `/api/v1/approvals` | Create approval |
| GET | `/api/v1/approvals` | Approval queue |
| PATCH | `/api/v1/approvals/{id}/action` | Approve or reject |
| GET | `/api/v1/notifications` | Unread notifications |
| PATCH | `/api/v1/notifications/{id}/read` | Mark as read |
| GET | `/api/v1/sprints/current` | Current sprint overview |
| GET | `/api/v1/audit-log` | Audit log (PM and Admin) |
| GET | `/api/v1/export/tasks` | Async export |

### 7.2 Scheduled Jobs

| Job | Schedule | Purpose |
|---|---|---|
| Overdue Task Detector | Every 15 minutes | Flag overdue tasks |
| Approval SLA Checker | Hourly | Send reminders |
| Approval Escalation | Hourly | Escalate SLA breaches |
| Export Cleaner | Daily at 02:00 | Remove exports older than 7 days |

### 7.3 Key Constraints

- Web-based frontend (React or equivalent), no native mobile
- 2 backend engineers, so scope complexity must stay controlled
- No budget for third-party automation tools, so custom notification logic
- No task data in third-party cloud without a Data Processing Agreement
- Jira integration is read-only for MVP

## 8. Dependencies

| Dependency | Owner | Status | Risk |
|---|---|---|---|
| Identity and Auth Service (SSO/SAML) | Platform Team | Available | Low |
| Email delivery (SMTP/SendGrid) | Infrastructure | Available | Low, contract status to confirm (OQ08) |
| Task data API (Jira/Linear) | Integration Team | In Progress | Medium |
| User directory and team structure API | HR Systems | Available | Low |
| Design System and Component Library | Design Team | Available | Low |
| Jira REST API (read-only) | External | n/a | Medium, rate limits |
| WebSocket infrastructure | Existing infra | n/a | Low, SSE fallback |

## 9. Risk Register

| ID | Risk | Likelihood | Impact | Mitigation | Owner |
|---|---|---|---|---|---|
| R1 | Low adoption from change fatigue | High | High | Pilot team first, team leads in UAT, onboarding materials | Product Manager |
| R2 | Poor Jira import quality | Medium | High | Manual seeding fallback, validation layer | Engineering Lead |
| R3 | Notification overload | Medium | Medium | Smart grouping, preferences from day one | Product Manager |
| R4 | WebSocket instability | Low | Medium | SSE fallback, 30-second polling | Backend |
| R5 | Escalation causes political friction | Medium | Medium | Opt-in at org level, documented rules | Product Manager, VP Operations |
| R6 | Scope creep during sprints | High | High | P0/P1/P2 framework, PM sign-off, no mid-sprint additions | Product Manager |
| R7 | Performance degradation at volume | Low | High | Index strategy before development, load testing | Backend, QA |
| R8 | RBAC misconfiguration exposes data | Low | Critical | Server-side enforcement, security review, automated permission tests in CI | Backend, Security |

## 10. Rollout Plan

| Stage | Activity | Exit Condition |
|---|---|---|
| 1. Internal readiness | Regression, load, security, accessibility complete | Test plan exit criteria met |
| 2. Pilot | Launch to 1 pilot team, weekly feedback sessions | Pilot sign-off, no Critical or High defects |
| 3. Expansion | Roll out to the 3 PM groups and Team Leads | Adoption trend positive, SLA tracking active |
| 4. Full launch | All target users and stakeholders | WAU target on track |
| 5. 30-day review | NPS survey, KPI baseline comparison | NPS 40 or more |
| 6. 60-day review | Approval workflow adoption check | 70% or more of PMs submit 1 or more approvals per sprint |
| 7. 6-month review | Full KPI evaluation against SMART objectives | Targets met or action plan |

## 11. Governance and Communication

### 11.1 Stakeholder Engagement

| Stakeholder | Influence | Interest | Engagement |
|---|---|---|---|
| VP Operations (Executive Sponsor) | High | High | Weekly update, final sign-off on scope changes |
| Head of Engineering | High | Medium | Sprint reviews, architecture sign-off |
| Project Managers (x3) | Medium | High | UAT, weekly feedback |
| Product Team Leads | Medium | High | Sprint demos, approval UX feedback |
| IT / Security | High | Low | Early engagement for RBAC and data security sign-off |
| HR Systems Team | Low | Low | Single kick-off meeting for user directory API |

### 11.2 Decisions Already Made

| Decision | Decision Maker | Note |
|---|---|---|
| MVP limited to internal teams | VP Operations | External access moved to later phase |
| Approval SLA default 48 hours | Head of PM and VP Operations | Configurable post-MVP |
| Jira read-only for MVP | Engineering Lead | Two-way sync estimated at about 6 additional weeks |
| No native mobile in MVP | Product Lead | Web-responsive only |
| WebSocket for real-time updates | Engineering Lead | SSE as fallback |

### 11.3 Communication Plan

| Audience | Frequency | Format | Channel |
|---|---|---|---|
| Executive Sponsor | Bi-weekly | One-page status brief | Email |
| Engineering Team | Weekly | Sprint review and async update | Confluence, Slack |
| Primary Users (PMs) | Weekly | Demo or feedback session | Video call |
| All Stakeholders | Monthly | Product update | Email |

### 11.4 Sprint Ceremonies (Proposed)

Sprint planning at the start of each sprint, daily stand-up, mid-sprint backlog check, sprint review with demo, and retrospective using the product's own change log and scope tracker data once available.

## 12. Open Questions Tracker

| ID | Question | Owner | Due | Execution Impact |
|---|---|---|---|---|
| OQ01 | Authoritative source of sprint and task data | Engineering Lead | Sprint 0 | Blocks data model and import design |
| OQ02 | Escalation target if approver's manager is unavailable | Operations Lead | Sprint 1 | Affects escalation logic |
| OQ03 | SLA configurable per team or org-wide | PM and Stakeholders | Sprint 1 | Affects SLA job design |
| OQ04 | Guest or external stakeholder access in MVP | Product Lead | Before Sprint 1 | Affects RBAC scope |
| OQ05 | Audit log retention policy | Legal and Compliance | Sprint 2 | Affects storage design |
| OQ06 | Do Blocked tasks auto-trigger approval requests | PM and Design | Sprint 1 | Affects workflow and UI |
| OQ07 | Jira custom statuses not mapped to the 5-status model | Engineering and PM | Sprint 0 | Affects import mapping |
| OQ08 | SendGrid contract status | Infrastructure | Before Sprint 2 | Blocks email delivery work |

## 13. Launch Readiness Checklist

- [ ] All P0 features complete and accepted
- [ ] All P1 features complete or formally deferred
- [ ] Test plan exit criteria met
- [ ] Performance targets verified under load
- [ ] Security review and RBAC tests signed off
- [ ] WCAG 2.1 AA audit complete
- [ ] Event tracking verified for all KPI events
- [ ] Notification delivery and fallback verified
- [ ] Onboarding flow and user guide ready
- [ ] Pilot team trained and UAT signed off
- [ ] Support and escalation path defined for launch week
- [ ] Rollback plan documented
- [ ] Executive sponsor go/no-go approved

## 14. Success Measurement

### 14.1 Primary KPIs (6 Months Post-Launch)

| KPI | Baseline | Target |
|---|---|---|
| Average approval cycle time | 5 business days | 2 business days or less |
| Overdue task rate per sprint | About 30% | 10% or less |
| Weekly Active Users | n/a | 80% or more of target users |
| PM time on status aggregation | About 3 hours per week | 30 minutes per week or less |
| Status meetings per team per month | 4-6 | 2 or fewer |

### 14.2 Secondary KPIs

| KPI | Target |
|---|---|
| Approval SLA compliance | 90% or more actioned within SLA |
| Email notification open rate | 60% or more |
| Sprint completion rate | 75% or more |
| Approval workflow adoption | 70% of PMs submit 1 or more approval per sprint after 60 days |
| NPS at 30 days | 40 or more |
| Export usage | 30% of PMs export monthly |

## 15. Timeline and Plan Notes

1. The PRD is dated Nov 2025 and targets Q3 2026. If the build has not started, the roadmap and release target need re-baselining with new calendar dates.
2. Four sprints total 8 weeks, while the PRD states 8-10 weeks. A 2-week hardening and pilot window is recommended to absorb UAT findings.
3. Sprint 2 (44 points) is the heaviest and carries the most delivery risk (notification service, WebSocket, approval flow). Consider moving the email integration earlier if OQ08 is resolved early.
4. With only 2 backend engineers, Sprints 1 to 3 are backend-heavy. Monitor for a backend bottleneck and protect capacity for cron jobs and security work.