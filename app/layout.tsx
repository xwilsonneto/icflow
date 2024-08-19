import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Provider } from "./Provider";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

const fontSans = Poppins({ weight: ['400', '500', '600'], variable: '--font-sans', subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IC-Flow",
  description: "Organizando a loucura.",
  icons: {
    icon: "/iclogo.PNG"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Provider>
        <body className={cn('min-h-screen bg-dark-300 font-sans antialiased', fontSans.variable)}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </Provider>
    </html>
  );
}
