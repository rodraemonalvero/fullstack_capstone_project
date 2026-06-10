import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Cyber Learning Tracker",
  description: "Cybersecurity Study Tracker with Claude AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <nav className="bg-slate-900 text-white p-4">
          <div className="max-w-6xl mx-auto flex gap-6">
            <Link href="/">Dashboard</Link>
            <Link href="/topics">Topics</Link>
            <Link href="/topics/new">New Topic</Link>
            <Link href="/ai">AI Coach</Link>
          </div>
        </nav>

        <main className="max-w-6xl mx-auto p-6">
          {children}
        </main>
      </body>
    </html>
  );
}