import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import EventForm from './EventForm';

type Event = {
  id: string;
  title: string;
  date: string;
  type: string;
};

type Props = {
  initialEvents: Event[];
};

export default function EventManager({ initialEvents }: Props) {
  const [events, setEvents] = useState<Event[]>([]);
  const [editing, setEditing] = useState<Event | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  // 🧠 Charger les événements au démarrage
  useEffect(() => {
    if (initialEvents && initialEvents.length > 0) {
      setEvents(initialEvents);
    } else {
      fetch('/api/events')
        .then(res => res.json())
        .then(setEvents)
        .catch(err => console.error("Erreur chargement events:", err));
    }
  }, [initialEvents]);

  const handleCreate = async (newEvent: Event) => {
    const res = await fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEvent)
    });
    const saved = await res.json();
    setEvents(prev => [...prev, saved]);
    setIsFormVisible(false);
  };

  const handleUpdate = async (updated: Event) => {
    const res = await fetch(`/api/events/${updated.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated)
    });
    if (res.ok) {
      setEvents(prev => prev.map(e => e.id === updated.id ? updated : e));
      setEditing(null);
      setIsFormVisible(false);
    }
  };

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/events/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setEvents(prev => prev.filter(e => e.id !== id));
    }
  };

  return (
    <div>
      <h2>🧩 Événements enregistrés</h2>

      <button onClick={() => {
        setEditing(null);
        setIsFormVisible(true);
      }}>
        ➕ Ajouter un événement
      </button>

      {isFormVisible && (
        <EventForm
          onSubmit={editing ? handleUpdate : handleCreate}
          onCancel={() => setIsFormVisible(false)}
          initialData={editing || undefined}
        />
      )}

      <table class="event-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Date</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map(event => (
            <tr key={event.id}>
              <td>{event.title}</td>
              <td>{event.date}</td>
              <td>{event.type}</td>
              <td>
                <button onClick={() => {
                  setEditing(event);
                  setIsFormVisible(true);
                }}>✏️</button>
                <button onClick={() => handleDelete(event.id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <style>{`
        .event-table {
          margin-top: 2rem;
          border-collapse: collapse;
          width: 100%;
          color: #ffae42;
          font-family: 'Orbitron', sans-serif;
        }

        th, td {
          padding: 0.8rem;
          border-bottom: 1px solid #5a326e;
        }

        th {
          text-align: left;
          background: #2b1b58;
        }

        tr:hover {
          background: #1e0f3f;
        }

        button {
          margin-right: 0.5rem;
          background: #ffae42;
          border: none;
          padding: 0.4rem 0.8rem;
          border-radius: 6px;
          font-weight: bold;
          cursor: pointer;
        }

        button:hover {
          background: #8c5b9e;
          color: white;
        }
      `}</style>
    </div>
  );
}