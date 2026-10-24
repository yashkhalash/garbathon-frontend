import { WarningLanguage } from '../types/analysis';

export interface TranslationDictionary {
  brandSubtitle: string;
  tabs: {
    recordings: string;
    live: string;
    report: string;
    settings: string;
  };
  vault: {
    button: string;
    title: string;
    badge: string;
    subtitle: string;
    bannerTitle: string;
    bannerDesc: string;
    launchButton: string;
    howItWorksTitle: string;
    howItWorksDesc: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    maskedIdentity: string;
    showVid: string;
    hideVid: string;
    biometricStatus: string;
    lockedStatus: string;
    unlockedStatus: string;
    tempUnlockBtn: string;
    lockNowBtn: string;
    closeBtn: string;
    lockedSuccess: string;
    unlockedSuccess: string;
  };
  steps: {
    headerTitle: string;
    stepActive: string;
    step1: { title: string; desc: string };
    step2: { title: string; desc: string };
    step3: { title: string; desc: string };
    step4: { title: string; desc: string };
  };
  uploader: {
    title: string;
    subtitle: string;
    selectBenchmark: string;
    uploadWav: string;
    formatNotice: string;
  };
  player: {
    title: string;
    subtitle: string;
    listeningStatus: string;
    readyStatus: string;
    startBtn: string;
    stopBtn: string;
  };
  riskCard: {
    title: string;
    whyScore: string;
    definiteSpam: string;
    partiallySpam: string;
    noSpam: string;
  };
  warningPanel: {
    title: string;
    safeTitle: string;
    safeDesc: string;
    familyAlertHeader: string;
    recommendations: string;
    speakBtn: string;
    stopVoiceBtn: string;
    copyBtn: string;
    copiedBtn: string;
    alertContactBtn: string;
    alertSentBtn: string;
  };
  redFlags: {
    title: string;
    evidenceTitle: string;
    emptyText: string;
  };
}

