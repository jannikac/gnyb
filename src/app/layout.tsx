import "~/styles/globals.css";

import { Roboto as FontSans } from "next/font/google";
import Header from "./Header";
import Footer from "./Footer";
import { cn } from "~/lib/utils";
import { ThemeProvider } from "~/components/ThemeProvider";
import { Toaster } from "~/components/ui/toaster";

const fontSans = FontSans({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "GNYB",
  description: "Die offizielle GNYB Website",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body
        className={cn(
          fontSans.variable,
          "mx-4 flex min-h-full flex-col font-sans lg:mx-32 xl:mx-64",
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="flex flex-grow flex-col">{children}</main>
          <Toaster />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
