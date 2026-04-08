import { Button } from "@/components/ui/button";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

interface SettingsPanelProps {
  open: boolean;
  onClose: () => void;
}

export function SettingsPanel({ open, onClose }: SettingsPanelProps) {
  return (
    <Dialog.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />

        <Dialog.Content
          className="fixed z-50 bg-card border border-border shadow-xl flex flex-col
            /* mobile: bottom sheet */
            inset-x-0 bottom-0 rounded-t-2xl max-h-[92svh]
            /* desktop: centered modal */
            sm:inset-auto sm:left-1/2 sm:-translate-x-1/2 sm:top-1/2 sm:-translate-y-1/2
            sm:w-full sm:max-w-md sm:rounded-2xl sm:max-h-[85vh]
            data-[state=open]:animate-in data-[state=closed]:animate-out
            data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0
            data-[state=closed]:slide-out-to-bottom sm:data-[state=closed]:slide-out-to-bottom-0
            sm:data-[state=closed]:zoom-out-95 sm:data-[state=open]:zoom-in-95
            duration-200"
          data-ocid="settings-panel"
        >
          <Dialog.Title className="sr-only">Settings</Dialog.Title>
          <Dialog.Description className="sr-only">
            Configure theme preferences.
          </Dialog.Description>

          {/* Header */}
          <div className="flex items-center justify-between px-5 pt-5 pb-3 shrink-0">
            <h2 className="text-lg font-display font-semibold text-foreground">
              Settings
            </h2>
            <Dialog.Close asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full"
                aria-label="Close"
                data-ocid="settings-close"
              >
                <X className="h-4 w-4" />
              </Button>
            </Dialog.Close>
          </div>

          {/* Scrollable body */}
          <div className="flex-1 overflow-y-auto px-5 pb-6 space-y-6">
            {/* Theme section */}
            <section>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                Theme
              </h3>
              <div className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-secondary">
                <span className="text-sm text-foreground font-medium">
                  Dark mode
                </span>
                <ThemeToggle />
              </div>
            </section>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
