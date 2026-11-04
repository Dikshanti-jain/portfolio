export interface ProjectMetric {
  label: string;
  value: string;
  context: string;
}

export interface FrictionPoint {
  id: string;
  coordinate: { x: number; y: number }; // Percentage from top-left (0-100)
  title: string;
  description: string;
  severity: "high" | "medium" | "low";
}

export interface CraftSpec {
  id: string;
  coordinate: { x: number; y: number };
  title: string;
  specification: string;
  tokenRef: string;
}

export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  role: string;
  team: string;
  timeline: string;
  status: string;
  tagline: string;
  summary: string;
  client: string;
  category: "Product Design" | "Systems UX" | "Design Engineering";
  tags: string[];
  links: {
    liveDemo?: string;
    github?: string;
    figmaSpecs?: string;
  };
  metrics: ProjectMetric[];
  problemStatement: {
    overview: string;
    frictionPoints: string[];
  };
  uxHypothesis: {
    premise: string;
    architecturalSolution: string;
  };
  wireframeComparison: {
    loFiTitle: string;
    loFiDescription: string;
    loFiImage: string;
    frictionPoints: FrictionPoint[];
    hiFiTitle: string;
    hiFiDescription: string;
    hiFiImage: string;
    craftSpecs: CraftSpec[];
  };
  systemArchitecture: {
    tokens: string[];
    components: string[];
    framerPhysics: string;
  };
  resultsAndImpact: string[];
}

export interface AIPipelineStep {
  stepNumber: string;
  title: string;
  subtitle: string;
  promptExample: string;
  aiRawOutput: string;
  humanFilter: string;
  productionArtifact: string;
}

export interface CredentialBadge {
  badgeName: string;
  issuer: string;
  description: string;
}

export interface CandidateProfile {
  name: string;
  role: string;
  subRole: string;
  location: {
    city: string;
    state: string;
    country: string;
    coordinates: string;
    timezone: string;
    availability: string;
  };
  education: {
    degree: string;
    specialization: string;
    status: string;
  };
  unfairAdvantage: string;
  heroHeadline: {
    lead: string;
    craftItalic: string;
    codeLead: string;
    codeItalic: string;
    tail: string;
  };
  heroBio: string;
  socials: {
    email: string;
    linkedin: string;
    github: string;
    resumePdfUrl: string;
  };
  credentials: CredentialBadge[];
}
