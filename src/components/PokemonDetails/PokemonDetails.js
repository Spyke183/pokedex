import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { LanguageContext } from '../LanguageContext/LanguageContext';

const PokemonDetails = () => {
  const { id } = useParams();
  const { language } = useContext(LanguageContext);

  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [typeColors, setTypeColors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pokemonResponse = await fetch('https://pokedex-jgabriele.vercel.app/pokemons.json');
        if (!pokemonResponse.ok) throw new Error(`Erreur HTTP: ${pokemonResponse.status}`);
        const pokemonData = await pokemonResponse.json();
        const selectedPokemon = pokemonData.find((p) => p.id === parseInt(id));
        if (!selectedPokemon) throw new Error("Pokémon non trouvé.");

        const typeResponse = await fetch('https://pokedex-jgabriele.vercel.app/types.json');
        if (!typeResponse.ok) throw new Error(`Erreur HTTP: ${typeResponse.status}`);
        const typeData = await typeResponse.json();

        setPokemon(selectedPokemon);
        setTypeColors(typeData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500"></div>
    </div>
  );  if (error) return <p className="text-center text-red-600 mt-8">Erreur : {error}</p>;

  const { names, image, height, weight, types, moves } = pokemon;

  return (
    <div className="text-center mt-8">
      <div className="font-light text-6xl leading-tight tracking-tight text-black">
        {names?.[language] || "Inconnu"}
      </div>

      <div className="flex justify-center mt-4">
        <img src={image} alt={names?.[language] || "Pokémon"} className="h-48" />
      </div>

      <p className="text-lg mt-4">
        <span className="font-bold">{height}m</span> - <span className="font-bold">{weight}kg</span>
      </p>

      <div className="flex justify-center gap-4 mt-4">
        {types.map((type, index) => (
          <span
            key={index}
            className="text-white rounded-full px-4 py-2 font-bold"
            style={{
              backgroundColor: typeColors[type]?.backgroundColor || '#ccc',
            }}
          >
            {typeColors[type]?.translations[language]?.toUpperCase() || type.toUpperCase()}
          </span>
        ))}
      </div>

      <button
        onClick={handleDialogOpen}
        className="mt-6 bg-orange-500 text-white font-semibold px-6 py-2 rounded-lg hover:bg-orange-600 transition"
      >
        MOVES
      </button>

      {dialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full max-h-96 overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Mouvements du Pokémon</h2>

            <ul className="list-disc pl-5 space-y-1">
              {moves.length > 0 ? (
                moves.map((move, index) => (
                  <li key={index} className="text-gray-700">
                    {move}
                  </li>
                ))
              ) : (
                <li className="text-gray-700">Aucun mouvement trouvé</li>
              )}
            </ul>

            <button
              onClick={handleDialogClose}
              className="mt-4 bg-orange-500 text-white font-semibold px-6 py-2 rounded-lg hover:bg-orange-600 transition"
            >
              FERMER
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PokemonDetails;
