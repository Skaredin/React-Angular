import React, { useState, useEffect } from 'react';
import NoteList from './NoteList';
import NoteEditor from './NoteEditor';

const LOCAL_STORAGE_KEY = 'react-notepad-notes';

const NotepadApp = () => {
  const [notes, setNotes] = useState([]);
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Загрузка из localStorage при старте
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      const parsedNotes = JSON.parse(saved);
      setNotes(parsedNotes);
      if (parsedNotes.length > 0) {
        setSelectedNoteId(parsedNotes[0].id);
      }
    }
  }, []);

  // Сохранение в localStorage при любом изменении
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    const newNote = {
      id: Date.now(),
      title: `Запись ${notes.length + 1}`,
      text: ''
    };
    setNotes([...notes, newNote]);
    setSelectedNoteId(newNote.id);
  };

  const deleteNote = (id) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);
    if (selectedNoteId === id) {
      setSelectedNoteId(updatedNotes.length > 0 ? updatedNotes[0].id : null);
    }
  };

  const updateNote = (id, newTitle, newText) => {
    const updatedNotes = notes.map(note =>
      note.id === id ? { ...note, title: newTitle, text: newText } : note
    );
    setNotes(updatedNotes);
  };

  const saveAllNotesToFile = () => {
    const fileContent = notes.map(note => `${note.title}\n${note.text}`).join('\n\n---\n\n');
    const blob = new Blob([fileContent], { type: 'text/plain' });
    const element = document.createElement('a');
    element.href = URL.createObjectURL(blob);
    element.download = 'notes.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedNote = notes.find(note => note.id === selectedNoteId);

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '250px', borderRight: '1px solid gray', padding: '10px' }}>
        <button onClick={addNote}>➕ Добавить</button>
        <input
          type="text"
          placeholder="🔍 Поиск..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{ width: '100%', marginTop: '10px', marginBottom: '10px' }}
        />
        <NoteList
          notes={filteredNotes}
          onSelect={setSelectedNoteId}
          onDelete={deleteNote}
          selectedId={selectedNoteId}
        />
        <button onClick={saveAllNotesToFile}>💾 Сохранить всё</button>
      </div>
      <div style={{ flexGrow: 1, padding: '10px' }}>
        {selectedNote ? (
          <NoteEditor note={selectedNote} updateNote={updateNote} />
        ) : (
          <p>Выберите запись</p>
        )}
      </div>
    </div>
  );
};

export default NotepadApp;
