import type {
  ChatMessage,
  Prompt,
  RedlineChange,
  OneLineSection,
} from "@/types/composer";

export const prompts: Prompt[] = [
  { id: "p-1", label: "BAA delete terms review" },
  { id: "p-2", label: "HIPAA BAA review" },
  {
    id: "p-3",
    label:
      "Revise the Business Associate Agreement to align with pharmaceutical market standards and ensure com...",
  },
  { id: "p-4", label: "HIPAA BAA Review (as client)" },
];

export const mockConversation: ChatMessage[] = [
  {
    id: "msg-1",
    role: "user",
    content:
      "What are the compliance obligations in this BAA and how do they compare to standard HIPAA requirements?",
  },
  {
    id: "msg-2",
    role: "assistant",
    content: `Compliance Obligations

The contract's obligations to HIPAA only referenced the Security Breach Law and "other applicable law" and limited the "no action causing University violations." This is market-standard BA scope and addresses obligations to undefined state laws and non-PHI compliance issues.

Key findings:

• HIPAA's "to," "by the HIPAA rules focus on maintaining PHI security and found compliance was consistent across the board, including all provisions focused on internal compliance requiring good-faith efforts, so...

• We agreement flow is such a HIPAA "hazard rule it but by using the term "best efforts" to describe...

• An agreement likely should require BA to protect PHI with the same standard of care the BA uses for its own confidential information, at...`,
  },
  {
    id: "msg-3",
    role: "user",
    content: "revise this clause to be more favorable to the vendor",
  },
];

export const mockRedlines: RedlineChange[] = [
  {
    id: "rl-1",
    original:
      "Business Associate agrees to comply with HIPAA, the Florida Security Breach Law, and other applicable law",
    revised:
      "Business Associate agrees to comply with HIPAA, the Florida Security Breach Law, and other applicable law, including federal, state, and local privacy regulations applicable to pharmaceutical market operations",
    status: "pending",
  },
  {
    id: "rl-2",
    original:
      "Business Associate shall use appropriate administrative, physical, and technical safeguards",
    revised:
      "Business Associate shall use commercially reasonable administrative, physical, and technical safeguards consistent with industry standards for pharmaceutical data handling",
    status: "pending",
  },
  {
    id: "rl-3",
    original:
      "shall report to the Covered Entity any security incident of which it becomes aware",
    revised:
      "shall report to the Covered Entity any material security incident of which it becomes aware within five (5) business days of discovery",
    status: "pending",
  },
];

export const oneLineSections: OneLineSection[] = [
  {
    title: "Summary",
    content:
      'This BAA significantly exceeds HIPAA requirements by covering non-PHI data, state breach laws, unlimited audits, and one-sided termination—narrow to HIPAA-only obligations for pharmaceutical market alignment.',
  },
  {
    title: "Further Compliance",
    content:
      'OH: KBN¹, and Sci M.L.I., in Massachusetts General Laws, and Florida. This creates confusion about which state law applies. For a pharmaceutical company, standardize to the applicable jurisdiction.',
  },
  {
    title: "Scope Creep Beyond HIPAA",
    content:
      'The BAA covers Protected Health Information, Personal Information (under Florida Security Breach Law), and Other Confidential Information. Pharmaceutical market standard: limit BAA to PHI only. Other Confidential Information includes sweeping categories like "non-public information about the University"—essentially anything, from research data to administrative files to enrollment data, is "confidential" → risks a general confidentiality agreement masquerading as a BAA.',
  },
  {
    title: "Unlimited Audit Rights",
    content:
      "Business Associate agrees to allow the University to audit its processes and premises at any time, upon reasonable prior notice. → HIPAA only requires access to PHI, not the covered entity. Pharmaceutical standard: limit to PHI.",
  },
];

export const redlineStats = {
  words: 247,
  trackedChanges: 8,
  comments: 0,
};
