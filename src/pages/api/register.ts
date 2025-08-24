// src/pages/api/register.ts
import fs from "fs";
import path from "path";
import bcrypt from "bcrypt";
import { randomUUID } from "crypto";
import type { APIRoute } from "astro";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
	try {
		const { email, username, password } = await request.json();
		if (!email || !username || !password)
			return new Response(JSON.stringify({ error: "Champs manquants" }), {
				status: 400,
			});

		const usersPath = path.join(process.cwd(), "src/data/users.json");
		const users = JSON.parse(fs.readFileSync(usersPath, "utf-8"));

		if (users.find((u: any) => u.email === email || u.username === username)) {
			return new Response(
				JSON.stringify({ error: "Utilisateur déjà existant" }),
				{ status: 409 }
			);
		}

		const passwordHash = await bcrypt.hash(password, 10);
		users.push({
			id: randomUUID(),
			email,
			username,
			passwordHash,
			role: "user",
		});
		fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));

		return new Response(JSON.stringify({ message: "Inscription réussie" }), {
			status: 201,
		});
	} catch {
		return new Response(JSON.stringify({ error: "Erreur serveur" }), {
			status: 500,
		});
	}
};
