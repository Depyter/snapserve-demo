import { useEffect, useState } from "react";
import { faqSectionTitleClassName } from "./mobileTypeScale";

type Testimonial = {
	quote: string;
	name: string;
	role: string;
};

const testimonials: readonly Testimonial[] = [
	{
		quote:
			"Guests feel less stuck after ordering because the wait feels visible.",
		name: "Janine Santos",
		role: "Manager, Noon Market Cafe (BGC)",
	},
	{
		quote:
			"Customers love not having to wave down servers for every single side dish refill; they just tap and wait.",
		name: "Marc Espiritu",
		role: "Floor Manager, Romantic Babidi (Quezon City)",
	},
	{
		quote:
			"No more shouting over the music or fighting for the bartender's attention. Orders go straight to the kitchen, and bills get settled instantly.",
		name: "Kylie Alcantara",
		role: "Operations Lead, Tipsy Pig Gastropub (Pasig)",
	},
	{
		quote:
			"Big Filipino families can order at their own pace without the server awkwardly standing there for 10 minutes while everyone decides.",
		name: "Chef Ruel Villanueva",
		role: "Owner, Manam Comfort Filipino (Makati)",
	},
	{
		quote:
			"Our digital-first customers love browsing the aesthetic menu. Table turnover increased by 25% because ordering is seamless.",
		name: "Chloe Mendoza",
		role: "Head Barista/Owner, Wildflour Cafe + Bakery (Rockwell)",
	},
	{
		quote:
			"When the weekend crowd hits, the QR menu saves our staff. Guests see exactly what's available in real-time, preventing disappointed orders.",
		name: "Mang Jun Belmonte",
		role: "Supervisor, Dampa Express (Pasay)",
	},
	{
		quote:
			"With fewer staff on the graveyard shift, the QR codes handle 80% of the ordering. Our team just focuses on serving hot food fast.",
		name: "Aris de Leon",
		role: "Night Shift Supervisor, Recovery Food (BGC)",
	},
	{
		quote:
			"It completely eliminated order mix-ups. What they select on their phones is exactly what the kitchen prepares. Zero wastage.",
		name: "Nikki Gopez",
		role: "Branch Manager, Wing Zone (Manila)",
	},
	{
		quote:
			"Even our older regular clients adapted quickly. It freed up our servers to actually converse with guests rather than just writing down orders.",
		name: "Teresa Araneta",
		role: "General Manager, Aristocrat Restaurant (Roxas Blvd)",
	},
	{
		quote:
			"During the lunch rush, every second counts. Guests sit down, scan, pay via GCash, and eat. It's the fastest checkout we've ever had.",
		name: "Paolo Reyes",
		role: "Store Manager, Mary Grace Cafe (SM Megamall)",
	},
];

const marqueePasses = [
	{
		key: "primary",
		isDuplicate: false,
	},
	{
		key: "duplicate",
		isDuplicate: true,
	},
] as const;

function TestimonialCard({
	testimonial,
	className = "",
}: {
	testimonial: Testimonial;
	className?: string;
}) {
	return (
		<article
			className={[
				"rounded-[2rem] border border-[var(--landing-border)] bg-white p-6 text-left shadow-[0_20px_50px_rgba(32,28,28,0.08)] sm:p-7 lg:shadow-none",
				className,
			].join(" ")}
		>
			<p className="display-title text-[1.35rem] leading-[1.04] tracking-[-0.045em] text-[var(--landing-ink)] sm:text-[1.55rem]">
				&ldquo;{testimonial.quote}&rdquo;
			</p>
			<footer className="mt-7 border-t border-[var(--landing-border-soft)] pt-4">
				<p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[var(--landing-copy-muted)]">
					{testimonial.name}
				</p>
				<p className="mt-1 text-sm text-[var(--landing-copy)] sm:text-base">
					{testimonial.role}
				</p>
			</footer>
		</article>
	);
}

