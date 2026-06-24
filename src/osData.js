export const GOLD = "#f4af00";

export const ROLES = {
  admin: { label: "Founder / Admin", short: "Admin", department: "Executive", icon: "◆", color: "gold" },
  sales: { label: "Sales Executive", short: "Sales", department: "Sales", icon: "↗", color: "blue" },
  project_manager: { label: "Project Manager", short: "PM", department: "Delivery", icon: "◫", color: "purple" },
  developer: { label: "Developer", short: "Developer", department: "Technical", icon: "⌘", color: "ink" },
  finance: { label: "Finance Manager", short: "Finance", department: "Finance", icon: "◌", color: "green" },
  hr: { label: "HR Manager", short: "HR", department: "People", icon: "◎", color: "rose" },
  support: { label: "Support Specialist", short: "Support", department: "Customer Success", icon: "◔", color: "orange" },
  client: { label: "Client", short: "Client", department: "Client Portal", icon: "◉", color: "gold" },
  applicant: { label: "Applicant", short: "Applicant", department: "Careers", icon: "✦", color: "blue" },
};

export const DEPARTMENTS = [
  { id: "Executive", label: "Executive", lead: "Hira Khyzer" },
  { id: "Sales", label: "Sales", lead: "Omar Rahman" },
  { id: "Delivery", label: "Delivery", lead: "Anaya Patel" },
  { id: "Technical", label: "Technical", lead: "Musa Khan" },
  { id: "Finance", label: "Finance", lead: "Sofia Lee" },
  { id: "People", label: "People & HR", lead: "Amina Noor" },
  { id: "Customer Success", label: "Customer Success", lead: "Laila Ahmed" },
  { id: "Marketing", label: "Marketing", lead: "Pending assignment" },
];

export const SERVICE_CATALOG = [
  { id: "web", label: "Custom Web Development", department: "Technical", base: 6500, description: "High-converting websites, portals, and internal business tools." },
  { id: "mobile", label: "Mobile App Development", department: "Technical", base: 11000, description: "Cross-platform mobile products and connected client experiences." },
  { id: "automation", label: "ERP / Business Automation", department: "Technical", base: 14500, description: "Internal systems, workflow automation, integrations, and dashboards." },
  { id: "ai", label: "AI Integration", department: "Technical", base: 12500, description: "AI assistants, knowledge search, support automation, and practical business intelligence." },
  { id: "marketing", label: "Growth & AI Marketing", department: "Marketing", base: 3200, description: "Campaigns, content, SEO, conversion systems, and analytics." },
  { id: "branding", label: "Brand Identity & Design", department: "Delivery", base: 2800, description: "Brand systems, UX/UI design, visual assets, and client-ready collateral." },
];

export const PIPELINE_STAGES = ["New Lead", "Qualified", "Quote Ready", "Proposal Sent", "Negotiation", "Won", "Lost"];
export const CANDIDATE_STAGES = ["Applied", "Screening", "Interview", "Assessment", "Offer", "Hired", "Rejected"];
export const PROJECT_STAGES = ["Onboarding", "Planning", "In Progress", "Client Review", "Delivered", "Closed"];

