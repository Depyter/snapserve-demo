import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let scrollTriggerRegistered = false;

export function ensureScrollTriggerRegistered() {
	if (scrollTriggerRegistered || typeof window === "undefined") {
		return;
	}

	gsap.registerPlugin(ScrollTrigger);
	scrollTriggerRegistered = true;
}
