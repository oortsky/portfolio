"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn("relative flex h-10 w-10 shrink-0 rounded-full", className)}
    {...props}
  />
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full rounded-full", className)}
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

const avatarBadgeVariants = cva(
  "absolute w-3 h-3 rounded-full bg-background flex items-center justify-center border-2 border-background",
  {
    variants: {
      position: {
        bottomLeft: "bottom-0 left-0",
        bottomRight: "bottom-0 right-0",
        topLeft: "top-0 left-0",
        topRight: "top-0 right-0"
      }
    },
    defaultVariants: {
      position: "bottomRight"
    }
  }
);

export interface AvatarBadgeProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarBadgeVariants> {}

const AvatarBadge = ({ className, position, ...props }: AvatarBadgeProps) => (
  <div
    className={cn(avatarBadgeVariants({ position }), className)}
    {...props}
  />
);

export { Avatar, AvatarImage, AvatarFallback, AvatarBadge };
