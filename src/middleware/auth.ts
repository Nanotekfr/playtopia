import type { MiddlewareHandler } from "astro";
import { securityAudit, type Cookies } from "../utils/securityAudit"; // ajuste le chemin si besoin

type AuthOptions = {
	requiredRole?: string; // "admin" si besoin
	redirect?: string; // URL de redirection si non autorisé
};

export function auth(options: AuthOptions = {}): MiddlewareHandler {
	const { requiredRole, redirect = "/login" } = options;

	return async (context, next) => {
		const cookies: Cookies = {
			get: (name: string) => context.cookies.get(name),
		};

		const result = securityAudit(cookies, requiredRole);

		if (!result.authorized) {
			const url = new URL(redirect, context.url.origin);
			url.searchParams.set("error", result.message || "Non autorisé");
			return context.redirect(url.toString(), 302);
		}

		return next();
	};
}
