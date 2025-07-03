import type { NavigateFn, ParsedLocation } from "@tanstack/react-router";

export function authGuard({
	location,
	navigate,
}: {
	location: ParsedLocation;
	navigate: NavigateFn;
}) {
	const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
	if (!isAuthenticated) {
		throw navigate({ to: "/signin", search: { redirect: location.href } });
	}
}
