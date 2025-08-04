import type { APIRoute } from "astro";
import fs from "fs/promises";
import path from "path";

export const prerender = false;

const eventsPath = path.resolve("./src/data/events.json");

async function readEvents() {
	const raw = await fs.readFile(eventsPath, "utf-8");
	return JSON.parse(raw);
}

async function writeEvents(events: any[]) {
	await fs.writeFile(eventsPath, JSON.stringify(events, null, 2), "utf-8");
}

export const GET: APIRoute = async ({ params }) => {
	try {
		const events = await readEvents();
		const event = events.find((e: any) => e.id === params.id);

		if (!event) {
			return new Response("Événement non trouvé", { status: 404 });
		}

		return new Response(JSON.stringify(event), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	} catch {
		return new Response("Erreur lecture event", { status: 500 });
	}
};

export const PUT: APIRoute = async ({ params, request }) => {
	try {
		const updatedEvent = await request.json();
		const events = await readEvents();
		const index = events.findIndex((e: any) => e.id === params.id);

		if (index === -1) {
			return new Response("Événement non trouvé", { status: 404 });
		}

		events[index] = updatedEvent;
		await writeEvents(events);

		return new Response(JSON.stringify(updatedEvent), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	} catch {
		return new Response("Erreur mise à jour event", { status: 500 });
	}
};

export const DELETE: APIRoute = async ({ params }) => {
	try {
		const events = await readEvents();
		const filtered = events.filter((e: any) => e.id !== params.id);

		if (filtered.length === events.length) {
			return new Response("Événement non trouvé", { status: 404 });
		}

		await writeEvents(filtered);

		return new Response(null, { status: 204 });
	} catch {
		return new Response("Erreur suppression event", { status: 500 });
	}
};
