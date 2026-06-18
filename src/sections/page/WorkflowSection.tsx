import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { startTransition, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const workflowSteps = [
	{
		id: "table",
		title: "Table QR",
		eyebrow: "Guest Side",
		heading: "Guests scan, browse, and order.",
		description:
			"Customers open the digital menu from a table QR code and send orders directly from their own phones.",
		image: "/assets/table.png",
	},
	{
		id: "waiter",
		title: "Waiter View",
		eyebrow: "Floor Side",
		heading: "Orders reach the floor instantly.",
		description:
			"Waiters can track table activity, order statuses, and requests without relying on handwritten notes.",
		image: "/assets/waiter.png",
	},
	{
		id: "kitchen",
		title: "Kitchen View",
		eyebrow: "Prep Side",
		heading: "The kitchen knows what to prepare.",
		description:
			"Incoming orders appear in a clear kitchen queue so staff can prepare faster and miss fewer items.",
		image: "/assets/kitchen.png",
	},
	{
		id: "owner",
		title: "Owner Dashboard",
		eyebrow: "Business Side",
		heading: "Owners see the restaurant clearly.",
		description:
			"Track orders, manage menu updates, and review restaurant activity from a simple dashboard.",
		image: "/assets/admin.png",
	},
] as const;

type WorkflowStep = (typeof workflowSteps)[number];

function SectionHeader() {
	return (
		<header className="mx-auto max-w-[1480px]">
			<h2 className="display-title mt-6 text-5xl font-bold tracking-[-0.06em] text-[#201c1c] md:text-6xl lg:text-7xl">
				From Table to Kitchen
			</h2>
		</header>
	);
}

function WorkflowVisual({ step }: { step: WorkflowStep }) {
	return (
		<div className="relative flex h-full items-center justify-center">
			<img
				src={step.image}
				alt={step.title}
				className="relative h-auto max-h-[78vh] w-full object-contain object-center drop-shadow-[0_10px_24px_rgba(32,28,28,0.08)]"
			/>
		</div>
	);
}

function MobileWorkflowCard({
	step,
	index,
}: {
	step: WorkflowStep;
	index: number;
}) {
	return (
		<article className="rounded-[2rem] border border-[#201c1c]/12 bg-[#f8f5f0] p-5 shadow-[0_18px_40px_rgba(32,28,28,0.06)]">
			<div className="flex items-start justify-between gap-4">
				<div>
					<p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#1D43DA]">
						{step.eyebrow}
					</p>
					<h3 className="mt-3 text-3xl font-semibold tracking-[-0.06em] text-[#201c1c]">
						{step.title}
					</h3>
				</div>
				<p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7f7771]">
					{String(index + 1).padStart(2, "0")}
				</p>
			</div>
			<p className="display-title mt-5 text-2xl font-bold leading-tight tracking-[-0.04em] text-[#201c1c]">
				{step.heading}
			</p>
			<p className="mt-4 text-sm leading-7 text-[#5c5551]">
				{step.description}
			</p>
			<div className="mt-6 min-h-[300px] overflow-hidden rounded-[1.6rem]">
				<WorkflowVisual step={step} />
			</div>
		</article>
	);
}

