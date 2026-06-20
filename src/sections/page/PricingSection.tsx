import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useMemo, useRef, useState } from "react";
import { useShellReveal } from "./sectionShellMotion";

type TierId = "basic" | "premium" | "pro";

type Tier = {
	id: TierId;
	name: string;
	label: string;
	price: number;
	popular?: boolean;
	description: string;
	features: readonly string[];
};

const tiers: readonly Tier[] = [
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

type ReceiptEntry = {
	receiptId: string;
	rotation: number;
	serial: number;
	tier: Tier;
};

function formatPhp(value: number) {
	return new Intl.NumberFormat("en-PH", {
		style: "currency",
		currency: "PHP",
		maximumFractionDigits: 0,
	}).format(value);
}

function formatSerial(value: number) {
	return String(value).padStart(5, "0");
}

function getReceiptRotation() {
	const rotation = Number((Math.random() * 3.2 - 1.6).toFixed(2));

	if (Math.abs(rotation) < 0.45) {
		return rotation < 0 ? -0.65 : 0.65;
	}

	return rotation;
}

function createReceiptEntry(tier: Tier, serial: number): ReceiptEntry {
	return {
		receiptId: `${tier.id}-${serial}`,
		rotation: getReceiptRotation(),
		serial,
		tier,
	};
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
		<div className={`receipt-border-ink border-t px-3 py-2 ${className}`}>
			<p className="receipt-ink-soft text-[9px] font-bold uppercase tracking-[0.22em]">
				{label}
			</p>
			<p className="receipt-mono receipt-ink mt-1 text-[12px] uppercase">
				{value}
			</p>
		</div>
	);
}

function LineField({ label, value }: { label: string; value?: string }) {
	return (
		<div>
			<p>{label}</p>
			<div className="receipt-mono receipt-border-ink receipt-ink mt-2 border-b pb-1 text-[12px] uppercase">
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
		<tr className="receipt-border-line border-b align-top">
			<td className="receipt-border-line border-r px-2 py-3">
				<p className="receipt-serif receipt-ink text-[1.05rem] font-black leading-tight sm:text-xl">
					{name}
				</p>
				{description ? (
					<p className="receipt-copy mt-1 text-[9px] leading-relaxed tracking-[0.12em] uppercase sm:text-[10px]">
						{description}
					</p>
				) : null}
			</td>
			<td className="receipt-mono receipt-border-line receipt-ink border-r px-2 py-3 text-center whitespace-nowrap">
				{qty}
			</td>
			<td className="receipt-mono receipt-border-line receipt-ink border-r px-2 py-3 text-right whitespace-nowrap">
				{unitPrice}
			</td>
			<td className="receipt-mono receipt-ink px-2 py-3 text-right font-bold whitespace-nowrap">
				{amount}
			</td>
		</tr>
	);
}

function TotalRow({ label, value }: { label: string; value: string }) {
	return (
		<div className="receipt-mono receipt-border-ink receipt-ink grid grid-cols-2 border-b text-[12px]">
			<div className="receipt-border-ink border-r px-3 py-2 uppercase tracking-[0.14em]">
				{label}
			</div>
			<div className="px-3 py-2 text-right">{value}</div>
		</div>
	);
}

