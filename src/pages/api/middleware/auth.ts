import type { MiddlewareHandler } from "astro";
import { sessions } from "../../../pages/api/login"; // ou ajuste le chemin selon ton arbo

export const onRequest: MiddlewareHandler = async (context, next) => {
	const sessionId = context.cookies.get("sessionId")?.value;
	const session = sessionId ? sessions.get(sessionId) : null;

	if (!session || session.role !== "admin") {
		return context.redirect(
			"/login?error=" + encodeURIComponent("Accès réservé aux admins"),
			302
		);
	}

	return next();
};
