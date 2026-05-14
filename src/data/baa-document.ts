import type { LegalDocument } from "@/types/document";

function flag(
  id: string,
  text: string,
  substring: string,
  severity: "warning" | "critical",
  label: string,
) {
  const start = text.indexOf(substring);
  if (start === -1) throw new Error(`Flag substring not found: "${substring}"`);
  return { id, startOffset: start, endOffset: start + substring.length, severity, label };
}

const recitals0 = `This Business Associate Agreement ("Agreement") is entered into by and between the University of Florida Board of Trustees ("Covered Entity") and Acme Health Solutions, Inc. ("Business Associate"), effective as of the date last signed below.`;

const recitals1 = `WHEREAS, the Covered Entity is a hybrid entity under the Health Insurance Portability and Accountability Act of 1996 ("HIPAA") and its implementing regulations, including the Standards for Privacy of Individually Identifiable Health Information and the Security Standards for the Protection of Electronic Protected Health Information (collectively, the "HIPAA Rules");`;

const recitals2 = `WHEREAS, in the course of performing services for the Covered Entity, the Business Associate may create, receive, maintain, or transmit Protected Health Information ("PHI") on behalf of the Covered Entity, and the parties wish to ensure compliance with applicable federal and state privacy and security requirements;`;

const applicability0 = `This Agreement applies to all Protected Health Information that the Business Associate creates, receives, maintains, or transmits on behalf of the Covered Entity, in any form or medium, whether oral, written, or electronic, regardless of the source or the manner of collection.`;

const applicability1 = `The obligations of the Business Associate under this Agreement shall apply to all activities performed by the Business Associate that involve the use or disclosure of PHI, including but not limited to data storage, data analysis, claims processing, quality assurance, billing, benefit management, and any other function or activity involving PHI.`;

const definitions0 = `"Protected Health Information" or "PHI" shall have the same meaning as the term "protected health information" in 45 CFR Section 160.103, limited to the information created, received, maintained, or transmitted by the Business Associate from or on behalf of the Covered Entity.`;

const definitions1 = `"Breach" shall have the meaning given in 45 CFR Section 164.402, and shall include any acquisition, access, use, or disclosure of PHI in a manner not permitted under this Agreement or the HIPAA Rules that compromises the security or privacy of the PHI.`;

const definitions2 = `"Security Incident" means any event that results in unauthorized access to or disruption of Business Associate's systems, networks, or data, whether or not such event results in a Breach of PHI.`;

const permitted0 = `The Business Associate may use or disclose PHI as necessary to perform any and all services described in the underlying services agreement between the parties, including ancillary functions reasonably related to such services even where not explicitly enumerated, provided that such use or disclosure would not violate the HIPAA Rules if done by the Covered Entity.`;

const permitted1 = `The Business Associate may use PHI for the proper management and administration of the Business Associate or to carry out the legal responsibilities of the Business Associate, provided that any disclosures for such purposes are required by law or the Business Associate obtains reasonable assurances from any third party to whom the information is disclosed.`;

const obligations0 = `The Business Associate agrees to use commercially reasonable efforts to safeguard PHI from any intentional or unintentional use or disclosure that is in violation of this Agreement or the HIPAA Rules.`;

const obligations1 = `The Business Associate shall implement administrative, physical, and technical safeguards that reasonably and appropriately protect the confidentiality, integrity, and availability of electronic PHI that it creates, receives, maintains, or transmits on behalf of the Covered Entity, in accordance with 45 CFR Part 164, Subpart C.`;

const obligations2 = `The Business Associate shall report to the Covered Entity any use or disclosure of PHI not provided for by this Agreement of which it becomes aware, including any Breach of unsecured PHI as required by 45 CFR Section 164.410.`;

const obligations3 = `The Business Associate shall ensure that any agent, including a subcontractor, to whom it provides PHI received from, or created or received by the Business Associate on behalf of, the Covered Entity agrees to the same restrictions and conditions that apply through this Agreement to the Business Associate with respect to such information.`;

const obligations4 = `The Business Associate shall make available PHI in a designated record set to the Covered Entity as necessary to satisfy the Covered Entity's obligations under 45 CFR Section 164.524, within a reasonable timeframe following a written request.`;

const obligations5 = `The Business Associate shall make its internal practices, books, and records relating to the use and disclosure of PHI available to the Secretary of the U.S. Department of Health and Human Services for purposes of determining the Covered Entity's compliance with the HIPAA Rules.`;

const hipaa0 = `The Business Associate represents and warrants that it is in compliance with all applicable provisions of HIPAA, the HITECH Act, and all related regulations, and shall maintain such compliance throughout the term of this Agreement.`;

