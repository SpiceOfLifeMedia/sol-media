import { ReactNode, useEffect } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { useLocation } from "wouter";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="flex flex-col min-h-[100dvh] w-full font-sans text-foreground bg-background">
      <Navbar />
      <main className="flex-1 w-full flex flex-col items-center">
        {children}
      </main>
      <Footer />
    </div>
  );
}
