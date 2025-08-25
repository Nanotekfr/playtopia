import { useState } from "preact/hooks";

interface LoginFormProps {
  redirectUrl?: string;
}

export default function LoginForm({ redirectUrl = "/admin" }: LoginFormProps) {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    console.log("handleSubmit triggered");  // <-- doit s'afficher
    setError("");

    console.log("Fetch /api/login avec :", { usernameOrEmail, password });
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usernameOrEmail, password })
      });

      const data = await res.json();

      if (!res.ok) {
        console.warn("Erreur login:", data);
        setError(data.error || "Erreur inconnue");
        return;
      }

      console.log("Connexion réussie:", data);
      window.location.href = redirectUrl;
    } catch (err) {
      console.error("Erreur serveur login:", err);
      setError("Erreur serveur, réessayez plus tard.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ maxWidth: "400px", margin: "2rem auto", display: "flex", flexDirection: "column", gap: "12px" }}
    // On retire tout action/method pour éviter un submit classique
    >
      <h2>🔑 Connexion Admin</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        type="text"
        placeholder="Nom d'utilisateur ou email"
        value={usernameOrEmail}
        onInput={(e: any) => setUsernameOrEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onInput={(e: any) => setPassword(e.target.value)}
        required
      />

      <button
        type="submit"
        style={{ padding: "10px", background: "#5a326e", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}
      >
        Se connecter
      </button>
    </form>
  );
}