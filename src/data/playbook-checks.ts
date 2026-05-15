import type { Playbook, PlaybookCheck } from "@/types/playbook";

export const playbooks: Playbook[] = [
  { id: "pb-baa", name: "Business associate agreement" },
  { id: "pb-contracts", name: "Acme's Contracts Policy" },
  { id: "pb-upa", name: "Acme's UPA" },
  { id: "pb-nda", name: "Acme's General NDA Playbook" },
];

export const baaChecks: PlaybookCheck[] = [
  {
    id: "chk-01",
    label: "Underlying Agreement",
    status: "pass",
    flagId: null,
    issue: "",
    suggestedFix: "",
    reasoning: "",
  },
  {
    id: "chk-02",
    label: "Assignment of BAA",
    status: "pass",
    flagId: null,
    issue: "",
    suggestedFix: "",
    reasoning: "",
  },
  {
    id: "chk-03",
    label: "Audit of Subcontractors",
    status: "pass",
    flagId: null,
    issue: "",
    suggestedFix: "",
    reasoning: "",
  },
  {
    id: "chk-04",
    label: "BA Appropriate Safeguards",
    status: "warning",
    flagId: "flag-obl-1",
    issue:
      'The agreement uses the standard "commercially reasonable efforts" to describe the Business Associate\'s obligation to safeguard PHI. This is a weaker standard than "best efforts" or an absolute obligation, and may not provide sufficient protection in the event of a breach.',
    suggestedFix:
      'Replace "commercially reasonable efforts" with "best efforts" or remove the qualifier entirely to impose an absolute obligation on the Business Associate to safeguard PHI.',
    reasoning:
      "We flagged this safeguard provision because the qualified standard could be exploited by a Business Associate seeking to minimize its compliance investment, leaving PHI vulnerable to inadequate protections.",
  },
  {
    id: "chk-05",
    label: "BA Use of De-identified Data",
    status: "pass",
    flagId: null,
    issue: "",
    suggestedFix: "",
    reasoning: "",
  },
  {
    id: "chk-06",
    label: "HIPAA Compliance Scope",
    status: "warning",
    flagId: "flag-rec-1",
    issue:
      "The recitals reference compliance with \"applicable federal and state privacy and security requirements\" without specifying which standards apply. This vague language could lead to disputes about the scope of compliance obligations.",
    suggestedFix:
      'Replace the vague compliance language with specific references to HIPAA, the HITECH Act, and applicable state laws such as the Florida Information Protection Act of 2014.',
    reasoning:
      "We identified this vague language because without explicit statutory references, either party could argue a narrower interpretation of compliance obligations, creating enforcement gaps.",
  },
  {
    id: "chk-07",
    label: "Definition — Breach of PHI",
    status: "warning",
    flagId: "flag-def-1",
    issue:
      'The definition of "Security Incident" is overly broad and does not specify a severity threshold or reporting criteria. This could result in over-reporting of minor events or ambiguity about which incidents require notification.',
    suggestedFix:
      "Add a severity threshold to the Security Incident definition, specifying that only incidents that compromise the confidentiality, integrity, or availability of PHI require reporting.",
    reasoning:
      "An overly broad definition creates operational burden through over-reporting while simultaneously making it harder to identify which incidents truly warrant action.",
  },
  {
    id: "chk-08",
    label: "Permitted Uses: Data Minimization",
    status: "fail",
    flagId: "flag-per-1",
    issue:
      'The permitted uses clause allows the Business Associate to perform "ancillary functions reasonably related to such services even where not explicitly enumerated." This is overly permissive and could allow the Business Associate to use PHI for purposes not anticipated or approved by the Covered Entity.',
    suggestedFix:
      "Remove the ancillary functions language and require that all permitted uses be explicitly enumerated in the underlying services agreement or approved in writing by the Covered Entity.",
    reasoning:
      "This open-ended language effectively defeats the purpose of data minimization requirements under HIPAA, as it creates a blanket authorization for unanticipated uses of PHI.",
  },
  {
    id: "chk-09",
    label: "BA Subcontractor Use",
    status: "pass",
    flagId: null,
    issue: "",
    suggestedFix: "",
    reasoning: "",
  },
  {
    id: "chk-10",
    label: "Third Parties as Contracting Entities",
    status: "pass",
    flagId: null,
    issue: "",
    suggestedFix: "",
    reasoning: "",
  },
  {
    id: "chk-11",
    label: "Customer Policies",
    status: "pass",
    flagId: null,
    issue: "",
    suggestedFix: "",
    reasoning: "",
  },
  {
    id: "chk-12",
    label: "Confidential Information Definition",
    status: "pass",
    flagId: null,
    issue: "",
    suggestedFix: "",
    reasoning: "",
  },
  {
    id: "chk-13",
    label: "HIPAA Permitted Uses and Disclosures",
    status: "warning",
    flagId: "flag-hip-1",
    issue:
      "The Business Associate's compliance representation lacks specificity — it warrants compliance with \"all applicable provisions\" without identifying any audit or certification mechanism to verify ongoing compliance.",
    suggestedFix:
      "Require the Business Associate to provide annual HIPAA compliance certifications or submit to periodic audits by the Covered Entity or a qualified third party.",
    reasoning:
      "Without a verification mechanism, compliance representations are essentially self-certified and unenforceable, creating significant regulatory risk for the Covered Entity.",
  },
  {
    id: "chk-14",
    label: "Applicability Scope",
    status: "warning",
    flagId: "flag-app-1",
    issue:
      'The applicability clause covers PHI "in any form or medium, whether oral, written, or electronic, regardless of the source or the manner of collection." This overly broad scope may capture information outside the intended business relationship.',
    suggestedFix:
      "Narrow the scope to PHI created, received, maintained, or transmitted specifically in connection with the services described in the underlying agreement.",
    reasoning:
      "An overbroad scope clause can inadvertently make the Covered Entity responsible for PHI it never intended to share, and exposes both parties to liability for data outside the intended relationship.",
  },
  {
    id: "chk-15",
    label: "Breach Notification Timeline",
    status: "fail",
    flagId: "flag-brn-1",
    issue:
      'The breach notification clause requires notification "within a reasonable time after discovery," which is vague and may not satisfy regulatory requirements. HIPAA requires notification without unreasonable delay and no later than 60 days after discovery.',
    suggestedFix:
      'Replace "within a reasonable time" with a specific deadline, such as "within thirty (30) calendar days of discovery," to ensure compliance with HIPAA notification requirements.',
    reasoning:
      "Vague notification timelines create legal exposure because HIPAA imposes strict deadlines. A subjective standard like \"reasonable time\" invites disputes and may result in regulatory penalties.",
  },
  {
    id: "chk-16",
    label: "Unauthorized Disclosure Reporting",
    status: "fail",
    flagId: "flag-obl-2",
    issue:
      "The agreement requires the Business Associate to report unauthorized disclosures but does not specify a timeline for such reports. Without a deadline, the Covered Entity may not learn of incidents in time to meet its own regulatory obligations.",
    suggestedFix:
      "Add a specific reporting deadline, such as within five (5) business days of discovery, for any unauthorized use or disclosure of PHI.",
    reasoning:
      "The absence of a reporting deadline effectively nullifies the reporting obligation, as the Business Associate could delay indefinitely without being in technical breach of the agreement.",
  },
  {
    id: "chk-17",
    label: "PHI Access Timeframe",
    status: "warning",
    flagId: "flag-obl-3",
    issue:
      'The agreement requires the Business Associate to make PHI available "within a reasonable timeframe" without specifying a maximum number of days. This ambiguity could delay the Covered Entity\'s ability to respond to individual access requests.',
    suggestedFix:
      'Replace "within a reasonable timeframe" with "within fifteen (15) business days of receiving a written request" to align with HIPAA\'s access requirements.',
    reasoning:
      "HIPAA requires Covered Entities to respond to access requests within 30 days. Without a specific BA deadline, the Covered Entity risks missing its own regulatory deadlines.",
  },
  {
    id: "chk-18",
    label: "Cure Period for Termination",
    status: "fail",
    flagId: "flag-trm-1",
    issue:
      'The termination clause allows the non-breaching party to determine the cure period "at the sole discretion of the non-breaching party." This effectively eliminates any guaranteed opportunity for the breaching party to remedy a material breach before termination.',
    suggestedFix:
      "Specify a minimum cure period of thirty (30) days for material breaches that are susceptible to cure, providing the breaching party a reasonable opportunity to remedy the issue.",
    reasoning:
      "Unlimited discretion over cure periods creates an imbalanced contractual relationship and could be challenged as unconscionable in certain jurisdictions.",
  },
  {
    id: "chk-19",
    label: "One-Sided Amendment Clause",
    status: "warning",
    flagId: "flag-msc-1",
    issue:
      'The amendment clause requires changes to be made "only by a written instrument signed by the Covered Entity," giving the Business Associate no right to negotiate or approve amendments. This one-sided provision could allow the Covered Entity to impose unfavorable terms unilaterally.',
    suggestedFix:
      "Require amendments to be signed by both parties, or at minimum require the Covered Entity to provide advance written notice and a reasonable comment period before amendments take effect.",
    reasoning:
      "Unilateral amendment authority undermines the mutual consent principle fundamental to contract law and may be unenforceable in jurisdictions requiring bilateral agreement for material changes.",
  },
  {
    id: "chk-20",
    label: "Offshoring of PHI",
    status: "pass",
    flagId: null,
    issue: "",
    suggestedFix: "",
    reasoning: "",
  },
];
