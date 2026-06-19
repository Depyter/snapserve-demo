export type SiteMenuItem = {
	href: string;
	label: string;
	note: string;
};

export const mainMenuItems: SiteMenuItem[] = [
	{
		href: "#features",
		label: "Features",
		note: "Product highlights",
	},
	{
		href: "#wait-time",
		label: "Wait Time",
		note: "Reduced waits",
	},
	{
		href: "#pricing",
		label: "Pricing",
		note: "Market listing",
	},
	{
		href: "#faq",
		label: "FAQ",
		note: "After-dinner questions",
	},
];

export const footerSectionLinks: Array<Pick<SiteMenuItem, "href" | "label">> = [
	{
		href: "#features",
		label: "Features",
	},
	{
		href: "#wait-time",
		label: "Wait Time",
	},
	{
		href: "#pricing",
		label: "Pricing",
	},
	{
		href: "#setup",
		label: "Setup",
	},
	{
		href: "#faq",
		label: "FAQ",
	},
];
