import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import LandingButton from "./LandingButton";
import SiteMenuOverlay from "./SiteMenuOverlay";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type ActiveSection =
	| "home"
	| "features"
	| "wait-time"
	| "testimony"
	| "setup"
	| "pricing"
	| "faq"
	| "footer";

const sectionOrder: ActiveSection[] = [
	"home",
	"features",
	"wait-time",
	"testimony",
	"setup",
	"pricing",
	"faq",
	"footer",
];

const requestDemoButtonClassNames: Record<ActiveSection, string> = {
	home: "h-10 rounded-[1.35rem] border border-[rgba(41,31,30,0.12)] !bg-[#fbf8f2] px-3 !text-[#291F1E] hover:!bg-[#f1e9de] hover:!text-[#291F1E] sm:h-11 sm:px-4 sm:text-[0.72rem] lg:h-12 lg:px-5 lg:text-[0.78rem]",
	features:
		"h-10 rounded-[1.35rem] border border-transparent !bg-[var(--landing-accent)] px-3 !text-white hover:!bg-[#1739d8] hover:!text-white sm:h-11 sm:px-4 sm:text-[0.72rem] lg:h-12 lg:px-5 lg:text-[0.78rem]",
	"wait-time":
		"h-10 rounded-[1.35rem] border border-[rgba(32,28,28,0.12)] !bg-white px-3 !text-[#201c1c] hover:!bg-[#f2f2f2] hover:!text-[#201c1c] sm:h-11 sm:px-4 sm:text-[0.72rem] lg:h-12 lg:px-5 lg:text-[0.78rem]",
	testimony:
		"h-10 rounded-[1.35rem] border border-[rgba(32,28,28,0.12)] !bg-[var(--landing-card)] px-3 !text-[#201c1c] hover:!bg-[#efe8dd] hover:!text-[#201c1c] sm:h-11 sm:px-4 sm:text-[0.72rem] lg:h-12 lg:px-5 lg:text-[0.78rem]",
	setup:
		"h-10 rounded-[1.35rem] border border-[rgba(32,28,28,0.12)] !bg-[#f5f2ed] px-3 !text-[#201c1c] hover:!bg-[#eee6da] hover:!text-[#201c1c] sm:h-11 sm:px-4 sm:text-[0.72rem] lg:h-12 lg:px-5 lg:text-[0.78rem]",
	pricing:
		"h-10 rounded-[1.35rem] border border-[rgba(37,57,71,0.22)] !bg-[var(--receipt-bg)] px-3 !text-[#201c1c] hover:!bg-[#738446] hover:!text-[#201c1c] sm:h-11 sm:px-4 sm:text-[0.72rem] lg:h-12 lg:px-5 lg:text-[0.78rem]",
	faq: "h-10 rounded-[1.35rem] border border-[rgba(248,239,216,0.24)] !bg-[#735544] px-3 !text-[#f8efd8] hover:!bg-[#654739] hover:!text-[#f8efd8] sm:h-11 sm:px-4 sm:text-[0.72rem] lg:h-12 lg:px-5 lg:text-[0.78rem]",
	footer:
		"h-10 rounded-[1.35rem] border border-[rgba(41,31,30,0.12)] !bg-white px-3 !text-[#291F1E] hover:!bg-[#f5f2ed] hover:!text-[#291F1E] sm:h-11 sm:px-4 sm:text-[0.72rem] lg:h-12 lg:px-5 lg:text-[0.78rem]",
};

export default function Header() {
	const headerRef = useRef<HTMLElement | null>(null);
	const chromeRefs = useRef<Array<HTMLElement | null>>([]);
	const [menuOpen, setMenuOpen] = useState(false);
	const [activeSection, setActiveSection] = useState<ActiveSection>("home");

	useEffect(() => {
		let animationFrame = 0;

		const updateActiveSection = () => {
			const marker = window.innerHeight * 0.28;
			let nextSection: ActiveSection = "home";

			for (const sectionId of sectionOrder) {
				const element = document.getElementById(sectionId);
				if (!element) {
					continue;
				}

				const { top } = element.getBoundingClientRect();
				if (top <= marker) {
					nextSection = sectionId;
				}
			}

			setActiveSection(nextSection);
		};

		const requestUpdate = () => {
			if (animationFrame !== 0) {
				return;
			}

			animationFrame = window.requestAnimationFrame(() => {
				animationFrame = 0;
				updateActiveSection();
			});
		};

		updateActiveSection();
		window.addEventListener("scroll", requestUpdate, { passive: true });
		window.addEventListener("resize", requestUpdate);

		return () => {
			window.removeEventListener("scroll", requestUpdate);
			window.removeEventListener("resize", requestUpdate);

			if (animationFrame !== 0) {
				window.cancelAnimationFrame(animationFrame);
			}
		};
	}, []);

	useGSAP(
		() => {
			const chrome = chromeRefs.current.filter(Boolean) as HTMLElement[];

			if (chrome.length === 0) {
				return;
			}

			const showChrome = () => {
				gsap.to(chrome, {
					autoAlpha: 1,
					duration: 0.38,
					ease: "power2.out",
					overwrite: true,
				});
			};

			const hideChrome = () => {
				gsap.to(chrome, {
					autoAlpha: 0,
					duration: 0.28,
					ease: "power2.out",
					overwrite: true,
				});
			};

			gsap.set(chrome, {
				autoAlpha: window.scrollY > 24 ? 0 : 1,
			});

			const trigger = ScrollTrigger.create({
				start: 24,
				end: "max",
				onEnter: hideChrome,
				onLeaveBack: showChrome,
			});

			return () => {
				trigger.kill();
			};
		},
		{ scope: headerRef },
	);

	return (
		<header
			ref={headerRef}
			className="fixed inset-x-0 top-0 z-50 bg-transparent"
		>
			<div className="mx-auto flex max-w-[116rem] items-center justify-between gap-3 px-4 py-2 sm:gap-4 sm:px-6 lg:px-8">
				<a
					href="#home"
					ref={(element) => {
						chromeRefs.current[0] = element;
					}}
					className="inline-flex items-center no-underline"
					aria-label="SnapServe home"
				>
					<span className="display-title text-[1.75rem] font-bold leading-[0.84] tracking-[-0.05em] text-[#291F1E] sm:text-[2rem]">
						SnapServe
					</span>
				</a>

				<div className="flex items-center gap-1.5 sm:gap-2.5">
					<button
						ref={(element) => {
							chromeRefs.current[1] = element;
						}}
						type="button"
						aria-label={menuOpen ? "Close main menu" : "Open main menu"}
						aria-haspopup="dialog"
						aria-controls="main-menu"
						aria-expanded={menuOpen}
						onClick={() => setMenuOpen((value) => !value)}
						className="inline-flex h-10 items-center justify-center rounded-[1.35rem] bg-[var(--landing-bg)]/92 px-3 text-[0.68rem] font-semibold tracking-[0.08em] text-[#291F1E] transition hover:bg-[var(--landing-bg)] hover:text-[var(--landing-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#291F1E]/20 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent sm:h-11 sm:px-4 sm:text-[0.72rem] lg:h-12 lg:px-5 lg:text-[0.78rem]"
					>
						Main Menu
					</button>

					<LandingButton
						href="#setup"
						tone="surface"
						size="sm"
						showIcon={false}
						className={requestDemoButtonClassNames[activeSection]}
					>
						Request a Demo
					</LandingButton>
				</div>
			</div>
			<SiteMenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
		</header>
	);
}
