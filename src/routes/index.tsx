import { createFileRoute } from "@tanstack/react-router";
import Section from "../sections/page/Section";

export const Route = createFileRoute("/")({
	component: App,
});

function App() {
	return <Section />;
}
