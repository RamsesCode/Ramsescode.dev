import { SiteHeader } from "@/components/navigation/site-header";
import { Hero } from "@/components/hero/hero";
import { HomeSections } from "@/components/sections/home-sections";
import { SiteFooter } from "@/components/footer/site-footer";

export default function HomePage() {
  return (
    <div id="top">
      <SiteHeader />
      <main id="main" tabIndex={-1}>
        <Hero />
        <HomeSections />
      </main>
      <SiteFooter />
    </div>
  );
}
