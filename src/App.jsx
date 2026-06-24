import { useEffect, useState } from "react";
import { cloneInitialStore } from "./osData";
import {
  buildAudit,
  createApplicant,
  createClientRegistration,
  createEmployeeFromCandidate,
  nextCandidateStage,
  nextLeadStage,
} from "./osLogic";
import { Landing, Login, ClientRegistration, JobApplication } from "./views/Public";
import { WorkspaceShell } from "./Workspace";

const STORE_KEY = "elite-os-store-v1";

function loadStore() {
  try {
    const saved = JSON.parse(window.localStorage.getItem(STORE_KEY));
    return saved ? { ...cloneInitialStore(), ...saved } : cloneInitialStore();
  } catch {
    return cloneInitialStore();
  }
}

export default function App() {
  const [store, setStore] = useState(loadStore);
  const [mode, setMode] = useState("landing");
  const [viewerId, setViewerId] = useState("u-admin");
  const [active, setActive] = useState("overview");
  const [toast, setToast] = useState("");
  const viewer = store.users.find((user) => user.id === viewerId) || store.users[0];

  useEffect(() => { window.localStorage.setItem(STORE_KEY, JSON.stringify(store)); }, [store]);
  useEffect(() => { if (!toast) return undefined; const timer = window.setTimeout(() => setToast(""), 2800); return () => window.clearTimeout(timer); }, [toast]);
  const notify = (message) => setToast(message);

  function login(id) {
    setViewerId(id);
    setActive("overview");
    setMode("workspace");
  }

  function logout() {
    setMode("landing");
    setActive("overview");
    notify("Signed out of demo workspace");
  }

  function registerClient(form) {
    const created = createClientRegistration(form);
    setStore((current) => ({
      ...current,
      users: [created.user, ...current.users],
      leads: [created.lead, ...current.leads],
      botConversations: [{ id: `bot-${Date.now()}`, visitor: form.name, company: form.company, message: form.message || "Client registration created", intent: "Service request", route: created.lead.department, status: "Routed to Sales", created: new Date().toISOString().slice(0, 10) }, ...current.botConversations],
      auditLog: [buildAudit(form.name, "registered client account and service request", form.company), ...current.auditLog],
    }));
    setViewerId(created.user.id);
    setActive("overview");
    setMode("workspace");
    notify("Client account created and request routed to Sales");
  }

  function applyForJob(form) {
    const candidate = createApplicant(form);
    const user = { id: `applicant-user-${Date.now()}`, name: form.name, email: form.email, role: "applicant", department: "Careers", status: "Applicant", initials: form.name.split(" ").map((word) => word[0]).slice(0, 2).join(""), candidateId: candidate.id, joined: new Date().toISOString().slice(0, 10) };
    setStore((current) => ({ ...current, candidates: [candidate, ...current.candidates], users: [user, ...current.users], auditLog: [buildAudit(form.name, "submitted HR application", form.role), ...current.auditLog] }));
    setViewerId(user.id);
    setActive("overview");
    setMode("workspace");
    notify("Application submitted to the HR channel");
  }

  function updateLead(id, changes) {
    setStore((current) => ({ ...current, leads: current.leads.map((lead) => lead.id === id ? { ...lead, ...changes } : lead) }));
  }

  function updateTask(id, changes) {
    setStore((current) => ({ ...current, tasks: current.tasks.map((task) => task.id === id ? { ...task, ...changes } : task) }));
  }

  function updateProject(id, changes) {
    setStore((current) => ({ ...current, projects: current.projects.map((project) => project.id === id ? { ...project, ...changes } : project) }));
  }

  function advanceLead(lead) {
    const next = nextLeadStage(lead.stage);
    updateLead(lead.id, { stage: next });
    setStore((current) => ({ ...current, auditLog: [buildAudit(viewer.name, "advanced lead stage", `${lead.company} · ${next}`), ...current.auditLog] }));
    notify(`${lead.company} moved to ${next}`);
  }

  function createQuote(lead, calculation) {
    const quote = { id: `quote-${Date.now()}`, leadId: lead.id, title: `${lead.company} ${calculation.service.label}`, service: lead.service, price: Math.round(calculation.recommended), cost: Math.round(calculation.deliveryCost + calculation.risk), margin: Number(calculation.margin.toFixed(1)), status: "Quote Ready", created: new Date().toISOString().slice(0, 10) };
    setStore((current) => ({ ...current, quotes: [quote, ...current.quotes], leads: current.leads.map((item) => item.id === lead.id ? { ...item, stage: "Quote Ready" } : item), auditLog: [buildAudit(viewer.name, "created smart quote", lead.company), ...current.auditLog] }));
    notify("Smart quote created and lead moved to Quote Ready");
  }

  function sendProposal(quote) {
    setStore((current) => ({ ...current, quotes: current.quotes.map((item) => item.id === quote.id ? { ...item, status: "Proposal Sent" } : item), leads: current.leads.map((lead) => lead.id === quote.leadId ? { ...lead, stage: "Proposal Sent" } : lead), auditLog: [buildAudit(viewer.name, "sent proposal", quote.title), ...current.auditLog] }));
    notify("Proposal marked as sent");
  }

  function acceptProposal(quote) {
    const lead = store.leads.find((item) => item.id === quote.leadId);
    if (!lead) return;
    const service = { web: "Custom Web Development", mobile: "Mobile App Development", automation: "ERP / Business Automation", ai: "AI Integration", marketing: "Growth & AI Marketing", branding: "Brand Identity & Design" }[lead.service] || "Custom engagement";
    const project = { id: `project-${Date.now()}`, clientId: `client-${lead.id}`, name: `${lead.company} ${service}`, service, stage: "Onboarding", health: "On track", progress: 8, manager: "u-pm", team: ["u-pm", "u-dev"], budget: quote.price, spent: 0, start: new Date().toISOString().slice(0, 10), due: "2026-09-01", client: lead.company, nextMilestone: "Complete onboarding information", milestoneDate: "2026-07-01" };
    const invoice = { id: `invoice-${Date.now()}`, client: lead.company, projectId: project.id, amount: Math.round(quote.price * 0.5), due: "2026-07-05", status: "Pending", type: "Deposit" };
    setStore((current) => ({ ...current, quotes: current.quotes.map((item) => item.id === quote.id ? { ...item, status: "Accepted" } : item), leads: current.leads.map((item) => item.id === lead.id ? { ...item, stage: "Won" } : item), projects: [project, ...current.projects], invoices: [invoice, ...current.invoices], notifications: [{ id: `notice-${Date.now()}`, title: `${lead.company} accepted proposal — onboarding started`, type: "project", target: "projects", read: false, time: "Just now" }, ...current.notifications], auditLog: [buildAudit(viewer.name, "converted proposal to project", lead.company), ...current.auditLog] }));
    notify("Proposal accepted: onboarding project and deposit invoice created");
  }

  function moveCandidate(candidate) {
    const next = nextCandidateStage(candidate.stage);
    const newUser = next === "Hired" ? createEmployeeFromCandidate(candidate) : null;
    setStore((current) => ({ ...current, candidates: current.candidates.map((item) => item.id === candidate.id ? { ...item, stage: next, score: item.score || 65 } : item), users: newUser ? [newUser, ...current.users] : current.users, auditLog: [buildAudit(viewer.name, next === "Hired" ? "hired and invited employee" : "advanced candidate", `${candidate.name} · ${next}`), ...current.auditLog] }));
    notify(next === "Hired" ? "Candidate hired and controlled invitation created" : `${candidate.name} moved to ${next}`);
  }

  function resolveTicket(ticket) {
    setStore((current) => ({ ...current, tickets: current.tickets.map((item) => item.id === ticket.id ? { ...item, status: "Resolved" } : item), auditLog: [buildAudit(viewer.name, "resolved support ticket", ticket.client), ...current.auditLog] }));
    notify("Support ticket resolved");
  }

  function createTicket(subject) {
    const client = viewer.role === "client" ? (store.projects.find((project) => project.clientId === viewer.clientId)?.client || "Northstar Studio") : "Elite OS";
    const ticket = { id: `ticket-${Date.now()}`, client, subject, status: "Open", priority: "Medium", owner: "u-support", created: new Date().toISOString().slice(0, 10), source: "AI Assistant" };
    setStore((current) => ({ ...current, tickets: [ticket, ...current.tickets], auditLog: [buildAudit(viewer.name, "opened support ticket", client), ...current.auditLog] }));
    notify("Support ticket created and routed to Customer Success");
  }

  function payInvoice(invoice) {
    setStore((current) => ({ ...current, invoices: current.invoices.map((item) => item.id === invoice.id ? { ...item, status: "Paid" } : item), auditLog: [buildAudit(viewer.name, "recorded invoice payment", invoice.client), ...current.auditLog] }));
    notify("Invoice marked as paid");
  }

  const actions = { updateLead, updateTask, updateProject, advanceLead, createQuote, sendProposal, acceptProposal, moveCandidate, resolveTicket, createTicket, payInvoice };
  const toastNode = toast && <div className="toast">{toast}</div>;

  if (mode === "landing") return <><Landing setMode={setMode}/>{toastNode}</>;
  if (mode === "login") return <><Login store={store} onLogin={login} setMode={setMode}/>{toastNode}</>;
  if (mode === "register") return <><ClientRegistration onRegister={registerClient} setMode={setMode}/>{toastNode}</>;
  if (mode === "apply") return <><JobApplication onApply={applyForJob} setMode={setMode}/>{toastNode}</>;
  return <><WorkspaceShell store={store} setStore={setStore} viewer={viewer} active={active} setActive={setActive} onLogout={logout} notify={notify} actions={actions}/>{toastNode}</>;
}
