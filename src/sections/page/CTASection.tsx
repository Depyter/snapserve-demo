export default function CTASection() {
	return (
		<section className="receipt-sans bg-[#7f8f54] px-4 py-20 text-[#253947] sm:px-6">
			<div className="mx-auto max-w-[760px] bg-[#f1d89e] p-6 shadow-[0_18px_60px_rgba(35,25,15,0.28)] ring-1 ring-[#8f7642]">
				<div className="relative border-2 border-[#253947] bg-[#f3dda9]/80 p-6">
					<div className="grid gap-8 md:grid-cols-[1fr_220px]">
						<div>
							<p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#7b3330]">
								Service Authorization
							</p>

							<h2 className="receipt-serif mt-3 text-4xl font-black leading-none text-[#204b63]">
								Start serving orders without the paper trail.
							</h2>

							<p className="mt-4 max-w-xl text-sm leading-7 text-[#253947]/80">
								Get your QR menu, ordering flow, kitchen view, and restaurant
								dashboard set up for your business. Choose a plan, send your
								menu, and we&apos;ll help prepare your SnapServe system for your
								restaurant.
							</p>

							<div className="mt-6 grid gap-3 text-[11px] font-bold uppercase tracking-[0.18em] md:grid-cols-3">
								<div className="border border-[#253947] px-3 py-3">
									<p className="text-[#7b3330]">Step 01</p>
									<p className="mt-1">Pick Plan</p>
								</div>

								<div className="border border-[#253947] px-3 py-3">
									<p className="text-[#7b3330]">Step 02</p>
									<p className="mt-1">Send Menu</p>
								</div>

								<div className="border border-[#253947] px-3 py-3">
									<p className="text-[#7b3330]">Step 03</p>
									<p className="mt-1">Go Live</p>
								</div>
							</div>
						</div>

						<div className="flex flex-col justify-between border-2 border-[#253947] bg-[#f8e8bb] p-4 text-center">
							<div>
								<p className="text-[10px] font-bold uppercase tracking-[0.28em]">
									Approved For
								</p>

								<p className="receipt-serif mt-3 text-3xl font-black text-[#b54338]">
									Setup
								</p>

								<p className="receipt-mono mt-2 text-[11px] uppercase tracking-[0.12em]">
									SnapServe Restaurant System
								</p>
							</div>

							<a
								href="#contact"
								className="mt-8 border-2 border-[#253947] bg-[#253947] px-4 py-3 text-[11px] font-bold uppercase tracking-[0.24em] text-[#f3dda9] transition hover:bg-[#b54338]"
							>
								Request Setup
							</a>
						</div>
					</div>

					<div className="mt-8 grid gap-6 border-t-2 border-[#253947] pt-6 md:grid-cols-2">
						<div>
							<div className="mb-2 border-b border-[#253947]" />
							<p className="text-[10px] font-bold uppercase tracking-[0.26em]">
								Restaurant Representative
							</p>
						</div>

						<div>
							<div className="mb-2 border-b border-[#253947]" />
							<p className="text-[10px] font-bold uppercase tracking-[0.26em]">
								Cube Tech Innovations
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
