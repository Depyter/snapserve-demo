import CTASection from "./CTASection";
import FAQSection from "./FAQSection";
import FeaturesSection from "./FeaturesSection";
import FooterSection from "./FooterSection";
import HeroSection from "./HeroSection";
import PricingSection from "./PricingSection";
import TestimonySection from "./TestimonySection";
import WaitTimeSection from "./WaitTimeSection";

export default function Section() {
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
