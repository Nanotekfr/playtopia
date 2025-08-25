import { securityAudit } from "./securityAudit";
import type { Cookies } from "./securityAudit";

export function requireAdmin(cookies: Cookies) {
	const audit = securityAudit(cookies, "admin");
	if (!audit.authorized) return { redirect: "/login" };
	return { user: audit.user };
}