const hipaa1 = `The Business Associate shall cooperate with the Covered Entity in the event of an investigation or compliance review by the U.S. Department of Health and Human Services, the Office for Civil Rights, or any other federal or state regulatory authority.`;

const hipaa2 = `To the extent the Business Associate is to carry out one or more of the Covered Entity's obligations under the HIPAA Rules, the Business Associate shall comply with the requirements of the HIPAA Rules that apply to the Covered Entity in the performance of such obligations.`;

const term0 = `This Agreement shall become effective on the date first written above and shall remain in effect for a period of three (3) years, unless terminated earlier in accordance with this Section.`;

const term1 = `Either party may terminate this Agreement immediately upon written notice to the other party if the other party materially breaches any provision of this Agreement and such breach is not susceptible to cure, or if susceptible to cure, remains uncured for a period determined at the sole discretion of the non-breaching party.`;

const term2 = `Upon termination of this Agreement for any reason, the Business Associate shall return or destroy all PHI received from the Covered Entity, or created or received by the Business Associate on behalf of the Covered Entity, that the Business Associate still maintains in any form. The Business Associate shall retain no copies of the PHI.`;

const breach0 = `The Business Associate shall notify the Covered Entity of any Breach of unsecured PHI within a reasonable time after discovery of such Breach, and in no event later than is required to enable the Covered Entity to comply with its notification obligations under applicable law.`;

const breach1 = `Such notification shall include, to the extent possible, the identification of each individual whose unsecured PHI has been, or is reasonably believed to have been, accessed, acquired, used, or disclosed during the Breach, as well as a description of the nature of the Breach including the types of PHI involved.`;

const breach2 = `The Business Associate shall take prompt corrective action to mitigate any harmful effects of the Breach and shall cooperate with the Covered Entity in investigating the Breach and in meeting the Covered Entity's obligations for notification under the HIPAA Rules and applicable state breach notification laws, including the Florida Information Protection Act of 2014.`;

const misc0 = `This Agreement shall be governed by and construed in accordance with the laws of the State of Florida, without regard to its conflict of laws provisions.`;

const misc1 = `This Agreement may be amended or modified only by a written instrument signed by the Covered Entity. The Business Associate acknowledges that the Covered Entity may amend this Agreement as necessary to comply with changes in HIPAA, the HITECH Act, or related regulations, and such amendments shall become effective upon written notice to the Business Associate.`;

const misc2 = `If any provision of this Agreement is held to be invalid or unenforceable, the remaining provisions shall continue in full force and effect. This Agreement constitutes the entire agreement between the parties with respect to the subject matter hereof and supersedes all prior agreements and understandings, whether written or oral, relating to such subject matter.`;

