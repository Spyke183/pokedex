import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../../components/LanguageContext/LanguageContext';

const Header = () => {
  const { language, changeLanguage } = useContext(LanguageContext);

  const handleChange = (event) => {
    changeLanguage(event.target.value); 
  };

  return (
    <header className="bg-[#282C34] text-white p-4 flex justify-between items-center shadow-lg">
      
      <div className="text-2xl font-bold">
        <Link to="/">
          <img src="/assets/Header/logo.svg" alt="Pokedex Logo" className="h-12" />
        </Link>
      </div>

      <div>
        <select
          value={language}
          onChange={handleChange}
          className="bg-[#282C34] text-white border border-gray-500 rounded px-2 py-1 focus:outline-none"
        >
          <option value="fr">Français</option>
          <option value="en">English</option>
          <option value="de">Deutsch</option>
          <option value="es">Español</option>
          <option value="ja">日本語</option>
        </select>
      </div>
    </header>
  );
};

export default Header;
