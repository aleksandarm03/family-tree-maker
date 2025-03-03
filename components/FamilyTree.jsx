import React from 'react';
import Person from './Person';

const FamilyTree = ({ data }) => {
  return (
    <div className="family-tree flex justify-center p-8">
      {data.map(person => (
        <Person key={person.id} person={person} />
      ))}
    </div>
  );
};

export default FamilyTree;