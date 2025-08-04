import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';

type GameEvent = {
  id: string;
  title: string;
  date: string;
  type: string;
};

type Props = {
  onSubmit: (event: GameEvent) => void;
  onCancel: () => void;
  initialData?: GameEvent;
};

export default function EventForm({ onSubmit, onCancel, initialData }: Props) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [date, setDate] = useState(initialData?.date || '');
  const [type, setType] = useState(initialData?.type || '');

  useEffect(() => {
    setTitle(initialData?.title || '');
    setDate(initialData?.date || '');
    setType(initialData?.type || '');
  }, [initialData]);

  const handleSubmit = (e: preact.JSX.TargetedEvent<HTMLFormElement, SubmitEvent>) => {
    e.preventDefault();

    if (!title || !date || !type) {
      alert("Remplis tous les champs, Dylan !");
      return;
    }

    const newEvent: GameEvent = {
      id: initialData?.id || crypto.randomUUID(),
      title,
      date,
      type,
    };

    onSubmit(newEvent);
  };

  return (
    <form onSubmit={handleSubmit} class="cyber-form">
      <label>
        Nom :
        <input type="text" value={title} onInput={e => setTitle(e.currentTarget.value)} />
      </label>

      <label>
        Date :
        <input type="date" value={date} onInput={e => setDate(e.currentTarget.value)} />
      </label>

      <label>
        Type :
        <input type="text" value={type} onInput={e => setType(e.currentTarget.value)} />
      </label>

      <div class="actions">
        <button type="submit">💾 Sauvegarder</button>
        <button type="button" onClick={onCancel}>❌ Annuler</button>
      </div>

      <style>
        {`
          .cyber-form {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            background: #1e0f3f;
            padding: 1.5rem;
            border-radius: 12px;
            font-family: 'Orbitron', monospace;
            color: #ffae42;
            max-width: 320px;
          }
          label {
            display: flex;
            flex-direction: column;
            font-weight: 700;
            font-size: 0.9rem;
          }
          input {
            margin-top: 6px;
            padding: 8px;
            border-radius: 6px;
            border: 2px solid #5a326e;
            background: #2b1b58;
            color: #ffae42;
            font-family: 'Orbitron', monospace;
            font-size: 1rem;
            transition: border-color 0.3s;
          }
          input:focus {
            outline: none;
            border-color: #ffae42;
          }
          .actions {
            display: flex;
            justify-content: space-between;
          }
          button {
            background: #ffae42;
            border: none;
            color: #1e0f3f;
            padding: 0.6rem 1.2rem;
            font-weight: 700;
            border-radius: 8px;
            cursor: pointer;
            transition: background-color 0.3s;
            font-family: 'Orbitron', monospace;
          }
          button:hover {
            background: #8c5b9e;
            color: #fff;
          }
        `}
      </style>
    </form>
  );
}
