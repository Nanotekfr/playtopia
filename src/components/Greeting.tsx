import { useState } from 'preact/hooks';

export default function Greeting({ messages }: { messages: any }) {

  const randomMessage = () => messages[(Math.floor(Math.random() * messages.length))];

  const [greeting, setGreeting] = useState(messages[0]);

  return (
    <div style={{ textAlign: "center", marginTop: "1rem" }}>
      <h3>{greeting} ! Merci pour ta visite !</h3>
      <button
        style={{
          color: "red",
          padding: "0.5rem 1rem",
          borderRadius: "10px",
          cursor: "pointer"
        }}
        onClick={() => setGreeting(randomMessage())}>
        Nouvelle salutation
      </button>
    </div>
  );
}