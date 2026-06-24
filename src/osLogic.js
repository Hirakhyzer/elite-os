import { CANDIDATE_STAGES, PIPELINE_STAGES, ROLES, SERVICE_CATALOG } from "./osData";

export const formatMoney = (value) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(Number(value) || 0);
export const formatDate = (value) => value ? new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date(`${value}T12:00:00`)) : "—";
export const initials = (name = "") => name.split(" ").filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase() || "EE";
export const byId = (items, id) => items.find((item) => item.id === id);

export function getRoleNavigation(role) {
  const shared = [{ id: "overview", label: "Overview", icon: "⌂" }, { id: "assistant", label: "AI assistant", icon: "✦" }, { id: "activity", label: "Activity log", icon: "◷" }];
  const map = {
    admin: [shared[0], { id: "command", label: "Command center", icon: "◆" }, { id: "crm", label: "CRM & pipeline", icon: "↗" }, { id: "quotes", label: "Quotes & proposals", icon: "◫" }, { id: "projects", label: "Projects", icon: "▦" }, { id: "finance", label: "Finance", icon: "◌" }, { id: "hr", label: "People & HR", icon: "◎" }, { id: "support", label: "Support inbox", icon: "◔" }, { id: "settings", label: "Administration", icon: "⚙" }, ...shared.slice(1)],
    sales: [shared[0], { id: "crm", label: "CRM & pipeline", icon: "↗" }, { id: "quotes", label: "Quotes & proposals", icon: "◫" }, { id: "support", label: "Customer questions", icon: "◔" }, ...shared.slice(1)],
    project_manager: [shared[0], { id: "projects", label: "Delivery workspace", icon: "▦" }, { id: "crm", label: "Client handoffs", icon: "↗" }, { id: "support", label: "Client updates", icon: "◔" }, ...shared.slice(1)],
    developer: [shared[0], { id: "projects", label: "My delivery tasks", icon: "⌘" }, { id: "assistant", label: "Technical assistant", icon: "✦" }, ...shared.slice(2)],
    finance: [shared[0], { id: "finance", label: "Finance", icon: "◌" }, { id: "quotes", label: "Margin review", icon: "◫" }, ...shared.slice(1)],
    hr: [shared[0], { id: "hr", label: "Recruitment channel", icon: "◎" }, { id: "settings", label: "Employee access", icon: "⚙" }, ...shared.slice(1)],
    support: [shared[0], { id: "support", label: "Support inbox", icon: "◔" }, { id: "crm", label: "Client context", icon: "↗" }, ...shared.slice(1)],
    client: [shared[0], { id: "projects", label: "My project", icon: "▦" }, { id: "quotes", label: "My proposal", icon: "◫" }, { id: "finance", label: "Invoices", icon: "◌" }, { id: "support", label: "Support", icon: "◔" }, ...shared.slice(1)],
    applicant: [shared[0], { id: "hr", label: "My application", icon: "◎" }, { id: "assistant", label: "Career assistant", icon: "✦" }]
  };
  return map[role] || shared;
}

export function getRouteForService(serviceId) {
  return SERVICE_CATALOG.find((service) => service.id === serviceId)?.department || "Sales";
}

export function calculateQuickQuote({ serviceId, complexity = "moderate", features = 6, timeline = "standard", budget = 0 }) {
  const service = SERVICE_CATALOG.find((entry) => entry.id === serviceId) || SERVICE_CATALOG[0];
  const complexityFactor = { simple: 0.85, moderate: 1, complex: 1.4, enterprise: 1.9 }[complexity] || 1;
  const timelineFactor = { standard: 1, accelerated: 1.12, rush: 1.27 }[timeline] || 1;
  const scopeFactor = Math.max(0.65, Number(features || 1) / 6);
  const deliveryCost = service.base * 0.62 * complexityFactor * scopeFactor;
  const risk = deliveryCost * (timeline === "rush" ? 0.12 : 0.07);
  const recommended = (deliveryCost + risk) / 0.62 * timelineFactor;
  const margin = ((recommended - deliveryCost - risk) / recommended) * 100;
  const fit = budget ? (budget / recommended) * 100 : 0;
  const recommendation = !budget ? "Review" : budget >= recommended ? "Accept" : budget >= recommended * 0.82 ? "Negotiate" : "Re-scope";
  return { service, deliveryCost, risk, recommended, margin, fit, recommendation, hours: Math.round(38 * scopeFactor * complexityFactor), weeks: Math.max(2, Math.ceil(4 * scopeFactor * complexityFactor / (timeline === "rush" ? 1.5 : 1))) };
}

