import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';

export default function LoginForm() {
  const [errorMessage, setErrorMessage] = useState('');
  const [infoMessage, setInfoMessage] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const info = params.get('info');
    if (info) setInfoMessage(info);
  }, []);

  async function handleSubmit(e: Event) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = (form.email as HTMLInputElement).value;
    const password = (form.password as HTMLInputElement).value;

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        setErrorMessage('Identifiants incorrects');
        form.reset();
        return;
      }

      const data = await res.json();
      document.cookie = `sessionId=${data.sessionId}; path=/; max-age=3600`;

      if (data.role === 'admin') {
        window.location.href = '/admin';
      } else {
        window.location.href = '/';
      }
    } catch {
      setErrorMessage('Erreur lors de la connexion');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {infoMessage && (
        <p style={{ color: 'green', marginBottom: '1rem', fontWeight: 'bold' }}>
          {infoMessage}
        </p>
      )}
      <input type="email" name="email" placeholder="Email" required />
      <input type="password" name="password" placeholder="Mot de passe" required />
      <button type="submit">Se connecter</button>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </form>
  );
}