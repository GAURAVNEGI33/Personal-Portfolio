import type { Metadata } from "next";
import Portfolio from "./portfolio";

export const metadata: Metadata = {
  title: "Gaurav Negi — Full-Stack Developer",
  description:
    "Portfolio of Gaurav Negi, a full-stack developer building AI-powered web products with React, Firebase, APIs, and thoughtful interfaces.",
};

export default function Home() {
  return <Portfolio />;
}
