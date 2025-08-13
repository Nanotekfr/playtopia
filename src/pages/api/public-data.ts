export async function get() {
	const publicData = { message: "Données publiques accessibles à tous" };

	return new Response(JSON.stringify(publicData), {
		status: 200,
		headers: { "Content-Type": "application/json" },
	});
}
