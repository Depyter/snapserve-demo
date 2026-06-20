import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { ensureScrollTriggerRegistered } from "#/lib/gsap.ts";
import {
	faqSectionTitleClassName,
	mobileEyebrowTextClassName,
} from "#/lib/sections/mobileTypeScale";

type WaitTimeMetric = {
	label: string;
	value: string;
};

const waitTimeMetrics: WaitTimeMetric[] = [
	{
		label: "Guest start",
		value: "1 Scan",
	},
	{
		label: "Order handoff",
		value: "2 Taps",
	},
	{
		label: "Service sync",
		value: "0 Relays",
	},
];

function WaitTimeMetricCard({
	metric,
	forwardedRef,
}: {
	metric: WaitTimeMetric;
	forwardedRef?: (node: HTMLElement | null) => void;
}) {
	return (
		<article
			ref={forwardedRef}
			className="flex min-h-[13rem] flex-col justify-start border-b border-[var(--landing-border)] px-5 py-7 text-center last:border-b-0 lg:min-h-[20rem] lg:border-b-0 lg:border-r lg:px-10 lg:py-12 lg:last:border-r-0"
		>
			<p
				className={[
					mobileEyebrowTextClassName,
					"text-[var(--landing-copy-muted)]",
				].join(" ")}
			>
				{metric.label}
			</p>

			<p className="display-title mt-8 whitespace-nowrap text-[clamp(3.25rem,9.8vw,5.2rem)] leading-[0.86] tracking-[-0.07em] text-[var(--landing-ink)] sm:text-[clamp(3.95rem,7.2vw,6.35rem)]">
				{metric.value}
			</p>
		</article>
	);
}

export default function WaitTimeSection() {
	const sectionRef = useRef<HTMLElement | null>(null);
	const headerRef = useRef<HTMLElement | null>(null);
	const bandRef = useRef<HTMLDivElement | null>(null);
	const metricRefs = useRef<Array<HTMLElement | null>>([]);

	useGSAP(
		() => {
			ensureScrollTriggerRegistered();

			const mm = gsap.matchMedia();

			mm.add("(min-width: 1024px)", () => {
				const section = sectionRef.current;
				const header = headerRef.current;
				const band = bandRef.current;
				const metrics = metricRefs.current.filter(Boolean) as HTMLElement[];

				if (!section || !header || !band || metrics.length === 0) {
					return;
				}

				gsap.set(header, { autoAlpha: 0, y: 18 });
				gsap.set(band, {
					autoAlpha: 0,
					y: 24,
					scaleY: 0.98,
					transformOrigin: "top center",
				});
				gsap.set(metrics, { autoAlpha: 0, y: 28 });

				const timeline = gsap.timeline({
					scrollTrigger: {
						trigger: section,
						start: "top 72%",
						end: "top 32%",
						toggleActions: "play none none reverse",
						invalidateOnRefresh: true,
					},
				});

				timeline
					.to(header, {
						autoAlpha: 1,
						y: 0,
						duration: 0.32,
						ease: "power2.out",
					})
					.to(
						band,
						{
							autoAlpha: 1,
							y: 0,
							scaleY: 1,
							duration: 0.48,
							ease: "power2.out",
						},
						0.06,
					)
					.to(
						metrics,
						{
							autoAlpha: 1,
							y: 0,
							duration: 0.45,
							stagger: 0.11,
							ease: "power3.out",
						},
						0.14,
					);

				return () => {
					timeline.scrollTrigger?.kill();
					timeline.kill();
				};
			});

			return () => mm.revert();
		},
		{ scope: sectionRef },
	);

	return (
		<section
			id="wait-time"
			ref={sectionRef}
			className="wait-time-section-shell px-4 pt-20 text-[var(--landing-ink)] sm:px-6 sm:pt-24 lg:px-8 lg:pt-32"
		>
			<div className="mx-auto max-w-7xl">
				<header ref={headerRef} className="mb-12 text-center sm:mb-16 lg:mb-20">
					<h2
						className={[
							faqSectionTitleClassName,
							"text-[var(--landing-ink)] lg:text-[clamp(3.05rem,4vw,4.2rem)]",
						].join(" ")}
					>
						The Result
					</h2>
				</header>

				<div
					ref={bandRef}
					className="overflow-hidden border-l border-b border-[var(--landing-border)]"
				>
					<div className="grid lg:grid-cols-3">
						{waitTimeMetrics.map((metric, index) => (
							<WaitTimeMetricCard
								key={metric.label}
								metric={metric}
								forwardedRef={(node) => {
									metricRefs.current[index] = node;
								}}
							/>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