export default function WorkflowSection() {
	const sectionRef = useRef<HTMLElement | null>(null);
	const copyRef = useRef<HTMLDivElement | null>(null);
	const visualRefs = useRef<Array<HTMLDivElement | null>>([]);
	const activeIndexRef = useRef(0);
	const [activeIndex, setActiveIndex] = useState(0);
	const activeStep = workflowSteps[activeIndex];

	useGSAP(
		(_, contextSafe) => {
			const mm = gsap.matchMedia();
			const animateToStep = contextSafe((nextIndex: number) => {
				visualRefs.current.forEach((el, index) => {
					if (!el) {
						return;
					}

					gsap.to(el, {
						autoAlpha: index === nextIndex ? 1 : 0,
						y: index === nextIndex ? 0 : 26,
						scale: index === nextIndex ? 1 : 0.985,
						duration: 0.38,
						ease: "power2.out",
						overwrite: true,
					});
				});
			});

			mm.add("(min-width: 1024px)", () => {
				visualRefs.current.forEach((el, index) => {
					if (!el) {
						return;
					}

					gsap.set(el, {
						autoAlpha: index === 0 ? 1 : 0,
						y: index === 0 ? 0 : 26,
						scale: index === 0 ? 1 : 0.985,
					});
				});

				ScrollTrigger.create({
					trigger: sectionRef.current,
					start: "top top",
					end: `+=${workflowSteps.length * 850}`,
					pin: true,
					scrub: 1,
					onUpdate: (self) => {
						const nextIndex = Math.min(
							workflowSteps.length - 1,
							Math.floor(self.progress * workflowSteps.length),
						);

						if (nextIndex === activeIndexRef.current) {
							return;
						}

						activeIndexRef.current = nextIndex;
						animateToStep(nextIndex);
						startTransition(() => setActiveIndex(nextIndex));
					},
				});
			});

			return () => mm.revert();
		},
		{ scope: sectionRef },
	);

	useGSAP(
		() => {
			if (!copyRef.current) {
				return;
			}

			gsap.fromTo(
				copyRef.current,
				{ autoAlpha: 0, y: 18 },
				{ autoAlpha: 1, y: 0, duration: 0.35, ease: "power2.out" },
			);
		},
		{
			scope: sectionRef,
			dependencies: [activeIndex],
			revertOnUpdate: true,
		},
	);

	return (
		<section className="bg-[#f5f2ed] px-4 py-20 text-[#201c1c] sm:px-6 lg:px-8">
			<SectionHeader />

			<div className="mx-auto mt-14 max-w-[1480px] lg:hidden">
				<div className="space-y-5">
					{workflowSteps.map((step, index) => (
						<MobileWorkflowCard key={step.id} step={step} index={index} />
					))}
				</div>
			</div>

			<div
				ref={sectionRef}
				className="mx-auto mt-14 hidden max-w-[1480px] lg:block"
			>
				<div className="grid min-h-screen grid-cols-[0.86fr_1.14fr] gap-10 border-y border-[#201c1c]/18">
					<aside className="flex min-h-screen flex-col border-r border-[#201c1c]/18 py-8 pr-8">
						<div className="space-y-6">
							{workflowSteps.map((step, index) => {
								const active = index === activeIndex;

								return (
									<div
										key={step.id}
										className={[
											"transition-colors duration-300",
											active ? "text-[#1D43DA]" : "text-[#9d9692]",
										].join(" ")}
									>
										<p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-current/60">
											{String(index + 1).padStart(2, "0")}
										</p>
										<p
											className={[
												"mt-2 text-5xl leading-[0.92] xl:text-7xl",
												active
													? "display-title font-bold tracking-[-0.05em]"
													: "font-semibold tracking-[-0.08em]",
											].join(" ")}
										>
											{active ? "→ " : null}
											{step.title}
										</p>
									</div>
								);
							})}
						</div>

						<div
							ref={copyRef}
							key={activeStep.id}
							className="mt-12 border-t border-[#201c1c]/18 pt-6"
						>
							<p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#1D43DA]">
								{activeStep.eyebrow}
							</p>
							<h3 className="display-title mt-4 text-4xl font-bold leading-[1.02] tracking-[-0.05em] text-[#201c1c] xl:text-5xl">
								{activeStep.heading}
							</h3>
							<p className="mt-5 max-w-md text-lg leading-8 tracking-[-0.03em] text-[#4f4946]">
								{activeStep.description}
							</p>
						</div>

						<div className="mt-auto pt-8">
							<div className="mb-4 h-px w-40 bg-[#201c1c]/24" />
							<p className="text-sm tracking-[-0.03em] text-[#5c5551]">
								Scroll through the service flow.
							</p>
						</div>
					</aside>

					<div className="relative flex min-h-screen items-center py-8 pl-2">
						{workflowSteps.map((step, index) => (
							<div
								key={step.id}
								ref={(el) => {
									visualRefs.current[index] = el;
								}}
								className="absolute inset-0 flex items-center"
							>
								<WorkflowVisual step={step} />
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