export const TRANSLATIONS: Record<WarningLanguage, TranslationDictionary> = {
  gu: {
    brandSubtitle: "રિયલ-ટાઇમ અવાજ છેતરપિંડી સુરક્ષા • ગૂગલ જેમિની નેટિવ ઓડિયો",
    tabs: {
      recordings: "કોલ વિશ્લેષણ",
      live: "લાઈવ માઈક મોડ",
      report: "ઇતિહાસ અને લોગ",
      settings: "સેટિંગ્સ",
    },
    vault: {
      button: "આધાર ફ્રીઝ વૉલ્ટ",
      title: "આધાર બાયોમેટ્રિક ફ્રીઝ વૉલ્ટ",
      badge: "નવું અજોડ ફીચર",
      subtitle: "UIDAI સર્વર-સ્તર બાયોમેટ્રિક લોક સુરક્ષા કવચ",
      bannerTitle: "આધાર બાયોમેટ્રિક ફ્રીઝ વૉલ્ટ (Aadhaar Freeze Vault)",
      bannerDesc: "ડિજિટલ અરેસ્ટ સ્કેમર્સ આધાર નંબર પર ડ્રગ્સ કે ગુનાનું નાટક કરે છે. એક ક્લિકમાં તમારા બાયોમેટ્રિક્સને UIDAI સ્તરે ફ્રીઝ કરીને 100% સુરક્ષિત બનો.",
      launchButton: "ફ્રીઝ વૉલ્ટ શરૂ કરો",
      howItWorksTitle: "🛡️ ડિજિટલ અરેસ્ટ સ્કેમર્સથી સંપૂર્ણ આધાર રક્ષણ:",
      howItWorksDesc: "સ્કેમર્સ દાવો કરે છે કે તમારા આધાર પર ડ્રગ્સ કે ગુનાહિત કેસ છે. UIDAI સેફ્ટી લોક સક્રિય કરવાથી તમારા ફિંગરપ્રિન્ટ અને આઇરિસ બાયોમેટ્રિક્સ લોક થઈ જાય છે, જેથી કોઈ પણ સાયબર ફ્રોડ તમારા નામે શક્ય બનતું નથી.",
      step1Title: "સ્ટેપ ૧: આધાર નંબર માસ્ક કરો",
      step1Desc: "ખાનગી ૧૨-અંકિય આધારને સુરક્ષિત વર્ચ્યુઅલ ID (VID) માં બદલો જેથી સ્કેમર્સ અસલ નંબર ચોરી ન શકે.",
      step2Title: "સ્ટેપ ૨: બાયોમેટ્રિક ફ્રીઝ લોક સક્રિય કરો",
      step2Desc: "ફિંગરપ્રિન્ટ અને આંખના સ્કેનને UIDAI સર્વર પર એક ક્લિકમાં લોક કરો. કોઈ સિમ કે લોન મંજૂર નહીં થાય.",
      step3Title: "સ્ટેપ ૩: જરૂર પડે ત્યારે 10 મિનિટ માટે અનલોક",
      step3Desc: "જ્યારે સત્તાવાર બેંકમાં કેવાયસી કરવું હોય ત્યારે માત્ર 10 મિનિટ માટે સુરક્ષિત રીતે અનલોક કરો.",
      maskedIdentity: "માસ્ક કરેલી ઓળખ (Masked Identity)",
      showVid: "૧૬-અંકી VID બતાવો",
      hideVid: "VID છુપાવો",
      biometricStatus: "UIDAI બાયોમેટ્રિક સ્થિતિ:",
      lockedStatus: "🔒 ફ્રીઝ અને સુરક્ષિત (LOCKED)",
      unlockedStatus: "🔓 અનલોક (UNLOCKED)",
      tempUnlockBtn: "અસ્થાયી રૂપે અનલોક કરો (૧૦ મિનિટ)",
      lockNowBtn: "બાયોમેટ્રિક્સ લોક કરો",
      closeBtn: "વૉલ્ટ બંધ કરો",
      lockedSuccess: "બાયોમેટ્રિક્સ સફળતાપૂર્વક લોક થઈ ગયા છે!",
      unlockedSuccess: "બાયોમેટ્રિક્સ અસ્થાયી રૂપે ૧૦ મિનિટ માટે અનલોક થયા છે.",
    },
    steps: {
      headerTitle: "સરળ ઉપયોગ પદ્ધતિ (૪ સ્ટેપ)",
      stepActive: "સક્રિય છે",
      step1: { title: "૧. કોલ પસંદ કરો", desc: "સ્કેમ, શંકાસ્પદ કે સુરક્ષિત કોલ પસંદ કરો" },
      step2: { title: "૨. વિશ્લેષણ શરૂ કરો", desc: "૫ સેકન્ડના ટુકડાઓમાં સ્કેન થશે" },
      step3: { title: "૩. મિડ-કોલ ચેતવણી", desc: "ધમકી ઓળખી કુદરતી મહિલા અવાજમાં ચેતવશે" },
      step4: { title: "૪. પરિવારને એલર્ટ", desc: "એકલતા તોડી પરિવારને કટોકટી સંદેશો મોકલો" },
    },
    uploader: {
      title: "સ્ટેપ ૧: કોલ રેકોર્ડિંગ પસંદ કરો (.WAV)",
      subtitle: "3-સ્તરીય બેન્ચમાર્ક કોલ્સમાંથી પસંદ કરો અથવા તમારો પોતાનો WAV કોલ અપલોડ કરો.",
      selectBenchmark: "આ બેન્ચમાર્ક પસંદ કરો",
      uploadWav: "અથવા તમારો પોતાનો .WAV કોલ અપલોડ કરો",
      formatNotice: "16kHz PCM મોનો ઓડિયો સપોર્ટેડ છે",
    },
    player: {
      title: "સ્ટેપ ૨: પ્લે કરો અને મિડ-કોલ ડિટેક્શન શરૂ કરો",
      subtitle: "૫-સેકન્ડના ટુકડાઓમાં સ્કેન થાય છે. ધમકી સંભળાતા જ કોલ ચાલુ હોય ત્યારે જ મહિલા અવાજમાં ચેતવણી મળે છે.",
      listeningStatus: "જેમિની લાઈવ સાંભળે છે",
      readyStatus: "તૈયાર",
      startBtn: "રિયલ-ટાઇમ સ્કેમ વિશ્લેષણ શરૂ કરો",
      stopBtn: "વિશ્લેષણ રોકો",
    },
    riskCard: {
      title: "રિયલ-ટાઇમ સ્કેમ અને સ્પામ મૂલ્યાંકન",
      whyScore: "આ વર્ગીકરણનું કારણ: ",
      definiteSpam: "પૂર્ણ સ્પામ (Scam Call)",
      partiallySpam: "શંકાસ્પદ સ્પામ (Suspicious)",
      noSpam: "કોઈ સ્પામ નથી (Safe & Clean)",
    },
    warningPanel: {
      title: "સ્ટેપ ૩: તાત્કાલિક વૉઇસ સેફ્ટી ચેતવણી (મિડ-કોલ)",
      safeTitle: "✓ કોલ સામાન્ય અને સુરક્ષિત જણાય છે",
      safeDesc: "કોઈ ધમકી, ઉતાવળ, ડિજિટલ અરેસ્ટ કે OTP માંગણી જણાઈ નથી. સુરક્ષા AI સતત મોનિટર કરી રહ્યું છે.",
      familyAlertHeader: "સ્ટેપ ૪: કટોકટીમાં પરિવારને એલર્ટ સંદેશો (પ્રિવ્યૂ):",
      recommendations: "ભલામણ કરેલ સુરક્ષા પગલાં:",
      speakBtn: "કુદરતી અવાજમાં સાંભળો",
      stopVoiceBtn: "અવાજ બંધ કરો",
      copyBtn: "કોપી કરો",
      copiedBtn: "કોપી થઈ ગયું!",
      alertContactBtn: "કટોકટી એલર્ટ મોકલો",
      alertSentBtn: "SMS મોકલાઈ ગયો!",
    },
    redFlags: {
      title: "કોલમાં સંભળાયેલા રેડ ફ્લેગ્સ",
      evidenceTitle: "કોલમાં સંભળાયેલ ચોક્કસ પુરાવો:",
      emptyText: "હજી સુધી કોઈ શંકાસ્પદ સંકેતો મળ્યા નથી. ધરપકડની ધમકી કે OTP માંગ સંભળાતા જ અહીં દેખાશે.",
    },
  },

  hi: {
    brandSubtitle: "रीयल-टाइम वॉयस स्कैम सुरक्षा • गूगल जेमिनी नेटिव ऑडियो",
    tabs: {
      recordings: "कॉल विश्लेषण",
      live: "लाइव माइक मोड",
      report: "इतिहास और लॉग",
      settings: "सेटिंग्स",
    },
    vault: {
      button: "आधार फ्रीज वॉल्ट",
      title: "आधार बायोमेट्रिक फ्रीज वॉल्ट",
      badge: "नया अनूठा फीचर",
      subtitle: "UIDAI सर्वर-स्तरीय बायोमेट्रिक लॉक सुरक्षा कवच",
      bannerTitle: "आधार बायोमेट्रिक फ्रीज वॉल्ट (Aadhaar Freeze Vault)",
      bannerDesc: "डिजिटल अरेस्ट स्कैमर्स आधार नंबर पर ड्रग्स पार्सल का झूठा केस बनाते हैं। एक क्लिक में अपने बायोमेट्रिक्स को UIDAI स्तर पर फ्रीज करके 100% सुरक्षित रहें।",
      launchButton: "फ्रीज वॉल्ट खोलें",
      howItWorksTitle: "🛡️ डिजिटल अरेस्ट स्कैमर्स से संपूर्ण आधार सुरक्षा:",
      howItWorksDesc: "स्कैमर्स दावा करते हैं कि आपके आधार से ड्रग्स या मनी लॉन्ड्रिंग जुड़ी है। बायोमेट्रिक लॉक एक्टिव होने पर कोई भी फर्जी सिम या बैंक अकाउंट आपके नाम पर नहीं खोला जा सकता।",
      step1Title: "स्टेप 1: आधार नंबर मास्क करें",
      step1Desc: "असली आधार को 16-अंकीय वर्चुअल आईडी (VID) में बदलें ताकि स्कैमर्स आपका निजी नंबर न चुरा सकें।",
      step2Title: "स्टेप 2: बायोमेट्रिक लॉक सक्रिय करें",
      step2Desc: "उंगलियों के निशान और आईरिस स्कैन को UIDAI सर्वर पर लॉक करें। अनधिकृत लोन या सिम जारी नहीं होंगे।",
      step3Title: "स्टेप 3: ज़रूरत पड़ने पर 10 मिनट के लिए अनलॉक",
      step3Desc: "जब आधिकारिक बैंक में बायोमेट्रिक प्रमाणीकरण करना हो, तभी सुरक्षित रूप से 10 मिनट के लिए अनलॉक करें।",
      maskedIdentity: "मास्क की गई पहचान (Masked Identity)",
      showVid: "16-अंकीय VID देखें",
      hideVid: "VID छिपाएं",
      biometricStatus: "UIDAI बायोमेट्रिक स्थिति:",
      lockedStatus: "🔒 सुरक्षित और फ्रीज (LOCKED)",
      unlockedStatus: "🔓 अनलॉक (UNLOCKED)",
      tempUnlockBtn: "अस्थायी रूप से अनलॉक करें (10 मिनट)",
      lockNowBtn: "बायोमेट्रिक्स तुरंत लॉक करें",
      closeBtn: "वॉल्ट बंद करें",
      lockedSuccess: "बायोमेट्रिक्स सफलतापूर्वक लॉक हो गए हैं!",
      unlockedSuccess: "बायोमेट्रिक्स अस्थायी रूप से 10 मिनट के लिए अनलॉक किए गए हैं।",
    },
    steps: {
      headerTitle: "सरल 4-चरणीय सुरक्षा गाइड",
      stepActive: "सक्रिय है",
      step1: { title: "1. कॉल चुनें", desc: "स्कैम, संदिग्ध या सुरक्षित कॉल चुनें" },
      step2: { title: "2. विश्लेषण शुरू करें", desc: "5 सेकंड के टुकड़ों में स्कैन होगा" },
      step3: { title: "3. मिड-कॉल चेतावनी", desc: "धमकी पहचानकर तुरंत महिला आवाज में अलर्ट देगा" },
      step4: { title: "4. परिवार को अलर्ट", desc: "अलगाव तोड़कर परिजन को आपातकालीन SMS भेजें" },
    },
    uploader: {
      title: "स्टेप 1: कॉल रिकॉर्डिंग चुनें (.WAV)",
      subtitle: "3-स्तरीय बेंचमार्क कॉल में से चुनें या अपनी खुद की .WAV फ़ाइल अपलोड करें।",
      selectBenchmark: "यह बेंचमार्क चुनें",
      uploadWav: "या अपनी खुद की .WAV कॉल अपलोड करें",
      formatNotice: "16kHz PCM मोनो ऑडियो समर्थित है",
    },
    player: {
      title: "स्टेप 2: प्ले करें और मिड-कॉल डिटेक्शन शुरू करें",
      subtitle: "ऑडियो 5-सेकंड के स्लाइस में स्ट्रीम होता है। कॉल के दौरान ही धमकी सुनते ही महिला आवाज में अलर्ट बजता है।",
      listeningStatus: "जेमिनी लाइव सुन रहा है",
      readyStatus: "तैयार",
      startBtn: "रीयल-टाइम स्कैम विश्लेषण शुरू करें",
      stopBtn: "विश्लेषण रोकें",
    },
    riskCard: {
      title: "रीयल-टाइम स्कैम और स्पैम मूल्यांकन",
      whyScore: "इस वर्गीकरण का कारण: ",
      definiteSpam: "पूर्ण स्पैम (Scam Call)",
      partiallySpam: "संदिग्ध स्पैम (Suspicious)",
      noSpam: "कोई स्पैम नहीं (Safe & Clean)",
    },
    warningPanel: {
      title: "स्टेप 3: तत्काल वॉयस सेफ्टी चेतावनी (मिड-कॉल)",
      safeTitle: "✓ कॉल सामान्य और सुरक्षित प्रतीत होता है",
      safeDesc: "कोई धमकी, हड़बड़ी, डिजिटल अरेस्ट या OTP मांग नहीं मिली। सुरक्षा AI निगरानी जारी रखे हुए है।",
      familyAlertHeader: "स्टेप 4: आपातकाल में परिवार को अलर्ट संदेश (पूर्वावलोकन):",
      recommendations: "अनुशंसित सुरक्षा कदम:",
      speakBtn: "प्राकृतिक आवाज में सुनें",
      stopVoiceBtn: "आवाज बंद करें",
      copyBtn: "कॉपी करें",
      copiedBtn: "कॉपी हो गया!",
      alertContactBtn: "आपातकालीन अलर्ट भेजें",
      alertSentBtn: "SMS भेज दिया गया!",
    },
    redFlags: {
      title: "कॉल में सुने गए रेड फ्लैग्स",
      evidenceTitle: "कॉल में सुना गया सटीक सबूत:",
      emptyText: "अभी तक कोई संदिग्ध संकेत नहीं मिले। गिरफ्तारी की धमकी या OTP मांग सुनते ही यहाँ प्रदर्शित होगा।",
    },
  },

  en: {
    brandSubtitle: "Real-Time Voice Scam Shield • Powered by Google Gemini Native Audio",
    tabs: {
      recordings: "Analyze Recording",
      live: "Live Mic Mode",
      report: "History & Logs",
      settings: "Settings",
    },
    vault: {
      button: "Aadhaar Freeze Vault",
      title: "Aadhaar Biometric Freeze Vault",
      badge: "NEW UNIQUE DEFENSE",
      subtitle: "UIDAI Server-Level Biometric Defense Layer",
      bannerTitle: "Aadhaar Biometric Freeze Vault (Stop Digital Arrest)",
      bannerDesc: "Digital arrest scammers fabricate fake narcotics cases on your Aadhaar number. Freeze your biometrics client-side with UIDAI to stay 100% protected.",
      launchButton: "Launch Freeze Vault",
      howItWorksTitle: "🛡️ How this stops Digital Arrest Extortion:",
      howItWorksDesc: "Scammers weaponize fake Aadhaar crime notices. Locking your biometric vault completely freezes fingerprint & iris authentication at UIDAI servers, making unauthorized SIM issues or loans impossible.",
      step1Title: "Step 1: Mask Aadhaar Identity",
      step1Desc: "Replace your 12-digit private Aadhaar with a 16-digit Virtual ID (VID) so scammers cannot harvest your real number.",
      step2Title: "Step 2: Freeze Biometric Authentication",
      step2Desc: "Lock fingerprint and iris authentication at UIDAI servers with one click. No SIM or loan can be forged.",
      step3Title: "Step 3: Temporarily Unlock for 10 Mins",
      step3Desc: "When visiting your authorized bank branch, unlock securely for a 10-minute temporary verification window.",
      maskedIdentity: "Masked Identity",
      showVid: "Show 16-Digit VID",
      hideVid: "Hide VID",
      biometricStatus: "UIDAI Biometric Status:",
      lockedStatus: "🔒 FROZEN & PROTECTED (LOCKED)",
      unlockedStatus: "🔓 UNLOCKED",
      tempUnlockBtn: "Temporarily Unlock (10 Mins)",
      lockNowBtn: "Lock Biometrics Now",
      closeBtn: "Close Vault",
      lockedSuccess: "Biometrics successfully LOCKED and frozen!",
      unlockedSuccess: "Biometrics temporarily unlocked for 10 minutes.",
    },
    steps: {
      headerTitle: "How Suraksha AI Works (4 Simple Steps)",
      stepActive: "Active",
      step1: { title: "1. Select Call", desc: "Choose 1 of 3 tiered benchmark WAVs" },
      step2: { title: "2. Start Analysis", desc: "Streams audio in 5s chunks" },
      step3: { title: "3. Mid-Call Warning", desc: "Spoken natural female voice alert appears mid-call" },
      step4: { title: "4. Alert Contact", desc: "Breaks isolation with emergency family SMS" },
    },
    uploader: {
      title: "STEP 1: Select Call Recording (.WAV)",
      subtitle: "Choose from 3 tiered benchmark calls or upload your custom WAV recording.",
      selectBenchmark: "Select This Benchmark",
      uploadWav: "Or click to upload custom .WAV recording",
      formatNotice: "Supports 16kHz PCM Mono Audio",
    },
    player: {
      title: "STEP 2: Stream & Trigger Mid-Call Detection",
      subtitle: "Audio streams in 5s slices. Spoken female warnings appear mid-call as soon as coercion is heard.",
      listeningStatus: "Gemini Listening Live",
      readyStatus: "Ready",
      startBtn: "Start Real-Time Scam Analysis",
      stopBtn: "Stop Analysis",
    },
    riskCard: {
      title: "Real-Time Scam & Spam Assessment",
      whyScore: "Why this classification: ",
      definiteSpam: "Definite Spam (Scam Call)",
      partiallySpam: "Partially Spam (Suspicious)",
      noSpam: "No Spam (Safe & Clean)",
    },
    warningPanel: {
      title: "STEP 3: Immediate Voice Safety Intervention (Mid-Call)",
      safeTitle: "✓ Call Appears Genuine (Safe)",
      safeDesc: "No coercive threats, urgency, digital arrest tactics, or OTP demands detected. Suraksha AI continues monitoring.",
      familyAlertHeader: "STEP 4: Emergency Isolation Breaker (Family Alert Preview):",
      recommendations: "Recommended Protective Counter-Moves:",
      speakBtn: "Speak Warning Aloud (Female Voice)",
      stopVoiceBtn: "Stop Voice",
      copyBtn: "Copy",
      copiedBtn: "Copied!",
      alertContactBtn: "Dispatch Emergency SMS",
      alertSentBtn: "Emergency SMS Dispatched!",
    },
    redFlags: {
      title: "Red Flags Heard in Call",
      evidenceTitle: "Evidence Heard in Call:",
      emptyText: "No red flags identified yet. When threats of arrest or OTP requests are heard, they appear here mid-call.",
    },
  },
};
