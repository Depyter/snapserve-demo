import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

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
					const step5 = container.children[5] as HTMLElement;
					if (!step5) return 0;

					const containerRect = container.getBoundingClientRect();
					const step5Rect = step5.getBoundingClientRect();

					// Get current translate X of container to calculate untransformed layout
					const style = window.getComputedStyle(container);
					const matrix = new DOMMatrix(style.transform);
					const currentTranslateX = matrix.e;

					const step5Left =
						step5Rect.left - containerRect.left - currentTranslateX;
					const step5Center = step5Left + step5Rect.width / 2;

					const targetX = step5Center - window.innerWidth / 2;
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
			<div className="lg:hidden mx-auto max-w-2xl px-6 py-24">
				<div className="mb-20">
					<h2 className="display-title text-5xl font-bold leading-[0.92] tracking-[-0.06em] text-[#201c1c] md:text-6xl">
						Setup your restaurant&apos;s ordering flow.
					</h2>
					<p className="mt-6 text-lg leading-8 text-[#4f4946]">
						Get started in three simple steps. We handle the heavy lifting so
						you can focus on your guests.
					</p>
				</div>

				<div className="space-y-20">
					{/* Step 1 */}
					<div>
						<span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#1D43DA] md:text-sm">
							Step 01
						</span>
						<h3 className="display-title mt-4 text-4xl font-bold tracking-[-0.04em] text-[#201c1c] md:text-5xl">
							Choose a plan
						</h3>
						<p className="mt-5 text-base leading-7 text-[#4f4946] md:text-lg">
							Pick the SnapServe tier that matches your restaurant.
						</p>
					</div>

					{/* Step 2 */}
					<div>
						<span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#1D43DA] md:text-sm">
							Step 02
						</span>
						<h3 className="display-title mt-4 text-4xl font-bold tracking-[-0.04em] text-[#201c1c] md:text-5xl">
							Send your menu
						</h3>
						<p className="mt-5 text-base leading-7 text-[#4f4946] md:text-lg">
							Share your dishes, tables, and service details with us.
						</p>
					</div>

					{/* Step 3 */}
					<div>
						<span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#1D43DA] md:text-sm">
							Step 03
						</span>
						<h3 className="display-title mt-4 text-4xl font-bold tracking-[-0.04em] text-[#201c1c] md:text-5xl">
							We prepare the system
						</h3>
						<p className="mt-5 text-base leading-7 text-[#4f4946] md:text-lg">
							We&apos;ll prepare your QR menu, ordering dashboard, waiter view,
							and kitchen queue.
						</p>
					</div>

					{/* Step 4 */}
					<div>
						<span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#1D43DA] md:text-sm">
							Step 04
						</span>
						<h3 className="display-title mt-4 text-4xl font-bold tracking-[-0.04em] text-[#201c1c] md:text-5xl">
							Schedule a call
						</h3>
						<p className="mt-5 text-base leading-7 text-[#4f4946] md:text-lg">
							Ready to transform your service? Let&apos;s discuss your menu and
							schedule your onboarding launch.
						</p>
						<button
							type="button"
							className="group mt-6 inline-flex items-center gap-4 rounded-full border border-[#1D43DA] bg-white px-3 py-2 pr-5 text-xs font-semibold uppercase tracking-[0.14em] text-[#1D43DA] transition hover:bg-[#1D43DA] hover:text-white cursor-pointer"
						>
							<span className="display-title flex h-8 w-8 items-center justify-center rounded-full bg-[#1D43DA] text-sm font-bold normal-case text-white transition group-hover:bg-white group-hover:text-[#1D43DA]">
								&rarr;
							</span>
							Schedule a Call
						</button>
					</div>

					{/* FAQ Hint */}
					<div>
						<span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#1D43DA] md:text-sm">
							FAQ
						</span>
						<h3 className="display-title mt-4 text-4xl font-bold tracking-[-0.04em] text-[#201c1c] md:text-5xl">
							Have a question?
						</h3>
						<p className="mt-5 text-base leading-7 text-[#4f4946] md:text-lg">
							Take a look at our frequently asked questions below to find
							answers about setup, menus, billing, and more.
						</p>
					</div>
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
						<h2 className="display-title text-7xl font-bold leading-[0.9] tracking-[-0.06em] text-[#201c1c] md:text-8xl xl:text-[7.2rem]">
							Setup your restaurant&apos;s ordering flow.
						</h2>
						<p className="mt-8 text-xl leading-9 tracking-[-0.03em] text-[#4f4946] max-w-xl xl:text-2xl xl:leading-10">
							Get started in three simple steps. We handle the heavy lifting so
							you can focus on your guests.
						</p>
					</div>

					{/* Step 1 */}
					<div className="w-[550px] xl:w-[650px] flex-shrink-0 flex flex-col justify-center">
						<span className="text-sm font-semibold tracking-[0.25em] uppercase text-[#1D43DA] xl:text-base">
							Step 01
						</span>
						<h3 className="display-title mt-8 text-6xl font-bold leading-[0.92] tracking-[-0.05em] text-[#201c1c] md:text-7xl xl:text-[6.2rem]">
							Choose a plan
						</h3>
						<p className="mt-8 text-lg leading-8 text-[#4f4946] max-w-md xl:text-xl xl:leading-9">
							Pick the SnapServe tier that matches your restaurant.
						</p>
					</div>

					{/* Step 2 */}
					<div className="w-[550px] xl:w-[650px] flex-shrink-0 flex flex-col justify-center">
						<span className="text-sm font-semibold tracking-[0.25em] uppercase text-[#1D43DA] xl:text-base">
							Step 02
						</span>
						<h3 className="display-title mt-8 text-6xl font-bold leading-[0.92] tracking-[-0.05em] text-[#201c1c] md:text-7xl xl:text-[6.2rem]">
							Send your menu
						</h3>
						<p className="mt-8 text-lg leading-8 text-[#4f4946] max-w-md xl:text-xl xl:leading-9">
							Share your dishes, tables, and service details with us.
						</p>
					</div>

					{/* Step 3 */}
					<div className="w-[550px] xl:w-[650px] flex-shrink-0 flex flex-col justify-center">
						<span className="text-sm font-semibold tracking-[0.25em] uppercase text-[#1D43DA] xl:text-base">
							Step 03
						</span>
						<h3 className="display-title mt-8 text-6xl font-bold leading-[0.92] tracking-[-0.05em] text-[#201c1c] md:text-7xl xl:text-[6.2rem]">
							We prepare the system
						</h3>
						<p className="mt-8 text-lg leading-8 text-[#4f4946] max-w-md xl:text-xl xl:leading-9">
							We&apos;ll prepare your QR menu, ordering dashboard, waiter view,
							and kitchen queue.
						</p>
					</div>

					{/* Step 4 */}
					<div className="w-[550px] xl:w-[650px] flex-shrink-0 flex flex-col justify-center items-start">
						<span className="text-sm font-semibold tracking-[0.25em] uppercase text-[#1D43DA] xl:text-base">
							Step 04
						</span>
						<h3 className="display-title mt-8 text-6xl font-bold leading-[0.92] tracking-[-0.05em] text-[#201c1c] md:text-7xl xl:text-[6.2rem]">
							Schedule a call
						</h3>
						<p className="mt-8 text-lg leading-8 text-[#4f4946] max-w-md xl:text-xl xl:leading-9">
							Ready to transform your service? Let&apos;s discuss your menu and
							schedule your onboarding launch.
						</p>
						<button
							type="button"
							className="group mt-8 inline-flex items-center gap-4 rounded-full border border-[#1D43DA] bg-[#f5f2ed]/92 px-4 py-3 pr-6 text-sm font-semibold uppercase tracking-[0.14em] text-[#1D43DA] transition hover:bg-[#1D43DA] hover:text-white cursor-pointer"
						>
							<span className="display-title flex h-11 w-11 items-center justify-center rounded-full bg-[#1D43DA] text-xl font-bold normal-case text-white transition group-hover:bg-white group-hover:text-[#1D43DA]">
								&rarr;
							</span>
							Schedule a Call
						</button>
					</div>

					{/* FAQ Hint */}
					<div className="w-[550px] xl:w-[650px] flex-shrink-0 flex flex-col justify-center">
						<span className="text-sm font-semibold tracking-[0.25em] uppercase text-[#1D43DA] xl:text-base">
							FAQ
						</span>
						<h3 className="display-title mt-8 text-6xl font-bold leading-[0.92] tracking-[-0.05em] text-[#201c1c] md:text-7xl xl:text-[6.2rem]">
							Have a question?
						</h3>
						<p className="mt-8 text-lg leading-8 text-[#4f4946] max-w-md xl:text-xl xl:leading-9">
							Take a look at our frequently asked questions below to find
							answers about setup, menus, billing, and more.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
