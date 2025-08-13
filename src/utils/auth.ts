import { sessions } from "../pages/api/login";

type Cookies = {
	get(name: string): { value?: string } | undefined;
};

export function checkAdmin(cookies: Cookies) {
	const sessionId = cookies.get("sessionId")?.value;
	const session = sessionId ? sessions.get(sessionId) : null;

	if (!session) {
		return {
			ok: false,
			status: 401,
			error: "Non autorisé. Veuillez vous connecter.",
		};
	}
	if (session.role !== "admin") {
		return { ok: false, status: 403, error: "Accès réservé aux admins." };
	}

	return { ok: true, session };
}

export function checkUser(cookies: Cookies) {
	const sessionId = cookies.get("sessionId")?.value;
	const session = sessionId ? sessions.get(sessionId) : null;

	if (!session) {
		return {
			ok: false,
			status: 401,
			error: "Non autorisé. Veuillez vous connecter.",
		};
	}

	return { ok: true, session };
}
