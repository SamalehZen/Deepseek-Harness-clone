// Developer experience section
// Generated from the original page markup by scripts/build-from-html.mjs

export default function DeveloperExperience() {
  return (
    <section className="ds-container py-ds-10">
      <div data-reveal>
        <h2 className="harness-heading ds-text-heading1 text-ds-primary mb-ds-9 max-w-[600px]">
          <span className="harness-heading-latin">
            {"Developer"}
          </span>
          {" "}
          <span className="harness-heading-latin">
            {"experience"}
          </span>
        </h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-ds-6 items-stretch">
        <div className="min-w-0 flex flex-col rounded-ds-panel bg-ds-surface-3 border border-ds-border-default" data-reveal>
          <div className="min-w-0 flex flex-col gap-ds-3 p-ds-7">
            <h3 className="harness-heading ds-text-subtitle text-ds-primary">
              <span className="harness-heading-latin">
                {"Start"}
              </span>
              {" "}
              <span className="harness-heading-latin">
                {"with"}
              </span>
              {" "}
              <span className="harness-heading-latin">
                {"one"}
              </span>
              {" "}
              <span className="harness-heading-latin">
                {"command"}
              </span>
            </h3>
            <p className="ds-text-body text-ds-description leading-[1.7]">
              {"Install Node.js, then launch the Web UI with npx."}
            </p>
            <div className="mt-ds-2 flex items-center justify-between gap-ds-3 rounded-[10px] border border-ds-border-default bg-ds-surface-1 px-ds-4 py-[14px] font-mono text-[14px] text-ds-primary">
              <code className="min-w-0 whitespace-pre-wrap break-all">
                <span className="select-none text-ds-brand">
                  {"$ "}
                </span>
                {"npx @deepseek-ai/dsh web"}
              </code>
              <button type="button" className="shrink-0 font-sans text-[12px] text-ds-description hover:text-ds-primary transition-colors">
                {"Copy"}
              </button>
            </div>
          </div>
        </div>
        <div className="min-w-0 flex flex-col rounded-ds-panel bg-ds-surface-3 border border-ds-border-default" data-reveal>
          <div className="min-w-0 flex flex-col gap-ds-3 p-ds-7">
            <h3 className="harness-heading ds-text-subtitle text-ds-primary">
              <span className="harness-heading-latin">
                {"Install"}
              </span>
              {" "}
              <span className="harness-heading-latin">
                {"from"}
              </span>
              {" "}
              <span className="harness-heading-latin">
                {"source"}
              </span>
            </h3>
            <p className="ds-text-body text-ds-description leading-[1.7]">
              {"Clone the full source and follow the setup instructions in the repository."}
            </p>
            <div className="mt-ds-2 flex items-center justify-between gap-ds-3 rounded-[10px] border border-ds-border-default bg-ds-surface-1 px-ds-4 py-[14px] font-mono text-[14px] text-ds-primary">
              <code className="min-w-0 whitespace-pre-wrap break-all">
                <span className="select-none text-ds-brand">
                  {"$ "}
                </span>
                {"git clone https://github.com/deepseek-ai/deepseek-harness"}
              </code>
              <button type="button" className="shrink-0 font-sans text-[12px] text-ds-description hover:text-ds-primary transition-colors">
                {"Copy"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
