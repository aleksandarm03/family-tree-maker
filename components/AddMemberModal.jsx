import React, { useState } from 'react';

const AddMemberModal = ({ isOpen, onClose, onAddMember, allMembers }) => {
  const [formData, setFormData] = useState({
    name: '',
    birthDate: '',
    parentId: '',
    image: null, // Čuvaćemo fajl slike
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onloadend = () => {
      onAddMember({
        ...formData,
        image: reader.result, // Konvertujemo sliku u base64
        parentId: formData.parentId ? Number(formData.parentId) : null,
      });
      onClose();
    };
    if (formData.image) {
      reader.readAsDataURL(formData.image); // Čitamo fajl kao base64
    } else {
      onAddMember({
        ...formData,
        image: null,
        parentId: formData.parentId ? Number(formData.parentId) : null,
      });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Novi član</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label>Ime i prezime:</label>
            <input
              type="text"
              className="w-full p-2 border rounded mt-1"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="mb-4">
            <label>Datum rođenja:</label>
            <input
              type="date"
              className="w-full p-2 border rounded mt-1"
              value={formData.birthDate}
              onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
              required
            />
          </div>

          <div className="mb-4">
            <label>Slika (opciono):</label>
            <input
              type="file"
              accept="image/*"
              className="w-full p-2 border rounded mt-1"
              onChange={handleImageChange}
            />
          </div>

          <div className="mb-4">
            <label>Roditelj:</label>
            <select
              className="w-full p-2 border rounded mt-1"
              value={formData.parentId}
              onChange={(e) => setFormData({ ...formData, parentId: e.target.value })}
            >
              <option value="">Nema roditelja</option>
              {allMembers.map(member => (
                <option key={member.id} value={member.id}>{member.name}</option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Otkaži
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Sačuvaj
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMemberModal;