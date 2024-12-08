import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../LanguageContext/LanguageContext';

const PokemonCard = ({ pokemon }) => {
  const [typeColors, setTypeColors] = useState({});
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    const fetchTypeColors = async () => {
      try {
        const response = await fetch('https://pokedex-jgabriele.vercel.app/types.json');
        if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
        const data = await response.json();
        setTypeColors(data);
      } catch (err) {
        console.error("Erreur lors de la récupération des couleurs des types:", err);
      }
    };

    fetchTypeColors();
  }, []);

  if (!pokemon) return null;

  const { id, names, image, types } = pokemon;

  return (
    <Link
      to={`/pokemon/${id}`}
      className="bg-gray-800 h-56 w-56 rounded-xl m-4 overflow-hidden relative transform scale-100 transition-all duration-300 text-white hover:scale-110 hover:shadow-xl text-decoration-none"
    >
      <div className="text-xs pl-1.5 pt-2 text-white">No.{id}</div>

      <div className="flex justify-center pt-3 text-lg font-semibold text-white">
        {names?.[language] || "Inconnu"}
      </div>

      <div className="flex justify-center mt-2">
        <img src={image} alt={names?.[language] || "Pokémon"} className="w-24 h-24" />
      </div>

      <div className="flex justify-center gap-2 mt-2">
        {types?.map((type, index) => (
          <span
            key={index}
            className="rounded-xl px-2 py-1 font-bold text-white"
            style={{
              backgroundColor: typeColors[type]?.backgroundColor || '#ccc',
            }}
          >
            {typeColors[type]?.translations[language]?.toUpperCase() || type.toUpperCase()}
          </span>
        ))}
      </div>
    </Link>
  );
};

export default PokemonCard;
