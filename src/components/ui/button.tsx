import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-EBN-teal focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-EBN-navy to-EBN-teal text-white shadow-lg shadow-EBN-navy/25 hover:shadow-xl hover:shadow-EBN-teal/30 hover:-translate-y-0.5",
        secondary:
          "bg-white/80 backdrop-blur-md border border-slate-200/80 text-EBN-navy shadow-sm hover:bg-white hover:shadow-md dark:bg-slate-800/90 dark:text-slate-100 dark:border-slate-700 dark:hover:bg-slate-800",
        outline:
          "border-2 border-EBN-navy/20 bg-transparent text-EBN-navy hover:bg-EBN-navy/5 dark:border-slate-600 dark:text-slate-100 dark:hover:bg-slate-800/50",
        ghost:
          "text-EBN-navy hover:bg-EBN-navy/5 dark:text-slate-200 dark:hover:bg-slate-800/60",
        destructive: "bg-red-500 text-white hover:bg-red-600",
        link: "text-EBN-teal underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 rounded-lg px-4 text-xs",
        lg: "h-13 px-8 text-base rounded-2xl",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
