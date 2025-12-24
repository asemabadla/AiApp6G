import React, { useState, useEffect } from 'react';
import { AppStatus } from '../types';
import { aiService } from '../services/geminiService';
import JSZip from 'jszip';

const AppBuilder: React.FC = () => {
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
  const [prompt, setPrompt] = useState('');
  const [appData, setAppData] = useState<any>(null);
  const [progress, setProgress] = useState(0);

  const startBuilding = async () => {
    if (!prompt) return;
    setStatus(AppStatus.ANALYZING);
    setProgress(10);

    try {
      const analysis = await aiService.analyzeAppRequest(prompt);
      setAppData(analysis);
      setProgress(30);

      setTimeout(() => {
        setStatus(AppStatus.DESIGNING);
        setProgress(55);
      }, 2000);

      setTimeout(() => {
        setStatus(AppStatus.CODING);
        setProgress(80);
      }, 4500);

      setTimeout(() => {
        setStatus(AppStatus.TESTING);
        setProgress(95);
      }, 7000);

      setTimeout(() => {
        setStatus(AppStatus.PREVIEW);
        setProgress(100);
      }, 9000);

    } catch (error) {
      console.error(error);
      alert("حدث خطأ أثناء المعالجة، يرجى المحاولة مرة أخرى.");
      setStatus(AppStatus.IDLE);
    }
  };

  const handlePayment = () => {
    setStatus(AppStatus.PAYMENT);
  };

  const confirmPayment = () => {
    setStatus(AppStatus.READY);
  };

  const downloadApp = async () => {
    const zip = new JSZip();
    zip.file("app.json", JSON.stringify(appData, null, 2));
    const content = await zip.generateAsync({ type: "blob" });

    const url = URL.createObjectURL(content);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'my-awesome-app.zip';
    a.click();

    setTimeout(() => {
      alert("تم تحميل التطبيق بنجاح. لقد تم الآن حذف جميع بيانات التطبيق من خوادمنا لضمان خصوصيتك.");
      window.location.href = '/';
    }, 1000);
  };

  useEffect(() => {
    if (status === AppStatus.PAYMENT && (window as any).paypal) {
      (window as any).paypal.Buttons({
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [{
              amount: { value: "20.00" }
            }]
          });
        },
        onApprove: async (data: any, actions: any) => {
          await actions.order.capture();
          confirmPayment();
        }
      }).render('#paypal-button-container');
    }
  }, [status]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-gray-800/50 rounded-3xl p-8 border border-white/5 shadow-2xl">

        {/* شاشة البداية */}
        {status === AppStatus.IDLE && (
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">ما هو التطبيق الذي تحلم به؟</h2>
            <textarea
              className="w-full h-48 bg-gray-900 border border-gray-700 rounded-2xl p-6 text-white text-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
              placeholder="مثال: أريد تطبيقاً لإدارة المهام اليومية مع ميزة التذكير الصوتي وتصميم عصري باللون الأزرق..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <button
              onClick={startBuilding}
              className="mt-8 px-12 py-4 ai-gradient rounded-xl text-xl font-bold hover:scale-105 transition shadow-xl"
            >
              ابدأ البناء الذكي
            </button>
          </div>
        )}

        {/* مراحل التحليل والبناء */}
        {(status === AppStatus.ANALYZING || status === AppStatus.DESIGNING || status === AppStatus.CODING || status === AppStatus.TESTING) && (
          <div className="text-center py-12">
            <div className="mb-8 relative inline-block">
              <div className="w-32 h-32 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center text-2xl">
                {status === AppStatus.ANALYZING && "🧠"}
                {status === AppStatus.DESIGNING && "🎨"}
                {status === AppStatus.CODING && "💻"}
                {status === AppStatus.TESTING && "🛡️"}
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-2">
              {status === AppStatus.ANALYZING && "جاري تحليل فكرتك..."}
              {status === AppStatus.DESIGNING && "وكيل التصميم يضع اللمسات الفنية..."}
              {status === AppStatus.CODING && "المبرمج الرقمي يقوم بكتابة الكود..."}
              {status === AppStatus.TESTING && "فحص الجودة والأمان..."}
            </h2>
            <div className="w-full bg-gray-700 rounded-full h-2.5 mt-6 max-w-md mx-auto overflow-hidden">
              <div className="bg-indigo-500 h-2.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        )}

        {/* شاشة المعاينة */}
        {status === AppStatus.PREVIEW && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">معاينة التطبيق</h2>
              <div className="text-green-400 font-bold bg-green-400/10 px-4 py-1 rounded-full text-sm">جاهز للمعاينة</div>
            </div>

            {/* التطبيق المبني */}
            <div className="bg-gray-900 rounded-2xl p-6 border border-white/5 mb-8">
              <h3 className="font-bold mb-4 text-indigo-400">التطبيق المبني:</h3>
              {appData?.code ? (
                <iframe
                  title="App Preview"
                  className="w-full h-96 rounded-lg border border-gray-700 bg-white"
                  srcDoc={appData.code}
                />
              ) : (
                <div className="text-gray-400">لم يتم توليد كود للتطبيق بعد</div>
              )}
            </div>

            {/* المميزات والتقنيات */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="bg-gray-900 rounded-2xl p-6 border border-white/5">
                <h3 className="font-bold mb-4 text-indigo-400">المميزات الرئيسية:</h3>
                <ul className="space-y-2 text-gray-400">
                  {appData?.features?.map((f: string, i: number) => (
                    <li key={i}>• {f}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-gray-900 rounded-2xl p-6 border border-white/5">
                <h3 className="font-bold mb-4 text-indigo-400">التقنيات المستخدمة:</h3>
                <div className="flex flex-wrap gap-2">
                  {appData?.techStack?.map((t: string, i: number) => (
                    <span key={i} className="bg-white/5 px-3 py-1 rounded-lg text-sm">{t}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* السعر والأزرار */}
            <div className="p-8 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl text-center">
              <p className="text-lg mb-4 text-indigo-200">سعر الحصول على التطبيق كاملاً هو</p>
              <div className="text-5xl font-black text-white mb-6">$20</div>
              <div className="flex gap-4 justify-center">
                <button 
                  onClick={() => setStatus(AppStatus.IDLE)} 
                  className="px-6 py-3 border border-white/10 rounded-xl hover:bg-white/5 transition"
                >
                  طلب تعديل
                </button>
                <button 
                  onClick={handlePayment} 
                  className="px-10 py-3 ai-gradient rounded-xl font-bold hover:scale-105 transition"
                >
                  دفع واستلام التطبيق
                </button>
              </div>
            </div>
          </div>
        )}

                {/* الدفع عبر PayPal */}
        {status === AppStatus.PAYMENT && (
          <div className="text-center max-w-md mx-auto py-8">
            <h2 className="text-3xl font-bold mb-6">إتمام عملية الدفع</h2>
            <div id="paypal-button-container"></div>
          </div>
        )}

        {/* بعد الدفع الناجح */}
        {status === AppStatus.READY && (
          <div className="text-center py-12">
            <div className="text-7xl mb-6">🎉</div>
            <h2 className="text-4xl font-bold mb-4">تطبيقك جاهز للإقلاع!</h2>
            <p className="text-gray-400 mb-10 max-w-md mx-auto">
              لقد تمت عملية الدفع بنجاح. يمكنك الآن تحميل ملفات التطبيق. يرجى الملاحظة أنه سيتم حذف بياناتك فور الانتهاء.
            </p>
            <button
              onClick={downloadApp}
              className="px-12 py-4 bg-green-500 rounded-2xl text-xl font-bold hover:bg-green-600 transition shadow-xl shadow-green-500/20"
            >
              تحميل التطبيق الآن (.zip)
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppBuilder;