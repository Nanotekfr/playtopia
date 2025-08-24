import fs from "fs";
import path from "path";

export type Session = {
	id: string;
	username: string;
	role: string;
	expiresAt: number;
};

export type User = {
	username: string;
	email: string;
	name?: string;
	role: string;
};

export type Cookies = {
	get(name: string): { value?: string } | undefined;
};

export type AuditResult = {
	authorized: boolean;
	status: number;
	message?: string;
	session?: Session;
	user?: User;
};

const sessionsFile = path.resolve("src/data/sessions.json");
const usersFile = path.resolve("src/data/users.json");

function loadSessions(): Session[] {
	try {
		if (!fs.existsSync(sessionsFile)) return [];
		const data = fs.readFileSync(sessionsFile, "utf-8");
		return JSON.parse(data);
	} catch {
		return [];
	}
}

function saveSessions(sessions: Session[]) {
	fs.writeFileSync(sessionsFile, JSON.stringify(sessions, null, 2), "utf-8");
}

function loadUsers(): User[] {
	try {
		if (!fs.existsSync(usersFile)) return [];
		const data = fs.readFileSync(usersFile, "utf-8");
		return JSON.parse(data);
	} catch {
		return [];
	}
}

/**
 * Vérifie la session via cookie, valide la session et le rôle (optionnel),
 * et récupère les infos utilisateur depuis users.json.
 */
export function securityAudit(
	cookies: Cookies,
	requiredRole?: string
): AuditResult {
	const sessionId = cookies.get("sessionId")?.value;

	if (!sessionId) {
		return { authorized: false, status: 401, message: "Non authentifié" };
	}

	let sessions = loadSessions();
	const session = sessions.find((s) => s.id === sessionId);

	if (!session) {
		return { authorized: false, status: 401, message: "Session invalide" };
	}

	if (session.expiresAt < Date.now()) {
		sessions = sessions.filter((s) => s.id !== sessionId);
		saveSessions(sessions);
		return { authorized: false, status: 401, message: "Session expirée" };
	}

	if (requiredRole && session.role !== requiredRole) {
		return { authorized: false, status: 403, message: "Accès interdit" };
	}

	const users = loadUsers();
	const user = users.find((u) => u.username === session.username);

	return { authorized: true, status: 200, session, user };
}
