const mainMenuItems = [
	{
		name: "Workflow",
		note: "Table-to-kitchen flow",
	},
	{
		name: "Benefits",
		note: "House advantages",
	},
	{
		name: "Pricing",
		note: "Market listing",
	},
	{
		name: "FAQ",
		note: "After-dinner questions",
	},
];

export default function MainMenuSection() {
	return (
		<section className="bg-[#7E8F4E] px-4 py-16 sm:px-6 sm:py-20">
			<div className="mx-auto max-w-4xl rounded-[2rem] bg-[#f5ead4] p-4 shadow-[0_24px_80px_rgba(31,36,17,0.16)] sm:p-6">
				<div className="rounded-[1.6rem] border border-[#291F1E] px-6 py-10 text-[#291F1E] sm:px-12 sm:py-14">
					<div className="text-center">
						<p className="text-[0.68rem] font-semibold uppercase tracking-[0.42em] text-[#291F1E]">
							Cube Tech Innovations
						</p>
						<div className="mx-auto mt-4 h-px w-16 bg-[#291F1E]" />
						<h2 className="display-title mt-5 text-4xl font-bold tracking-tight text-[#291F1E] sm:text-6xl">
							Main Menu
						</h2>
						<p className="mx-auto mt-4 max-w-xl text-sm uppercase tracking-[0.18em] text-[#291F1E]/78">
							A short service selection
						</p>
					</div>

					<div className="mt-6">
						{mainMenuItems.map((item, index) => (
							<article
								key={item.name}
								className="grid grid-cols-[auto_1fr_auto] items-end gap-3 border-b border-[#291F1E] py-5 last:border-b-0"
							>
								<div>
									<p className="text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-[#291F1E]/70">
										{item.note}
									</p>
									<h3 className="display-title mt-1 text-3xl font-bold sm:text-[2.6rem]">
										{item.name}
									</h3>
								</div>
								<div className="mb-[0.42rem] border-b border-dotted border-[#291F1E]/55" />
								<span className="text-sm font-semibold tracking-[0.18em] text-[#291F1E]">
									0{index + 1}
								</span>
							</article>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
