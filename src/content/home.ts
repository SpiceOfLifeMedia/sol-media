export const capabilities = [
  {
    id: "brand",
    number: "01",
    name: "Brand",
    problem:
      "Your business has moved on, but your positioning has not—so buyers underestimate the value.",
    outcome:
      "A clear position, a message that holds from first impression through the sales conversation, and an identity your team can use consistently.",
    inclusions: [
      "Strategy",
      "Positioning",
      "Audience",
      "Messaging",
      "Naming support",
      "Visual identity",
      "Brand systems",
      "Rebrands",
    ],
  },
  {
    id: "web",
    number: "02",
    name: "Web",
    problem:
      "Your website looks dated, explains the business poorly or attracts the wrong enquiries.",
    outcome:
      "A fast, accessible flagship website built to convert qualified demand—and simple for your team to update and measure.",
    inclusions: [
      "Strategy",
      "Information architecture",
      "UX/UI",
      "Copy direction",
      "Motion",
      "Builds & rebuilds",
      "Responsive development",
      "Technical SEO",
      "Analytics",
      "Conversion foundations",
    ],
  },
  {
    id: "content",
    number: "03",
    name: "Content",
    problem:
      "Your business has something worth saying, but no repeatable system for turning it into consistent campaigns and content.",
    outcome:
      "A content system built around strong ideas, clear creative direction and reliable production—including human-directed AI imagery and video where it improves the work.",
    inclusions: [
      "Campaign concepts",
      "Creative direction",
      "Copy",
      "Production",
      "Social systems",
      "AI image & video production",
    ],
  },
  {
    id: "growth",
    number: "04",
    name: "Growth",
    problem:
      "Traffic and enquiries rise and fall, but no one can clearly explain why.",
    outcome:
      "Search, acquisition and conversion activity tied to agreed measures, with reporting that shows what changed, why it matters and what happens next.",
    inclusions: [
      "Distribution",
      "SEO",
      "Search",
      "Acquisition",
      "Analytics",
      "Testing",
      "Conversion optimisation",
      "Measurement",
      "Reporting",
    ],
  },
] as const;

export const disciplines = [
  ["Brand", "What you stand for, said sharply."],
  ["Web", "The asset that proves it and converts."],
  ["Content", "Enough of it, on brand, on schedule."],
  ["Growth", "Compounding demand you can measure."],
] as const;

export const process = [
  {
    number: "01",
    name: "Diagnose",
    description:
      "Before design begins, we identify the constraint holding the business back and recommend where to start.",
  },
  {
    number: "02",
    name: "Define",
    description:
      "We settle the position, message, success measures and scope in writing, so every later decision follows one clear brief.",
  },
  {
    number: "03",
    name: "Design and build",
    description:
      "We design and deliver the agreed work, reviewing it at named checkpoints rather than through open-ended feedback rounds.",
  },
  {
    number: "04",
    name: "Launch and grow",
    description:
      "We launch, measure against agreed goals and improve search, content and conversion on a defined cycle.",
  },
] as const;

export const commitments = [
  "Fixed scopes and realistic timelines, written down before work starts.",
  "Proactive updates—you hear from us before you have to ask.",
  "The reasoning arrives before the decision is requested.",
  "Direct access to the people doing the work, not an account layer.",
  "Fewer meetings. Written decisions you can forward internally.",
  "Aftercare included, with a named window for post-launch fixes.",
] as const;

export const serviceOptions = [
  "Brand",
  "Web",
  "Content",
  "Growth",
  "Connected programme",
] as const;
