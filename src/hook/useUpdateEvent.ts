import { useState } from "preact/hooks";

export function useUpdateEvent(token: string) {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<string | null>(null);

	async function updateEvent(id: string, data: object, token: string) {
		const response = await fetch(`/api/events/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(data),
		});

		if (!response.ok) {
			const err = await response.json();
			throw new Error(err.error || "Erreur inconnue");
		}

		return response.json();
	}

	return { loading, error, success, updateEvent };
}
