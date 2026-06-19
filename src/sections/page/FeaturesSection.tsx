import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import {
	faqQuestionTitleClassName,
	faqSectionTitleClassName,
	mobileBodyCopyClassName,
	mobileFeatureTitleClassName,
} from "./mobileTypeScale";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type FeatureItem = {
	title: string;
	description: string;
	image: string;
	imageAlt: string;
};

const featureItems: FeatureItem[] = [
	{
		title: "Appealing Visual Menu",
		description:
			"Show every dish with clear imagery so browsing feels quick, intuitive, and worth exploring.",
		image: "/assets/table.png",
		imageAlt: "SnapServe guest menu view with table QR ordering.",
	},
	{
		title: "Easy Navigation",
		description:
			"Help guests move from scan to selection faster with a layout that keeps ordering simple.",
		image: "/assets/waiter.png",
		imageAlt: "SnapServe waiter view showing active orders and table status.",
	},
	{
		title: "Real-Time Order Updates",
		description:
			"Keep diners and staff aligned as orders move through the kitchen and back to the table.",
		image: "/assets/kitchen.png",
		imageAlt: "SnapServe kitchen queue showing incoming orders.",
	},
	{
		title: "Advanced Analytics",
		description:
			"Track sales, scans, and ordering patterns from one dashboard without adding another workflow.",
		image: "/assets/admin.png",
		imageAlt:
			"SnapServe analytics dashboard showing sales, orders, and performance metrics.",
	},
];

const edgeReveal = {
	inset: "clamp(0.85rem, 2vw, 2rem)",
	radius: "clamp(2rem, 3vw, 2.75rem)",
} as const;

const featureTitleClassName = [faqQuestionTitleClassName, "text-white"].join(
	" ",
);

function SectionHeader() {
	return (
		<header className="mx-auto max-w-4xl space-y-2 text-center lg:space-y-3">
			<h2
				className={[
					faqSectionTitleClassName,
					"lg:text-[clamp(3.15rem,4.15vw,4.4rem)]",
					"text-white",
				].join(" ")}
			>
				Increase Customer Loyalty and Reduce Wait Times
			</h2>
			<p
				className={[
					mobileBodyCopyClassName,
					"mx-auto max-w-2xl text-white/76 lg:text-[1rem] lg:leading-[1.58]",
				].join(" ")}
			>
				Move guests from scan to service with a menu, order flow, and operations
				view that stay in sync.
			</p>
		</header>
	);
}

function FeatureScreenshot({ item }: { item: FeatureItem }) {
	return (
		<div className="overflow-hidden rounded-[1.4rem] bg-white shadow-[0_24px_50px_rgba(8,20,76,0.18)]">
			<img
				src={item.image}
				alt={item.imageAlt}
				className="aspect-[16/10] h-full w-full object-contain object-center"
			/>
		</div>
	);
}

function FeatureRow({
	item,
	reversed,
}: {
	item: FeatureItem;
	reversed: boolean;
}) {
	const imageClassName = "w-full max-w-[38.7rem]";
	const copyClassName = [
		"space-y-1.5 w-full max-w-[21rem]",
		reversed ? "text-right" : "text-left",
	].join(" ");

	return (
		<article
			className={[
				"flex flex-col gap-4 sm:gap-5 lg:flex-row lg:items-center lg:gap-6 xl:gap-8",
				reversed ? "lg:justify-end" : "lg:justify-start",
			].join(" ")}
		>
			{reversed ? (
				<>
					<div className={copyClassName}>
						<h3 className={featureTitleClassName}>{item.title}</h3>
						<p
							className={[
								mobileBodyCopyClassName,
								"max-w-md text-white/74 lg:ml-auto lg:text-[1.02rem] lg:leading-[1.6]",
							].join(" ")}
						>
							{item.description}
						</p>
					</div>
					<div className={imageClassName}>
						<FeatureScreenshot item={item} />
					</div>
				</>
			) : (
				<>
					<div className={imageClassName}>
						<FeatureScreenshot item={item} />
					</div>
					<div className={copyClassName}>
						<h3 className={featureTitleClassName}>{item.title}</h3>
						<p
							className={[
								mobileBodyCopyClassName,
								"max-w-md text-white/74 lg:text-[1.02rem] lg:leading-[1.6]",
							].join(" ")}
						>
							{item.description}
						</p>
					</div>
				</>
			)}
		</article>
	);
}

function MobileFeatureRow({ item }: { item: FeatureItem }) {
	return (
		<article className="space-y-3">
			<FeatureScreenshot item={item} />
			<div className="space-y-1">
				<h3 className={[mobileFeatureTitleClassName, "text-white"].join(" ")}>
					{item.title}
				</h3>
				<p className="text-[0.9rem] leading-[1.48] tracking-[-0.03em] text-white/74 sm:text-[0.95rem]">
					{item.description}
				</p>
			</div>
		</article>
	);
}

export default function FeaturesSection() {
	const sectionRef = useRef<HTMLElement | null>(null);
	const stageRef = useRef<HTMLDivElement | null>(null);
	const frameRef = useRef<HTMLDivElement | null>(null);

	useGSAP(
		() => {
			const mm = gsap.matchMedia();

			mm.add(
				"(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
				() => {
					const section = sectionRef.current;
					const stage = stageRef.current;
					const frame = frameRef.current;

					if (!section || !stage || !frame) {
						return;
					}

					gsap.set(stage, {
						paddingLeft: 0,
						paddingRight: 0,
						willChange: "padding",
					});
					gsap.set(frame, {
						borderBottomLeftRadius: 0,
						borderBottomRightRadius: 0,
					});

					const timeline = gsap.timeline({
						scrollTrigger: {
							trigger: section,
							start: "bottom bottom",
							end: "bottom 52%",
							scrub: 0.95,
							invalidateOnRefresh: true,
						},
					});

					timeline.to(
						stage,
						{
							paddingLeft: edgeReveal.inset,
							paddingRight: edgeReveal.inset,
							ease: "none",
						},
						0,
					);

					timeline.to(
						frame,
						{
							borderBottomLeftRadius: edgeReveal.radius,
							borderBottomRightRadius: edgeReveal.radius,
							ease: "none",
						},
						0,
					);

					return () => {
						timeline.scrollTrigger?.kill();
						timeline.kill();
					};
				},
			);

			return () => mm.revert();
		},
		{ scope: sectionRef },
	);

	return (
		<section
			id="features"
			ref={sectionRef}
			className="features-section-shell relative text-[var(--landing-ink)]"
		>
			<div ref={stageRef} className="mx-auto w-full">
				<div
					ref={frameRef}
					className="relative overflow-hidden bg-[var(--landing-accent)] pb-6 pt-10 sm:pb-8 sm:pt-12 lg:pb-10 lg:pt-16"
				>
					<div className="features-grid-overlay pointer-events-none absolute inset-0" />

					<div className="relative z-10 mx-auto max-w-[108rem] px-4 sm:px-6 lg:px-6 xl:px-8">
						<SectionHeader />

						<div className="mt-8 space-y-9 sm:mt-10 sm:space-y-11 lg:mt-16 lg:hidden">
							{featureItems.map((item) => (
								<MobileFeatureRow key={item.title} item={item} />
							))}
						</div>

						<div className="mt-12 hidden space-y-12 lg:block xl:space-y-16">
							{featureItems.map((item, index) => (
								<FeatureRow
									key={item.title}
									item={item}
									reversed={index % 2 === 1}
								/>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
