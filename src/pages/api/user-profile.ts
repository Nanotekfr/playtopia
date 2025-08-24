import type { APIContext } from "astro";
import { sessions } from "./login"; // Import du Map des sessions
import fs from "fs";
import path from "path";

export async function get({ cookies }: APIContext) {
	const sessionId = cookies.get("sessionId")?.value;

	if (!sessionId) {
		return new Response(JSON.stringify({ error: "Non connecté" }), {
			status: 401,
			headers: { "Content-Type": "application/json" },
		});
	}

	const session = sessions.get(sessionId);

	if (!session || session.expiresAt < Date.now()) {
		return new Response(JSON.stringify({ error: "Session expirée" }), {
			status: 401,
			headers: { "Content-Type": "application/json" },
		});
	}

	// Récupérer l'email depuis users.json pour correspondre au username
	const usersPath = path.join(process.cwd(), "src", "data", "users.json");
	const users = JSON.parse(fs.readFileSync(usersPath, "utf-8"));
	const user = users.find((u: any) => u.username === session.username);

	const profile = {
		username: session.username,
		role: session.role,
		email: user?.email || "Inconnu",
	};

	return new Response(JSON.stringify(profile), {
		status: 200,
		headers: { "Content-Type": "application/json" },
	});
}
