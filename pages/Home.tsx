
import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-4 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-indigo-600/10 blur-[120px] rounded-full -z-10"></div>
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
            حول فكرتك إلى تطبيق <br />
            <span className="text-transparent bg-clip-text ai-gradient">في دقائق معدودة</span>
          </h1>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            استعن بجيش من وكلاء الذكاء الاصطناعي لبناء، تصميم، وتطوير تطبيقك الخاص مقابل 20 دولاراً فقط. بسيط، سريع، وآمن تماماً.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <Link to="/build" className="px-10 py-5 ai-gradient rounded-2xl text-xl font-bold hover:scale-105 transition-all shadow-xl shadow-indigo-500/25 w-full md:w-auto">
              ابدأ بناء تطبيقك الآن
            </Link>
            <Link to="/about" className="px-10 py-5 bg-white/5 hover:bg-white/10 rounded-2xl text-xl font-bold border border-white/10 transition-all w-full md:w-auto">
              تعرف على فريقنا الرقمي
            </Link>
          </div>
        </div>
      </section>

      {/* Agents Section */}
      <section className="py-24 px-4 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">وكلاء الذكاء الاصطناعي لدينا</h2>
            <p className="text-gray-400">كل وكيل متخصص في جزء من عملية التطوير لضمان الجودة العالية.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { title: "المحلل الاستراتيجي", icon: "🧠", desc: "يفهم فكرتك ويحولها لمتطلبات تقنية." },
              { title: "مصمم الواجهات", icon: "🎨", desc: "يبتكر واجهات عصرية وجذابة للمستخدم." },
              { title: "المبرمج المحترف", icon: "💻", desc: "يكتب الأكواد بأحدث التقنيات البرمجية." },
              { title: "مسؤول الجودة", icon: "🛡️", desc: "يختبر التطبيق ويتأكد من خلوه من الأخطاء." }
            ].map((agent, i) => (
              <div key={i} className="p-8 rounded-3xl glass-effect border border-white/5 hover:border-indigo-500/30 transition-all text-center">
                <div className="text-5xl mb-6">{agent.icon}</div>
                <h3 className="text-xl font-bold mb-3">{agent.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{agent.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-24 px-4 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-4xl font-bold mb-8 leading-snug">لماذا تختار <span className="text-indigo-400">AiApp6G</span>؟</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold shrink-0">1</div>
              <div>
                <h4 className="font-bold text-xl mb-1 text-white">سرعة البرق</h4>
                <p className="text-gray-400">بناء التطبيقات لا يستغرق أياماً بل دقائق بفضل التوازي في عمل الوكلاء.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-400 font-bold shrink-0">2</div>
              <div>
                <h4 className="font-bold text-xl mb-1 text-white">سعر تنافسي</h4>
                <p className="text-gray-400">تطبيق متكامل بـ 20 دولار فقط، بدون أي رسوم خفية أو اشتراكات شهرية.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold shrink-0">3</div>
              <div>
                <h4 className="font-bold text-xl mb-1 text-white">خصوصية تامة</h4>
                <p className="text-gray-400">بمجرد تحميلك للتطبيق، نقوم بحذف جميع بياناته من خوادمنا للأبد.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="relative">
          <img src="https://picsum.photos/seed/ai-app/800/600" alt="Dashboard" className="rounded-3xl shadow-2xl border border-white/10" />
          <div className="absolute -bottom-6 -right-6 glass-effect p-6 rounded-2xl border border-white/10 shadow-xl max-w-xs animate-bounce">
            <p className="text-sm font-medium">✨ تم الانتهاء من بناء تطبيق التوصيل الخاص بك!</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