export const initialStore = {
  users: [
    { id: "u-admin", name: "Hira Khyzer", email: "hira@eliteera.dev", role: "admin", department: "Executive", status: "Active", initials: "HK", joined: "2026-01-10" },
    { id: "u-sales", name: "Omar Rahman", email: "omar@eliteera.dev", role: "sales", department: "Sales", status: "Active", initials: "OR", joined: "2026-02-15" },
    { id: "u-pm", name: "Anaya Patel", email: "anaya@eliteera.dev", role: "project_manager", department: "Delivery", status: "Active", initials: "AP", joined: "2026-02-01" },
    { id: "u-dev", name: "Musa Khan", email: "musa@eliteera.dev", role: "developer", department: "Technical", status: "Active", initials: "MK", joined: "2026-03-08" },
    { id: "u-finance", name: "Sofia Lee", email: "sofia@eliteera.dev", role: "finance", department: "Finance", status: "Active", initials: "SL", joined: "2026-01-22" },
    { id: "u-hr", name: "Amina Noor", email: "amina@eliteera.dev", role: "hr", department: "People", status: "Active", initials: "AN", joined: "2026-02-20" },
    { id: "u-support", name: "Laila Ahmed", email: "laila@eliteera.dev", role: "support", department: "Customer Success", status: "Active", initials: "LA", joined: "2026-03-14" },
    { id: "u-client", name: "Cesar Ortiz", email: "cesar@northstar.studio", role: "client", department: "Client Portal", status: "Active", initials: "CO", joined: "2026-04-02", clientId: "c-northstar" }
  ],
  leads: [
    { id: "l-arya", company: "Arya Ventures", contact: "Arya Shah", email: "arya@aryaventures.com", service: "ai", budget: 18500, stage: "Proposal Sent", score: 88, owner: "u-sales", department: "Technical", source: "Referral", nextAction: "Proposal review call", due: "2026-06-27", created: "2026-06-14", notes: "Needs multilingual AI assistant and analytics." },
    { id: "l-bright", company: "BrightPath Education", contact: "Sophie Koch", email: "sophie@brightpath.edu", service: "web", budget: 9200, stage: "Qualified", score: 74, owner: "u-sales", department: "Technical", source: "Website", nextAction: "Prepare feature discovery", due: "2026-06-26", created: "2026-06-19", notes: "Learning platform website refresh." },
    { id: "l-orion", company: "Orion Logistics", contact: "Fatima Al-Rashid", email: "fatima@orionlogistics.com", service: "automation", budget: 32000, stage: "Negotiation", score: 91, owner: "u-sales", department: "Technical", source: "LinkedIn", nextAction: "Finalize phased scope", due: "2026-06-25", created: "2026-06-08", notes: "Operations automation and reporting dashboard." },
    { id: "l-nexus", company: "Nexus Digital", contact: "Marcus Lin", email: "marcus@nexusdigital.io", service: "marketing", budget: 5000, stage: "New Lead", score: 58, owner: "u-sales", department: "Marketing", source: "AI Bot", nextAction: "Qualification call", due: "2026-06-28", created: "2026-06-23", notes: "Interested in AI marketing campaign." }
  ],
  quotes: [
    { id: "q-arya", leadId: "l-arya", title: "Arya AI assistant", service: "ai", price: 19850, cost: 12600, margin: 36.5, status: "Proposal Sent", created: "2026-06-18" },
    { id: "q-orion", leadId: "l-orion", title: "Orion automation phase 1", service: "automation", price: 34700, cost: 22600, margin: 34.9, status: "Negotiation", created: "2026-06-12" }
  ],
  projects: [
    { id: "p-northstar", clientId: "c-northstar", name: "Northstar Client Portal", service: "Custom Web Development", stage: "In Progress", health: "On track", progress: 68, manager: "u-pm", team: ["u-pm", "u-dev"], budget: 14500, spent: 8050, start: "2026-05-04", due: "2026-07-15", client: "Northstar Studio", nextMilestone: "Client beta review", milestoneDate: "2026-06-30" },
    { id: "p-cloudpeak", clientId: "c-cloudpeak", name: "CloudPeak Analytics Setup", service: "AI Integration", stage: "Client Review", health: "At risk", progress: 82, manager: "u-pm", team: ["u-pm", "u-dev"], budget: 17600, spent: 14200, start: "2026-04-11", due: "2026-06-29", client: "CloudPeak AI", nextMilestone: "Resolve analytics feedback", milestoneDate: "2026-06-26" },
    { id: "p-summit", clientId: "c-summit", name: "Summit Brand Launch", service: "Brand Identity & Design", stage: "Planning", health: "On track", progress: 24, manager: "u-pm", team: ["u-pm"], budget: 6800, spent: 950, start: "2026-06-15", due: "2026-08-02", client: "Summit Group", nextMilestone: "Discovery workshop", milestoneDate: "2026-06-27" }
  ],
  tasks: [
    { id: "t-1", projectId: "p-northstar", title: "Build client document hub", owner: "u-dev", status: "In Progress", priority: "High", due: "2026-06-26", estimated: 14, actual: 8 },
    { id: "t-2", projectId: "p-northstar", title: "Prepare beta review agenda", owner: "u-pm", status: "To Do", priority: "Medium", due: "2026-06-28", estimated: 4, actual: 0 },
    { id: "t-3", projectId: "p-cloudpeak", title: "Resolve analytics feedback", owner: "u-dev", status: "Blocked", priority: "High", due: "2026-06-25", estimated: 9, actual: 7 },
    { id: "t-4", projectId: "p-summit", title: "Schedule discovery workshop", owner: "u-pm", status: "Done", priority: "Medium", due: "2026-06-22", estimated: 3, actual: 2 }
  ],
  invoices: [
    { id: "i-north-1", client: "Northstar Studio", projectId: "p-northstar", amount: 7250, due: "2026-06-28", status: "Pending", type: "Milestone" },
    { id: "i-cloud-1", client: "CloudPeak AI", projectId: "p-cloudpeak", amount: 5280, due: "2026-06-18", status: "Overdue", type: "Final" },
    { id: "i-summit-1", client: "Summit Group", projectId: "p-summit", amount: 3400, due: "2026-06-20", status: "Paid", type: "Deposit" },
    { id: "i-arya-1", client: "Arya Ventures", projectId: null, amount: 3970, due: "2026-07-02", status: "Draft", type: "Proposal deposit" }
  ],
  candidates: [
    { id: "a-sana", name: "Sana Malik", email: "sana@example.com", role: "Developer", department: "Technical", stage: "Assessment", score: 86, applied: "2026-06-13", portfolio: "Portfolio attached", notes: "Strong React and automation background." },
    { id: "a-james", name: "James Lee", email: "james@example.com", role: "Sales Executive", department: "Sales", stage: "Interview", score: 77, applied: "2026-06-16", portfolio: "LinkedIn provided", notes: "B2B SaaS experience." },
    { id: "a-hiba", name: "Hiba Rahman", email: "hiba@example.com", role: "Marketing Specialist", department: "Marketing", stage: "Screening", score: 69, applied: "2026-06-21", portfolio: "Campaign samples attached", notes: "SEO and content experience." }
  ],
  tickets: [
    { id: "s-1", client: "Northstar Studio", subject: "Where can I upload the revised brand assets?", status: "Open", priority: "Medium", owner: "u-support", created: "2026-06-23", source: "AI Bot" },
    { id: "s-2", client: "CloudPeak AI", subject: "Invoice payment link is not visible", status: "Escalated", priority: "High", owner: "u-finance", created: "2026-06-24", source: "Client Portal" },
    { id: "s-3", client: "Arya Ventures", subject: "Can we add a second language to the assistant?", status: "Open", priority: "Low", owner: "u-sales", created: "2026-06-24", source: "AI Bot" }
  ],
  botConversations: [
    { id: "b-1", visitor: "Marcus Lin", company: "Nexus Digital", message: "I need an AI marketing campaign for a product launch.", intent: "Service request", route: "Marketing", status: "Converted to lead", created: "2026-06-23" },
    { id: "b-2", visitor: "Cesar Ortiz", company: "Northstar Studio", message: "Where can I see my project progress?", intent: "Project status", route: "Client Portal", status: "Answered", created: "2026-06-24" }
  ],
  notifications: [
    { id: "n-1", title: "CloudPeak invoice is overdue", type: "finance", target: "invoices", read: false, time: "12m ago" },
    { id: "n-2", title: "Arya proposal review is tomorrow", type: "sales", target: "crm", read: false, time: "1h ago" },
    { id: "n-3", title: "Sana Malik completed assessment", type: "hr", target: "hr", read: true, time: "3h ago" },
    { id: "n-4", title: "Northstar beta review is approaching", type: "project", target: "projects", read: false, time: "5h ago" }
  ],
  auditLog: [
    { id: "log-1", actor: "Hira Khyzer", action: "approved proposal terms", target: "Arya Ventures", time: "Today, 09:12" },
    { id: "log-2", actor: "Sofia Lee", action: "marked invoice as overdue", target: "CloudPeak AI", time: "Today, 08:42" },
    { id: "log-3", actor: "Amina Noor", action: "moved candidate to assessment", target: "Sana Malik", time: "Yesterday" },
    { id: "log-4", actor: "Anaya Patel", action: "updated project health", target: "Northstar Client Portal", time: "Yesterday" }
  ],
  knowledge: [
    { id: "k-1", title: "Service catalog and estimate ranges", audience: "Visitor / Client", category: "Sales" },
    { id: "k-2", title: "Client onboarding checklist", audience: "Client / Delivery", category: "Operations" },
    { id: "k-3", title: "Quote approval policy", audience: "Sales / Finance", category: "Finance" },
    { id: "k-4", title: "Support escalation process", audience: "Support", category: "Customer Success" }
  ]
};

export function cloneInitialStore() {
  return JSON.parse(JSON.stringify(initialStore));
}
