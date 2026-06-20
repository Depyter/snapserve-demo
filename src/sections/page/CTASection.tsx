import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import LandingButton from "#/components/LandingButton";
import {
	faqAnswerTextClassName,
	faqQuestionTitleClassName,
	mobileBodyCopyClassName,
	mobileEyebrowTextClassName,
	mobileSectionTitleClassName,
} from "./mobileTypeScale";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type SetupStep = {
	id: string;
	label: string;
	title: string;
	description: string;
	hasAction?: boolean;
};

const setupSteps: SetupStep[] = [
	{
		id: "step-01",
		label: "Step 01",
		title: "Choose a plan",
		description: "Pick the SnapServe tier that matches your restaurant.",
	},
	{
		id: "step-02",
		label: "Step 02",
		title: "Send your menu",
		description: "Share your dishes, tables, and service details with us.",
	},
	{
		id: "step-03",
		label: "Step 03",
		title: "We prepare the system",
		description:
			"We'll prepare your QR menu, ordering dashboard, waiter view, and kitchen queue.",
	},
	{
		id: "step-04",
		label: "Step 04",
		title: "Schedule a call",
		description:
			"Ready to transform your service? Let's discuss your menu and schedule your onboarding launch.",
		hasAction: true,
	},
];

const faqHint = {
	label: "FAQ",
	title: "Have a question?",
	description:
		"Take a look at our frequently asked questions below to find answers about setup, menus, billing, and more.",
};

const desktopStepTitleClassName =
	"display-title mt-8 text-6xl font-bold leading-[0.92] tracking-[-0.05em] text-[#201c1c] md:text-7xl xl:text-[6.2rem]";

const desktopStepDescriptionClassName =
	"mt-8 max-w-md text-lg leading-8 text-[#4f4946] xl:text-xl xl:leading-9";

function MobileScheduleButton() {
	return (
		<LandingButton size="sm" className="mt-3 bg-white">
			Schedule a Call
		</LandingButton>
	);
}

function MobileSetupStep({ step }: { step: SetupStep }) {
	return (
		<div>
			<span
				className={[
					mobileEyebrowTextClassName,
					"uppercase tracking-[0.2em] text-[var(--landing-accent)]",
				].join(" ")}
			>
				{step.label}
			</span>
			<h3
				className={[faqQuestionTitleClassName, "mt-2 text-[#201c1c]"].join(" ")}
			>
				{step.title}
			</h3>
			<p className={[faqAnswerTextClassName, "mt-2 text-[#4f4946]"].join(" ")}>
				{step.description}
			</p>
			{step.hasAction ? <MobileScheduleButton /> : null}
		</div>
	);
}

function DesktopSetupStep({ step }: { step: SetupStep }) {
	return (
		<div
			className={[
				"w-[550px] xl:w-[650px] flex-shrink-0 flex flex-col justify-center",
				step.hasAction ? "items-start" : "",
			].join(" ")}
		>
			<span className="text-sm font-semibold tracking-[0.25em] uppercase text-[var(--landing-accent)] xl:text-base">
				{step.label}
			</span>
			<h3 className={desktopStepTitleClassName}>{step.title}</h3>
			<p className={desktopStepDescriptionClassName}>{step.description}</p>
			{step.hasAction ? (
				<LandingButton className="mt-8">Schedule a Call</LandingButton>
			) : null}
		</div>
	);
}

