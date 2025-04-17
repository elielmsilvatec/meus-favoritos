import React, { useState } from 'react';
import { Plus, Pencil, Trash2, X, Check, ExternalLink } from 'lucide-react';

interface Bookmark {
  id: string;
  name: string;
  url: string;
}

function App() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [newBookmark, setNewBookmark] = useState({ name: '', url: '' });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const addBookmark = () => {
    if (newBookmark.name && newBookmark.url) {
      setBookmarks([...bookmarks, { ...newBookmark, id: Date.now().toString() }]);
      setNewBookmark({ name: '', url: '' });
      setIsAdding(false);
    }
  };

  const startEdit = (bookmark: Bookmark) => {
    setEditingId(bookmark.id);
    setNewBookmark({ name: bookmark.name, url: bookmark.url });
  };

  const saveEdit = () => {
    if (editingId) {
      setBookmarks(bookmarks.map(b => 
        b.id === editingId ? { ...b, ...newBookmark } : b
      ));
      setEditingId(null);
      setNewBookmark({ name: '', url: '' });
    }
  };

  const deleteBookmark = (id: string) => {
    setBookmarks(bookmarks.filter(b => b.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Meus Favoritos</h1>
          <button
            onClick={() => setIsAdding(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700 transition-colors"
          >
            <Plus size={20} /> Adicionar Novo
          </button>
        </div>

        {isAdding && (
          <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Nome do site"
                value={newBookmark.name}
                onChange={(e) => setNewBookmark({ ...newBookmark, name: e.target.value })}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="url"
                placeholder="URL do site (ex: https://exemplo.com)"
                value={newBookmark.url}
                onChange={(e) => setNewBookmark({ ...newBookmark, url: e.target.value })}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <div className="flex gap-2">
                <button
                  onClick={addBookmark}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition-colors"
                >
                  <Check size={20} /> Salvar
                </button>
                <button
                  onClick={() => {
                    setIsAdding(false);
                    setNewBookmark({ name: '', url: '' });
                  }}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-600 transition-colors"
                >
                  <X size={20} /> Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarks.map(bookmark => (
            <div key={bookmark.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              {editingId === bookmark.id ? (
                <div className="flex flex-col gap-4">
                  <input
                    type="text"
                    value={newBookmark.name}
                    onChange={(e) => setNewBookmark({ ...newBookmark, name: e.target.value })}
                    className="border border-gray-300 rounded-lg px-4 py-2"
                  />
                  <input
                    type="url"
                    value={newBookmark.url}
                    onChange={(e) => setNewBookmark({ ...newBookmark, url: e.target.value })}
                    className="border border-gray-300 rounded-lg px-4 py-2"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={saveEdit}
                      className="bg-green-600 text-white px-3 py-1 rounded-lg flex items-center gap-1 text-sm"
                    >
                      <Check size={16} /> Salvar
                    </button>
                    <button
                      onClick={() => {
                        setEditingId(null);
                        setNewBookmark({ name: '', url: '' });
                      }}
                      className="bg-gray-500 text-white px-3 py-1 rounded-lg flex items-center gap-1 text-sm"
                    >
                      <X size={16} /> Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">{bookmark.name}</h2>
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEdit(bookmark)}
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <Pencil size={20} />
                      </button>
                      <button
                        onClick={() => deleteBookmark(bookmark.id)}
                        className="text-red-600 hover:text-red-800 transition-colors"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                  <a
                    href={bookmark.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-800 transition-colors flex items-center gap-2"
                  >
                    <ExternalLink size={20} />
                    Visitar site
                  </a>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;