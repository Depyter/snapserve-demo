export default function HeroSection() {
	return (
		<section
			id="home"
			className="relative isolate overflow-hidden bg-[#fbf8f2]"
		>
			<video
				autoPlay
				disablePictureInPicture
				loop
				muted
				playsInline
				preload="auto"
				poster="/assets/hero.png"
				tabIndex={-1}
				className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center opacity-[0.34] saturate-[0.82]"
			>
				<source src="/assets/background.mp4" type="video/mp4" />
			</video>

			<div
				className="pointer-events-none absolute inset-0"
				style={{
					background:
						"linear-gradient(180deg, rgba(126, 143, 78, 0.28), rgba(126, 143, 78, 0.14))",
				}}
			/>
			<div className="relative mx-auto flex min-h-[100svh] max-w-6xl items-center justify-center px-4 py-16 sm:px-6">
				<div className="flex w-full max-w-4xl flex-col items-center justify-center text-center">
					<h1 className="display-title max-w-[10ch] text-balance text-[clamp(2rem,6.5vw,4.6rem)] font-bold leading-[0.9] tracking-[-0.06em] text-[#291F1E]">
						Scan to order.
					</h1>

					<p className="display-title mt-3 max-w-[14ch] text-balance text-[clamp(2rem,6.5vw,4.6rem)] font-bold leading-[0.9] tracking-[-0.06em] text-[#291F1E]">
						Run better restaurants.
					</p>
				</div>
			</div>
		</section>
	);
}
