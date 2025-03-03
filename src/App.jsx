import React, { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import FamilyTree from '../components/FamilyTree';
import Menu from '../components/Menu';
import AddMemberModal from '../components/AddMemberModal';
import './App.css';

// Helper funkcije
const getAllMembers = (members) => {
  let allMembers = [];
  const traverse = (person) => {
    allMembers.push({ id: person.id, name: person.name });
    person.children?.forEach(child => traverse(child));
  };
  members.forEach(traverse);
  return allMembers;
};

const removeMemberById = (members, targetId) => {
  return members
    .filter(person => person.id !== targetId)
    .map(person => ({
      ...person,
      children: removeMemberById(person.children, targetId)
    }));
};

function App() {
  const [familyData, setFamilyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Učitavanje podataka
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Za server implementaciju:
        // const response = await fetch('http://localhost:5000/api/family');
        // const data = await response.json();
        
        const savedData = localStorage.getItem('familyData');
        const initialData = savedData 
          ? JSON.parse(savedData)
          : await fetch('/data.json').then(res => res.json());
        
        setFamilyData(initialData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Dodavanje člana
  const handleAddMember = (newMember) => {
    const newId = Math.max(...familyData.map(p => p.id), 0) + 1;
    const member = {
      id: newId,
      ...newMember,
      children: []
    };

    const updatedData = JSON.parse(JSON.stringify(familyData));
    
    if (newMember.parentId) {
      let parentFound = false;
      const findParent = (members) => {
        for (let person of members) {
          if (person.id === newMember.parentId) {
            person.children.push(member);
            parentFound = true;
            return;
          }
          if (person.children?.length) findParent(person.children);
        }
      };
      findParent(updatedData);
      if (!parentFound) return console.error('Roditelj nije pronađen');
    } else {
      updatedData.push(member);
    }

    setFamilyData(updatedData);
    localStorage.setItem('familyData', JSON.stringify(updatedData));
    
    // Za server implementaciju:
    // fetch('/api/family', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(member)
    // });
  };

  // Brisanje člana
  const handleRemoveMember = (id) => {
    if (!id) return;
    const updatedData = removeMemberById(familyData, id);
    if (updatedData.length === familyData.length) return;
    
    setFamilyData(updatedData);
    localStorage.setItem('familyData', JSON.stringify(updatedData));
    
    // Za server implementaciju:
    // fetch(`/api/family/${id}`, { method: 'DELETE' });
  };

  if (loading) return (
    <div className="loader-container">
      <ClipLoader color="#4F46E5" size={60} />
      <p className="loading-text">Učitavanje porodičnog stabla...</p>
    </div>
  );

  if (error) return (
    <div className="error-container">
      <div className="error-message">⚠️ Greška: {error}</div>
      <button 
        className="retry-button"
        onClick={() => window.location.reload()}
      >
        Pokušaj ponovo
      </button>
    </div>
  );

  return (
    <div className="app-container">
      <Menu
        onAddMember={() => setIsModalOpen(true)}
        onRemoveMember={handleRemoveMember}
        allMembers={getAllMembers(familyData)}
      />
      
      <AddMemberModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddMember={handleAddMember}
        allMembers={getAllMembers(familyData)}
      />

      <header className="app-header">
        <h1 className="main-title">
          <span className="gradient-text">Porodično Stablo</span>
          <div className="title-decoration"></div>
        </h1>
      </header>

      <main className="main-content">
        <FamilyTree data={familyData} />
      </main>

      <footer className="app-footer">
        <p className="footer-text">
          © {new Date().getFullYear()} Family Tree Maker
          <span className="separator">•</span>
          <a href="/about" className="footer-link">O projektu</a>
        </p>
      </footer>
    </div>
  );
}

export default App;