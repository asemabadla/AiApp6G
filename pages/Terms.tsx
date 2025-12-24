
import React from 'react';

const Terms: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <h1 className="text-4xl font-black mb-12">القواعد والأحكام</h1>
      <div className="space-y-8 text-gray-400">
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">1. الاتفاقية</h2>
          <p>باستخدامك لمنصة AiApp6G، فإنك توافق على الالتزام بهذه الشروط والأحكام. توفر المنصة خدمة بناء تطبيقات برمجية بناءً على وصف المستخدم.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">2. التكاليف والمدفوعات</h2>
          <p>تكلفة الخدمة هي 20 دولاراً أمريكياً تدفع لمرة واحدة لكل تطبيق. هذا السعر يمنحك الحق في تحميل نسخة كاملة من التطبيق الذي تم إنشاؤه.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">3. التعديلات</h2>
          <p>يحق للعميل طلب تعديلات على التطبيق أثناء مرحلة المعاينة وقبل إجراء عملية الدفع والتحميل النهائية. بمجرد التحميل، يتم إغلاق المشروع.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">4. حذف البيانات</h2>
          <p>نحن نلتزم بسياسة "الحذف الفوري". فور انتهاء العميل من تحميل تطبيقه، يتم حذف جميع بيانات الكود والوصف والملفات المرتبطة به من خوادم الموقع نهائياً.</p>
        </section>
      </div>
    </div>
  );
};

export default Terms;
