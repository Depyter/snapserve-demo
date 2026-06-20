import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import type { RefObject } from "react";
import { ensureScrollTriggerRegistered } from "#/lib/gsap.ts";

const INSET = "1.5rem";
const RADIUS = "2.5rem";

export function useShellReveal(scopeRef: RefObject<HTMLElement | null>) {
	useGSAP(
		() => {
			ensureScrollTriggerRegistered();

			const scope = scopeRef.current;
			if (!scope) return;

			const stage = scope.querySelector<HTMLElement>("[data-shell-stage]");
			const frame = scope.querySelector<HTMLElement>("[data-shell-frame]");
			if (!stage || !frame) return;

			const mm = gsap.matchMedia();

			mm.add(
				"(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
				() => {
					gsap.set(stage, { paddingLeft: 0, paddingRight: 0 });
					gsap.set(frame, {
						borderBottomLeftRadius: 0,
						borderBottomRightRadius: 0,
					});

					const tl = gsap.timeline({
						scrollTrigger: {
							trigger: scope,
							start: "bottom bottom",
							end: "bottom 52%",
							scrub: 0.95,
							invalidateOnRefresh: true,
						},
					});

					tl.to(
						stage,
						{ paddingLeft: INSET, paddingRight: INSET, ease: "none" },
						0,
					);
					tl.to(
						frame,
						{
							borderBottomLeftRadius: RADIUS,
							borderBottomRightRadius: RADIUS,
							ease: "none",
						},
						0,
					);

					return () => {
						tl.scrollTrigger?.kill();
						tl.kill();
					};
				},
			);

			return () => mm.revert();
		},
		{ scope: scopeRef },
	);
}
