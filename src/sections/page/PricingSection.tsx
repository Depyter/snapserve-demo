import { useState } from "react";

const tiers = [
	{
		id: "basic",
		name: "Basic",
		label: "Small restaurant setup",
		price: 1500,
		description:
			"QR menu, ordering, kitchen view, waiter view, menu management",
		features: [
			"QR Code Menu",
			"Ordering System",
			"Kitchen View",
			"Waiter View",
			"Menu Management",
		],
	},
	{
		id: "premium",
		name: "Premium",
		label: "Medium venue setup",
		price: 5000,
		description: "Basic features plus order list and user management",
		features: [
			"QR Code Menu",
			"Ordering System",
			"Kitchen View",
			"Waiter View",
			"Menu Management",
			"Order List",
			"User Management",
		],
	},
	{
		id: "pro",
		name: "Pro",
		label: "Growing restaurant setup",
		price: 20000,
		popular: true,
		description: "Premium features plus reports, exports, filters, and support",
		features: [
			"QR Code Menu",
			"Ordering System",
			"Kitchen & Waiter View",
			"Menu Management",
			"Order List & Tracking",
			"User Management",
			"Dashboard Sales Report",
			"Export & Filter Functions",
			"24/7 Tech Support",
		],
	},
];

function formatPhp(value: number) {
	return new Intl.NumberFormat("en-PH", {
		style: "currency",
		currency: "PHP",
		maximumFractionDigits: 0,
	}).format(value);
}

function InfoCell({
	label,
	value,
	className = "",
}: {
	label: string;
	value: string;
	className?: string;
}) {
	return (
		<div className={`border-t border-[#253947] px-3 py-2 ${className}`}>
			<p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#253947]/70">
				{label}
			</p>
			<p className="receipt-mono mt-1 text-[12px] uppercase text-[#253947]">
				{value}
			</p>
		</div>
	);
}

function LineField({ label, value }: { label: string; value?: string }) {
	return (
		<div>
			<p>{label}</p>
			<div className="receipt-mono mt-2 border-b border-[#253947] pb-1 text-[12px] uppercase text-[#253947]">
				{value ?? "\u00A0"}
			</div>
		</div>
	);
}

function ReceiptItem({
	name,
	description,
	qty,
	unitPrice,
	amount,
}: {
	name: string;
	description?: string;
	qty: string;
	unitPrice: string;
	amount: string;
}) {
	return (
		<tr className="border-b border-[#253947]/55 align-top">
			<td className="border-r border-[#253947]/55 px-2 py-3">
				<p className="receipt-serif text-xl font-black text-[#253947]">
					{name}
				</p>
				{description ? (
					<p className="mt-1 text-[10px] leading-relaxed tracking-[0.12em] text-[#253947]/75 uppercase">
						{description}
					</p>
				) : null}
			</td>
			<td className="receipt-mono border-r border-[#253947]/55 px-2 py-3 text-center text-[#253947]">
				{qty}
			</td>
			<td className="receipt-mono border-r border-[#253947]/55 px-2 py-3 text-right text-[#253947]">
				{unitPrice}
			</td>
			<td className="receipt-mono px-2 py-3 text-right font-bold text-[#253947]">
				{amount}
			</td>
		</tr>
	);
}

function TotalRow({ label, value }: { label: string; value: string }) {
	return (
		<div className="receipt-mono grid grid-cols-2 border-b border-[#253947] text-[12px] text-[#253947]">
			<div className="border-r border-[#253947] px-3 py-2 uppercase tracking-[0.14em]">
				{label}
			</div>
			<div className="px-3 py-2 text-right">{value}</div>
		</div>
	);
}

