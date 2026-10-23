import SiteHeader from "@/components/SiteHeader";
import MobileMenu from "@/components/MobileMenu";
import Hero from "@/components/Hero";
import Capabilities from "@/components/Capabilities";
import DeveloperExperience from "@/components/DeveloperExperience";
import Ecosystem from "@/components/Ecosystem";
import SiteFooter from "@/components/SiteFooter";
import Reveal from "@/components/Reveal";
import Interactions from "@/components/Interactions";

export default function Page() {
  return (
    <div className="harness-site relative w-full bg-ds-page" data-theme="dark">
      <SiteHeader />
      <MobileMenu />
      <Reveal />
      <Interactions />
      <main className="relative flex flex-col w-full">
        <Hero />
        <Capabilities />
        <DeveloperExperience />
        <Ecosystem />
        <SiteFooter />
      </main>
    </div>
  );
}
