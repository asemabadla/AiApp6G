
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <h1 className="text-4xl font-black mb-8 border-r-4 border-indigo-500 pr-4">من نحن</h1>
      <div className="prose prose-invert max-w-none space-y-6 text-gray-300 leading-loose">
        <p className="text-xl">
          AiApp6G هي منصة برمجية رائدة تهدف إلى دمقرطة صناعة التطبيقات وجعلها في متناول الجميع. نحن نؤمن بأن كل شخص لديه فكرة عظيمة يستحق فرصة لتحويلها إلى واقع ملموس دون الحاجة لمعرفة تقنية عميقة أو ميزانيات ضخمة.
        </p>
        <div className="bg-gray-800/50 p-8 rounded-3xl border border-white/5 my-12">
          <h2 className="text-2xl font-bold mb-4 text-white">رؤية عاصم العبادلة</h2>
          <p>
            تأسست هذه المنصة تحت إشراف المطور <strong>عاصم العبادلة</strong>، برؤية واضحة تهدف إلى تسخير أقوى نماذج الذكاء الاصطناعي لخلق وكلاء متخصصين يعملون بانسجام تام لبناء منتجات رقمية متكاملة. نحن لا نقدم مجرد كود، بل نقدم تجربة ابتكار فريدة.
          </p>
        </div>
        <h3 className="text-2xl font-bold text-white mt-8">فريقنا الرقمي</h3>
        <p>
          يتكون فريق العمل في AiApp6G من مجموعة من الوكلاء الأذكياء: المحلل، المصمم، المبرمج، والمختبر. هؤلاء الوكلاء يعملون على مدار الساعة لخدمة عملائنا في جميع أنحاء العالم وبأسعار ثابتة ومنطقية.
        </p>
      </div>
    </div>
  );
};

export default About;
