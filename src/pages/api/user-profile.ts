import type { APIContext } from "astro";
import { checkUser } from "../../utils/auth";

export async function get({ cookies }: APIContext) {
	const check = checkUser(cookies);

	if (!check.ok) {
		return new Response(JSON.stringify({ error: check.error }), {
			status: check.status,
			headers: { "Content-Type": "application/json" },
		});
	}

	// TypeScript a besoin de voir que session est bien défini
	const session = check.session!;

	const profile = {
		email: session.email,
		role: session.role,
		name: session.name || "Inconnu",
	};

	return new Response(JSON.stringify(profile), {
		status: 200,
		headers: { "Content-Type": "application/json" },
	});
}
