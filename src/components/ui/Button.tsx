import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", ...props }, ref) => {
    const variants = {
      primary: "bg-brand-black text-brand-white dark:bg-brand-white dark:text-brand-black hover:bg-brand-red hover:text-brand-white dark:hover:bg-brand-red",
      secondary: "bg-brand-white text-brand-black dark:bg-brand-black dark:text-brand-white hover:bg-gray-100 dark:hover:bg-gray-900",
      outline: "border border-brand-black dark:border-brand-white text-brand-black dark:text-brand-white hover:bg-brand-black hover:text-brand-white dark:hover:bg-brand-white dark:hover:text-brand-black",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center px-8 py-4 text-sm font-medium tracking-widest uppercase transition-colors duration-300",
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
