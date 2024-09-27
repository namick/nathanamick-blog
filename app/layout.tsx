import "./global.css";
import { RootProvider } from "fumadocs-ui/provider";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import { DocsLayout } from "fumadocs-ui/layout";
import { docsOptions } from "./layout.config";
import { getPages } from "./source";

const inter = Inter({
  subsets: ["latin"],
});

export default function Layout({ children }: { children: ReactNode }) {
  const pages = getPages();
  console.log(pages);
  return (
    <html
      lang="en"
      className={`dark ${inter.className}`}
      suppressHydrationWarning
    >
      <body>
        <RootProvider>
          <DocsLayout {...docsOptions}>{children}</DocsLayout>
        </RootProvider>
      </body>
    </html>
  );
}
