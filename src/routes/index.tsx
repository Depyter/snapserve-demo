import { createFileRoute } from "@tanstack/react-router";
import CTASection from "../sections/page/CTASection";
import FAQSection from "../sections/page/FAQSection";
import FeaturesSection from "../sections/page/FeaturesSection";
import FooterSection from "../sections/page/FooterSection";
import HeroSection from "../sections/page/HeroSection";
import PricingSection from "../sections/page/PricingSection";
import TestimonySection from "../sections/page/TestimonySection";
import WaitTimeSection from "../sections/page/WaitTimeSection";

export const Route = createFileRoute("/")({
	component: App,
});

function App() {
	return (
		<main className="bg-white">
			<HeroSection />
			<FeaturesSection />
			<WaitTimeSection />
			<TestimonySection />
			<PricingSection />
			<CTASection />
			<FAQSection />
			<FooterSection />
		</main>
	);
}
