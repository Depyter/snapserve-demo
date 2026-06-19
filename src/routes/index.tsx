import { createFileRoute } from "@tanstack/react-router";
import { lazy } from "react";

const Section = lazy(() => import("../sections/page/Section"));

export const Route = createFileRoute("/")({
	component: App,
});

function App() {
	return <Section />;
}
