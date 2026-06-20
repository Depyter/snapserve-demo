import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { type MouseEvent, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { cn } from "#/lib/utils.ts";
import { mainMenuItems } from "#/sections/page/siteNavigation";

type SiteMenuOverlayProps = {
	open: boolean;
	onClose: () => void;
};

export default function SiteMenuOverlay({
	open,
	onClose,
}: SiteMenuOverlayProps) {
	const dialogRef = useRef<HTMLDivElement | null>(null);
	const closeButtonRef = useRef<HTMLButtonElement | null>(null);
	const onCloseRef = useRef(onClose);
	const previousFocusRef = useRef<HTMLElement | null>(null);
	const shouldRestoreFocusRef = useRef(true);
	const menuRowClassName =
		"menu-row grid grid-cols-[auto_1fr_auto] items-end gap-3 border-b border-[#291F1E] py-5 no-underline transition last:border-b-0";
	const interactiveRowClassName = cn(
		menuRowClassName,
		"w-full cursor-pointer text-left hover:opacity-90",
	);

	onCloseRef.current = onClose;

	const closeOverlay = (restoreFocus = true) => {
		shouldRestoreFocusRef.current = restoreFocus;
		onCloseRef.current();
	};

	const focusSectionTarget = (href: string) => {
		const targetId = href.replace(/^#/, "");
		if (!targetId) {
			return;
		}

		requestAnimationFrame(() => {
			const targetElement = document.getElementById(targetId);
			if (!targetElement) {
				return;
			}

			const previousTabIndex = targetElement.getAttribute("tabindex");
			const cleanupFocusability = () => {
				if (previousTabIndex === null) {
					targetElement.removeAttribute("tabindex");
					return;
				}

				targetElement.setAttribute("tabindex", previousTabIndex);
			};
			const prefersReducedMotion = window.matchMedia(
				"(prefers-reduced-motion: reduce)",
			).matches;

			window.history.replaceState(null, "", href);
			if (previousTabIndex === null) {
				targetElement.setAttribute("tabindex", "-1");
			}

			targetElement.focus({ preventScroll: true });
			targetElement.scrollIntoView({
				behavior: prefersReducedMotion ? "auto" : "smooth",
				block: "start",
			});
			targetElement.addEventListener("blur", cleanupFocusability, {
				once: true,
			});
		});
	};

	const handleMenuItemClick = (
		event: MouseEvent<HTMLAnchorElement>,
		href: string,
	) => {
		if (!href.startsWith("#")) {
			closeOverlay(false);
			return;
		}

		event.preventDefault();
		closeOverlay(false);
		focusSectionTarget(href);
	};

	useEffect(() => {
		if (!open) {
			return;
		}

		const dialogElement = dialogRef.current;
		if (!dialogElement) {
			return;
		}

		previousFocusRef.current =
			document.activeElement instanceof HTMLElement
				? document.activeElement
				: null;
		shouldRestoreFocusRef.current = true;
		const bodyStyle = document.body.style;
		const previousOverflow = bodyStyle.overflow;

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				event.preventDefault();
				shouldRestoreFocusRef.current = true;
				onCloseRef.current();
				return;
			}

			if (event.key !== "Tab") {
				return;
			}

			const focusableElements = Array.from(
				dialogElement.querySelectorAll<HTMLElement>(
					'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
				),
			).filter((element) => !element.hasAttribute("disabled"));

			if (focusableElements.length === 0) {
				event.preventDefault();
				dialogElement.focus();
				return;
			}

			const firstFocusableElement = focusableElements[0];
			const lastFocusableElement =
				focusableElements[focusableElements.length - 1];

			if (event.shiftKey && document.activeElement === firstFocusableElement) {
				event.preventDefault();
				lastFocusableElement.focus();
			} else if (
				!event.shiftKey &&
				document.activeElement === lastFocusableElement
			) {
				event.preventDefault();
				firstFocusableElement.focus();
			}
		};

		const bodyChildren = Array.from(document.body.children);
		const siblingState = bodyChildren
			.filter((child) => child !== dialogElement)
			.map((child) => ({
				child,
				ariaHidden: child.getAttribute("aria-hidden"),
				inert: child.hasAttribute("inert"),
			}));

		for (const { child } of siblingState) {
			child.setAttribute("aria-hidden", "true");
			child.setAttribute("inert", "");
		}

		bodyStyle.overflow = "hidden";
		window.addEventListener("keydown", handleKeyDown);
		requestAnimationFrame(() => {
			closeButtonRef.current?.focus();
		});

		return () => {
			bodyStyle.overflow = previousOverflow;
			window.removeEventListener("keydown", handleKeyDown);
			for (const { child, ariaHidden, inert } of siblingState) {
				if (ariaHidden === null) {
					child.removeAttribute("aria-hidden");
				} else {
					child.setAttribute("aria-hidden", ariaHidden);
				}

				if (inert) {
					child.setAttribute("inert", "");
				} else {
					child.removeAttribute("inert");
				}
			}

			if (shouldRestoreFocusRef.current) {
				previousFocusRef.current?.focus();
			}
			previousFocusRef.current = null;
		};
	}, [open]);

	useGSAP(
		() => {
			const dialog = dialogRef.current;
			if (!open || !dialog) return;

			const mm = gsap.matchMedia();

			mm.add("(prefers-reduced-motion: reduce)", () => {
				gsap.set(dialog, { autoAlpha: 1 });
				gsap.set(".menu-card", { scale: 1, autoAlpha: 1, y: 0 });
				gsap.set(".menu-row", { y: 0, autoAlpha: 1 });
				return () => {};
			});

			mm.add("(prefers-reduced-motion: no-preference)", () => {
				const rows = gsap.utils.toArray<HTMLElement>(".menu-row", dialog);

				gsap.fromTo(
					dialog,
					{ autoAlpha: 0 },
					{ autoAlpha: 1, duration: 0.3, ease: "power3.out" },
				);

				const card = dialog.querySelector<HTMLElement>(".menu-card");
				if (card) {
					gsap.fromTo(
						card,
						{ scale: 0.95, autoAlpha: 0, y: 20 },
						{
							scale: 1,
							autoAlpha: 1,
							y: 0,
							duration: 0.45,
							ease: "power3.out",
							delay: 0.05,
						},
					);
				}

				gsap.fromTo(
					rows,
					{ y: 20, autoAlpha: 0 },
					{
						y: 0,
						autoAlpha: 1,
						stagger: 0.06,
						duration: 0.45,
						ease: "power3.out",
						delay: 0.15,
					},
				);

				return () => {};
			});

			return () => mm.revert();
		},
		{ dependencies: [open], scope: dialogRef, revertOnUpdate: true },
	);

	if (!open || typeof document === "undefined") {
		return null;
	}

	return createPortal(
		<div
			id="main-menu"
			ref={dialogRef}
			role="dialog"
			aria-modal="true"
			aria-label="Main menu"
			tabIndex={-1}
			className={cn(
				"fixed inset-0 z-[60] overflow-y-auto overscroll-contain transition duration-300 ease-out",
			)}
			onKeyDown={(event) => {
				if (
					(event.key === "Enter" || event.key === " ") &&
					event.target === event.currentTarget
				) {
					event.preventDefault();
					closeOverlay();
				}
			}}
			onClick={(event) => {
				if (event.target === event.currentTarget) {
					closeOverlay();
				}
			}}
		>
			<section className="min-h-full bg-[#7E8F4E] px-4 py-16 sm:px-6 sm:py-20">
				<div className="mx-auto flex min-h-full max-w-4xl flex-col justify-center">
					<div className="menu-card w-full rounded-[2rem] bg-[#f5ead4] p-4 shadow-[0_24px_80px_rgba(31,36,17,0.16)] sm:p-6">
						<div className="rounded-[1.6rem] border border-[#291F1E] px-6 py-10 text-[#291F1E] sm:px-12 sm:py-14">
							<div className="text-center">
								<p className="text-[0.68rem] font-semibold uppercase tracking-[0.42em] text-[#291F1E]">
									Cube Tech Innovations
								</p>
								<div className="mx-auto mt-4 h-px w-16 bg-[#291F1E]" />
								<h2 className="display-title mt-5 text-4xl font-bold tracking-tight text-[#291F1E] sm:text-6xl">
									Main Menu
								</h2>
							</div>

							<div className="mt-6">
								<button
									ref={closeButtonRef}
									type="button"
									onClick={() => closeOverlay()}
									aria-label="Back to site"
									className={interactiveRowClassName}
								>
									<div>
										<p className="text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-[#291F1E]/70">
											Return to site
										</p>
										<h3 className="display-title mt-1 text-3xl font-bold text-[#7E8F4E] sm:text-[2.6rem]">
											Back
										</h3>
									</div>
									<div className="mb-[0.42rem] border-b border-dotted border-[#291F1E]/55" />
									<span className="text-sm font-semibold tracking-[0.18em] text-[#291F1E]">
										00
									</span>
								</button>

								{mainMenuItems.map((item, index) => (
									<a
										key={item.href}
										href={item.href}
										onClick={(event) => handleMenuItemClick(event, item.href)}
										className={interactiveRowClassName}
									>
										<div>
											<p className="text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-[#291F1E]/70">
												{item.note}
											</p>
											<h3 className="display-title mt-1 text-3xl font-bold sm:text-[2.6rem]">
												{item.label}
											</h3>
										</div>
										<div className="mb-[0.42rem] border-b border-dotted border-[#291F1E]/55" />
										<span className="text-sm font-semibold tracking-[0.18em] text-[#291F1E]">
											0{index + 1}
										</span>
									</a>
								))}
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>,
		document.body,
	);
}
