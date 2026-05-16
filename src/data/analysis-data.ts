import type { AnalysisResult } from "@/types/analysis";

export const mockAnalysisResults: Record<string, AnalysisResult> = {
  "sec-recitals": {
    sectionId: "sec-recitals",
    riskLevel: "low",
    issues: [
      {
        id: "issue-rec-1",
        title: "Vague compliance language",
        riskLevel: "low",
        originalText: "ensure compliance with applicable federal and state privacy and security requirements",
        suggestedText: "ensure compliance with the Health Insurance Portability and Accountability Act of 1996 (HIPAA), the Health Information Technology for Economic and Clinical Health Act (HITECH), and all applicable federal and state privacy and security requirements",
        explanation: "The recitals reference generic 'privacy and security requirements' without specifying HIPAA and HITECH by name. While recitals are not operative clauses, explicitly naming the governing statutes here strengthens the agreement's interpretive framework and signals the parties' shared understanding of the regulatory landscape.",
        sectionId: "sec-recitals",
        paragraphId: "rec-2",
      },
    ],
    summary: "Minor language gap — recitals lack specific statutory references.",
  },

  "sec-applicability": {
    sectionId: "sec-applicability",
    riskLevel: "medium",
    issues: [
      {
        id: "issue-app-1",
        title: "Overly broad PHI scope",
        riskLevel: "medium",
        originalText: "in any form or medium, whether oral, written, or electronic, regardless of the source or the manner of collection",
        suggestedText: "in any form or medium, whether oral, written, or electronic, to the extent such information is created, received, maintained, or transmitted in connection with the services described in the underlying services agreement",
        explanation: "The current language captures all PHI the Business Associate handles regardless of context. This could unintentionally bring unrelated PHI (from other clients or internal operations) under this agreement's obligations. Scoping to PHI connected to the services agreement aligns with standard BAA practice.",
        sectionId: "sec-applicability",
        paragraphId: "app-0",
      },
    ],
    summary: "PHI scope definition is broader than necessary.",
  },

  "sec-definitions": {
    sectionId: "sec-definitions",
    riskLevel: "low",
    issues: [
      {
        id: "issue-def-1",
        title: "Incomplete Security Incident definition",
        riskLevel: "low",
        originalText: "any event that results in unauthorized access to or disruption of Business Associate's systems, networks, or data, whether or not such event results in a Breach of PHI",
        suggestedText: "any event that results in unauthorized access to, alteration of, or disruption of Business Associate's systems, networks, or data containing or processing PHI, whether or not such event results in a Breach as defined herein, excluding unsuccessful attempts such as pings, port scans, or failed login attempts",
        explanation: "The definition is both too broad (captures events unrelated to PHI) and too narrow (omits data alteration). Adding a carve-out for unsuccessful attempts prevents a flood of immaterial notifications while ensuring meaningful incidents are captured.",
        sectionId: "sec-definitions",
        paragraphId: "def-2",
      },
    ],
    summary: "Security Incident definition needs refinement.",
  },

  "sec-permitted": {
    sectionId: "sec-permitted",
    riskLevel: "high",
    issues: [
      {
        id: "issue-per-1",
        title: "Overly permissive ancillary uses",
        riskLevel: "high",
        originalText: "including ancillary functions reasonably related to such services even where not explicitly enumerated",
        suggestedText: "limited to the specific services described in the underlying services agreement",
        explanation: "This clause gives the Business Associate carte blanche to use PHI for undefined 'ancillary functions' without requiring Covered Entity approval. This is a significant risk — it undermines the minimum necessary standard under HIPAA and could expose the Covered Entity to liability for unauthorized uses. The fix narrows usage to explicitly agreed-upon services.",
        sectionId: "sec-permitted",
        paragraphId: "per-0",
      },
      {
        id: "issue-per-2",
        title: "Missing minimum necessary standard",
        riskLevel: "medium",
        originalText: "The Business Associate may use or disclose PHI as necessary to perform any and all services described in the underlying services agreement",
        suggestedText: "The Business Associate may use or disclose the minimum necessary PHI to perform the specific services described in the underlying services agreement",
        explanation: "HIPAA's minimum necessary rule (45 CFR § 164.502(b)) requires that uses and disclosures be limited to the minimum amount of PHI needed. The current language permits use of 'any and all' PHI, which conflicts with this standard.",
        sectionId: "sec-permitted",
        paragraphId: "per-0",
      },
    ],
    summary: "Permitted uses are dangerously broad — missing minimum necessary standard.",
  },

  "sec-obligations": {
    sectionId: "sec-obligations",
    riskLevel: "high",
    issues: [
      {
        id: "issue-obl-1",
        title: "Weak safeguard standard",
        riskLevel: "medium",
        originalText: "commercially reasonable efforts",
        suggestedText: "appropriate administrative, physical, and technical safeguards in accordance with 45 CFR Part 164, Subpart C",
        explanation: "'Commercially reasonable efforts' is a business standard, not a compliance standard. HIPAA requires 'appropriate' safeguards meeting specific regulatory requirements. Using the weaker standard could be argued as non-compliant and shifts risk to the Covered Entity.",
        sectionId: "sec-obligations",
        paragraphId: "obl-0",
      },
      {
        id: "issue-obl-2",
        title: "Missing disclosure notification deadline",
        riskLevel: "high",
        originalText: "The Business Associate shall report to the Covered Entity any use or disclosure of PHI not provided for by this Agreement of which it becomes aware",
        suggestedText: "The Business Associate shall report to the Covered Entity any use or disclosure of PHI not provided for by this Agreement of which it becomes aware, without unreasonable delay and in no event later than five (5) business days after discovery",
        explanation: "There is no deadline for reporting unauthorized disclosures. Without a specific timeline, the Business Associate could delay notification indefinitely, preventing the Covered Entity from meeting its own regulatory obligations. Five business days is a standard timeline in well-drafted BAAs.",
        sectionId: "sec-obligations",
        paragraphId: "obl-2",
      },
      {
        id: "issue-obl-3",
        title: "Ambiguous record access timeline",
        riskLevel: "medium",
        originalText: "within a reasonable timeframe",
        suggestedText: "within fifteen (15) business days",
        explanation: "'Reasonable timeframe' is subjective and unenforceable. HIPAA requires the Covered Entity to respond to access requests within 30 days (with a possible 30-day extension). The Business Associate needs a tighter deadline to give the Covered Entity enough time to process and forward the response.",
        sectionId: "sec-obligations",
        paragraphId: "obl-4",
      },
    ],
    summary: "Multiple gaps — weak safeguards, missing deadlines, ambiguous timelines.",
  },

  "sec-hipaa": {
    sectionId: "sec-hipaa",
    riskLevel: "medium",
    issues: [
      {
        id: "issue-hip-1",
        title: "No audit or certification mechanism",
        riskLevel: "medium",
        originalText: "represents and warrants that it is in compliance with all applicable provisions of HIPAA, the HITECH Act, and all related regulations",
        suggestedText: "represents and warrants that it is in compliance with all applicable provisions of HIPAA, the HITECH Act, and all related regulations, and shall, upon reasonable request and no more than once per calendar year, provide the Covered Entity with a written certification of compliance or permit the Covered Entity to conduct an audit of the Business Associate's HIPAA compliance practices",
        explanation: "A bare representation of compliance is unverifiable without an audit right. Adding an annual certification or audit mechanism gives the Covered Entity a practical tool to verify compliance, which is standard in enterprise BAAs and expected by OCR during investigations.",
        sectionId: "sec-hipaa",
        paragraphId: "hip-0",
      },
    ],
    summary: "Compliance representation lacks verification mechanism.",
  },

  "sec-term": {
    sectionId: "sec-term",
    riskLevel: "high",
    issues: [
      {
        id: "issue-trm-1",
        title: "Missing minimum cure period",
        riskLevel: "high",
        originalText: "remains uncured for a period determined at the sole discretion of the non-breaching party",
        suggestedText: "remains uncured for a period of thirty (30) days after written notice specifying the nature of the breach",
        explanation: "Giving the non-breaching party 'sole discretion' over the cure period effectively means no cure period at all — they could terminate immediately for any material breach. This is unusually one-sided. A 30-day cure window is standard and gives both parties a fair opportunity to remedy issues before termination.",
        sectionId: "sec-term",
        paragraphId: "trm-1",
      },
    ],
    summary: "Termination clause allows immediate termination without cure opportunity.",
  },

  "sec-breach": {
    sectionId: "sec-breach",
    riskLevel: "high",
    issues: [
      {
        id: "issue-brn-1",
        title: "Vague breach notification timeline",
        riskLevel: "high",
        originalText: "within a reasonable time after discovery of such Breach",
        suggestedText: "without unreasonable delay and in no event later than thirty (30) calendar days after discovery of such Breach",
        explanation: "'Reasonable time' is the most commonly litigated phrase in BAA disputes. Florida's Information Protection Act requires notification within 30 days of determination. Without a specific deadline here, the Business Associate could argue months of delay is 'reasonable,' leaving the Covered Entity unable to meet its own notification obligations.",
        sectionId: "sec-breach",
        paragraphId: "brn-0",
      },
      {
        id: "issue-brn-2",
        title: "No cost allocation for breach response",
        riskLevel: "medium",
        originalText: "The Business Associate shall take prompt corrective action to mitigate any harmful effects of the Breach and shall cooperate with the Covered Entity in investigating the Breach",
        suggestedText: "The Business Associate shall, at its own expense, take prompt corrective action to mitigate any harmful effects of the Breach and shall cooperate with the Covered Entity in investigating the Breach, including bearing the costs of individual notifications, credit monitoring services, and any regulatory fines attributable to the Business Associate's acts or omissions",
        explanation: "The current language requires the Business Associate to cooperate but does not address who bears the costs of breach response — notifications, credit monitoring, legal fees, regulatory fines. Without cost allocation, the Covered Entity may be left paying for a breach caused by the Business Associate's failure.",
        sectionId: "sec-breach",
        paragraphId: "brn-2",
      },
    ],
    summary: "Breach notification timeline is vague and costs are unallocated.",
  },

  "sec-misc": {
    sectionId: "sec-misc",
    riskLevel: "medium",
    issues: [
      {
        id: "issue-msc-1",
        title: "One-sided amendment clause",
        riskLevel: "medium",
        originalText: "only by a written instrument signed by the Covered Entity",
        suggestedText: "only by a written instrument signed by both parties, provided that amendments required to maintain compliance with changes in HIPAA, the HITECH Act, or related regulations shall become effective upon thirty (30) days' written notice from the Covered Entity",
        explanation: "The current clause lets the Covered Entity unilaterally amend the agreement. While HIPAA does require BAAs to be updated when regulations change, non-regulatory amendments should require mutual consent. The fix preserves the Covered Entity's ability to enforce compliance updates while requiring agreement on other changes.",
        sectionId: "sec-misc",
        paragraphId: "msc-1",
      },
    ],
    summary: "Amendment clause is one-sided — Business Associate has no say.",
  },
};

export const sectionAnalysisOrder: string[] = [
  "sec-recitals",
  "sec-applicability",
  "sec-definitions",
  "sec-permitted",
  "sec-obligations",
  "sec-hipaa",
  "sec-term",
  "sec-breach",
  "sec-misc",
];

export const ERROR_SECTION_ID = "sec-hipaa";
