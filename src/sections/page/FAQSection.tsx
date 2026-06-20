import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";
import {
	faqQuestionTitleClassName,
	faqSectionTitleClassName,
} from "./mobileTypeScale";

const faqItems = [
	{
		id: "setup",
		question: "How long does SnapServe take to set up?",
		answer:
			"Once your menu, table count, and staff roles are in, the system can be prepared quickly for review before launch.",
	},
	{
		id: "hardware",
		question: "Do we need extra hardware to run it?",
		answer:
			"Guests only need their phones to scan and order. Staff can run waiter, kitchen, and owner views from the devices already available in the restaurant.",
	},
	{
		id: "staff",
		question: "Can waiters and kitchen staff use separate views?",
		answer:
			"Yes. SnapServe separates the guest flow from floor and kitchen operations so each side sees the updates relevant to service.",
	},
	{
		id: "tables",
		question: "Can each table have its own QR code?",
		answer:
			"Yes. Table-specific QR codes help the order reach the right part of the floor flow instead of forcing staff to sort everything manually.",
	},
	{
		id: "sales",
		question: "Will the owner still be able to track sales and activity?",
		answer:
			"The owner dashboard gives a cleaner view of orders, menu performance, and day-to-day activity without relying on handwritten tracking.",
	},
	{
		id: "menu",
		question: "What happens when prices or dishes change?",
		answer:
			"Your menu can be updated digitally, so you can adjust availability, pricing, and item details without reprinting a physical menu set.",
	},
] as const;

type FaqItem = (typeof faqItems)[number];

export default function FAQSection() {
	const [openId, setOpenId] = useState<FaqItem["id"]>(faqItems[0].id);
	const sectionRef = useRef<HTMLElement | null>(null);
	const panelRefs = useRef<Array<HTMLElement | null>>([]);
	const horizontalRefs = useRef<Array<HTMLSpanElement | null>>([]);
	const verticalRefs = useRef<Array<HTMLSpanElement | null>>([]);

	useGSAP(
		() => {
			const reduceMotion = window.matchMedia(
				"(prefers-reduced-motion: reduce)",
			).matches;

			faqItems.forEach((item, index) => {
				const isOpen = item.id === openId;
				const panel = panelRefs.current[index];
				const horizontal = horizontalRefs.current[index];
				const vertical = verticalRefs.current[index];

				if (!panel || !horizontal || !vertical) {
					return;
				}

				if (reduceMotion) {
					gsap.set(panel, { height: isOpen ? "auto" : 0 });
					gsap.set(horizontal, { scaleX: 1 });
					gsap.set(vertical, { scaleY: isOpen ? 0 : 1 });
					return;
				}

				gsap.to(horizontal, {
					scaleX: isOpen ? 1.08 : 1,
					duration: 0.22,
					ease: "power2.out",
					overwrite: true,
				});

				gsap.to(panel, {
					height: isOpen ? "auto" : 0,
					duration: isOpen ? 0.56 : 0.36,
					ease: isOpen ? "power3.out" : "power2.inOut",
					overwrite: true,
				});

				gsap.to(vertical, {
					scaleY: isOpen ? 0 : 1,
					duration: 0.24,
					ease: "power2.out",
					transformOrigin: "center center",
					overwrite: true,
				});
			});
		},
		{
			scope: sectionRef,
			dependencies: [openId],
		},
	);

	return (
		<section
			id="faq"
			ref={sectionRef}
			className="faq-section-shell overflow-hidden px-4 py-20 sm:px-6 lg:px-8 lg:rounded-t-[2.5rem]"
		>
			<div className="mx-auto max-w-7xl">
				<header className="max-w-4xl">
					<h2 className={["faq-title", faqSectionTitleClassName].join(" ")}>
						FAQs
					</h2>
				</header>

				<div className="faq-divider mt-8 border-t">
					{faqItems.map((item, index) => {
						const isOpen = item.id === openId;
						const panelId = `faq-panel-${item.id}`;
						const buttonId = `faq-trigger-${item.id}`;

						return (
							<article
								key={item.id}
								data-state={isOpen ? "open" : "closed"}
								className="faq-item border-b py-4 sm:py-5"
							>
								<button
									id={buttonId}
									type="button"
									aria-controls={panelId}
									aria-expanded={isOpen}
									onClick={() => setOpenId(item.id)}
									className="flex w-full items-start justify-between gap-5 text-left sm:gap-8"
								>
									<span className="min-w-0 flex-1">
										<span
											className={[
												"faq-question block",
												faqQuestionTitleClassName,
											].join(" ")}
										>
											{item.question}
										</span>
									</span>

									<span
										aria-hidden="true"
										className={[
											"faq-toggle-circle relative mt-1 flex h-[1em] w-[1em] shrink-0 items-center justify-center rounded-full border-2",
											faqQuestionTitleClassName,
										].join(" ")}
									>
										<span
											ref={(element) => {
												horizontalRefs.current[index] = element;
											}}
											className="faq-toggle-line absolute h-[0.12em] w-[0.58em] rounded-full"
										/>
										<span
											ref={(element) => {
												verticalRefs.current[index] = element;
											}}
											className="faq-toggle-line absolute h-[0.58em] w-[0.12em] rounded-full"
										/>
									</span>
								</button>

								<section
									id={panelId}
									aria-labelledby={buttonId}
									ref={(element) => {
										panelRefs.current[index] = element;
									}}
									className="h-0 overflow-hidden"
								>
									<div className="faq-answer-copy max-w-3xl pt-4 text-base leading-8 font-medium sm:pt-5 sm:text-lg">
										{item.answer}
									</div>
								</section>
							</article>
						);
					})}
				</div>
			</div>
		</section>
	);
}
