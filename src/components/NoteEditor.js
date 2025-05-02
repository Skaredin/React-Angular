import React from 'react';

const NoteEditor = ({ note, updateNote }) => {
  const handleTitleChange = (e) => {
    updateNote(note.id, e.target.value, note.text);
  };

  const handleTextChange = (e) => {
    updateNote(note.id, note.title, e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={note.title}
        onChange={handleTitleChange}
        style={{ fontSize: '18px', fontWeight: 'bold', width: '100%', marginBottom: '10px' }}
      />
      <textarea
        rows="20"
        cols="70"
        value={note.text}
        onChange={handleTextChange}
        style={{ width: '100%' }}
      />
    </div>
  );
};

export default NoteEditor;
