
import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 glass-effect border-b border-gray-800 px-4 md:px-8 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 ai-gradient rounded-xl flex items-center justify-center font-bold text-white text-xl shadow-lg">
            6G
          </div>
          <span className="text-2xl font-black tracking-tighter text-white">AiApp6G</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="hover:text-indigo-400 transition">الرئيسية</Link>
          <Link to="/about" className="hover:text-indigo-400 transition">من نحن</Link>
          <Link to="/build" className="px-5 py-2 ai-gradient rounded-full text-white font-bold hover:scale-105 transition shadow-indigo-500/20 shadow-lg">ابدأ البناء</Link>
        </nav>

        <button className="md:hidden text-2xl">☰</button>
      </div>
    </header>
  );
};

export default Header;
