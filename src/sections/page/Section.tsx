import CTASection from "./CTASection";
import FooterSection from "./FooterSection";
import HeroSection from "./HeroSection";
import MainMenuSection from "./MainMenuSection";
import PricingSection from "./PricingSection";
import WorkflowSection from "./WorkflowSection";

export default function Section() {
	return (
		<main className="bg-white">
			<HeroSection />
			<MainMenuSection />
			<WorkflowSection />
			<PricingSection />
			<CTASection />
			<FooterSection />
		</main>
	);
}
