import type { APIRoute } from "astro";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import bcrypt from "bcryptjs";

const usersFile = path.resolve("src/data/users.json");
const sessionsFile = path.resolve("src/data/sessions.json");

type User = {
	username: string;
	email: string;
	passwordHash: string;
	role: string;
};

type LoginSession = {
	id: string;
	username: string;
	role: string;
	expiresAt: number;
};

// --- Helpers ---
function loadUsers(): User[] {
	if (!fs.existsSync(usersFile)) return [];
	return JSON.parse(fs.readFileSync(usersFile, "utf-8"));
}

function loadSessions(): LoginSession[] {
	if (!fs.existsSync(sessionsFile)) fs.writeFileSync(sessionsFile, "[]");
	return JSON.parse(fs.readFileSync(sessionsFile, "utf-8"));
}

function saveSessions(sessions: LoginSession[]) {
	fs.writeFileSync(sessionsFile, JSON.stringify(sessions, null, 2));
}

// --- POST login ---
export const post: APIRoute = async ({ request, cookies }) => {
	try {
		const body = await request.json().catch(() => null);
		if (!body || !body.usernameOrEmail || !body.password) {
			return new Response(JSON.stringify({ error: "Requête invalide" }), {
				status: 400,
			});
		}

		const { usernameOrEmail, password } = body;
		const users = loadUsers();

		const user = users.find(
			(u) => u.username === usernameOrEmail || u.email === usernameOrEmail
		);

		if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
			return new Response(
				JSON.stringify({ error: "Identifiant ou mot de passe invalide" }),
				{ status: 401 }
			);
		}

		// --- Crée session ---
		const sessions = loadSessions();
		const sessionId = crypto.randomUUID();
		const expiresAt = Date.now() + 1000 * 60 * 60 * 24; // 24h

		const session: LoginSession = {
			id: sessionId,
			username: user.username,
			role: user.role,
			expiresAt,
		};
		sessions.push(session);
		saveSessions(sessions);

		cookies.set("sessionId", sessionId, {
			path: "/",
			httpOnly: true,
			maxAge: 60 * 60 * 24,
		});

		return new Response(
			JSON.stringify({ username: user.username, role: user.role }),
			{ status: 200 }
		);
	} catch (err) {
		console.error("Erreur serveur login:", err);
		return new Response(
			JSON.stringify({ error: "Erreur serveur, réessayez plus tard." }),
			{ status: 500 }
		);
	}
};
