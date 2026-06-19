import { mobileEyebrowTextClassName } from "./mobileTypeScale";

export default function TestimonySection() {
	return (
		<section
			id="testimony"
			className="px-4 py-16 text-[var(--landing-ink)] sm:px-6 sm:py-20 lg:px-8 lg:py-24"
		>
			<div className="mx-auto max-w-7xl">
				<blockquote className="mx-auto max-w-4xl rounded-[2rem] border border-[var(--landing-border)] bg-[var(--landing-card)] px-6 py-10 shadow-[0_20px_50px_rgba(32,28,28,0.08)] sm:px-8 sm:py-12 lg:px-12 lg:py-14">
					<p
						className={[
							mobileEyebrowTextClassName,
							"text-[var(--landing-copy-muted)]",
						].join(" ")}
					>
						Placeholder testimony
					</p>

					<p className="display-title mt-5 text-[clamp(1.9rem,4.8vw,3.4rem)] font-bold leading-[0.96] tracking-[-0.05em] text-[var(--landing-ink)]">
						“This is a placeholder quote that can be replaced with a real
						customer testimony.”
					</p>

					<footer className="mt-8 flex flex-col gap-2 border-t border-[var(--landing-border-soft)] pt-5 sm:flex-row sm:items-center sm:justify-between">
						<div>
							<p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[var(--landing-copy-muted)]">
								Sample customer
							</p>
							<p className="mt-1 text-base text-[var(--landing-copy)]">
								Restaurant owner, placeholder
							</p>
						</div>
					</footer>
				</blockquote>
			</div>
		</section>
	);
}
