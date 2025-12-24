
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-950 border-t border-gray-800 py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-right">
        <div>
          <h3 className="text-xl font-bold mb-4 flex items-center justify-center md:justify-start gap-2">
            <span className="w-8 h-8 ai-gradient rounded-lg flex items-center justify-center text-xs">6G</span>
            AiApp6G
          </h3>
          <p className="text-gray-400 leading-relaxed">
            المنصة الرائدة لبناء تطبيقات المستقبل بدعم من أقوى وكلاء الذكاء الاصطناعي.
          </p>
        </div>
        
        <div className="flex flex-col gap-3">
          <h4 className="font-bold text-white mb-2">روابط هامة</h4>
          <Link to="/about" className="text-gray-400 hover:text-white">من نحن</Link>
          <Link to="/terms" className="text-gray-400 hover:text-white">القواعد والأحكام</Link>
          <Link to="/privacy" className="text-gray-400 hover:text-white">سياسة الخصوصية</Link>
        </div>

        <div className="flex flex-col items-center md:items-end justify-center">
          <p className="text-gray-400 mb-2">جميع الحقوق محفوظة &copy; {new Date().getFullYear()}</p>
          <p className="text-xl font-bold text-indigo-400">عاصم العبادلة</p>
          <p className="text-3xl font-serif mt-2 text-gray-500 select-none">ع.ع</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
