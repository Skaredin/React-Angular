import React from 'react';

const NoteList = ({ notes, onSelect, onDelete, selectedId }) => {
  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {notes.map(note => (
        <li key={note.id} style={{ margin: '5px 0' }}>
          <button
            style={{
              fontWeight: note.id === selectedId ? 'bold' : 'normal',
              width: '100%',
              textAlign: 'left'
            }}
            onClick={() => onSelect(note.id)}
          >
            {note.title}
          </button>
          <button onClick={() => onDelete(note.id)} style={{ float: 'right' }}>❌</button>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;
