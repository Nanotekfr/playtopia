import { h } from "preact";
import { useState } from "preact/hooks";

export default function LoginForm() {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    if (!usernameOrEmail || !password) {
      setMessage("Veuillez remplir tous les champs");
      return;
    }

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usernameOrEmail, password }),
      });
      const data = await res.json();

      if (res.ok && data.role === "admin") {
        window.location.href = "/admin"; // redirection côté client
      } else {
        setMessage(data.error || "Accès refusé");
      }
    } catch (err) {
      setMessage("Erreur serveur");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={usernameOrEmail} onInput={e => setUsernameOrEmail(e.currentTarget.value)} placeholder="Email ou username" required />
      <input type="password" value={password} onInput={e => setPassword(e.currentTarget.value)} placeholder="Mot de passe" required />
      <button type="submit">Connexion</button>
      {message && <p>{message}</p>}
    </form>
  );
}