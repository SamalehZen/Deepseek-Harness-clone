// Developer experience section
// Generated from the original page markup by scripts/build-from-html.mjs

export default function DeveloperExperience() {
  return (
    <section className="ds-container py-ds-10">
      <div data-reveal>
        <h2 className="harness-heading ds-text-heading1 text-ds-primary mb-ds-9 max-w-[600px]">
          {"开发者体验"}
        </h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-ds-6 items-stretch">
        <div className="min-w-0 flex flex-col rounded-ds-panel bg-ds-surface-3 border border-ds-border-default" data-reveal>
          <div className="min-w-0 flex flex-col gap-ds-3 p-ds-7">
            <h3 className="harness-heading ds-text-subtitle text-ds-primary">
              {"命令启动"}
            </h3>
            <p className="ds-text-body text-ds-description leading-[1.7]">
              {"安装 Node.js 后，通过 npx 启动 Web UI。"}
            </p>
            <div className="mt-ds-2 flex items-center justify-between gap-ds-3 rounded-[10px] border border-ds-border-default bg-ds-surface-1 px-ds-4 py-[14px] font-mono text-[14px] text-ds-primary">
              <code className="min-w-0 whitespace-pre-wrap break-all">
                <span className="select-none text-ds-brand">
                  {"$ "}
                </span>
                {"npx @deepseek-ai/dsh web"}
              </code>
              <button type="button" className="shrink-0 font-sans text-[12px] text-ds-description hover:text-ds-primary transition-colors">
                {"复制"}
              </button>
            </div>
          </div>
        </div>
        <div className="min-w-0 flex flex-col rounded-ds-panel bg-ds-surface-3 border border-ds-border-default" data-reveal>
          <div className="min-w-0 flex flex-col gap-ds-3 p-ds-7">
            <h3 className="harness-heading ds-text-subtitle text-ds-primary">
              {"源码安装"}
            </h3>
            <p className="ds-text-body text-ds-description leading-[1.7]">
              {"获取完整项目源码，并按照仓库说明完成安装。"}
            </p>
            <div className="mt-ds-2 flex items-center justify-between gap-ds-3 rounded-[10px] border border-ds-border-default bg-ds-surface-1 px-ds-4 py-[14px] font-mono text-[14px] text-ds-primary">
              <code className="min-w-0 whitespace-pre-wrap break-all">
                <span className="select-none text-ds-brand">
                  {"$ "}
                </span>
                {"git clone https://github.com/deepseek-ai/deepseek-harness"}
              </code>
              <button type="button" className="shrink-0 font-sans text-[12px] text-ds-description hover:text-ds-primary transition-colors">
                {"复制"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