export const baaDocument: LegalDocument = {
  id: "baa-001",
  title: "Business Associate Agreement",
  parties: "University of Florida Board of Trustees & Acme Health Solutions, Inc.",
  effectiveDate: "January 15, 2026",
  sections: [
    {
      id: "sec-recitals",
      number: null,
      title: "RECITALS",
      paragraphs: [
        { id: "rec-0", text: recitals0, flags: [] },
        { id: "rec-1", text: recitals1, flags: [] },
        {
          id: "rec-2",
          text: recitals2,
          flags: [
            flag("flag-rec-1", recitals2, "ensure compliance with applicable federal and state privacy and security requirements", "warning", "Vague compliance language — no specific standards referenced"),
          ],
        },
      ],
      subsections: [],
    },
    {
      id: "sec-applicability",
      number: 1,
      title: "APPLICABILITY",
      paragraphs: [
        {
          id: "app-0",
          text: applicability0,
          flags: [
            flag("flag-app-1", applicability0, "in any form or medium, whether oral, written, or electronic, regardless of the source or the manner of collection", "warning", "Overly broad scope — may capture information outside the intended relationship"),
          ],
        },
        { id: "app-1", text: applicability1, flags: [] },
      ],
      subsections: [],
    },
    {
      id: "sec-definitions",
      number: 2,
      title: "DEFINED TERMS",
      paragraphs: [
        { id: "def-0", text: definitions0, flags: [] },
        { id: "def-1", text: definitions1, flags: [] },
        {
          id: "def-2",
          text: definitions2,
          flags: [
            flag("flag-def-1", definitions2, "any event that results in unauthorized access to or disruption of Business Associate's systems, networks, or data, whether or not such event results in a Breach of PHI", "warning", "Incomplete definition — does not specify severity threshold or reporting criteria"),
          ],
        },
      ],
      subsections: [],
    },
    {
      id: "sec-permitted",
      number: 3,
      title: "PERMITTED USES AND DISCLOSURES BY BUSINESS ASSOCIATE",
      paragraphs: [
        {
          id: "per-0",
          text: permitted0,
          flags: [
            flag("flag-per-1", permitted0, "including ancillary functions reasonably related to such services even where not explicitly enumerated", "critical", "Overly permissive — allows undefined ancillary uses without Covered Entity approval"),
          ],
        },
        { id: "per-1", text: permitted1, flags: [] },
      ],
      subsections: [],
    },
    {
      id: "sec-obligations",
      number: 4,
      title: "OBLIGATIONS AND ACTIVITIES OF BUSINESS ASSOCIATE",
      paragraphs: [],
      subsections: [
        {
          id: "sub-obl-a",
          label: "(a)",
          paragraphs: [
            {
              id: "obl-0",
              text: obligations0,
              flags: [
                flag("flag-obl-1", obligations0, "commercially reasonable efforts", "warning", 'Weak standard — "commercially reasonable efforts" is less protective than "best efforts" or an absolute obligation'),
              ],
            },
          ],
        },
        {
          id: "sub-obl-b",
          label: "(b)",
          paragraphs: [{ id: "obl-1", text: obligations1, flags: [] }],
        },
        {
          id: "sub-obl-c",
          label: "(c)",
          paragraphs: [
            {
              id: "obl-2",
              text: obligations2,
              flags: [
                flag("flag-obl-2", obligations2, "any use or disclosure of PHI not provided for by this Agreement of which it becomes aware", "critical", "Missing notification timeline — no deadline specified for reporting unauthorized disclosures"),
              ],
            },
          ],
        },
        {
          id: "sub-obl-d",
          label: "(d)",
          paragraphs: [{ id: "obl-3", text: obligations3, flags: [] }],
        },
        {
          id: "sub-obl-e",
          label: "(e)",
          paragraphs: [
            {
              id: "obl-4",
              text: obligations4,
              flags: [
                flag("flag-obl-3", obligations4, "within a reasonable timeframe", "warning", "Ambiguous timeline — should specify a maximum number of business days"),
              ],
            },
          ],
        },
        {
          id: "sub-obl-f",
          label: "(f)",
          paragraphs: [{ id: "obl-5", text: obligations5, flags: [] }],
        },
      ],
    },
    {
      id: "sec-hipaa",
      number: 5,
      title: "HIPAA COMPLIANCE",
      paragraphs: [
        {
          id: "hip-0",
          text: hipaa0,
          flags: [
            flag("flag-hip-1", hipaa0, "represents and warrants that it is in compliance with all applicable provisions", "warning", "Vague compliance representation — no audit or certification mechanism specified"),
          ],
        },
        { id: "hip-1", text: hipaa1, flags: [] },
        { id: "hip-2", text: hipaa2, flags: [] },
      ],
      subsections: [],
    },
    {
      id: "sec-term",
      number: 6,
      title: "TERM AND TERMINATION",
      paragraphs: [
        { id: "trm-0", text: term0, flags: [] },
        {
          id: "trm-1",
          text: term1,
          flags: [
            flag("flag-trm-1", term1, "remains uncured for a period determined at the sole discretion of the non-breaching party", "critical", "Missing cure period — no minimum cure window; termination could be immediate without opportunity to remedy"),
          ],
        },
        { id: "trm-2", text: term2, flags: [] },
      ],
      subsections: [],
    },
    {
      id: "sec-breach",
      number: 7,
      title: "BREACH NOTIFICATION",
      paragraphs: [
        {
          id: "brn-0",
          text: breach0,
          flags: [
            flag("flag-brn-1", breach0, "within a reasonable time after discovery of such Breach", "critical", 'Vague breach notification timeline — "reasonable time" should be replaced with a specific deadline (e.g., 30 days)'),
          ],
        },
        { id: "brn-1", text: breach1, flags: [] },
        { id: "brn-2", text: breach2, flags: [] },
      ],
      subsections: [],
    },
    {
      id: "sec-misc",
      number: 8,
      title: "MISCELLANEOUS",
      paragraphs: [
        { id: "msc-0", text: misc0, flags: [] },
        {
          id: "msc-1",
          text: misc1,
          flags: [
            flag("flag-msc-1", misc1, "only by a written instrument signed by the Covered Entity", "warning", "One-sided amendment clause — Business Associate has no right to negotiate or approve changes"),
          ],
        },
        { id: "msc-2", text: misc2, flags: [] },
      ],
      subsections: [],
    },
  ],
};
