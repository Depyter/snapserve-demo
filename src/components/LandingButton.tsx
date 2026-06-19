import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "#/components/ui/button.tsx";
import { cn } from "#/lib/utils.ts";

type LandingButtonProps = {
	children: ReactNode;
	className?: string;
	href?: string;
	showIcon?: boolean;
	size?: "sm" | "md";
	tone?: "solid" | "surface";
	type?: "button" | "submit" | "reset";
};

const sizeClassNames = {
	sm: "h-12 rounded-[1.45rem] px-5 text-sm",
	md: "rounded-full px-4 py-3 pr-6 text-sm uppercase",
} as const;

const toneClassNames = {
	solid:
		"border border-transparent bg-[var(--landing-accent)] !text-white hover:bg-[#1739d8] hover:!text-white",
	surface:
		"border border-[var(--landing-accent)] bg-[var(--landing-bg)]/92 text-[var(--landing-accent)] hover:bg-[var(--landing-accent)] hover:text-white",
} as const;

const iconSizeClassNames = {
	sm: "h-6 w-6",
	md: "h-11 w-11",
} as const;

export default function LandingButton({
	children,
	className,
	href,
	showIcon,
	size = "md",
	tone = "surface",
	type = "button",
}: LandingButtonProps) {
	const shouldShowIcon = showIcon ?? tone === "surface";
	const content = (
		<>
			{shouldShowIcon ? (
				<span
					aria-hidden="true"
					className={cn(
						"flex shrink-0 items-center justify-center rounded-full bg-[var(--landing-accent)] text-white transition group-hover:bg-white group-hover:text-[var(--landing-accent)]",
						iconSizeClassNames[size],
					)}
				>
					<ArrowRight className={size === "sm" ? "size-3.5" : "size-5"} />
				</span>
			) : null}
			{children}
		</>
	);

	const buttonClassName = cn(
		"group inline-flex cursor-pointer items-center justify-center gap-4 font-semibold tracking-[0.14em] shadow-none transition",
		size === "sm" ? "gap-2 tracking-normal" : "",
		sizeClassNames[size],
		toneClassNames[tone],
		className,
	);

	if (href) {
		return (
			<Button asChild className={buttonClassName}>
				<a href={href}>{content}</a>
			</Button>
		);
	}

	return (
		<Button type={type} className={buttonClassName}>
			{content}
		</Button>
	);
}
