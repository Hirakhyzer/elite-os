import { PageHeading, Panel } from "../ui";

export function ActivityPage({ store }) {
  return <div className="page"><PageHeading eyebrow="Audit and accountability" title="Activity log" text="Elite OS records meaningful operational changes such as approvals, candidate movement, invoice updates, and project actions."/><Panel title="Recent activity"><div className="activity-list">{store.auditLog.map((entry) => <article key={entry.id}><i>◷</i><div><strong>{entry.actor}</strong> {entry.action} <b>{entry.target}</b><small>{entry.time}</small></div></article>)}</div></Panel></div>;
}