function ReceiptPaper({
	entry,
	className,
}: {
	entry: ReceiptEntry;
	className?: string;
}) {
	const subtotal = entry.tier.price;
	const total = subtotal;
	const emptyRows = Math.max(0, 10 - (1 + entry.tier.features.length));
	const emptyRowKeys = Array.from(
		{ length: emptyRows },
		(_, index) => `${entry.receiptId}-empty-row-${index + 1}`,
	);

	return (
		<div
			className={[
				"receipt-paper receipt-ring relative flex min-h-[clamp(44rem,64vw,58rem)] flex-col p-3 ring-1 sm:min-h-[clamp(52rem,68vw,62rem)] sm:p-6",
				className ?? "",
			].join(" ")}
		>
			<div className="receipt-glow-overlay pointer-events-none absolute inset-0" />
			<div className="receipt-grid-overlay pointer-events-none absolute inset-0 opacity-[0.18]" />

			<section className="receipt-sheet receipt-border-ink relative flex min-h-0 flex-1 flex-col border-2 p-3 sm:p-5">
				<header className="receipt-border-ink grid grid-cols-1 gap-4 border-b-2 pb-3 sm:grid-cols-[1fr_auto]">
					<div>
						<p className="receipt-ink text-[10px] font-bold uppercase tracking-[0.34em]">
							Republic of the Philippines
						</p>
						<h2 className="receipt-serif receipt-heading mt-1 text-4xl font-black leading-none sm:text-5xl">
							Official Receipt
						</h2>
						<p className="receipt-accent-deep mt-2 text-[11px] font-bold uppercase tracking-[0.24em]">
							Service Invoice / Subscription Acknowledgement
						</p>
					</div>

					<div className="hidden text-left sm:block sm:text-right">
						<p className="receipt-ink text-[10px] font-bold uppercase tracking-[0.22em]">
							No.
						</p>
						<p className="receipt-mono receipt-accent whitespace-nowrap text-[clamp(1.2rem,2.35vw,1.85rem)] leading-none tracking-[0.04em] tabular-nums">
							{formatSerial(entry.serial)}
						</p>
					</div>
				</header>

				<div className="receipt-border-ink hidden border-b-2 text-[11px] font-semibold uppercase tracking-[0.16em] sm:grid sm:grid-cols-2">
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
					<InfoCell label="Date" value="June 19, 2026" />
				</div>

				<div className="receipt-border-ink hidden border-b-2 p-3 sm:block">
					<p className="receipt-ink text-[10px] font-bold uppercase tracking-[0.28em]">
						Received From
					</p>
					<div className="receipt-serif receipt-border-ink receipt-ink mt-3 border-b pb-1 text-2xl font-black">
						Customer Name
					</div>

					<div className="receipt-ink mt-4 grid grid-cols-1 gap-3 text-[10px] font-bold uppercase tracking-[0.18em] sm:grid-cols-2">
						<LineField label="Address" />
						<LineField label="TIN" />
						<LineField label="Business Style" />
						<LineField label="Terms" value="Monthly" />
					</div>
				</div>

				<div className="-mx-3 overflow-x-auto px-3 sm:mx-0 sm:px-0">
					<table className="receipt-mono receipt-ink table-fixed min-w-full border-collapse text-[10px] sm:text-[12px]">
						<thead>
							<tr className="receipt-border-ink border-b-2 text-left uppercase tracking-[0.14em] sm:tracking-[0.18em]">
								<th className="receipt-border-ink w-[50%] border-r px-2 py-2 whitespace-nowrap">
									Particulars
								</th>
								<th className="receipt-border-ink w-[12%] border-r px-2 py-2 text-center whitespace-nowrap">
									Qty
								</th>
								<th className="receipt-border-ink w-[20%] border-r px-2 py-2 text-right whitespace-nowrap">
									Unit Price
								</th>
								<th className="w-[18%] px-2 py-2 text-right whitespace-nowrap">
									Amount
								</th>
							</tr>
						</thead>

						<tbody>
							<ReceiptItem
								name={`SnapServe ${entry.tier.name} Plan`}
								qty="1"
								unitPrice={formatPhp(entry.tier.price)}
								amount={formatPhp(entry.tier.price)}
							/>

							{entry.tier.features.map((feature) => (
								<ReceiptItem
									key={feature}
									name={feature}
									qty="1"
									unitPrice="-"
									amount="Included"
								/>
							))}

							{emptyRowKeys.map((rowKey) => (
								<tr key={rowKey} className="receipt-border-line h-9 border-b">
									<td className="receipt-border-line border-r px-2" />
									<td className="receipt-border-line border-r px-2" />
									<td className="receipt-border-line border-r px-2" />
									<td className="px-2" />
								</tr>
							))}
						</tbody>
					</table>
				</div>

				<div className="receipt-border-ink grid grid-cols-1 border-b-2 md:grid-cols-[1fr_280px]">
					<div className="receipt-border-ink p-3 md:border-r-2">
						<p className="receipt-ink text-[10px] font-bold uppercase tracking-[0.26em]">
							Amount in Words
						</p>
						<div className="receipt-serif receipt-border-ink receipt-ink mt-3 border-b pb-1 text-xl font-black">
							{entry.tier.name} Plan - {formatPhp(total)} Only
						</div>

						<p className="receipt-ink mt-5 text-[10px] font-bold uppercase tracking-[0.22em]">
							Payment For
						</p>
						<p className="receipt-mono receipt-ink mt-2 text-[12px] uppercase">
							SnapServe QR menu and restaurant ordering system subscription.
						</p>
					</div>

					<div className="receipt-border-ink receipt-mono border-t-2 text-[12px] md:border-t-0">
						<TotalRow label="Subtotal" value={formatPhp(subtotal)} />
						<TotalRow label="VAT / Tax" value="-" />
						<TotalRow label="Discount" value="-" />
						<div className="receipt-border-ink grid grid-cols-2 border-b-2">
							<div className="receipt-serif receipt-border-ink receipt-ink border-r px-3 py-3 text-2xl font-black">
								Total
							</div>
							<div className="receipt-serif receipt-accent px-3 py-3 text-right text-2xl font-black">
								{formatPhp(total)}
							</div>
						</div>
					</div>
				</div>

				<footer className="grid grid-cols-1 gap-8 pt-6 md:grid-cols-2">
					<div>
						<div className="receipt-border-accent receipt-accent inline-block -rotate-3 border-2 px-4 py-2 text-center">
							<p className="receipt-serif text-2xl font-black uppercase">
								Paid
							</p>
							<p className="receipt-mono text-[10px] uppercase tracking-[0.18em]">
								Subscription Selected
							</p>
						</div>

						<p className="receipt-note mt-5 text-[9px] font-semibold uppercase leading-relaxed tracking-[0.14em]">
							This is a design mockup inspired by Philippine receipt forms.
							Replace all TIN, permit, serial, and tax fields with your
							registered business details before real use.
						</p>
					</div>

					<div className="self-end text-center">
						<div className="receipt-border-ink mb-2 border-b" />
						<p className="receipt-ink text-[10px] font-bold uppercase tracking-[0.26em]">
							Authorized Representative
						</p>
					</div>
				</footer>
			</section>
		</div>
	);
}

