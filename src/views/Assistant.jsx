import { useState } from "react";
import { answerBotQuestion } from "../osLogic";
import { Button, PageHeading, Panel } from "../ui";

export function AssistantPage({ store, viewer, createTicket, notify }) {
  const [messages, setMessages] = useState([{ from: "bot", text: `Hello ${viewer.name.split(" ")[0]}. I am the Elite OS assistant. I can guide service requests, quotes, projects, invoices, careers, and support routing within your permitted access.` }]);
  const [input, setInput] = useState("");
  function send() {
    const message = input.trim();
    if (!message) return;
    setMessages((current) => [...current, { from: "user", text: message }, { from: "bot", text: answerBotQuestion(message, viewer.role) }]);
    setInput("");
  }
  return <div className="page"><PageHeading eyebrow="Permission-aware AI assistant" title="Elite assistant" text="Answers adapt to your role. The assistant does not reveal other client records, internal margins, employee information, or protected system information outside approved access."/><div className="assistant-layout"><Panel eyebrow="Conversation" title="Ask Elite OS"><div className="chat">{messages.map((message, index) => <div className={`message ${message.from}`} key={index}><span>{message.from === "bot" ? "✦" : viewer.initials}</span><p>{message.text}</p></div>)}</div><div className="chat-input"><input value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => event.key === "Enter" && send()} placeholder="Ask about services, quotes, project status, invoices, careers, or support..."/><button onClick={send}>Send</button></div></Panel><div><Panel eyebrow="Human handoff" title="Need a team member?"><p className="assistant-copy">For a complex issue, complaint, refund, technical emergency, or contract decision, create a routed support ticket.</p><Button className="wide" onClick={() => { createTicket("Human assistance requested from Elite AI assistant"); notify("Human handoff ticket created"); }}>Escalate to human support</Button></Panel><Panel eyebrow="Knowledge scope" title="What I can use">{store.knowledge.map((item) => <div className="knowledge-row" key={item.id}><span>{item.category}</span><strong>{item.title}</strong><small>{item.audience}</small></div>)}</Panel></div></div></div>;
}
