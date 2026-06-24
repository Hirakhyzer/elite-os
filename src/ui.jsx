import { ROLES } from "./osData";

export function Avatar({ user, size = "" }) {
  const initials = user?.initials || user?.name?.split(" ").map((word) => word[0]).slice(0, 2).join("") || "EE";
  return <span className={`avatar ${size} ${ROLES[user?.role]?.color || "gold"}`}>{initials}</span>;
}

export function Tag({ children, tone = "neutral" }) {
  return <span className={`tag ${tone}`}>{children}</span>;
}

export function Panel({ title, eyebrow, description, children, className = "" }) {
  return <section className={`panel ${className}`}>
    {(title || eyebrow) && <div className="panel-head"><div>{eyebrow && <p className="eyebrow">{eyebrow}</p>}{title && <h2>{title}</h2>}{description && <p>{description}</p>}</div></div>}
    {children}
  </section>;
}

export function Kpi({ label, value, detail, tone = "gold", icon }) {
  return <article className={`kpi ${tone}`}><div className="kpi-top"><span>{label}</span><i>{icon}</i></div><strong>{value}</strong><small>{detail}</small></article>;
}

export function Progress({ value, tone = "gold" }) {
  return <div className="progress"><i className={tone} style={{ width: `${Math.max(0, Math.min(100, value))}%` }} /></div>;
}

export function Button({ children, onClick, variant = "primary", className = "", disabled = false }) {
  return <button className={`button ${variant} ${className}`} onClick={onClick} disabled={disabled}>{children}</button>;
}

export function StatRow({ label, value, accent = false }) {
  return <div className="stat-row"><span>{label}</span><strong className={accent ? "accent" : ""}>{value}</strong></div>;
}

export function PageHeading({ eyebrow, title, text, action }) {
  return <div className="page-heading split"><div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2><p>{text}</p></div>{action}</div>;
}
