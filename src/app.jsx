import React, { useState } from 'react';
import './App.css';

const initialPuppies = [
  { id: 1, name: 'Buddy', age: 3, breed: 'Golden Retriever' },
  { id: 2, name: 'Charlie', age: 2, breed: 'Labrador Retriever' },
  { id: 3, name: 'Max', age: 4, breed: 'German Shepherd' },
];

function App() {
  const [puppies, setPuppies] = useState(initialPuppies);
  const [featuredPuppy, setFeaturedPuppy] = useState(null);

  return (
    <div>
      <h1>Furry Friends</h1>
      <ul>
        {puppies.map((puppy) => (
          <li key={puppy.id} onClick={() => setFeaturedPuppy(puppy)}>
            {puppy.name} ({puppy.breed})
          </li>
        ))}
      </ul>
      {featuredPuppy && (
        <div className="featured">
          <h2>Featured Puppy</h2>
          <p>Name: {featuredPuppy.name}</p>
          <p>Age: {featuredPuppy.age}</p>
          <p>Breed: {featuredPuppy.breed}</p>
        </div>
      )}
    </div>
  );
}

export default App;
