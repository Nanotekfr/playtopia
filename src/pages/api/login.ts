import fs from "fs";
import path from "path";
import bcrypt from "bcrypt";
import { randomUUID } from "crypto";
import type { APIRoute } from "astro";

export const prerender = false;

// stockage temporaire des sessions
export const sessions = new Map<
	string,
	{ username: string; role: string; expiresAt: number }
>();

export const POST: APIRoute = async ({ request, cookies }) => {
	try {
		const { username, password } = await request.json();
		if (!username || !password) {
			return new Response(JSON.stringify({ error: "Champs manquants" }), {
				status: 400,
			});
		}

		// lecture users.json
		const usersPath = path.join(process.cwd(), "src", "data", "users.json");
		const users = JSON.parse(fs.readFileSync(usersPath, "utf-8"));

		const user = users.find((u: any) => u.username === username);
		if (!user) {
			return new Response(JSON.stringify({ error: "Utilisateur inexistant" }), {
				status: 401,
			});
		}

		const match = await bcrypt.compare(password, user.passwordHash);
		if (!match) {
			return new Response(JSON.stringify({ error: "Mot de passe incorrect" }), {
				status: 401,
			});
		}

		// créer session
		const sessionId = randomUUID();
		sessions.set(sessionId, {
			username: user.username,
			role: user.role,
			expiresAt: Date.now() + 1000 * 60 * 60, // 1h
		});

		// cookie
		cookies.set("sessionId", sessionId, {
			httpOnly: true,
			sameSite: "strict",
			secure: true,
			path: "/",
		});

		return new Response(JSON.stringify({ message: "Connecté" }), {
			status: 200,
		});
	} catch (err) {
		return new Response(JSON.stringify({ error: "Erreur serveur" }), {
			status: 500,
		});
	}
};
