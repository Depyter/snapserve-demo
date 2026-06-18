export default function HeroSection() {
	return (
		<section className="min-h-[100svh] px-4 py-12 sm:px-6 sm:py-16">
			<div className="mx-auto grid min-h-[100svh] max-w-6xl items-center gap-12 lg:grid-cols-[minmax(0,1fr)_24rem] lg:gap-16">
				<div className="max-w-xl text-center lg:text-left">
					<h1 className="display-title text-6xl font-bold tracking-tight text-[#1D43DA] sm:text-8xl md:text-[8.5rem]">
						SnapServe
					</h1>
					<p className="mt-6 text-balance text-3xl leading-[0.98] font-semibold tracking-[-0.03em] text-[#291F1E] sm:text-4xl md:text-[3.4rem]">
						scan to order.
						<br />
						run better
						<br />
						restaurants.
					</p>
					<button
						type="button"
						className="group mt-8 inline-flex items-center gap-3 rounded-full border border-[#1D43DA] bg-white px-4 py-3 pr-6 text-sm font-semibold tracking-[0.14em] text-[#1D43DA] uppercase transition hover:bg-[#1D43DA] hover:text-white"
					>
						<span className="display-title flex h-9 w-9 items-center justify-center rounded-full bg-[#1D43DA] text-lg font-bold normal-case text-white transition group-hover:bg-white group-hover:text-[#1D43DA]">
							→
						</span>
						Request a Demo
					</button>
				</div>

				<div className="relative mx-auto w-full max-w-[22rem]">
					<div className="pointer-events-none absolute inset-x-6 bottom-2 h-16 rounded-full bg-[radial-gradient(circle,rgba(29,67,218,0.14),transparent_72%)] blur-2xl" />
					<img
						src="/assets/hero.png"
						alt="SnapServe mobile ordering interface"
						className="relative w-full rounded-[2.4rem] shadow-[0_30px_80px_rgba(24,28,40,0.16)]"
					/>
				</div>
			</div>
		</section>
	);
}