export default function CTASection() {
	const sectionRef = useRef<HTMLElement | null>(null);
	const triggerRef = useRef<HTMLDivElement | null>(null);

	useGSAP(
		() => {
			const mm = gsap.matchMedia();

			mm.add("(min-width: 1024px)", () => {
				const getTargetX = () => {
					if (!triggerRef.current) return 0;
					const container = triggerRef.current;
					const lastPanel = container.lastElementChild;
					if (!(lastPanel instanceof HTMLElement)) return 0;

					const containerRect = container.getBoundingClientRect();
					const lastPanelRect = lastPanel.getBoundingClientRect();

					// Get current translate X of container to calculate untransformed layout
					const style = window.getComputedStyle(container);
					const matrix = new DOMMatrix(style.transform);
					const currentTranslateX = matrix.e;

					const lastPanelLeft =
						lastPanelRect.left - containerRect.left - currentTranslateX;
					const lastPanelCenter = lastPanelLeft + lastPanelRect.width / 2;

					const targetX = lastPanelCenter - window.innerWidth / 2;
					return Math.max(0, targetX);
				};

				const pin = gsap.to(triggerRef.current, {
					x: () => -getTargetX(),
					ease: "none",
					willChange: "transform",
					scrollTrigger: {
						trigger: sectionRef.current,
						pin: true,
						scrub: 1.1,
						start: "top top",
						end: () => `+=${getTargetX() || 1200}`,
						invalidateOnRefresh: true,
					},
				});

				// Animate each step/slide into view as it scrolls horizontally
				if (triggerRef.current) {
					const children = Array.from(
						triggerRef.current.children,
					) as HTMLElement[];
					children.forEach((child, index) => {
						if (index === 0) return; // Skip intro panel

						gsap.fromTo(
							child,
							{
								autoAlpha: 0.15,
								y: 40,
								scale: 0.975,
							},
							{
								autoAlpha: 1,
								y: 0,
								scale: 1,
								duration: 0.58,
								ease: "power2.out",
								willChange: "transform, opacity",
								scrollTrigger: {
									trigger: child,
									containerAnimation: pin,
									start: "left 88%",
									toggleActions: "play none none reverse",
								},
							},
						);
					});
				}

				return () => pin.kill();
			});

			return () => mm.revert();
		},
		{ scope: sectionRef },
	);

	return (
		<section
			ref={sectionRef}
			id="setup"
			className="relative bg-[#f5f2ed] text-[#201c1c] lg:h-screen lg:overflow-hidden lg:flex lg:items-center"
		>
			{/* Mobile Layout: Vertical minimal list with bigger text */}
			<div className="lg:hidden mx-auto max-w-2xl px-6 py-10">
				<div className="mb-8">
					<h2
						className={[mobileSectionTitleClassName, "text-[#201c1c]"].join(
							" ",
						)}
					>
						Setup your restaurant&apos;s ordering flow.
					</h2>
					<p
						className={[
							mobileBodyCopyClassName,
							"mt-3 max-w-xl text-[#4f4946]",
						].join(" ")}
					>
						Get started in three simple steps. We handle the heavy lifting so
						you can focus on your guests.
					</p>
				</div>

				<div className="space-y-8">
					{setupSteps.map((step) => (
						<MobileSetupStep key={step.id} step={step} />
					))}
				</div>
			</div>

			{/* Desktop Layout: Horizontal Minimal Scroll with Huge Typography & Spacing */}
			<div className="hidden lg:block h-full w-full relative">
				<div
					ref={triggerRef}
					className="flex h-full items-center gap-48 pl-[30vw] pr-[85vw] xl:gap-64"
					style={{ width: "max-content" }}
				>
					{/* Intro Panel */}
					<div className="w-[750px] xl:w-[850px] flex-shrink-0 flex flex-col justify-center">
						<h2 className={desktopStepTitleClassName}>
							Setup your restaurant&apos;s ordering flow.
						</h2>
						<p className={desktopStepDescriptionClassName}>
							Get started in three simple steps. We handle the heavy lifting so
							you can focus on your guests.
						</p>
					</div>

					{setupSteps.map((step) => (
						<DesktopSetupStep key={step.id} step={step} />
					))}

					{/* FAQ Hint */}
					<div className="w-[550px] xl:w-[650px] flex-shrink-0 flex flex-col justify-center">
						<span className="text-sm font-semibold tracking-[0.25em] uppercase text-[var(--landing-accent)] xl:text-base">
							{faqHint.label}
						</span>
						<h3 className={desktopStepTitleClassName}>{faqHint.title}</h3>
						<p className={desktopStepDescriptionClassName}>
							{faqHint.description}
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