export default function PricingSection() {
	const nextSerialRef = useRef(7400);
	const initializedStackRef = useRef(false);
	const latestIssuedReceiptIdRef = useRef<string | null>(null);
	const stageRef = useRef<HTMLDivElement | null>(null);
	const receiptRefs = useRef<Array<HTMLDivElement | null>>([]);

	const sectionRef = useRef<HTMLElement | null>(null);

	useShellReveal(sectionRef);
	const [receiptStack, setReceiptStack] = useState<ReceiptEntry[]>(() => [
		createReceiptEntry(tiers[0], 7399),
	]);

	const activeReceipt = receiptStack[receiptStack.length - 1] ?? null;
	const selectedTierId = activeReceipt?.tier.id ?? tiers[0].id;
	const stackKey = useMemo(
		() => receiptStack.map((receipt) => receipt.receiptId).join("|"),
		[receiptStack],
	);

	useGSAP(
		() => {
			const mm = gsap.matchMedia();
			const targetReceipts = receiptStack.map((receipt, index) => ({
				receipt,
				element: receiptRefs.current[index],
				depth: receiptStack.length - 1 - index,
			}));

			mm.add("(prefers-reduced-motion: no-preference)", () => {
				targetReceipts.forEach(({ receipt, element, depth }) => {
					if (!element) {
						return;
					}

					const x = depth * -16;
					const y = depth * 20;
					const scale = 1 - depth * 0.018;
					const autoAlpha = 1 - depth * 0.04;

					if (
						initializedStackRef.current &&
						latestIssuedReceiptIdRef.current === receipt.receiptId
					) {
						gsap.fromTo(
							element,
							{
								x: 220,
								y: y - 18,
								rotation: receipt.rotation + 5.5,
								scale: scale + 0.03,
								autoAlpha: 0,
							},
							{
								x,
								y,
								rotation: receipt.rotation,
								scale,
								autoAlpha,
								duration: 0.82,
								ease: "power3.out",
								overwrite: true,
							},
						);
					} else {
						gsap.to(element, {
							x,
							y,
							rotation: receipt.rotation,
							scale,
							autoAlpha,
							duration: initializedStackRef.current ? 0.58 : 0,
							ease: "power2.out",
							overwrite: true,
						});
					}
				});
			});

			mm.add("(prefers-reduced-motion: reduce)", () => {
				targetReceipts.forEach(({ receipt, element, depth }) => {
					if (!element) {
						return;
					}

					gsap.set(element, {
						x: depth * -16,
						y: depth * 20,
						rotation: receipt.rotation,
						scale: 1 - depth * 0.018,
						autoAlpha: 1 - depth * 0.04,
					});
				});
			});

			initializedStackRef.current = true;
			latestIssuedReceiptIdRef.current = null;

			return () => mm.revert();
		},
		{ scope: stageRef, dependencies: [stackKey] },
	);

	const handleSelectTier = (tierId: Tier["id"]) => {
		if (tierId === selectedTierId) {
			return;
		}

		const tier = tiers.find((item) => item.id === tierId);

		if (!tier) {
			return;
		}

		const nextReceipt = createReceiptEntry(tier, nextSerialRef.current);
		nextSerialRef.current += 1;
		latestIssuedReceiptIdRef.current = nextReceipt.receiptId;

		setReceiptStack((current) => [...current, nextReceipt].slice(-4));
	};

	return (
		<section id="pricing" ref={sectionRef} className="relative">
			<div data-shell-stage className="mx-auto w-full">
				<div
					data-shell-frame
					className="receipt-sans receipt-shell relative lg:rounded-t-[2.5rem]"
				>
					<div className="mx-auto grid max-w-[1120px] gap-4 px-4 py-8 sm:px-6 sm:py-16 lg:grid-cols-[320px_minmax(0,1fr)] lg:items-start">
						<aside className="receipt-paper receipt-shadow receipt-ring relative p-3 ring-1 sm:p-4 lg:sticky lg:top-24">
							<div className="receipt-glow-overlay-tight pointer-events-none absolute inset-0" />
							<div className="receipt-grid-overlay pointer-events-none absolute inset-0 opacity-[0.14]" />

							<div className="receipt-sheet receipt-border-ink relative border-2 p-3 sm:p-4">
								<header className="receipt-border-ink border-b-2 pb-3 sm:pb-4">
									<p className="receipt-accent-deep text-[10px] font-bold uppercase tracking-[0.34em]">
										Plan Selection
									</p>
									<h2 className="receipt-serif receipt-heading mt-2 text-3xl font-black leading-none sm:text-4xl">
										Pricing
									</h2>
								</header>

								<div className="mt-3 grid gap-1.5 md:grid-cols-3 lg:grid-cols-1 sm:gap-2">
									{tiers.map((tier) => {
										const selected = tier.id === selectedTierId;

										return (
											<button
												key={tier.id}
												type="button"
												onClick={() => handleSelectTier(tier.id)}
												className={[
													"receipt-option relative w-full overflow-hidden border px-2.5 py-2.5 text-left transition sm:px-3 sm:py-3 md:min-h-[128px] lg:min-h-0",
													selected ? "is-selected" : "",
												].join(" ")}
											>
												{selected ? (
													<div className="absolute inset-y-0 left-0 w-1 bg-[var(--receipt-accent)]" />
												) : null}

												<div className="min-w-0">
													<div className="flex flex-wrap items-center gap-2">
														<p
															className={[
																"receipt-mono text-[10px] font-bold uppercase tracking-[0.16em] sm:text-[11px]",
																selected ? "receipt-accent" : "receipt-ink",
															].join(" ")}
														>
															{selected ? "[x]" : "[ ]"}
														</p>
														<p className="receipt-serif receipt-ink text-xl font-black leading-none sm:text-2xl">
															{tier.name}
														</p>
														{tier.popular ? (
															<span className="receipt-border-accent receipt-accent border px-2 py-1 text-[8px] font-bold uppercase tracking-[0.22em]">
																Most Popular
															</span>
														) : null}
													</div>

													<p className="receipt-ink-muted mt-2 text-[9px] leading-none font-bold uppercase tracking-[0.12em] sm:mt-3 sm:text-[10px]">
														{tier.label}
													</p>
												</div>
											</button>
										);
									})}
								</div>
							</div>
						</aside>

						<div ref={stageRef} className="relative min-w-0 lg:pt-2">
							<div className="relative pb-[clamp(8rem,22vw,12rem)] md:pb-14">
								{receiptStack.map((entry, index) => {
									const isTop = index === receiptStack.length - 1;

									return (
										<div
											key={entry.receiptId}
											ref={(element) => {
												receiptRefs.current[index] = element;
											}}
											className={[
												"will-change-transform",
												isTop
													? "relative z-30"
													: "pointer-events-none absolute inset-0",
											].join(" ")}
											style={{ zIndex: index + 10 }}
										>
											<ReceiptPaper entry={entry} />
										</div>
									);
								})}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
