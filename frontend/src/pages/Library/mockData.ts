export interface LibrarySection {
  id: string;
  title: string;
  subtitle?: string;
  isExpanded: boolean;
  items: LibraryItem[];
}

export interface LibraryItem {
  id: string;
  title: string;
  description?: string;
}

export const libraryMockData: LibrarySection[] = [
  {
    id: "miwf-foundation",
    title: "About The MIWF Foundation for Sustainable Development",
    subtitle: "Mission and Vision\nCore Pillars Aligned with SDGs",
    isExpanded: false,
    items: [
      {
        id: "mission-vision",
        title: "Mission and Vision",
        description: "Comprehensive overview of MIWF's mission statement and long-term vision for sustainable development globally."
      },
      {
        id: "core-pillars",
        title: "Core Pillars Aligned with SDGs",
        description: "Detailed explanation of how MIWF's core pillars align with the United Nations Sustainable Development Goals."
      }
    ]
  },
  {
    id: "impact-framework",
    title: "Impact Framework and Methodology",
    subtitle: "Objectives and Stakeholders\nData Collection Approach\nAlignment with UN Sustainable Development Goals",
    isExpanded: false,
    items: [
      {
        id: "objectives-stakeholders",
        title: "Objectives and Stakeholders",
        description: "Clear definition of MIWF's objectives and identification of key stakeholders in the sustainable development ecosystem."
      },
      {
        id: "data-collection",
        title: "Data Collection Approach",
        description: "Methodology for collecting, analyzing, and interpreting data to measure impact and progress."
      },
      {
        id: "un-sdg-alignment",
        title: "Alignment with UN Sustainable Development Goals",
        description: "Comprehensive mapping of MIWF initiatives to specific UN SDG targets and indicators."
      }
    ]
  },
  {
    id: "accelerator-program",
    title: "The Accelerator Program (TAP)",
    subtitle: "Program Overview\nMarket Systems Approach\nTraining Modules and Technical Assistance",
    isExpanded: false,
    items: [
      {
        id: "program-overview",
        title: "Program Overview",
        description: "Complete overview of The Accelerator Program including goals, structure, and expected outcomes."
      },
      {
        id: "market-systems",
        title: "Market Systems Approach",
        description: "Detailed explanation of the market systems development approach used in TAP implementation."
      },
      {
        id: "training-modules",
        title: "Training Modules and Technical Assistance",
        description: "Comprehensive catalog of training modules and technical assistance services provided through TAP."
      }
    ]
  },
  {
    id: "investment-challenges",
    title: "Investment Business Challenges",
    subtitle: "Systemic Barriers for Female Fund Managers\nEcosystem Challenges\nSpecific Challenges Identified",
    isExpanded: false,
    items: [
      {
        id: "systemic-barriers",
        title: "Systemic Barriers for Female Fund Managers",
        description: "Analysis of structural and cultural barriers that female fund managers face in the investment ecosystem."
      },
      {
        id: "ecosystem-challenges",
        title: "Ecosystem Challenges",
        description: "Comprehensive overview of challenges within the broader investment ecosystem affecting sustainability."
      },
      {
        id: "specific-challenges",
        title: "Specific Challenges Identified",
        description: "Detailed documentation of specific challenges identified through research and stakeholder engagement."
      }
    ]
  },
  {
    id: "key-impact",
    title: "Key Impact Delivered by MIWF",
    subtitle: "Improved Gender Equality\nIncreased Access to Funding\nEmpowering Female-Led SMEs",
    isExpanded: false,
    items: [
      {
        id: "gender-equality",
        title: "Improved Gender Equality",
        description: "Measurable improvements in gender equality across MIWF's portfolio companies and partner organizations."
      },
      {
        id: "access-funding",
        title: "Increased Access to Funding",
        description: "Statistics and case studies showing increased access to funding for female entrepreneurs and fund managers."
      },
      {
        id: "empowering-smes",
        title: "Empowering Female-Led SMEs",
        description: "Success stories and impact metrics for female-led small and medium enterprises supported by MIWF."
      }
    ]
  },
  {
    id: "fund-management",
    title: "Fund Management Insights: The TRICKS Framework",
    subtitle: "Team Ownership\nRight-Sized Funds\nInvestment Processes\nControl Environment\nKey-Man Risk Mitigation\nService Orientation",
    isExpanded: false,
    items: [
      {
        id: "team-ownership",
        title: "Team Ownership",
        description: "Best practices for establishing clear team ownership structures and responsibilities in fund management."
      },
      {
        id: "right-sized-funds",
        title: "Right-Sized Funds",
        description: "Guidelines for determining optimal fund sizes based on market conditions and investment strategy."
      },
      {
        id: "investment-processes",
        title: "Investment Processes",
        description: "Comprehensive framework for developing robust investment processes and decision-making protocols."
      },
      {
        id: "control-environment",
        title: "Control Environment",
        description: "Establishing effective control environments for risk management and regulatory compliance."
      },
      {
        id: "key-man-risk",
        title: "Key-Man Risk Mitigation",
        description: "Strategies for identifying and mitigating key-person risks in fund management operations."
      },
      {
        id: "service-orientation",
        title: "Service Orientation",
        description: "Framework for maintaining service-oriented approach in fund management and investor relations."
      }
    ]
  },
  {
    id: "case-studies",
    title: "Case Studies on Fund Managers",
    subtitle: "Success Stories and Outcomes",
    isExpanded: false,
    items: [
      {
        id: "success-stories",
        title: "Success Stories and Outcomes",
        description: "Detailed case studies showcasing successful fund managers and their achievements through MIWF support."
      }
    ]
  },
  {
    id: "road-ahead",
    title: "The Road Ahead: Scaling for Greater Impact",
    subtitle: "Future Vision\nStrategic Focus Areas\nImplementation Plan",
    isExpanded: false,
    items: [
      {
        id: "future-vision",
        title: "Future Vision",
        description: "MIWF's long-term vision for scaling impact and expanding sustainable development initiatives."
      },
      {
        id: "strategic-focus",
        title: "Strategic Focus Areas",
        description: "Key strategic areas where MIWF will focus efforts for maximum impact in coming years."
      },
      {
        id: "implementation-plan",
        title: "Implementation Plan",
        description: "Detailed roadmap and timeline for implementing strategic initiatives and scaling operations."
      }
    ]
  },
  {
    id: "appendices",
    title: "Appendices",
    subtitle: "About MIWF Impact Strategy\nPartner Organizations\nAbout the 2X Challenge\nMIWF Theory of Change",
    isExpanded: false,
    items: [
      {
        id: "impact-strategy",
        title: "About MIWF Impact Strategy",
        description: "Comprehensive documentation of MIWF's impact measurement and management strategy."
      },
      {
        id: "partner-organizations",
        title: "Partner Organizations",
        description: "Directory and profiles of key partner organizations working with MIWF on sustainable development."
      },
      {
        id: "2x-challenge",
        title: "About the 2X Challenge",
        description: "Information about the 2X Challenge initiative and MIWF's participation and contributions."
      },
      {
        id: "theory-of-change",
        title: "MIWF Theory of Change",
        description: "Detailed theory of change framework outlining how MIWF creates sustainable impact."
      }
    ]
  }
];

// Topics for the dropdown filter
export const topicsData = [
  { value: "all", label: "All" },
  { value: "sustainable-development", label: "Sustainable Development" },
  { value: "fund-management", label: "Fund Management" },
  { value: "gender-equality", label: "Gender Equality" },
  { value: "investment", label: "Investment" },
  { value: "market-systems", label: "Market Systems" },
  { value: "training", label: "Training & Development" },
  { value: "case-studies", label: "Case Studies" },
  { value: "strategy", label: "Strategy & Planning" }
];