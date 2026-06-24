# Elite OS

**Elite OS** is the central white, black, and `#f4af00` gold operating-system prototype for **Elite Era Development L.L.C.** It connects the public website, clients, applicants, employees, departments, leadership, and business workflow in one role-aware React application.

## Workflow

```text
Visitor / AI Assistant / Client Registration
→ CRM Lead + Department Routing
→ Smart Quote
→ Proposal
→ Accepted Proposal
→ Onboarding Project + Deposit Invoice
→ Delivery Workspace
→ Client Updates, Support, Payments, Renewal
```

## Included modules

- Public landing page and service intake
- Client registration and secure client-facing portal prototype
- Demo role login: Founder, Sales, Project Manager, Developer, Finance, HR, Support, Client, Applicant
- Founder command center with revenue, pipeline, risk, department capacity, alerts, and governance signals
- CRM pipeline with lead routing and stage progression
- Smart quote workflow with estimate rules, budget fit, margin signal, quote creation, proposal status, and project conversion
- Project delivery workspace with milestones, team roles, task board, project health, and budget progress
- Finance workspace with invoices, overdue status, payments, and profitability signals
- HR recruitment channel with application pipeline and hire-to-invitation workflow
- Support inbox with client tickets and AI handoff simulation
- Permission-aware Elite AI assistant simulation
- Audit activity log
- Administration controls for users, departments, automation rules, and production security roadmap
- Local browser persistence for demo data
- Responsive animated white/black/gold interface

## Important prototype note

This repository is a functional browser prototype with local storage and demo role switching. Real production use requires secure backend authentication, a database, server-side role enforcement, protected document storage, secure payment integrations, email delivery, and a server-side AI integration. Do not place API secrets in the browser application.

## Run locally

```bash
npm install
npm run dev
```

Open the local address shown in the terminal, usually `http://localhost:5173`.

## Run tests

```bash
npm test
```

## Project structure

```text
src/
  App.jsx                 Application state and workflow actions
  Workspace.jsx           Role-based shell and navigation
  osData.js               Shared demo records, roles, services, and stages
  osLogic.js              Workflow rules, quote estimation, routing, bot answers
  views/                  Public, dashboard, commercial, delivery, HR, support, and admin screens
  styles.css              Shared brand design imports
```

---

## Author

Made by **Hira Khyzer**

Developed as part of the **Elite Era Development L.L.C** project portfolio.

Brand color: `#f4af00`
