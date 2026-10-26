export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  features: string[];
  challenges: string;
  technologies: string[];
  featured?: boolean;
  status: string;
  github?: string;
  demo?: string;
}

export const projects: Project[] = [
  {
    id: "vyra",
    title: "VYRA Fitness",
    category: "Mobile Application",
    description:
      "A comprehensive fitness platform that combines workout tracking, nutrition logging, hydration monitoring, sleep analysis, step counting, intermittent fasting timers, and progress visualization — all in one mobile experience built with React Native.",
    longDescription:
      "VYRA Fitness was born from the need to consolidate multiple fitness tracking tools into a single, cohesive mobile experience. Instead of juggling separate apps for workouts, nutrition, hydration, and sleep, VYRA brings everything together with a clean, intuitive interface. The app features real-time data synchronization through Supabase, custom workout plan creation, macro and calorie tracking with a food database, hydration reminders, sleep quality scoring, step counting integration, and intermittent fasting timers with progress rings. The backend handles user authentication, data persistence, and cross-device sync.",
    features: [
      "Custom workout creation and tracking",
      "Nutrition logging with macro calculations",
      "Hydration tracking with smart reminders",
      "Sleep quality analysis and scoring",
      "Step counter integration",
      "Intermittent fasting timer",
      "Progress charts and statistics",
      "User authentication and cloud sync",
    ],
    challenges:
      "The main challenge was designing a cohesive data architecture that connects all health metrics while keeping the app performant on mobile. Managing real-time state across multiple tracking modules required careful optimization of re-renders and efficient Supabase queries.",
    technologies: [
      "React Native",
      "Expo",
      "TypeScript",
      "Supabase",
      "Node.js",
    ],
    featured: true,
    status: "In active development",
  },

  {
    id: "ai-products",
    title: "AI Products Platform",
    category: "AI · Backend · SaaS",
    description:
      "A serverless SaaS platform for AI-powered digital products, featuring license key activation, credit-based usage management, secure API authentication, and fully automated delivery — built on Cloudflare's edge infrastructure.",
    longDescription:
      "This platform enables the sale and delivery of AI-powered digital products with a complete backend infrastructure. When a customer purchases a product through Gumroad, the system automatically generates a license key, provisions API credits, and activates their account. The AI features are powered by Workers AI running on Cloudflare's edge network, ensuring low-latency responses worldwide. The platform includes a license validation system, credit consumption tracking, rate limiting, and a complete API for product integration. All data is stored in Cloudflare D1 (SQLite at the edge), making the entire infrastructure serverless and globally distributed.",
    features: [
      "Automatic license key generation on purchase",
      "Credit-based AI usage management",
      "Gumroad webhook integration for automated delivery",
      "API key authentication and rate limiting",
      "Workers AI integration for content generation",
      "Edge-deployed with Cloudflare Workers",
      "D1 database for serverless data storage",
      "Usage analytics and credit tracking",
    ],
    challenges:
      "Building a complete SaaS backend on a serverless, edge-first architecture required rethinking traditional patterns. Implementing reliable license validation, credit management, and webhook processing without a traditional server demanded careful design of the D1 schema and Worker routing.",
    technologies: [
      "TypeScript",
      "Cloudflare Workers",
      "Workers AI",
      "D1",
      "Gumroad API",
    ],
    featured: true,
    status: "In active development",
  },

  {
    id: "ganchoviral",
    title: "GanchoViral",
    category: "AI Tool",
    description:
      "An AI-powered content creation tool that generates high-converting hooks for TikTok, Instagram Reels, and YouTube Shorts — designed to help creators capture attention in the first 3 seconds of their videos.",
    longDescription:
      "GanchoViral solves a specific problem for content creators: writing the opening hook that determines whether viewers keep watching or scroll away. The tool uses AI to analyze successful viral content patterns and generate multiple hook variations tailored to the creator's topic, niche, and platform. Users input their video topic, select their target platform, and receive a set of optimized hooks ranked by estimated engagement potential. The interface is intentionally minimal — no sign-ups, no complex dashboards — just a focused tool that does one thing well.",
    features: [
      "AI-powered hook generation for short-form video",
      "Platform-specific optimization (TikTok, Reels, Shorts)",
      "Multiple hook variations per request",
      "Topic and niche customization",
      "Clean, distraction-free interface",
      "Serverless backend with Cloudflare Workers",
    ],
    challenges:
      "The key challenge was prompt engineering: creating AI prompts that consistently generate hooks matching the style and tone of genuinely viral content, while avoiding generic or clickbait-style output. Iterative testing with real content creator feedback was essential.",
    technologies: [
      "JavaScript",
      "HTML/CSS",
      "AI API",
      "Cloudflare Workers",
    ],
    featured: true,
    status: "Live & functional",
  },

  {
    id: "automated-reports",
    title: "Automated Business Reports",
    category: "Automation · AI",
    description:
      "An intelligent reporting automation system that collects business data from multiple sources, processes it with AI analysis, and generates structured weekly reports — eliminating hours of manual data compilation.",
    longDescription:
      "This system was built to solve the repetitive, time-consuming task of compiling weekly business reports. It connects to multiple data sources via APIs, aggregates key metrics, and uses AI to generate written summaries and insights. The reports are structured with consistent formatting, include trend analysis, and highlight anomalies or notable changes from the previous period. The entire pipeline runs automatically on a schedule, delivering finished reports without any manual intervention.",
    features: [
      "Multi-source data aggregation via APIs",
      "AI-powered analysis and summary generation",
      "Automated weekly report scheduling",
      "Trend detection and anomaly highlighting",
      "Consistent structured report formatting",
      "Zero manual intervention after setup",
    ],
    challenges:
      "The biggest challenge was building reliable data normalization across different API response formats and ensuring the AI analysis produced actionable insights rather than generic summaries. Error handling for API failures and data inconsistencies was critical for production reliability.",
    technologies: [
      "JavaScript",
      "REST APIs",
      "AI Integration",
      "Automation",
    ],
    featured: true,
    status: "Live & functional",
  },
];
