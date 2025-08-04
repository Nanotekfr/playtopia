import type { APIRoute } from "astro";
import fs from "fs/promises";
import path from "path";

const eventsPath = path.resolve("./src/data/events.json");

export const prerender = false; // Pour que l’API soit dynamique

export const GET: APIRoute = async () => {
	try {
		const raw = await fs.readFile(eventsPath, "utf-8");
		const events = JSON.parse(raw);
		return new Response(JSON.stringify(events), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	} catch (err) {
		console.error("Erreur lecture events:", err);
		return new Response("Erreur lecture events", { status: 500 });
	}
};

export const POST: APIRoute = async ({ request }) => {
	try {
		const newEvent = await request.json();

		// Vérif basique des données
		if (!newEvent || typeof newEvent !== "object") {
			return new Response("Données invalides", { status: 400 });
		}

		const raw = await fs.readFile(eventsPath, "utf-8");
		const events = JSON.parse(raw);

		events.push(newEvent);

		await fs.writeFile(eventsPath, JSON.stringify(events, null, 2), "utf-8");

		return new Response(JSON.stringify(newEvent), {
			status: 201,
			headers: { "Content-Type": "application/json" },
		});
	} catch (err) {
		console.error("Erreur ajout event:", err);
		return new Response("Erreur ajout event", { status: 500 });
	}
};
