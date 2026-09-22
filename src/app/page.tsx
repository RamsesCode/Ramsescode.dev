import { SiteHeader } from "@/components/navigation/site-header";
import { Hero } from "@/components/hero/hero";
import { HomeSections } from "@/components/sections/home-sections";
import { SiteFooter } from "@/components/footer/site-footer";
import { TypingAnimations } from "@/components/animations/typing-animations";

export default function HomePage() {
  return (
    <div id="top">
      <SiteHeader />
      <main id="main" tabIndex={-1}>
        <Hero />
        <HomeSections />
        <TypingAnimations scopeId="main" />
      </main>
      <SiteFooter />
    </div>
  );
}
