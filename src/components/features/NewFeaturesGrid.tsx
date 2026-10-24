import React, { useState } from 'react';
import {
  QrCode,
  ShoppingBag,
  Landmark,
  FileCheck2,
  Flame,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { WarningLanguage } from '../../types/analysis';
import { UPIScamShieldModal } from './UPIScamShieldModal';
import { ShoppingApkScannerModal } from './ShoppingApkScannerModal';
import { SeniorInvestmentShieldModal } from './SeniorInvestmentShieldModal';
import { DigitalLifeCertificateModal } from './DigitalLifeCertificateModal';
import { FamilyKillswitchModal } from './FamilyKillswitchModal';
import { VoiceExplainerButton } from '../VoiceExplainerButton';
import { TRANSLATIONS } from '../../utils/translations';

interface NewFeaturesGridProps {
  language: WarningLanguage;
  contactName?: string;
  relationship?: string;
}

export const NewFeaturesGrid: React.FC<NewFeaturesGridProps> = ({
  language,
  contactName,
  relationship,
}) => {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const content = {
    gu: {
      badge: "૫ નવીનતમ વિશેષતાઓ • ગારબાથોન ૨૦૨૬",
      title: "૫ અજોડ AI સુરક્ષા ટૂલ્સ (GenZ યુવાનો અને વડીલો માટે)",
      subtitle: "ડિજિટલ પેમેન્ટ, ઓનલાઇન શોપિંગ, પેન્શન અને રોકાણ છેતરપિંડી સામે ૧૦૦% રક્ષણ આપતા નવીન ફીચર્સ.",
      features: [
        {
          id: 'upi',
          title: "UPI રિવર્સ QR અને પેમેન્ટ શિલ્ડ",
          tag: "GenZ • Google Pay & PhonePe",
          badge: "NEW",
          icon: QrCode,
          color: "from-indigo-500 to-purple-600",
          border: "border-indigo-400/50 hover:border-indigo-400",
          desc: "પૈસા મેળવવા ક્યારેય UPI PIN નાખવો પડતો નથી. કલેક્ટ રિક્વેસ્ટ અને નકલી QR સ્કેમ્સને તરત ઓળખો.",
          actionBtn: "UPI શિલ્ડ ચકાસો",
        },
        {
          id: 'shopping',
          title: "નકલી શોપિંગ સાઇટ અને APK સ્કૅનર",
          tag: "GenZ • ઓનલાઇન શોપિંગ & ગેમિંગ",
          badge: "NEW",
          icon: ShoppingBag,
          color: "from-rose-500 to-amber-500",
          border: "border-rose-400/50 hover:border-rose-400",
          desc: "Instagram પર ૯૦% સેલ અને માલવેર APK (જે OTP ચોરે છે) ને એક ક્લિકમાં સ્કેન કરી રોકો.",
          actionBtn: "શોપિંગ લિંક સ્કેન કરો",
        },
        {
          id: 'investment',
          title: "વરિષ્ઠ નાગરિક રોકાણ અને પેન્શન શિલ્ડ",
          tag: "વડીલો • સેબી નિયમો & પોન્ઝી કેલ્ક્યુલેટર",
          badge: "NEW",
          icon: Landmark,
          color: "from-emerald-500 to-teal-600",
          border: "border-emerald-400/50 hover:border-emerald-400",
          desc: "WhatsApp પર ગેરંટીડ ૧૦%-૫૦% માસિક નફો આપવાના દાવા કરતા નકલી FII સ્ટોક ગ્રુપોની પોલ ખોલો.",
          actionBtn: "રોકાણ તપાસો",
        },
        {
          id: 'pension',
          title: "જીવન પ્રમાણપત્ર પેન્શન સ્કેમ ગાર્ડ",
          tag: "વડીલો • ટ્રેઝરી & EPFO",
          badge: "NEW",
          icon: FileCheck2,
          color: "from-cyan-500 to-blue-600",
          border: "border-cyan-400/50 hover:border-cyan-400",
          desc: "પેન્શન બંધ થવાની ધમકી આપી OTP માગતા કોલર્સનું તાત્કાલિક સત્ય ચકાસો અને સત્તાવાર રસ્તો જાણો.",
          actionBtn: "પેન્શન કોલ ચકાસો",
        },
        {
          id: 'killswitch',
          title: "ગોલ્ડન અવર ફેમિલી કિલ-સ્વિચ",
          tag: "સમગ્ર પરિવાર • કટોકટી કાર્યવાહી",
          badge: "NEW",
          icon: Flame,
          color: "from-red-600 to-rose-700",
          border: "border-red-400/50 hover:border-red-400",
          desc: "૨ કલાકની અંદર તમામ બેંક એકાઉન્ટ તાત્કાલિક ફ્રીઝ કરવાના હેલ્પલાઇન નંબરો અને પરિવારને SOS.",
          actionBtn: "ઇમરજન્સી ફ્રીઝ હબ",
        },
      ],
    },
    hi: {
      badge: "5 नवीनतम विशेषताएं • गारबाथॉन 2026",
      title: "5 अनूठे AI सुरक्षा टूल्स (GenZ युवाओं एवं बुजुर्गों हेतु)",
      subtitle: "डिजिटल पेमेंट, ऑनलाइन शॉपिंग, पेंशन एवं फर्जी निवेश घोटालों के खिलाफ पूर्ण सुरक्षा।",
      features: [
        {
          id: 'upi',
          title: "UPI रिवर्स QR एवं पेमेंट शील्ड",
          tag: "GenZ • GPay & PhonePe",
          badge: "NEW",
          icon: QrCode,
          color: "from-indigo-500 to-purple-600",
          border: "border-indigo-400/50 hover:border-indigo-400",
          desc: "पैसे पाने के लिए कभी पिन नहीं डालना होता। फर्जी कैशबैक एवं कलेक्ट रिक्वेस्ट की तुरंत पहचान करें।",
          actionBtn: "UPI शील्ड खोलें",
        },
        {
          id: 'shopping',
          title: "फर्जी शॉपिंग साइट एवं APK स्कैनर",
          tag: "GenZ • ऑनलाइन शॉपिंग",
          badge: "NEW",
          icon: ShoppingBag,
          color: "from-rose-500 to-amber-500",
          border: "border-rose-400/50 hover:border-rose-400",
          desc: "Instagram विज्ञापनों में 90% डिस्काउंट और OTP चुराने वाली फर्जी पार्सल APK फाइलों की जांच।",
          actionBtn: "शॉपिंग लिंक स्कैन करें",
        },
        {
          id: 'investment',
          title: "वरिष्ठ नागरिक पेंशन एवं निवेश शील्ड",
          tag: "वरिष्ठ नागरिक • पोंजी डिटेक्टर",
          badge: "NEW",
          icon: Landmark,
          color: "from-emerald-500 to-teal-600",
          border: "border-emerald-400/50 hover:border-emerald-400",
          desc: "WhatsApp पर 20%-50% मासिक मुनाफे का लालच देकर पेंशन लूटने वाले गिरोहों की गणितीय जांच।",
          actionBtn: "निवेश की जांच करें",
        },
        {
          id: 'pension',
          title: "जीवन प्रमाण (Life Certificate) सुरक्षा",
          tag: "पेंशनभोगी • आधिकारिक गाइड",
          badge: "NEW",
          icon: FileCheck2,
          color: "from-cyan-500 to-blue-600",
          border: "border-cyan-400/50 hover:border-cyan-400",
          desc: "पेंशन रुकने का डर दिखाकर OTP या AnyDesk डाउनलोड कराने वाले फर्जी कॉलों से बचाव।",
          actionBtn: "पेंशन कॉल चेक करें",
        },
        {
          id: 'killswitch',
          title: "गोल्डन आवर फैमिली किल-स्विच",
          tag: "आपातकालीन सुरक्षा • 2 घंटे में फ्रीज",
          badge: "NEW",
          icon: Flame,
          color: "from-red-600 to-rose-700",
          border: "border-red-400/50 hover:border-red-400",
          desc: "फ्रॉड होने पर 2 घंटे के भीतर बैंक और हेल्पलाइन 1930 पर खाते फ्रीज करने का लाइव कंट्रोल हब।",
          actionBtn: "इमरजेंसी फ्रीज हब",
        },
      ],
    },
    en: {
      badge: "5 POWERFUL NEW CAPABILITIES • GARBATHON 2026",
      title: "5 Unique AI Security Tools for GenZ & Older Persons",
      subtitle: "Dedicated protections against UPI PIN traps, fake flash-sale APKs, pension fraud, and high-yield Ponzi scams.",
      features: [
        {
          id: 'upi',
          title: "UPI Reverse QR & Payment Fraud Shield",
          tag: "GenZ • GPay, PhonePe & Paytm",
          badge: "NEW",
          icon: QrCode,
          color: "from-indigo-500 to-purple-600",
          border: "border-indigo-400/50 hover:border-indigo-400",
          desc: "Enforces the golden rule: UPI PIN is NEVER required to receive money. Inspects collect requests and fake QR codes.",
          actionBtn: "Launch UPI Shield",
        },
        {
          id: 'shopping',
          title: "Fake Online Shopping & Malicious APK Scanner",
          tag: "GenZ • E-Commerce & Gaming",
          badge: "NEW",
          icon: ShoppingBag,
          color: "from-rose-500 to-amber-500",
          border: "border-rose-400/50 hover:border-rose-400",
          desc: "Detects 90% discount traps on Instagram and dangerous sideloaded APKs stealing banking SMS OTPs.",
          actionBtn: "Scan Shopping Link",
        },
        {
          id: 'investment',
          title: "Senior Pension & High-Yield Investment Shield",
          tag: "Seniors • SEBI Rules & Ponzi Checker",
          badge: "NEW",
          icon: Landmark,
          color: "from-emerald-500 to-teal-600",
          border: "border-emerald-400/50 hover:border-emerald-400",
          desc: "Mathematically exposes fake WhatsApp institutional trading groups claiming impossible 20%-50% monthly returns.",
          actionBtn: "Verify Investment",
        },
        {
          id: 'pension',
          title: "Jeevan Pramaan (Life Certificate) Scam Guard",
          tag: "Seniors • Pensioners & Treasury",
          badge: "NEW",
          icon: FileCheck2,
          color: "from-cyan-500 to-blue-600",
          border: "border-cyan-400/50 hover:border-cyan-400",
          desc: "Unmasks calls threatening pension cancellation to extract OTPs or force remote screen-sharing app downloads.",
          actionBtn: "Check Pension Call",
        },
        {
          id: 'killswitch',
          title: "Golden Hour Family Kill-Switch & Financial Freeze",
          tag: "All Families • Emergency Response",
          badge: "NEW",
          icon: Flame,
          color: "from-red-600 to-rose-700",
          border: "border-red-400/50 hover:border-red-400",
          desc: "Act within the critical 2-hour window: direct bank freeze hotlines, 1930 reporting, and automated family SOS alerts.",
          actionBtn: "Emergency Freeze Hub",
        },
      ],
    },
  };

  const t = content[language] || content.gu;

  return (
    <>
      <section
        id="new-features-section"
        className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border-2 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white shadow-xl relative overflow-hidden space-y-6 transition-all duration-300"
      >
        {/* Glow ambient accent */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-5">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border border-indigo-400/40 text-[10px] font-black uppercase tracking-wider">
                <Sparkles className="w-3 h-3 text-amber-500 dark:text-yellow-300" />
                <span>{t.badge}</span>
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight">
              {t.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              {t.subtitle}
            </p>
          </div>

          <div className="self-start sm:self-center flex-shrink-0">
            <VoiceExplainerButton
              textToSpeak={TRANSLATIONS[language]?.voiceExplainer?.newTools || TRANSLATIONS.gu.voiceExplainer.newTools}
              language={language}
              variant="emerald"
              size="md"
              testId="voice-explain-new-tools"
            />
          </div>
        </div>

        {/* 5 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {t.features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.id}
                data-testid={`feature-card-${feat.id}`}
                className={`p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border ${feat.border} flex flex-col justify-between hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200 group relative shadow-sm`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`p-2.5 rounded-xl bg-gradient-to-tr ${feat.color} text-white shadow-md group-hover:scale-105 transition-transform`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    {/* Animated NEW Badge */}
                    <span className="flex items-center space-x-1 px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-black uppercase tracking-wider animate-pulse shadow-sm">
                      <span>{feat.badge}</span>
                    </span>
                  </div>

                  <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
                    {feat.tag}
                  </span>

                  <h3 className="font-extrabold text-sm text-navy-950 dark:text-white leading-snug mb-2">
                    {feat.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    {feat.desc}
                  </p>
                </div>

                <button
                  onClick={() => setActiveModal(feat.id)}
                  data-testid={`open-feature-${feat.id}-btn`}
                  className="w-full py-2 px-3 rounded-xl bg-navy-900 dark:bg-slate-700 hover:bg-blue-600 dark:hover:bg-blue-600 text-white font-bold text-xs transition-all flex items-center justify-center space-x-1.5 shadow-sm active:scale-95 group-hover:bg-blue-600"
                >
                  <span>{feat.actionBtn}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Feature Modals */}
      <UPIScamShieldModal
        isOpen={activeModal === 'upi'}
        onClose={() => setActiveModal(null)}
        language={language}
      />

      <ShoppingApkScannerModal
        isOpen={activeModal === 'shopping'}
        onClose={() => setActiveModal(null)}
        language={language}
      />

      <SeniorInvestmentShieldModal
        isOpen={activeModal === 'investment'}
        onClose={() => setActiveModal(null)}
        language={language}
      />

      <DigitalLifeCertificateModal
        isOpen={activeModal === 'pension'}
        onClose={() => setActiveModal(null)}
        language={language}
      />

      <FamilyKillswitchModal
        isOpen={activeModal === 'killswitch'}
        onClose={() => setActiveModal(null)}
        language={language}
        contactName={contactName}
        relationship={relationship}
      />
    </>
  );
};
