import { useState } from "react";
import { PIPELINE_STAGES } from "../osData";
import { formatDate, formatMoney } from "../osLogic";
import { Button, PageHeading } from "../ui";

const serviceName = (serviceId) => ({ web: "Custom Web Development", mobile: "Mobile App Development", automation: "ERP / Business Automation", ai: "AI Integration", marketing: "Growth & AI Marketing", branding: "Brand Identity & Design" }[serviceId] || "Custom engagement");

export function CrmPage({ store, viewer, advanceLead, setActive }) {
  const [filter, setFilter] = useState("All");
  const canEdit = ["admin", "sales"].includes(viewer.role);
  const visible = viewer.role === "client" ? [] : store.leads.filter((lead) => filter === "All" || lead.stage === filter);
  const columns = filter === "All" ? ["New Lead", "Qualified", "Quote Ready", "Proposal Sent", "Negotiation", "Won"] : [filter];
  return <div className="page">
    <PageHeading eyebrow="Connected intake and sales" title="CRM pipeline" text="Every website request, client registration, and AI bot conversation is routed to a department and stays connected to quote, proposal, invoice, and project stages." action={canEdit ? <Button onClick={() => setActive("quotes")}>Create smart quote →</Button> : null}/>
    <div className="filter-row"><button className={filter === "All" ? "active" : ""} onClick={() => setFilter("All")}>All leads</button>{PIPELINE_STAGES.map((stage) => <button key={stage} className={filter === stage ? "active" : ""} onClick={() => setFilter(stage)}>{stage}</button>)}</div>
    <div className="crm-board">{columns.map((stage) => <section key={stage}><header><span>{stage}</span><b>{store.leads.filter((lead) => lead.stage === stage).length}</b></header>{visible.filter((lead) => lead.stage === stage).map((lead) => <article className="lead-card" key={lead.id}><div className="lead-top"><span>{lead.source}</span><b>{lead.score}</b></div><h3>{lead.company}</h3><p>{lead.contact} · {lead.email}</p><div className="lead-meta"><span>{serviceName(lead.service)}</span><strong>{formatMoney(lead.budget)}</strong></div><small>Next: {lead.nextAction} · {formatDate(lead.due)}</small><div className="lead-actions"><button onClick={() => setActive("quotes")}>Quote</button>{canEdit && !["Won", "Lost"].includes(lead.stage) && <button onClick={() => advanceLead(lead)}>Advance →</button>}</div></article>)}</section>)}</div>
  </div>;
}
