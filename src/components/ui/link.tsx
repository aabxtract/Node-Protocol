import NextLink from "next/link"
import * as React from "react"
import { VariantProps, cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const linkVariants = cva(
    "outline-none ring-primary transition-all focus-visible:ring-2",
    {
        variants: {
            variant: {
                default: "hover:underline",
                button: "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
                "button-primary": "bg-primary text-primary-foreground hover:bg-primary/90",
                "button-destructive": "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                "button-outline": "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
                "button-secondary": "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                "button-ghost": "hover:bg-accent hover:text-accent-foreground",
                "button-link": "text-primary underline-offset-4 hover:underline",
            },
            size: {
                default: "",
                "button-default": "h-10 px-4 py-2",
                "button-sm": "h-9 rounded-md px-3",
                "button-lg": "h-11 rounded-md px-8",
                "button-icon": "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    },
)

const Link = React.forwardRef<
  React.ElementRef<typeof NextLink>,
  React.ComponentProps<typeof NextLink> & VariantProps<typeof linkVariants>
>(({ className, variant, size, ...props }, ref) => {
  return (
    <NextLink
      ref={ref}
      className={cn(linkVariants({ variant, size, className }))}
      {...props}
    />
  )
})
Link.displayName = "Link"

export { Link }
