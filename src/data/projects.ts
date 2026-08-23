export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
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
      "A comprehensive fitness platform combining training, nutrition, hydration, sleep, steps, fasting and progress tracking in one mobile experience.",
    technologies: [
      "React Native",
      "Expo",
      "TypeScript",
      "Supabase",
      "Node.js",
    ],
    featured: true,
    status: "In development",
  },

  {
    id: "ai-products",
    title: "AI Products Platform",
    category: "AI · Backend · SaaS",
    description:
      "A digital products platform powered by AI, featuring license activation, credit management, API authentication and serverless infrastructure.",
    technologies: [
      "TypeScript",
      "Cloudflare Workers",
      "Workers AI",
      "D1",
      "Gumroad API",
    ],
    featured: true,
    status: "In development",
  },

  {
    id: "ganchoviral",
    title: "GanchoViral",
    category: "AI Tool",
    description:
      "An AI-powered tool that generates hooks for TikTok, Reels and YouTube Shorts through a simple and focused interface.",
    technologies: [
      "JavaScript",
      "HTML",
      "AI API",
      "Cloudflare Workers",
    ],
    featured: true,
    status: "Functional",
  },

  {
    id: "automated-reports",
    title: "Automated Business Reports",
    category: "Automation · AI",
    description:
      "An automated reporting system designed to transform business data into structured weekly reports using AI.",
    technologies: [
      "JavaScript",
      "APIs",
      "AI",
      "Automation",
    ],
    featured: true,
    status: "Functional",
  },
];
