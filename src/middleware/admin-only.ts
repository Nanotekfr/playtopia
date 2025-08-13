import type { MiddlewareHandler } from "astro";
import { sessions } from "../pages/api/login";

export const onRequest: MiddlewareHandler = async (context) => {
	const sessionId = context.cookies.get("sessionId")?.value;
	const session = sessionId ? sessions.get(sessionId) : null;

	if (!session || session.role !== "admin") {
		// On retourne un Response clair et direct
		return context.redirect(
			"/login?error=" + encodeURIComponent("Accès réservé aux admins")
		);
	}
	// Rien à faire, on continue
	return new Response(null, { status: 204 });
};
