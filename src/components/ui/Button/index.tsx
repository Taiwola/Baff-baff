"use client";

import * as React from "react";
import { cn } from "@utils";
import { buttonVariants } from "./variants";
import Link, { LinkProps } from "next/link";

interface BaseButtonProps {
  variant?: "filled" | "bordered" | 'text' | 'danger';
  size?: "sm" | "md" | "lg";
  rounded?: "none" | 'sm' | "md" | "full";
  fullWidth?: boolean;
  className?: string;
  children: React.ReactNode;
}

type ButtonAsButton = BaseButtonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { as?: "button" };

type ButtonAsLink = BaseButtonProps &
  LinkProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & { as: "link" };

type ButtonProps = ButtonAsButton | ButtonAsLink;

/**
 * 
 * @param variant Default = filled 
 * @returns 
 */
export default function Button({
  as = "button",
  variant,
  size,
  rounded,
  fullWidth,
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    buttonVariants({ variant, size, rounded, fullWidth }),
    className
  );

  if (as === "link") {
    const { href, ...rest } = props as ButtonAsLink;
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(props as ButtonAsButton)}>
      {children}
    </button>
  );
}
