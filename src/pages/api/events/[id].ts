import type { APIRoute } from "astro";
import fs from "fs";
import path from "path";

const eventsPath = path.resolve("./src/data/events.json");

export const prerender = false;

// Utilitaire pour lire et écrire dans le fichier
function readEvents() {
	const raw = fs.readFileSync(eventsPath, "utf-8");
	return JSON.parse(raw);
}

function writeEvents(events: any) {
	fs.writeFileSync(eventsPath, JSON.stringify(events, null, 2));
}

// ✅ Mise à jour d’un événement
export const PUT: APIRoute = async ({ request, params }) => {
	const id = params.id;
	if (!id) return new Response("Missing ID", { status: 400 });

	const data = await request.json();
	const events = readEvents();

	const index = events.findIndex((e: any) => e.id === id);
	if (index === -1) {
		return new Response("Event not found", { status: 404 });
	}

	events[index] = { ...events[index], ...data, id }; // merge sans perdre l'id
	writeEvents(events);

	return new Response(JSON.stringify(events[index]), {
		status: 200,
		headers: { "Content-Type": "application/json" },
	});
};

// ❌ Suppression d’un événement
export const DELETE: APIRoute = async ({ params }) => {
	const id = params.id;
	if (!id) return new Response("Missing ID", { status: 400 });

	const events = readEvents();
	const updated = events.filter((e: any) => e.id !== id);

	if (updated.length === events.length) {
		return new Response("Event not found", { status: 404 });
	}

	writeEvents(updated);

	return new Response(null, { status: 204 });
};
