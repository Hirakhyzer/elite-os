import { describe, expect, it } from "vitest";
import {
  calculateQuickQuote,
  createApplicant,
  createClientRegistration,
  getRouteForService,
  nextCandidateStage,
  nextLeadStage,
} from "./osLogic";

describe("Elite OS workflow logic", () => {
  it("routes services to the correct department", () => {
    expect(getRouteForService("ai")).toBe("Technical");
    expect(getRouteForService("marketing")).toBe("Marketing");
  });

  it("creates a quote with cost, price, margin, and recommendation", () => {
    const quote = calculateQuickQuote({ serviceId: "web", complexity: "complex", features: 12, timeline: "rush", budget: 20000 });
    expect(quote.recommended).toBeGreaterThan(quote.deliveryCost);
    expect(quote.margin).toBeGreaterThan(0);
    expect(quote.hours).toBeGreaterThan(0);
    expect(["Accept", "Negotiate", "Re-scope"]).toContain(quote.recommendation);
  });

  it("creates a client registration with a routed CRM lead", () => {
    const record = createClientRegistration({ name: "Jane Smith", email: "jane@example.com", company: "Acme", service: "marketing", budget: 5000, message: "Launch campaign" });
    expect(record.user.role).toBe("client");
    expect(record.lead.department).toBe("Marketing");
    expect(record.lead.stage).toBe("New Lead");
  });

  it("keeps applicants separate from work accounts", () => {
    const applicant = createApplicant({ name: "Sam Lee", email: "sam@example.com", role: "Developer", department: "Technical" });
    expect(applicant.stage).toBe("Applied");
    expect(applicant.department).toBe("Technical");
  });

  it("moves workflow stages forward", () => {
    expect(nextLeadStage("Qualified")).toBe("Quote Ready");
    expect(nextCandidateStage("Interview")).toBe("Assessment");
  });
});
