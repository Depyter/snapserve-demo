const setupSteps = [
	{
		number: "01",
		title: "Choose a plan",
		description: "Pick the SnapServe tier that matches your restaurant.",
	},
	{
		number: "02",
		title: "Send your menu",
		description: "Share your dishes, tables, and service details with us.",
	},
	{
		number: "03",
		title: "We prepare the system",
		description:
			"We'll prepare your QR menu, ordering dashboard, waiter view, and kitchen queue.",
	},
];

function StepLine({
	number,
	title,
	description,
}: {
	number: string;
	title: string;
	description: string;
}) {
	return (
		<div className="relative grid grid-cols-[2.75rem_1fr] gap-3 sm:grid-cols-[3rem_1fr] sm:gap-4">
			<div className="flex justify-center">
				<div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#1D43DA]/22 text-[10px] font-semibold tracking-[0.28em] text-[#1D43DA] sm:h-12 sm:w-12">
					{number}
				</div>
			</div>
			<div className="pt-1.5 sm:pt-2">
				<p className="display-title text-[1.65rem] font-bold leading-none text-[#201c1c] sm:text-2xl">
					{title}
				</p>
				<p className="mt-3 max-w-sm text-sm leading-7 text-[#4f4946]">
					{description}
				</p>
			</div>
		</div>
	);
}

export default function CTASection() {
	return (
		<section className="bg-[#f5f2ed] px-4 py-24 text-[#201c1c] sm:px-6 lg:px-8">
			<div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-[1fr_420px] md:items-center">
				<div className="max-w-3xl">
					<p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-[#1D43DA]">
						Next Step
					</p>

					<h2 className="display-title mt-5 max-w-3xl text-5xl font-bold leading-[0.95] tracking-[-0.06em] text-[#201c1c] md:text-7xl">
						Set up your restaurant&apos;s ordering flow.
					</h2>

					<div className="mt-9 flex flex-wrap gap-3">
						<a
							href="#faq"
							className="inline-flex items-center gap-3 rounded-full border border-[#1D43DA]/32 bg-white px-4 py-3 pr-6 text-sm font-semibold uppercase tracking-[0.18em] text-[#201c1c] transition hover:border-[#1D43DA] hover:text-[#1D43DA]"
						>
							<span className="display-title flex h-8 w-8 items-center justify-center rounded-full border border-[#1D43DA]/24 text-sm font-bold text-[#1D43DA]">
								→
							</span>
							Ask a Question
						</a>
					</div>
				</div>

				<div className="w-full md:pl-4">
					<p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#1D43DA]">
						Setup Flow
					</p>

					<div className="relative mt-8">
						<div className="absolute top-4 bottom-4 left-6 w-px bg-[#1D43DA]/18" />
						<div className="space-y-8">
							{setupSteps.map((step) => (
								<StepLine
									key={step.number}
									number={step.number}
									title={step.title}
									description={step.description}
								/>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
