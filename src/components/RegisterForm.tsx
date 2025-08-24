import { h } from "preact";
import { useState } from "preact/hooks";

export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: h.JSX.TargetedEvent<HTMLFormElement, Event>) => {
    e.preventDefault();

    if (!username || !email || !password) {
      setMessage("Veuillez remplir tous les champs");
      return;
    }

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await res.json();
    setMessage(data.message || data.error);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={e => setUsername(e.currentTarget.value)}
        placeholder="Nom d'utilisateur"
        required
      />
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.currentTarget.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.currentTarget.value)}
        placeholder="Mot de passe"
        required
      />
      <button type="submit">S'inscrire</button>
      {message && <p>{message}</p>}
    </form>
  );
}