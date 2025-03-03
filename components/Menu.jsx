import React, { useState } from 'react';

const Menu = ({ onAddMember, onRemoveMember, allMembers }) => {
  const [showRemoveOptions, setShowRemoveOptions] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState('');

  return (
    <div className="menu bg-indigo-700 text-white py-4 shadow-lg">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4 gap-4">
        <h2 className="text-xl font-bold">Family Tree Maker</h2>
        
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          {/* Dugme za dodavanje člana */}
          <button
            onClick={onAddMember}
            className="bg-white text-indigo-700 px-4 py-2 rounded-lg hover:bg-indigo-100 transition-colors"
          >
            + Dodaj člana
          </button>
          
          {/* Dugme za uklanjanje člana */}
          <button
            onClick={() => setShowRemoveOptions(!showRemoveOptions)}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            - Ukloni člana
          </button>
          
          {/* Dropdown i dugme za potvrdu uklanjanja */}
          {showRemoveOptions && (
            <div className="flex gap-2">
              <select
                value={selectedMemberId}
                onChange={(e) => setSelectedMemberId(e.target.value)}
                className="bg-white text-indigo-700 p-2 rounded-lg flex-grow"
              >
                <option value="">Izaberi člana</option>
                {allMembers.map(member => (
                  <option key={member.id} value={member.id}>{member.name}</option>
                ))}
              </select>
              
              <button
                onClick={() => {
                  onRemoveMember(Number(selectedMemberId));
                  setSelectedMemberId('');
                  setShowRemoveOptions(false);
                }}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                disabled={!selectedMemberId}
              >
                Potvrdi
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;