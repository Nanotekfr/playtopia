import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ cookies, redirect }) => {
	cookies.delete("sessionId", {
		path: "/", // très important pour supprimer correctement le cookie
		httpOnly: true,
		sameSite: "strict",
		secure: import.meta.env.PROD,
	});

	return redirect(
		"/login?info=" + encodeURIComponent("Déconnecté avec succès")
	);
};
