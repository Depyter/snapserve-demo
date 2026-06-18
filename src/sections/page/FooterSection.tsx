import { Facebook, Instagram, Linkedin, Mail } from "lucide-react";

const serviceLines = [
	{
		title: "Guests scan",
		note: "Table QR",
	},
	{
		title: "Orders route",
		note: "Floor view",
	},
	{
		title: "Kitchen fires",
		note: "Prep queue",
	},
	{
		title: "Day closes",
		note: "Sales view",
	},
];

export default function FooterSection() {
	return (
		<footer className="bg-white px-4 py-10 text-[#201c1c] sm:px-6 lg:px-8">
			<div className="mx-auto flex min-h-[86svh] max-w-[110rem] flex-col border-t border-[#201c1c]/12 pt-8">
				<div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-start lg:pt-4">
					<div className="max-w-[42rem]">
						<div className="flex items-center gap-3">
							<div className="h-px w-10 bg-[#1D43DA]" />
							<p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-[#1D43DA]">
								Last Call
							</p>
						</div>

						<h2 className="display-title mt-6 text-[clamp(3.5rem,7vw,7.5rem)] font-bold leading-[0.9] tracking-[-0.065em] text-[#201c1c]">
							For the room,
							<br />
							not the clipboard.
						</h2>

						<p className="mt-6 max-w-lg text-lg leading-8 tracking-[-0.03em] text-[#4f4946]">
							SnapServe keeps guest ordering, floor coordination, kitchen prep,
							and daily sales in one clear flow.
						</p>
					</div>

					<div className="w-full lg:max-w-[46rem] lg:justify-self-end lg:pt-16">
						<div className="border-t border-[#201c1c]/10">
							{serviceLines.map((line, index) => (
								<div
									key={line.title}
									className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 border-b border-[#201c1c]/10 py-5 sm:grid-cols-[auto_1fr_auto] sm:items-end"
								>
									<p className="receipt-mono text-[10px] uppercase tracking-[0.22em] text-[#1D43DA]">
										0{index + 1}
									</p>
									<p className="text-2xl leading-none tracking-[-0.045em] text-[#201c1c] sm:text-[2rem]">
										{line.title}
									</p>
									<p className="col-start-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#7f7771] sm:col-start-auto">
										{line.note}
									</p>
								</div>
							))}
						</div>
					</div>
				</div>

				<div className="mt-auto pt-16">
					<div className="flex flex-col gap-3 border-t border-[#201c1c]/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
						<p className="receipt-mono text-[10px] uppercase tracking-[0.18em] text-[#1D43DA]">
							Cube Tech Innovations / Cebu City
						</p>
						<p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7f7771]">
							QR Menu / Waiter View / Kitchen Queue / Dashboard
						</p>
					</div>

					<div className="mt-6 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
						<div className="order-2 overflow-visible pb-2 lg:order-1">
							<p className="display-title -ml-[0.045em] text-[clamp(6.5rem,20vw,17rem)] font-bold leading-[0.84] tracking-[-0.1em] text-[#1D43DA]">
								SnapServe
							</p>
						</div>

						<div className="order-1 pb-3 lg:order-2 lg:max-w-[22rem] lg:justify-self-end">
							<div className="flex flex-wrap items-center gap-2">
								<a
									href="https://facebook.com"
									aria-label="Facebook"
									className="flex h-11 w-11 items-center justify-center rounded-full border border-[#201c1c]/12 bg-white text-[#201c1c] transition hover:border-[#1D43DA] hover:text-[#1D43DA]"
								>
									<Facebook className="h-4 w-4" />
								</a>
								<a
									href="https://linkedin.com"
									aria-label="LinkedIn"
									className="flex h-11 w-11 items-center justify-center rounded-full border border-[#201c1c]/12 bg-white text-[#201c1c] transition hover:border-[#1D43DA] hover:text-[#1D43DA]"
								>
									<Linkedin className="h-4 w-4" />
								</a>
								<a
									href="https://instagram.com"
									aria-label="Instagram"
									className="flex h-11 w-11 items-center justify-center rounded-full border border-[#201c1c]/12 bg-white text-[#201c1c] transition hover:border-[#1D43DA] hover:text-[#1D43DA]"
								>
									<Instagram className="h-4 w-4" />
								</a>
							</div>

							<div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
								<a
									href="mailto:hello@snapserve.ph"
									className="inline-flex items-center gap-3 rounded-full border border-[#201c1c]/12 bg-white px-4 py-3 pr-5 text-sm tracking-[-0.02em] text-[#201c1c] transition hover:border-[#1D43DA] hover:text-[#1D43DA]"
								>
									<span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#1D43DA]/20 text-[#1D43DA]">
										<Mail className="h-4 w-4" />
									</span>
									<span>hello@snapserve.ph</span>
								</a>

								<button
									type="button"
									className="inline-flex items-center gap-3 rounded-full border border-[#1D43DA] bg-white px-4 py-3 pr-6 text-sm font-semibold tracking-[0.14em] text-[#1D43DA] uppercase transition hover:bg-[#1D43DA] hover:text-white"
								>
									<span className="display-title flex h-8 w-8 items-center justify-center rounded-full bg-[#1D43DA] text-lg font-bold normal-case text-white">
										↗
									</span>
									Subscribe
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