export default function TestimonySection() {
	const [activeIndex, setActiveIndex] = useState(0);
	const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
	const [isMarqueePauseLocked, setIsMarqueePauseLocked] = useState(false);
	const [isMarqueePointerPaused, setIsMarqueePointerPaused] = useState(false);

	useEffect(() => {
		if (typeof window === "undefined") {
			return;
		}

		const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
		const syncMotionPreference = () => {
			setPrefersReducedMotion(mediaQuery.matches);
		};

		syncMotionPreference();

		if (typeof mediaQuery.addEventListener === "function") {
			mediaQuery.addEventListener("change", syncMotionPreference);
			return () => {
				mediaQuery.removeEventListener("change", syncMotionPreference);
			};
		}

		mediaQuery.addListener(syncMotionPreference);
		return () => {
			mediaQuery.removeListener(syncMotionPreference);
		};
	}, []);

	useEffect(() => {
		if (typeof window === "undefined" || prefersReducedMotion) {
			return;
		}

		const nextIndex = (activeIndex + 1) % testimonials.length;
		const timeoutId = window.setTimeout(() => {
			setActiveIndex(nextIndex);
		}, 4200);

		return () => {
			window.clearTimeout(timeoutId);
		};
	}, [activeIndex, prefersReducedMotion]);

	const isDesktopMarqueePaused = isMarqueePauseLocked || isMarqueePointerPaused;

	const handleMobileSelect = (index: number) => {
		setActiveIndex(index);
	};

	return (
		<section
			id="testimony"
			className="testimony-section-shell px-4 py-24 text-[var(--landing-ink)] sm:px-6 sm:py-28 lg:px-8 lg:py-48"
		>
			<div className="mx-auto max-w-7xl">
				<div className="mx-auto max-w-4xl text-center">
					<h2
						className={[
							faqSectionTitleClassName,
							"text-[var(--landing-ink)] lg:text-[clamp(3.05rem,4vw,4.2rem)]",
						].join(" ")}
					>
						What Restaurant Operators Say
					</h2>
				</div>

				<div className="mt-8 lg:hidden">
					<TestimonialCard
						key={testimonials[activeIndex].name}
						testimonial={testimonials[activeIndex]}
						className={prefersReducedMotion ? "" : "rise-in"}
					/>

					<div className="mt-5 flex justify-center gap-2">
						{testimonials.map((testimonial, index) => (
							<button
								key={testimonial.name}
								type="button"
								aria-label={`Show testimony ${index + 1}`}
								aria-pressed={index === activeIndex}
								onClick={() => handleMobileSelect(index)}
								className={[
									"h-2.5 rounded-full transition",
									index === activeIndex
										? "w-8 bg-[var(--landing-ink)]"
										: "w-2.5 bg-[var(--landing-border)]",
								].join(" ")}
							/>
						))}
					</div>
				</div>

				<div className="mt-12 hidden lg:block">
					<div className="testimony-marquee-toolbar">
						<button
							type="button"
							aria-pressed={isMarqueePauseLocked}
							aria-controls="testimony-marquee-track"
							onClick={() => setIsMarqueePauseLocked((current) => !current)}
							className="testimony-marquee-toggle"
						>
							{isMarqueePauseLocked ? "Resume marquee" : "Pause marquee"}
						</button>
					</div>

					<div
						className="testimony-marquee-shell w-full"
						data-paused={isDesktopMarqueePaused ? "true" : undefined}
						data-pointer-paused={isMarqueePointerPaused ? "true" : undefined}
						onPointerDown={() => setIsMarqueePointerPaused(true)}
						onPointerUp={() => setIsMarqueePointerPaused(false)}
						onPointerLeave={() => setIsMarqueePointerPaused(false)}
						onPointerCancel={() => setIsMarqueePointerPaused(false)}
					>
						<div
							id="testimony-marquee-track"
							className="testimony-marquee-track"
						>
							{marqueePasses.map(({ key, isDuplicate }) => (
								<div
									key={key}
									className="testimony-marquee-group"
									aria-hidden={isDuplicate || undefined}
								>
									{testimonials.map((testimonial) => (
										<TestimonialCard
											key={`${testimonial.name}-${key}`}
											testimonial={testimonial}
											className="testimony-card"
										/>
									))}
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