export function nextCandidateStage(stage) {
  const index = CANDIDATE_STAGES.indexOf(stage);
  return CANDIDATE_STAGES[Math.min(index + 1, CANDIDATE_STAGES.length - 1)];
}

export function nextLeadStage(stage) {
  const index = PIPELINE_STAGES.indexOf(stage);
  return PIPELINE_STAGES[Math.min(index + 1, PIPELINE_STAGES.length - 1)];
}

export function buildAudit(actor, action, target) {
  return { id: `audit-${Date.now()}`, actor, action, target, time: "Just now" };
}

export function createClientRegistration(form) {
  const id = `client-${Date.now()}`;
  return {
    user: { id: `user-${Date.now()}`, name: form.name, email: form.email, role: "client", department: "Client Portal", status: "Pending verification", initials: initials(form.name), joined: new Date().toISOString().slice(0, 10), clientId: id },
    lead: { id: `lead-${Date.now()}`, company: form.company || "New company", contact: form.name, email: form.email, service: form.service, budget: Number(form.budget) || 0, stage: "New Lead", score: 54, owner: "u-sales", department: getRouteForService(form.service), source: "Client Registration", nextAction: "Verify account and qualify request", due: new Date().toISOString().slice(0, 10), created: new Date().toISOString().slice(0, 10), notes: form.message || "Client registered through Elite OS." }
  };
}

export function createApplicant(form) {
  return { id: `candidate-${Date.now()}`, name: form.name, email: form.email, role: form.role, department: form.department, stage: "Applied", score: 0, applied: new Date().toISOString().slice(0, 10), portfolio: form.portfolio || "Not supplied", notes: form.note || "New application received through Elite OS." };
}

export function roleFromJobTitle(title = "") {
  const lower = title.toLowerCase();
  if (lower.includes("developer")) return "developer";
  if (lower.includes("sales")) return "sales";
  if (lower.includes("finance")) return "finance";
  if (lower.includes("human") || lower.includes("hr")) return "hr";
  if (lower.includes("support")) return "support";
  if (lower.includes("manager")) return "project_manager";
  return "developer";
}

export function createEmployeeFromCandidate(candidate) {
  const role = roleFromJobTitle(candidate.role);
  return { id: `employee-${Date.now()}`, name: candidate.name, email: candidate.email, role, department: ROLES[role].department, status: "Invited", initials: initials(candidate.name), joined: new Date().toISOString().slice(0, 10) };
}

export function answerBotQuestion(message, viewerRole) {
  const text = message.toLowerCase();
  if (text.includes("price") || text.includes("cost") || text.includes("quote")) return "Elite OS can create a guided estimate after service type, scope, complexity, timeline, and budget are collected. A sales specialist confirms the final proposal.";
  if (text.includes("invoice") || text.includes("pay")) return viewerRole === "client" ? "Your client portal shows invoices, payment status, and next due dates. For payment issues, I can create a finance support ticket." : "Finance workspace tracks draft, pending, paid, and overdue invoices with project profitability signals.";
  if (text.includes("project") || text.includes("status")) return viewerRole === "client" ? "Your portal only shows your approved project milestones, next deliverable, and client-safe updates. Internal costs and private team notes remain protected." : "Project status combines milestone progress, task health, delivery risk, approval blockers, and budget consumption.";
  if (text.includes("job") || text.includes("apply") || text.includes("career")) return "Applicants use the HR channel to submit a role application. HR then moves candidates through screening, interview, assessment, offer, and hired stages before access is invited.";
  if (text.includes("support") || text.includes("help") || text.includes("problem")) return "I can route this request to Customer Success, Finance, Sales, or Technical Delivery. Explain the issue and include the client or project name if available.";
  if (text.includes("lead") || text.includes("service")) return "I can collect a service request and route it to the correct department. The service catalog includes web development, mobile apps, automation, AI integration, marketing, and brand design.";
  return `I can help with service requests, quotes, project updates, invoices, careers, and support routing. You are currently viewing the ${ROLES[viewerRole]?.label || "Elite OS"} experience.`;
}
