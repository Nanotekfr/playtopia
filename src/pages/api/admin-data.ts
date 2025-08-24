import type { APIContext } from "astro";
import { checkAdmin } from "../../utils/securityAudit";

export async function get({ cookies }: APIContext) {
	const check = checkAdmin(cookies);

	if (!check.ok) {
		return new Response(JSON.stringify({ error: check.error }), {
			status: check.status,
			headers: { "Content-Type": "application/json" },
		});
	}

	// Données à retourner à l’admin
	const data = {
		message: "Données confidentielles admin",
		timestamp: new Date().toISOString(),
	};

	return new Response(JSON.stringify(data), {
		status: 200,
		headers: { "Content-Type": "application/json" },
	});
}
