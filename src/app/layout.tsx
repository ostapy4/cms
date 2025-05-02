import { AuthForm } from "./_components/Auth/AuthForm";
import { Dialog } from "./_components/Auth/Dialog";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import type { Metadata } from "next";
import { Cormorant_Infant, Montserrat } from "next/font/google";
import { cookies } from "next/headers";
import { Toaster } from "sonner";
import { extractRouterConfig } from "uploadthing/server";

import { Navbar } from "app/_components/Navbar";
import { ourFileRouter } from "app/api/uploadthing/core";

import "styles/tailwind.css";

export const dynamic = "force-dynamic";

const cormorant = Cormorant_Infant({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Admin",
    template: "%s | Admin",
  },
  description: "Ostap Konashuk admin page",
};

export default async function AdminRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get("isAdmin");
  return (
    <html lang={"en"}>
      <body
        className={`${cormorant.variable} ${montserrat.variable} bg-ok_main-100 font-mont text-ok_main-900 antialiased`}
        suppressHydrationWarning
      >
        <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
        {!isAdmin ? (
          <Dialog isOpen={!isAdmin}>
            <AuthForm />
          </Dialog>
        ) : (
          <>
            <Navbar />
            <main>{children}</main>
          </>
        )}
        <Toaster position={"top-right"} richColors />
      </body>
    </html>
  );
}
