import { useEffect, useRef } from "react";
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
	const backButtonRef = useRef<HTMLButtonElement | null>(null);
	const menuRowClassName =
		"grid grid-cols-[auto_1fr_auto] items-end gap-3 border-b border-[#291F1E] py-5 no-underline transition last:border-b-0";
	const interactiveRowClassName = cn(
		menuRowClassName,
		"w-full cursor-pointer text-left hover:opacity-90",
	);

	useEffect(() => {
		if (!open) {
			return;
		}

		const bodyStyle = document.body.style;
		const previousOverflow = bodyStyle.overflow;

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				onClose();
			}
		};

		bodyStyle.overflow = "hidden";
		window.addEventListener("keydown", handleKeyDown);
		requestAnimationFrame(() => {
			backButtonRef.current?.focus();
		});

		return () => {
			bodyStyle.overflow = previousOverflow;
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [onClose, open]);

	return (
		<div
			aria-hidden={!open}
			id="main-menu"
			role="dialog"
			aria-modal="true"
			aria-label="Main menu"
			className={cn(
				"fixed inset-0 z-[60] overflow-y-auto overscroll-contain transition duration-300 ease-out",
				open ? "opacity-100" : "pointer-events-none opacity-0",
			)}
			onClick={(event) => {
				if (event.target === event.currentTarget) {
					onClose();
				}
			}}
		>
			<section className="min-h-full bg-[#7E8F4E] px-4 py-16 sm:px-6 sm:py-20">
				<div className="mx-auto flex min-h-full max-w-4xl flex-col justify-center">
					<div className="w-full rounded-[2rem] bg-[#f5ead4] p-4 shadow-[0_24px_80px_rgba(31,36,17,0.16)] sm:p-6">
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
									ref={backButtonRef}
									type="button"
									onClick={onClose}
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
										onClick={onClose}
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
		</div>
	);
}
