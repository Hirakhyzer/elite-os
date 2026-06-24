import { useState } from "react";
import { ROLES } from "./osData";
import { buildAudit, getRoleNavigation } from "./osLogic";
import { Avatar } from "./ui";
import { Overview } from "./views/Dashboard";
import { CrmPage } from "./views/Crm";
import { QuotesPage } from "./views/Quotes";
import { FinancePage, ProjectsPage } from "./views/Delivery";
import { HrPage } from "./views/Hr";
import { SupportPage } from "./views/Support";
import { AssistantPage } from "./views/Assistant";
import { ActivityPage } from "./views/Activity";
import { SettingsPage } from "./views/Settings";

export function WorkspaceShell({ store, setStore, viewer, active, setActive, onLogout, notify, actions }) {
  const navigation = getRoleNavigation(viewer.role);
  const unread = store.notifications.filter((notification) => !notification.read).length;
  const [showNotifications, setShowNotifications] = useState(false);
  const audit = (action, target) => setStore((current) => ({ ...current, auditLog: [buildAudit(viewer.name, action, target), ...current.auditLog] }));

  function markNotifications() {
    setStore((current) => ({ ...current, notifications: current.notifications.map((notification) => ({ ...notification, read: true })) }));
    setShowNotifications(false);
    notify("Notifications marked as read");
  }

  const screenProps = { store, viewer, setActive, notify, audit, ...actions };
  const screens = {
    overview: <Overview {...screenProps}/>,
    command: <Overview {...screenProps}/>,
    crm: <CrmPage {...screenProps}/>,
    quotes: <QuotesPage {...screenProps}/>,
    projects: <ProjectsPage {...screenProps}/>,
    finance: <FinancePage {...screenProps}/>,
    hr: <HrPage {...screenProps}/>,
    support: <SupportPage {...screenProps}/>,
    assistant: <AssistantPage {...screenProps}/>,
    activity: <ActivityPage {...screenProps}/>,
    settings: <SettingsPage {...screenProps}/>,
  };

  return <div className="os-shell">
    <aside className="sidebar"><div className="side-brand"><div className="brand-mark">E</div><div><span>Elite Era Development</span><strong>Elite OS</strong></div></div><nav>{navigation.map((item) => <button key={item.id} className={active === item.id ? "active" : ""} onClick={() => setActive(item.id)}><i>{item.icon}</i>{item.label}</button>)}</nav><div className="side-security"><i>◉</i><div><strong>Role protected</strong><span>{ROLES[viewer.role].department} access only</span></div></div><div className="side-user"><Avatar user={viewer}/><div><strong>{viewer.name}</strong><span>{ROLES[viewer.role].label}</span></div><button onClick={onLogout}>↗</button></div></aside>
    <main className="workspace"><header className="workspace-header"><div><p className="eyebrow">{ROLES[viewer.role].department} workspace</p><h1>{navigation.find((item) => item.id === active)?.label || "Elite OS"}</h1></div><div className="header-tools"><button className="notification-button" onClick={() => setShowNotifications((current) => !current)}>◔{unread > 0 && <b>{unread}</b>}</button><button className="profile-button" onClick={() => setActive("overview")}><Avatar user={viewer} size="small"/><span>{viewer.name}</span></button>{showNotifications && <div className="notifications"><div className="notification-head"><strong>Notifications</strong><button onClick={markNotifications}>Mark read</button></div>{store.notifications.slice(0, 5).map((notification) => <button key={notification.id} className={notification.read ? "read" : ""} onClick={() => { setActive(notification.target); setShowNotifications(false); }}><i>●</i><span>{notification.title}<small>{notification.time}</small></span></button>)}</div>}</div></header><div className="workspace-content">{screens[active] || screens.overview}</div><footer className="workspace-footer"><strong>Made by Hira Khyzer</strong><span>Elite Era Development L.L.C</span><b>#f4af00</b></footer></main>
  </div>;
}
