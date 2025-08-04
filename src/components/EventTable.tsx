import { h } from 'preact';

export interface Event {
  id: string;
  title: string;
  date: string;
  description: string;
  places: string;
  type: string;
}

type Props = {
  events: Event[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function EventTable({ events, onEdit, onDelete }: Props) {
  return (
    <table class="cyber-table">
      <thead>
        <tr>
          <th>Nom</th>
          <th>Date</th>
          <th>Description</th>
          <th>Places</th>
          <th>Type</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {events.map(event => (
          <tr key={event.id}>
            <td>{event.title}</td>
            <td>{event.date}</td>
            <td>{event.description}</td>
            <td>{event.places}</td>
            <td>{event.type}</td>
            <td>
              <button class="btn-edit" onClick={() => onEdit(event.id)}>✏️</button>
              <button class="btn-delete" onClick={() => onDelete(event.id)}>🗑️</button>
            </td>
          </tr>
        ))}
      </tbody>
      <style>
        {`
          .cyber-table {
            width: 100%;
            border-collapse: collapse;
            background: #1e0f3f;
            color: #ffae42;
            font-family: 'Orbitron', monospace;
          }
          .cyber-table th, .cyber-table td {
            padding: 12px 16px;
            border-bottom: 1px solid #5a326e;
            text-align: left;
          }
          .cyber-table th {
            background: #5a326e;
          }
          .btn-edit, .btn-delete {
            background: transparent;
            border: none;
            cursor: pointer;
            color: #ffae42;
            font-size: 1.2rem;
            margin-right: 8px;
            transition: color 0.3s;
          }
          .btn-edit:hover {
            color: #8c5b9e;
          }
          .btn-delete:hover {
            color: #ff4d4d;
          }
        `}
      </style>
    </table>
  );
}