
import React, { useState, useEffect, useContext } from 'react';
import PokemonCard from '../components/PokemonCard/PokemonCard';
import { LanguageContext } from '../components/LanguageContext/LanguageContext';

function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [types, setTypes] = useState({});
  const [selectedType, setSelectedType] = useState('');
  const { language } = useContext(LanguageContext);

  const fetchPokemons = async () => {
    try {
      const response = await fetch('https://pokedex-jgabriele.vercel.app/pokemons.json');
      if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
      const data = await response.json();
      setPokemons(data);
      setLoading(false);
    } catch (err) {
      console.error("Erreur lors du fetch:", err.message);
      setError(err.message);
      setLoading(false);
    }
  };

  const fetchTypes = async () => {
    try {
      const response = await fetch('https://pokedex-jgabriele.vercel.app/types.json');
      if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
      const data = await response.json();
      setTypes(data);
    } catch (err) {
      console.error("Erreur lors du fetch des types:", err.message);
    }
  };

  useEffect(() => {
    fetchPokemons();
    fetchTypes();
  }, []);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  };

  if (loading) return <p>Chargement des Pokémon...</p>;
  if (error) return <p>Erreur de chargement : {error}</p>;

  const filteredPokemons = pokemons.filter((pokemon) => {
    const matchesSearch = pokemon.names[language]?.toLowerCase().includes(search.toLowerCase());
    const matchesType =
      selectedType === '' ||
      pokemon.types.some((type) => types[type]?.translations[language] === selectedType);
    return matchesSearch && matchesType;
  });

  return (
    <div className="p-8">
      <div className="mb-6 flex gap-4">
        <input
          type="text"
          placeholder={`Rechercher un Pokémon... (${language})`}
          className="w-full p-3 text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={search}
          onChange={handleSearchChange}
        />

        <select
          className="p-3 text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedType}
          onChange={handleTypeChange}
        >
          <option value="">Tous les types</option>
          {Object.entries(types).map(([key, value]) => (
            <option key={key} value={value.translations[language]}>
              {value.translations[language]}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-4">
        {filteredPokemons.length > 0 ? (
          filteredPokemons.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} typesData={types} />
          ))
        ) : (
          <p className="text-center text-gray-600 mt-8">Aucun Pokémon trouvé.</p>
        )}
      </div>
    </div>
  );
}

export default Home;
