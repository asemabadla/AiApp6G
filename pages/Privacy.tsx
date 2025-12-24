
import React from 'react';

const Privacy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <h1 className="text-4xl font-black mb-12">سياسة الخصوصية</h1>
      <div className="space-y-8 text-gray-400">
        <p className="text-xl text-white">خصوصيتك هي أولويتنا القصوى في AiApp6G.</p>
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">جمع المعلومات</h2>
          <p>نحن نجمع فقط المعلومات الضرورية لبناء تطبيقك، وهي الوصف الذي تقدمه لغرض المعالجة بالذكاء الاصطناعي فقط.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">استخدام البيانات</h2>
          <p>تُستخدم البيانات فقط لتدريب الوكلاء الرقميين لدينا على بناء التطبيق المطلوب. لا يتم بيع بياناتك أو مشاركتها مع أي جهات خارجية.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">سياسة الإتلاف</h2>
          <p>لضمان أعلى معايير الأمان، قمنا ببرمجة النظام ليقوم بعملية إتلاف (Wipe) شاملة لجميع سجلات تطبيقك فور تحميل الملف النهائي. لا تبقى أي نسخة من عملك لدينا بعد مغادرتك.</p>
        </section>
        <div className="mt-12 p-6 glass-effect rounded-2xl border-indigo-500/20 border">
          <p className="font-bold text-indigo-400">المسؤول عن حماية البيانات:</p>
          <p className="text-white">عاصم العبادلة</p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
