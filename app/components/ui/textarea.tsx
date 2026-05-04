import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-lg border border-[#e6dfd3] bg-white/90 px-3 py-2 text-base text-[#2b2b2b] ring-offset-background placeholder:text-[#908a9f] shadow-xs transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7a74cd]/40 focus-visible:ring-offset-2 focus-visible:border-[#c9c2e6] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
