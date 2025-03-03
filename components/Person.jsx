import React from 'react';

const Person = ({ person }) => {
  return (
    <div className="person bg-white shadow-lg rounded-lg p-6 m-4 text-center transform hover:scale-105 transition-transform">
      {/* Kontejner za sliku */}
      {person.image && (
        <div className="w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full border-4 border-indigo-100">
          <img
            src={person.image}
            alt={person.name}
            className="w-full h-full object-cover"
            width="70px"
          />
        </div>
      )}
      <h3 className="text-xl font-semibold text-gray-800">{person.name}</h3>
      <p className="text-sm text-gray-600">Datum rođenja: {person.birthDate}</p>
      {person.children && (
        <div className="children flex justify-center space-x-4 mt-4">
          {person.children.map(child => (
            <Person key={child.id} person={child} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Person;