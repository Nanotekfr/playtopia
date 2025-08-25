import type { APIRoute } from "astro";
import fs from "fs";
import path from "path";
import type { Session } from "../../utils/securityAudit";

const sessionsFile = path.resolve("src/data/sessions.json");

function loadSessions(): Session[] {
	if (!fs.existsSync(sessionsFile)) return [];
	return JSON.parse(fs.readFileSync(sessionsFile, "utf-8"));
}

function saveSessions(sessions: Session[]) {
	fs.writeFileSync(sessionsFile, JSON.stringify(sessions, null, 2));
}

export const post: APIRoute = async ({ cookies }) => {
	const sessionId = cookies.get("sessionId")?.value;
	if (sessionId) {
		let sessions = loadSessions();
		sessions = sessions.filter((s) => s.id !== sessionId);
		saveSessions(sessions);
		cookies.delete("sessionId", { path: "/" });
	}
	return new Response(JSON.stringify({ message: "Déconnecté" }), {
		status: 200,
	});
};
