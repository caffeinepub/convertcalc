import { Button } from "@/components/ui/button";
import { Link, useRouter } from "@tanstack/react-router";
import {
  DollarSign,
  FlaskConical,
  Ruler,
  Settings,
  Thermometer,
  Weight,
} from "lucide-react";
import { useState } from "react";
import { SettingsPanel } from "./SettingsPanel";
import { ThemeToggle } from "./ThemeToggle";

interface Tab {
  path: string;
  label: string;
  Icon: React.ElementType;
  dataOcid: string;
}

const TABS: Tab[] = [
  { path: "/", label: "Currency", Icon: DollarSign, dataOcid: "tab-currency" },
  { path: "/length", label: "Length", Icon: Ruler, dataOcid: "tab-length" },
  {
    path: "/temperature",
    label: "Temperature",
    Icon: Thermometer,
    dataOcid: "tab-temperature",
  },
  { path: "/weight", label: "Weight", Icon: Weight, dataOcid: "tab-weight" },
  {
    path: "/volume",
    label: "Volume",
    Icon: FlaskConical,
    dataOcid: "tab-volume",
  },
];

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const pathname = router.state.location.pathname;
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card border-b border-border shadow-sm">
        <div className="max-w-lg mx-auto flex items-center justify-between px-4 py-2 h-14">
          {/* App name */}
          <h1 className="text-xl font-display font-bold text-foreground tracking-tight shrink-0">
            ConvertCalc
          </h1>

          {/* Right controls */}
          <div className="flex items-center gap-0.5">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSettingsOpen(true)}
              aria-label="Open settings"
              className="h-9 w-9 rounded-full transition-smooth"
              data-ocid="settings-open"
            >
              <Settings className="h-4 w-4 text-foreground" />
            </Button>
            <ThemeToggle />
          </div>
        </div>

        {/* Tab bar */}
        <nav
          className="max-w-lg mx-auto flex overflow-x-auto scrollbar-hide"
          role="tablist"
          aria-label="Conversion types"
        >
          {TABS.map(({ path, label, Icon, dataOcid }) => {
            const isActive =
              path === "/" ? pathname === "/" : pathname.startsWith(path);
            return (
              <Link
                key={path}
                to={path}
                role="tab"
                aria-selected={isActive}
                data-ocid={dataOcid}
                className={`flex-1 min-w-[64px] flex flex-col items-center justify-center gap-0.5 py-2.5 text-xs font-medium transition-smooth relative
                  ${
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                <span>{label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>
      </header>

      {/* Content */}
      <main className="flex-1 w-full max-w-lg mx-auto px-4 py-6">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-4 px-4">
        <p className="text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()}. Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
              typeof window !== "undefined" ? window.location.hostname : "",
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline font-medium"
          >
            caffeine.ai
          </a>
        </p>
      </footer>

      {/* Settings panel */}
      <SettingsPanel
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />
    </div>
  );
}
