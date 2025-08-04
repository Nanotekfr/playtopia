import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';

type Event = {
  id: string;
  image: string;
  title: string;
  date: string;
  description: string,
  places: string;
  type: string;
};

type Props = {
  onSubmit: (event: Event) => void;
  onCancel: () => void;
  initialData?: Event;
};

export default function EventForm({ onSubmit, onCancel, initialData }: Props) {
  const [image, setImage] = useState(initialData?.image || 'https://www.powertrafic.fr/wp-content/uploads/2023/04/image-ia-exemple-768x384.png');
  const [title, setTitle] = useState(initialData?.title || '');
  const [date, setDate] = useState(initialData?.date || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [places, setPlaces] = useState(initialData?.places || '');
  const [type, setType] = useState(initialData?.type || '');

  useEffect(() => {
    setTitle(initialData?.image || '');
    setTitle(initialData?.title || '');
    setDate(initialData?.date || '');
    setDescription(initialData?.description || '');
    setType(initialData?.places || '');
    setType(initialData?.type || '');
  }, [initialData]);

  const handleSubmit = (e: preact.JSX.TargetedEvent<HTMLFormElement, SubmitEvent>) => {
    e.preventDefault();

    if (!title || !date || !type) {
      alert("Remplis tous les champs!");
      return;
    }

    const newEvent: Event = {
      id: initialData?.id || crypto.randomUUID(),
      image,
      title,
      date,
      description,
      places,
      type
    };

    onSubmit(newEvent);
  };

  return (
    <form onSubmit={handleSubmit} class="cyber-form">
      <label>
        Image :
        <input type="text" value={image} onInput={e => setImage(e.currentTarget.value)} />
      </label>

      <label>
        Nom :
        <input type="text" value={title} onInput={e => setTitle(e.currentTarget.value)} />
      </label>

      <label>
        Date :
        <input type="date" value={date} onInput={e => setDate(e.currentTarget.value)} />
      </label>

      <label>
        Description :
        <input type="text" value={description} onInput={e => setDescription(e.currentTarget.value)} />
      </label>

      <label>
        Places :
        <input type="number" value={places} onInput={e => setPlaces(e.currentTarget.value)} />
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
