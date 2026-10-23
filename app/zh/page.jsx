import SiteHeader from "@/components/zh/SiteHeader";
import MobileMenu from "@/components/zh/MobileMenu";
import Hero from "@/components/zh/Hero";
import Capabilities from "@/components/zh/Capabilities";
import DeveloperExperience from "@/components/zh/DeveloperExperience";
import Ecosystem from "@/components/zh/Ecosystem";
import SiteFooter from "@/components/zh/SiteFooter";
import Reveal from "@/components/Reveal";
import Interactions from "@/components/Interactions";
import StickyHeader from "@/components/StickyHeader";
import LanguageTag from "@/components/LanguageTag";

export const metadata = {
  title: "DeepSeek Harness｜共探智能上限",
  description:
    "DeepSeek Harness 支持文档处理、表格分析、代码编写与定时任务，并以可组合插件扩展能力。",
};

export default function Page() {
  return (
    <div className="harness-site relative w-full bg-ds-page" data-theme="dark" lang="zh-CN">
      <LanguageTag lang="zh-CN" />
      <SiteHeader />
      <MobileMenu />
      <Reveal />
      <Interactions />
      <StickyHeader />
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
