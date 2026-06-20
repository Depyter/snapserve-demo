import { Facebook, Instagram, Linkedin, type LucideIcon } from "lucide-react";
import { footerSectionLinks } from "./siteNavigation";

type FooterLink = {
	label: string;
	href: string;
};

type FooterIconLinkData = FooterLink & {
	icon: LucideIcon;
};

const legalLinks: FooterLink[] = [
	{ label: "Privacy Policy", href: "#privacy" },
	{ label: "Terms of Service", href: "#terms" },
	{ label: "Cookie Policy", href: "#cookies" },
];

const socialLinks: FooterIconLinkData[] = [
	{
		label: "Facebook",
		href: "https://facebook.com",
		icon: Facebook,
	},
	{
		label: "LinkedIn",
		href: "https://linkedin.com",
		icon: Linkedin,
	},
	{
		label: "Instagram",
		href: "https://instagram.com",
		icon: Instagram,
	},
];

const sectionTitleClass =
	"display-title text-[1.85rem] font-bold leading-none tracking-[-0.04em] text-[var(--landing-ink-strong)]";
const linkClass =
	"block text-base font-medium leading-8 text-[var(--landing-ink-strong)] transition hover:text-[var(--landing-ink)]";
const iconLinkClass =
	"flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--landing-ink-strong-border)] bg-white text-[var(--landing-ink-strong)] transition hover:border-[var(--landing-ink-strong)] hover:text-[var(--landing-ink)]";

function FooterNavLink({ href, label }: FooterLink) {
	return (
		<a href={href} className={linkClass}>
			{label}
		</a>
	);
}

function FooterLinkList({
	ariaLabel,
	links,
}: {
	ariaLabel: string;
	links: readonly FooterLink[];
}) {
	return (
		<nav aria-label={ariaLabel} className="mt-5 space-y-3">
			{links.map((link) => (
				<FooterNavLink key={link.href} {...link} />
			))}
		</nav>
	);
}

function FooterLinkGroup({
	title,
	ariaLabel,
	links,
}: {
	title: string;
	ariaLabel: string;
	links: readonly FooterLink[];
}) {
	return (
		<section>
			<h2 className={sectionTitleClass}>{title}</h2>
			<FooterLinkList ariaLabel={ariaLabel} links={links} />
		</section>
	);
}

function FooterContactLink() {
	return (
		<a
			href="mailto:hello@snapserve.ph"
			className="inline-flex h-11 items-center rounded-full border border-[color:var(--landing-ink-strong-border)] bg-white px-4 text-sm font-medium text-[var(--landing-ink-strong)] transition hover:border-[var(--landing-ink-strong)] hover:text-[var(--landing-ink)]"
		>
			<span>hello@snapserve.ph</span>
		</a>
	);
}

function FooterIconLink({ href, label, icon: Icon }: FooterIconLinkData) {
	return (
		<a href={href} aria-label={label} className={iconLinkClass}>
			<Icon className="h-4 w-4" />
		</a>
	);
}

function FooterIconLinkList({
	links,
}: {
	links: readonly FooterIconLinkData[];
}) {
	return (
		<>
			{links.map((link) => (
				<FooterIconLink key={link.href} {...link} />
			))}
		</>
	);
}

export default function FooterSection() {
	return (
		<footer
			id="footer"
			className="bg-white overflow-hidden px-4 py-8 lg:rounded-t-[2.5rem] text-[var(--landing-ink-strong)] sm:px-6 lg:px-8"
		>
			<div className="mx-auto max-w-[110rem]">
				<div className="grid gap-8 [grid-template-columns:repeat(auto-fit,minmax(13rem,1fr))] lg:gap-10">
					<FooterLinkGroup
						title="Legal"
						ariaLabel="Footer legal"
						links={legalLinks}
					/>
					<FooterLinkGroup
						title="Sections"
						ariaLabel="Footer sections"
						links={footerSectionLinks}
					/>
				</div>

				<div className="mt-10 border-t border-[color:var(--landing-ink-strong-border)] pt-6">
					<div className="mt-5 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
						<div className="overflow-visible pb-1">
							<p className="display-title -ml-[0.045em] text-[clamp(3.75rem,10vw,7.75rem)] font-bold leading-[0.84] tracking-[-0.1em] text-[var(--landing-accent)]">
								SnapServe
							</p>
						</div>

						<div className="flex flex-wrap items-center gap-2 sm:gap-3 lg:justify-end">
							<FooterContactLink />
							<FooterIconLinkList links={socialLinks} />
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
