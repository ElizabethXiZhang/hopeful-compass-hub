import { Printer } from "lucide-react";

export interface TocItem {
  id: string;
  title: string;
}

interface LegalTocProps {
  items: TocItem[];
  title?: string;
}

const LegalToc = ({ items, title = "On this page" }: LegalTocProps) => {
  const handlePrint = () => {
    if (typeof window !== "undefined") window.print();
  };

  return (
    <aside
      aria-label="Table of contents"
      className="no-print sticky top-28 hidden w-64 shrink-0 lg:block"
    >
      <div className="rounded-2xl border border-border/40 bg-background/40 p-5 backdrop-blur-sm">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          {title}
        </p>
        <nav>
          <ul className="space-y-2">
            {items.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="block text-sm leading-snug text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <button
          type="button"
          onClick={handlePrint}
          className="mt-5 inline-flex items-center gap-2 rounded-lg border border-border/50 bg-background/40 px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-primary/10 hover:text-primary"
        >
          <Printer className="h-3.5 w-3.5" />
          Print or save as PDF
        </button>
      </div>
    </aside>
  );
};

export default LegalToc;