export default function PricingSection() {
	const [selectedTierId, setSelectedTierId] = useState("basic");
	const selectedTier =
		tiers.find((tier) => tier.id === selectedTierId) ?? tiers[0];
	const subtotal = selectedTier.price;
	const total = subtotal;
	const emptyRows = Math.max(0, 10 - (1 + selectedTier.features.length));
	const emptyRowKeys = Array.from(
		{ length: emptyRows },
		(_, index) => `${selectedTier.id}-empty-row-${index + 1}`,
	);

	return (
		<section className="receipt-sans bg-[#7f8f54] px-4 py-10 text-[#253947] sm:px-6 sm:py-16">
			<div className="mx-auto grid max-w-[1120px] gap-6 lg:grid-cols-[320px_minmax(0,1fr)] lg:items-start">
				<aside className="relative bg-[#f1d89e] p-4 shadow-[0_18px_60px_rgba(35,25,15,0.22)] ring-1 ring-[#8f7642] lg:sticky lg:top-24">
					<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(255,255,255,0.22),transparent_24%),radial-gradient(circle_at_86%_72%,rgba(107,71,28,0.12),transparent_28%)]" />
					<div className="pointer-events-none absolute inset-0 opacity-[0.14] [background-image:linear-gradient(90deg,#6b4b2a_1px,transparent_1px),linear-gradient(#6b4b2a_1px,transparent_1px)] [background-size:22px_22px]" />

					<div className="relative border-2 border-[#253947] bg-[#f3dda9]/80 p-4">
						<header className="border-b-2 border-[#253947] pb-4">
							<p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#7b3330]">
								Plan Selection
							</p>
							<h2 className="receipt-serif mt-2 text-4xl font-black leading-none text-[#204b63]">
								Pricing
							</h2>
						</header>

						<div className="mt-4 grid gap-2 md:grid-cols-3 lg:grid-cols-1">
							{tiers.map((tier) => {
								const selected = tier.id === selectedTier.id;

								return (
									<button
										key={tier.id}
										type="button"
										onClick={() => setSelectedTierId(tier.id)}
										className={[
											"relative w-full overflow-hidden border px-3 py-3 text-left transition md:min-h-[128px] lg:min-h-0",
											selected
												? "border-[#b54338] bg-[#f8e8bb] shadow-[0_10px_22px_rgba(181,67,56,0.12)]"
												: "border-[#253947]/70 bg-[#f7ebc8] hover:bg-[#f9efcf]",
										].join(" ")}
									>
										{selected ? (
											<div className="absolute inset-y-0 left-0 w-1 bg-[#b54338]" />
										) : null}

										<div className="grid gap-3 sm:grid-cols-[auto_1fr] sm:items-start">
											<p
												className={[
													"receipt-mono pt-1 text-[11px] font-bold uppercase tracking-[0.16em]",
													selected ? "text-[#b54338]" : "text-[#253947]",
												].join(" ")}
											>
												{selected ? "[x]" : "[ ]"}
											</p>

											<div className="min-w-0">
												<div className="flex flex-wrap items-center gap-2">
													<p className="receipt-serif text-2xl font-black leading-none text-[#253947]">
														{tier.name}
													</p>
													{tier.popular ? (
														<span className="border border-[#b54338] px-2 py-1 text-[8px] font-bold uppercase tracking-[0.22em] text-[#b54338]">
															Most Popular
														</span>
													) : null}
												</div>

												<p className="mt-3 text-[10px] leading-none font-bold uppercase tracking-[0.12em] text-[#253947]/68">
													{tier.label}
												</p>
											</div>
										</div>
									</button>
								);
							})}
						</div>
					</div>
				</aside>

				<div className="relative bg-[#f1d89e] p-6 shadow-[0_18px_60px_rgba(35,25,15,0.28)] ring-1 ring-[#8f7642]">
					<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.25),transparent_24%),radial-gradient(circle_at_80%_70%,rgba(107,71,28,0.14),transparent_28%)]" />
					<div className="pointer-events-none absolute inset-0 opacity-[0.18] [background-image:linear-gradient(90deg,#6b4b2a_1px,transparent_1px),linear-gradient(#6b4b2a_1px,transparent_1px)] [background-size:22px_22px]" />

					<section className="relative border-2 border-[#253947] bg-[#f3dda9]/80 p-5">
						<header className="grid grid-cols-1 gap-4 border-b-2 border-[#253947] pb-3 sm:grid-cols-[1fr_auto]">
							<div>
								<p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#253947]">
									Republic of the Philippines
								</p>
								<h2 className="receipt-serif mt-1 text-4xl font-black leading-none text-[#204b63] sm:text-5xl">
									Official Receipt
								</h2>
								<p className="mt-2 text-[11px] font-bold uppercase tracking-[0.24em] text-[#7b3330]">
									Service Invoice / Subscription Acknowledgement
								</p>
							</div>

							<div className="text-left sm:text-right">
								<p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#253947]">
									No.
								</p>
								<p className="receipt-mono text-3xl tracking-[0.12em] text-[#b54338]">
									07399
								</p>
							</div>
						</header>

						<div className="grid grid-cols-1 border-b-2 border-[#253947] text-[11px] font-semibold uppercase tracking-[0.16em] sm:grid-cols-2">
							<InfoCell
								label="Business Name"
								value="Cube Tech Innovations"
								className="sm:border-r"
							/>
							<InfoCell label="TIN" value="000-000-000-000" />
							<InfoCell
								label="Address"
								value="Cebu City, Philippines"
								className="sm:border-r"
							/>
							<InfoCell label="Date" value="June 18, 2026" />
						</div>

						<div className="border-b-2 border-[#253947] p-3">
							<p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#253947]">
								Received From
							</p>
							<div className="receipt-serif mt-3 border-b border-[#253947] pb-1 text-2xl font-black text-[#253947]">
								Customer Name
							</div>

							<div className="mt-4 grid grid-cols-1 gap-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#253947] sm:grid-cols-2">
								<LineField label="Address" />
								<LineField label="TIN" />
								<LineField label="Business Style" />
								<LineField label="Terms" value="Monthly" />
							</div>
						</div>

						<div className="overflow-x-auto">
							<table className="receipt-mono min-w-full border-collapse text-[12px] text-[#253947]">
								<thead>
									<tr className="border-b-2 border-[#253947] text-left uppercase tracking-[0.18em]">
										<th className="w-[52%] border-r border-[#253947] px-2 py-2">
											Particulars
										</th>
										<th className="w-[12%] border-r border-[#253947] px-2 py-2 text-center">
											Qty
										</th>
										<th className="w-[18%] border-r border-[#253947] px-2 py-2 text-right">
											Unit Price
										</th>
										<th className="w-[18%] px-2 py-2 text-right">Amount</th>
									</tr>
								</thead>

								<tbody>
									<ReceiptItem
										name={`SnapServe ${selectedTier.name} Plan`}
										description={selectedTier.description}
										qty="1"
										unitPrice={formatPhp(selectedTier.price)}
										amount={formatPhp(selectedTier.price)}
									/>

									{selectedTier.features.map((feature) => (
										<ReceiptItem
											key={feature}
											name={feature}
											qty="1"
											unitPrice="-"
											amount="Included"
										/>
									))}

									{emptyRowKeys.map((rowKey) => (
										<tr
											key={rowKey}
											className="h-9 border-b border-[#253947]/55"
										>
											<td className="border-r border-[#253947]/55 px-2" />
											<td className="border-r border-[#253947]/55 px-2" />
											<td className="border-r border-[#253947]/55 px-2" />
											<td className="px-2" />
										</tr>
									))}
								</tbody>
							</table>
						</div>

						<div className="grid grid-cols-1 border-b-2 border-[#253947] md:grid-cols-[1fr_280px]">
							<div className="p-3 md:border-r-2 md:border-[#253947]">
								<p className="text-[10px] font-bold uppercase tracking-[0.26em] text-[#253947]">
									Amount in Words
								</p>
								<div className="receipt-serif mt-3 border-b border-[#253947] pb-1 text-xl font-black text-[#253947]">
									{selectedTier.name} Plan - {formatPhp(total)} Only
								</div>

								<p className="mt-5 text-[10px] font-bold uppercase tracking-[0.22em] text-[#253947]">
									Payment For
								</p>
								<p className="receipt-mono mt-2 text-[12px] uppercase text-[#253947]">
									SnapServe QR menu and restaurant ordering system subscription.
								</p>
							</div>

							<div className="border-t-2 border-[#253947] receipt-mono text-[12px] md:border-t-0">
								<TotalRow label="Subtotal" value={formatPhp(subtotal)} />
								<TotalRow label="VAT / Tax" value="-" />
								<TotalRow label="Discount" value="-" />
								<div className="grid grid-cols-2 border-b-2 border-[#253947]">
									<div className="receipt-serif border-r border-[#253947] px-3 py-3 text-2xl font-black text-[#253947]">
										Total
									</div>
									<div className="receipt-serif px-3 py-3 text-right text-2xl font-black text-[#b54338]">
										{formatPhp(total)}
									</div>
								</div>
							</div>
						</div>

						<footer className="grid grid-cols-1 gap-8 pt-6 md:grid-cols-2">
							<div>
								<div className="inline-block -rotate-3 border-2 border-[#b54338] px-4 py-2 text-center text-[#b54338]">
									<p className="receipt-serif text-2xl font-black uppercase">
										Paid
									</p>
									<p className="receipt-mono text-[10px] uppercase tracking-[0.18em]">
										Subscription Selected
									</p>
								</div>

								<p className="mt-5 text-[9px] font-semibold uppercase leading-relaxed tracking-[0.14em] text-[#253947]/80">
									This is a design mockup inspired by Philippine receipt forms.
									Replace all TIN, permit, serial, and tax fields with your
									registered business details before real use.
								</p>
							</div>

							<div className="self-end text-center">
								<div className="mb-2 border-b border-[#253947]" />
								<p className="text-[10px] font-bold uppercase tracking-[0.26em] text-[#253947]">
									Authorized Representative
								</p>
							</div>
						</footer>
					</section>
				</div>
			</div>
		</section>
	);
}
