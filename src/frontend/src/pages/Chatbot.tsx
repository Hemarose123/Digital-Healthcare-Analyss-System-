import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  Bot,
  HeartPulse,
  Loader2,
  MessageCircle,
  Send,
  ShieldCheck,
  Sparkles,
  Trash2,
  Utensils,
  Volume2,
  VolumeX,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  useAddChatMessage,
  useChatHistory,
  useClearChatHistory,
} from "../hooks/useBackend";

// Language configuration
type Language = "en" | "hi" | "ta" | "te";

const LANGUAGES: { value: Language; label: string; flag: string }[] = [
  { value: "en", label: "English", flag: "🇺🇸" },
  { value: "hi", label: "हिंदी", flag: "🇮🇳" },
  { value: "ta", label: "தமிழ்", flag: "🇮🇳" },
  { value: "te", label: "తెలుగు", flag: "🇮🇳" },
];

const GREETINGS: Record<Language, string> = {
  en: "Hello! I'm DR.AI, your AI Health Companion. I specialize in natural home remedies and wellness. How can I assist you today?",
  hi: "नमस्ते! मैं DR.AI हूँ, आपका AI स्वास्थ्य साथी। मैं प्राकृतिक घरेलू उपचारों में विशेषज्ञ हूँ। मैं आज आपकी कैसे मदद कर सकता हूँ?",
  ta: "வணக்கம்! நான் DR.AI, உங்கள் AI சுகாதார துணை. இயற்கை வீட்டு வைத்தியத்தில் நான் நிபுணன்.",
  te: "నమస్కారం! నేను DR.AI, మీ AI ఆరోగ్య సహచరుడిని. నేను సహజ ఇంటి నివారణలలో నిపుణుడిని.",
};

const QUICK_CHIPS: Record<Language, { label: string; query: string }[]> = {
  en: [
    {
      label: "Cough & Cold",
      query: "Natural home remedies for cough and cold",
    },
    {
      label: "Digestion Help",
      query: "Home remedies for bloating and digestion",
    },
    { label: "Skin Glow", query: "Natural remedies for acne and clear skin" },
    {
      label: "Better Sleep",
      query: "Herbal teas and natural ways to sleep better",
    },
    {
      label: "Immunity Boost",
      query: "Natural ways to boost immunity with kitchen ingredients",
    },
    { label: "Joint Pain", query: "Home remedies for joint and muscle pain" },
  ],
  hi: [
    { label: "खांसी और जुकाम", query: "खांसी और जुकाम के लिए घरेलू उपाय" },
    { label: "पाचन सहायता", query: "पेट फूलने और पाचन के लिए घरेलू उपचार" },
    {
      label: "त्वचा की चमक",
      query: "मुँहासे और साफ त्वचा के लिए प्राकृतिक उपाय",
    },
    { label: "बेहतर नींद", query: "अच्छी नींद के लिए हर्बल चाय और तरीके" },
    {
      label: "इम्युनिटी",
      query: "रसोई की चीजों से रोग प्रतिरोधक क्षमता बढ़ाने के तरीके",
    },
    {
      label: "जोड़ों का दर्द",
      query: "जोड़ों और मांसपेशियों के दर्द के लिए घरेलू उपाय",
    },
  ],
  ta: [
    {
      label: "இருமல் & சளி",
      query: "இருமல் மற்றும் சளிக்கான இயற்கை வீட்டு வைத்தியம்",
    },
    {
      label: "செரிமான உதவி",
      query: "வீக்கம் மற்றும் செரிமானத்திற்கான வீட்டு வைத்தியம்",
    },
    {
      label: "சரும பொலிவு",
      query: "முகப்பரு மற்றும் தெளிவான சருமத்திற்கான இயற்கை வைத்தியம்",
    },
    {
      label: "நல்ல தூக்கம்",
      query: "சிறந்த தூக்கத்திற்கான மூலிகை டீ மற்றும் இயற்கை வழிகள்",
    },
    {
      label: "நோய் எதிர்ப்பு",
      query: "சமையலறை பொருட்களைக் கொண்டு நோய் எதிர்ப்பு சக்தியை அதிகரிக்கும் வழிகள்",
    },
    {
      label: "மூட்டு வலி",
      query: "மூட்டு மற்றும் தசை வலிக்கான வீட்டு வைத்தியம்",
    },
  ],
  te: [
    {
      label: "దగ్గు & జలుబు",
      query: "దగ్గు మరియు జలుబు కోసం సహజ ఇంటి నివారణలు",
    },
    {
      label: "జీర్ణక్రియ",
      query: "కడుపు ఉబ్బరం మరియు జీర్ణక్రియ కోసం ఇంటి నివారణలు",
    },
    {
      label: "చర్మ సౌందర్యం",
      query: "మొటిమలు మరియు స్పష్టమైన చర్మం కోసం సహజ నివారణలు",
    },
    {
      label: "మంచి నిద్ర",
      query: "మంచి నిద్ర కోసం మూలికా టీలు మరియు సహజ మార్గాలు",
    },
    {
      label: "రోగనిరోధక శక్తి",
      query: "వంటగది పదార్థాలతో రోగనిరోధక శక్తిని పెంచుకునే సహజ మార్గాలు",
    },
    {
      label: "కీళ్ల నొప్పులు",
      query: "కీళ్ల మరియు కండరాల నొప్పుల కోసం ఇంటి నివారణలు",
    },
  ],
};

const FALLBACKS: Record<Language, string> = {
  en: "I'm not sure about that. Try asking about diet, stress, sleep, or specific symptoms. For medical emergencies, always consult a professional.",
  hi: "मुझे इसके बारे में यकीन नहीं है। आहार, तनाव, नींद या विशिष्ट लक्षणों के बारे में पूछें। आपात स्थिति के लिए हमेशा विशेषज्ञ से सलाह लें।",
  ta: "எனக்கு அது பற்றி உறுதியாக தெரியவில்லை. உணவு, மன அழுத்தம், தூக்கம் அல்லது குறிப்பிட்ட அறிகுறிகளைப் பற்றி கேட்டுப் பாருங்கள். அவசரநிலைகளுக்கு எப்போதும் நிபுணரை அணுகவும்.",
  te: "నాకు దాని గురించి ఖచ్చితంగా తెలియదు. ఆహారం, ఒత్తిడి, నిద్ర లేదా నిర్దిష్ట లక్షణాల గురించి అడగండి. అత్యవసర పరిస్థితుల కోసం ఎల్లప్పుడూ నిపుణుడిని సంప్రదించండి.",
};

const MULTILINGUAL_RESPONSES: Record<
  Language,
  { keywords: string[]; response: string }[]
> = {
  en: [
    {
      keywords: [
        "diet",
        "food",
        "nutrition",
        "eat",
        "meal",
        "protein",
        "weight",
      ],
      response:
        "A balanced diet should include 50% vegetables/fruits, 25% lean protein, and 25% whole grains. Stay hydrated by drinking at least 2-3 liters of water daily. Limit processed sugars and sodium for better metabolic health.",
    },
    {
      keywords: ["stress", "anxiety", "mental", "depressed", "worry", "panic"],
      response:
        "For mental wellness, try the 4-7-8 breathing technique: inhale for 4, hold for 7, exhale for 8. If you're feeling overwhelmed, consider speaking with a professional. Remember, your mental health is just as important as your physical health.",
    },
    {
      keywords: ["sleep", "insomnia", "tired", "wake up", "rest"],
      response:
        "To improve sleep quality: 1. Keep a consistent schedule. 2. Avoid screens 1 hour before bed. 3. Ensure your room is dark and cool. Aim for 7-9 hours of rest. Magnesium-rich foods can also help relaxation.",
    },
    {
      keywords: ["exercise", "workout", "gym", "active", "fitness", "steps"],
      response:
        "For beginners, 30 minutes of brisk walking 5 days a week is a great start. Combine this with strength training twice a week for optimal results. Consistency is more important than intensity initially.",
    },
    {
      keywords: ["headache", "fever", "pain", "sick", "cough", "cold"],
      response:
        "I'm sorry to hear you're not feeling well. For mild fever, rest and hydration are key. However, if symptoms persist for more than 3 days or you have difficulty breathing, please consult a healthcare professional immediately.",
    },
    {
      keywords: [
        "heart",
        "cardio",
        "blood pressure",
        "bp",
        "hypertension",
        "salt",
      ],
      response:
        "Heart health relies on low sodium intake (<2,300mg/day), regular cardio (30 mins daily), and managing stress. High BP often has no symptoms, so regular monitoring is vital.",
    },
    {
      keywords: ["diabetes", "sugar", "insulin", "glucose", "carb"],
      response:
        "Manage diabetes by pairing carbs with fiber and protein to stabilize glucose. Focus on low-glycemic index foods like lentils, non-starchy vegetables, and berries. Regular movement after meals helps significantly.",
    },
    {
      keywords: ["pcos", "period", "hormone", "pcod", "cycle"],
      response:
        "PCOS management involves insulin sensitivity support through a low-GI diet and strength training. Omega-3s and high fiber intake are often recommended. Please consult a gynecologist for a clinical hormonal assessment.",
    },
    {
      keywords: ["first aid", "emergency", "injury", "burn", "bleeding"],
      response:
        "For minor burns: Cool water for 20 mins. For bleeding: Direct pressure with clean cloth. For emergencies (Chest pain, severe injury, breathing difficulty), call 911 or your local emergency number immediately.",
    },
    {
      keywords: ["reminder", "medicine", "pill", "tablet", "dosage", "alarm"],
      response:
        "You can set medicine reminders in our 'Medicine Reminder' page. It's important to take your medications at the same time daily for maximum efficacy. Would you like me to help you navigate there?",
    },
    {
      keywords: ["water", "drink", "hydrate", "thirst"],
      response:
        "Hydration is crucial. Aim for 8-10 glasses (approx 2.5L) daily. If you're active, increase this. Using our Water Tracker can help you reach your goals consistently.",
    },
    {
      keywords: ["remedy", "natural", "home", "cure", "food", "kitchen"],
      response:
        "Natural remedies can be very effective for mild issues. For a cough, try ginger-honey tea. For bloating, chew fennel seeds or drink peppermint tea. For skin, turmeric and aloe vera are excellent. Always consult a doctor for severe symptoms.",
    },
    {
      keywords: ["cough", "cold", "sore throat", "flu"],
      response:
        "For a cough or cold, try these natural foods: 1. Warm honey and lemon water. 2. Ginger tea. 3. Turmeric milk (Golden milk) at night. 4. Steam inhalation with eucalyptus oil. These help soothe the throat and boost immunity.",
    },
    {
      keywords: ["digestion", "bloating", "gas", "stomach", "acidity"],
      response:
        "For digestive issues, natural options include: 1. Fennel seeds (Saunf) after meals. 2. Ginger tea to reduce nausea. 3. Probiotic yogurt to balance gut bacteria. 4. Peppermint tea for bloating relief.",
    },
    {
      keywords: ["acne", "pimple", "skin", "glow"],
      response:
        "Natural skin support: 1. Turmeric and honey masks for anti-bacterial effects. 2. Green tea (antioxidants). 3. Increased water intake. 4. Aloe vera for soothing inflammation. Avoid processed sugars for clearer skin.",
    },
    {
      keywords: ["fatigue", "tired", "energy", "weakness"],
      response:
        "To boost energy naturally: 1. Magnesium-rich foods like spinach and almonds. 2. Bananas for quick energy. 3. Complex carbs like oats for sustained energy. 4. Iron-rich foods like lentils and dates.",
    },
    {
      keywords: ["headache", "migraine", "head pain"],
      response:
        "Natural headache relief: 1. Drink plenty of water (dehydration is a common cause). 2. Ginger tea (anti-inflammatory). 3. Peppermint oil on temples. 4. Dark, quiet room for rest.",
    },
    {
      keywords: ["cramps", "period pain", "menstruation", "cycle"],
      response:
        "For period cramps, try: 1. Fennel seeds (Saunf) tea. 2. Ginger and cinnamon. 3. Dark chocolate (70%+ cacao). 4. Chamomile tea to relax muscles.",
    },
    {
      keywords: ["immunity", "immune", "protect", "vitamin c"],
      response:
        "To boost immunity naturally: 1. Garlic (Allicin content). 2. Citrus fruits (Vitamin C). 3. Probiotics like yogurt and kefir. 4. Turmeric and black pepper combination.",
    },
  ],
  hi: [
    {
      keywords: ["diet", "food", "आहार", "भोजन", "खाना"],
      response:
        "संतुलित आहार में 50% सब्जियां और फल, 25% प्रोटीन और 25% साबुत अनाज होना चाहिए। रोजाना कम से कम 2 से 3 लीटर पानी पिएं।",
    },
    {
      keywords: ["stress", "तनाव", "चिंता", "मानसिक"],
      response:
        "मानसिक स्वास्थ्य के लिए 4 7 8 श्वास तकनीक का प्रयास करें: 4 के लिए श्वास लें, 7 के लिए रुकें, 8 के लिए श्वास छोड़ें।",
    },
    {
      keywords: ["sleep", "नींद", "थकान"],
      response:
        "नींद की गुणवत्ता में सुधार करने के लिए: 1. एक सुसंगत कार्यक्रम रखें। 2. सोने से 1 घंटे पहले स्क्रीन से बचें। 7 से 9 घंटे का लक्ष्य रखें।",
    },
    {
      keywords: ["exercise", "व्यायाम", "जिम", "वर्कआउट"],
      response:
        "शुरुआती लोगों के लिए, सप्ताह में 5 दिन 30 मिनट तेज चलना एक शानदार शुरुआत है।",
    },
    {
      keywords: ["headache", "सिरदर्द", "बुखार", "दर्द"],
      response:
        "हल्के बुखार के लिए आराम और हाइड्रेशन महत्वपूर्ण हैं। यदि लक्षण 3 दिनों से अधिक समय तक बने रहते हैं, तो डॉक्टर से परामर्श लें।",
    },
    {
      keywords: ["heart", "हृदय", "बीपी", "रक्तचाप"],
      response:
        "हृदय स्वास्थ्य कम सोडियम, नियमित कार्डियो, और तनाव प्रबंधन पर निर्भर करता है।",
    },
    {
      keywords: ["diabetes", "मधुमेह", "शुगर"],
      response:
        "ग्लूकोज को स्थिर करने के लिए फाइबर और प्रोटीन के साथ कार्ब्स को जोड़कर मधुमेह का प्रबंधन करें।",
    },
    {
      keywords: ["pcos", "पीसीओएस", "माहवारी"],
      response:
        "पीसीओएस प्रबंधन में आहार और शक्ति प्रशिक्षण के माध्यम से इंसुलिन संवेदनशीलता का समर्थन शामिल है।",
    },
    {
      keywords: ["water", "पानी", "प्यास"],
      response: "हाइड्रेशन महत्वपूर्ण है। रोजाना 8 से 10 गिलास पानी का लक्ष्य रखें।",
    },
    {
      keywords: ["remedy", "उपचार", "घरेलू"],
      response: "खांसी के लिए अदरक शहद की चाय ट्राई करें। सूजन के लिए सौंफ चबाएं।",
    },
  ],
  ta: [
    {
      keywords: ["diet", "food", "உணவு", "ஊட்டச்சத்து"],
      response:
        "ஒரு சீரான உணவில் 50% காய்கறிகள் மற்றும் பழங்கள், 25% புரதம் மற்றும் 25% முழு தானியங்கள் இருக்க வேண்டும். தினமும் 2 முதல் 3 லிட்டர் தண்ணீர் குடிக்கவும்.",
    },
    {
      keywords: ["stress", "மன அழுத்தம்", "கவலை"],
      response:
        "மன ஆரோக்கியத்திற்கு, 4 7 8 மூச்சுப் பயிற்சியை முயற்சிக்கவும். தேவைப்பட்டால் நிபுணரிடம் ஆலோசனை பெறவும்.",
    },
    {
      keywords: ["sleep", "தூக்கம்", "சோர்வு"],
      response:
        "தூக்கத்தை மேம்படுத்த: 1. ஒரே நேரத்தை பின்பற்றவும். 2. தூங்குவதற்கு 1 மணி நேரத்திற்கு முன் மொபைலை தவிர்க்கவும். 7 முதல் 9 மணிநேரம் தூங்கவும்.",
    },
    {
      keywords: ["exercise", "உடற்பயிற்சி", "நடைபயிற்சி"],
      response: "ஆரம்ப நிலையில், வாரம் 5 நாட்கள் 30 நிமிடம் நடைபயிற்சி செய்வது சிறந்தது.",
    },
    {
      keywords: ["headache", "தலைவலி", "காய்ச்சல்", "வலி"],
      response:
        "லேசான காய்ச்சலுக்கு, ஓய்வு மற்றும் நீர்ச்சத்து முக்கியம். 3 நாட்களுக்கு மேல் இருந்தால் மருத்துவரை அணுகவும்.",
    },
    {
      keywords: ["heart", "இதயம்", "ரத்த அழுத்தம்"],
      response:
        "இதய ஆரோக்கியத்திற்கு குறைந்த உப்பு, தினசரி 30 நிமிட உடற்பயிற்சி மற்றும் மன அழுத்தத்தை குறைப்பது அவசியம்.",
    },
    {
      keywords: ["diabetes", "நீரிழிவு", "சர்க்கரை"],
      response: "சர்க்கரை நோயை நிர்வகிக்க நார்சத்து மற்றும் புரதத்தை சேர்த்து சாப்பிடவும்.",
    },
    {
      keywords: ["pcos", "பிசிஓஎஸ்", "மாதவிடாய்", "அறிகுறிகள்"],
      response:
        "பிசிஓஎஸ் மேலாண்மைக்கு குறைந்த ஜிஐ உணவு மற்றும் உடற்பயிற்சி அவசியம். மருத்துவரை அணுகவும்.",
    },
    {
      keywords: ["water", "தண்ணீர்", "தாகம்", "குடிக்க"],
      response: "தினமும் 8 முதல் 10 டம்ளர் தண்ணீர் குடிக்கவும்.",
    },
    {
      keywords: ["remedy", "வைத்தியம்", "வீட்டு", "இயற்கை"],
      response:
        "இருமலுக்கு இஞ்சி தேன் தேநீர் குடிக்கவும். செரிமானத்திற்கு பெருஞ்சீரகம் மெல்லவும்.",
    },
    {
      keywords: ["reminder", "நினைவூட்டல்", "மருந்து"],
      response:
        "மருந்து நினைவూட்டல்களை அமைக்க எங்கள் 'Medicine Reminder' பக்கத்தைப் பயன்படுத்தவும்.",
    },
  ],
  te: [
    {
      keywords: ["diet", "food", "ఆహారం", "పోషకాహారం"],
      response:
        "సమతుల్య ఆహారంలో 50% కూరగాయలు పండ్లు, 25% ప్రోటీన్ మరియు 25% తృణధాన్యాలు ఉండాలి. రోజుకు 2 నుండి 3 లీటర్ల నీరు త్రాగాలి.",
    },
    {
      keywords: ["stress", "ఒత్తిడి", "ఆందోళన"],
      response:
        "మానసిక ఆరోగ్యానికి, 4 7 8 శ్వాస పద్ధతిని ప్రయత్నించండి. అవసరమైతే నిపుణుడిని సంప్రదించండి.",
    },
    {
      keywords: ["sleep", "నిద్ర", "అలసట"],
      response:
        "నిద్రను మెరుగుపరచడానికి: 1. స్థిరమైన సమయాన్ని పాటించండి. 2. పడుకునే 1 గంట ముందు ఫోన్‌ను నివారించండి. 7 నుండి 9 గంటలు నిద్రపోవాలి.",
    },
    {
      keywords: ["exercise", "వ్యాయామం", "నడక"],
      response: "ప్రారంభకులకు, వారానికి 5 రోజులు 30 నిమిషాల నడక చాలా మంచిది.",
    },
    {
      keywords: ["headache", "తలనొప్పి", "జ్వరం", "నొప్పి"],
      response:
        "తేలికపాటి జ్వరానికి, విశ్రాంతి మరియు నీరు చాలా ముఖ్యం. 3 రోజుల కంటే ఎక్కువ ఉంటే వైద్యుడిని సంప్రదించండి.",
    },
    {
      keywords: ["heart", "గుండె", "బీపీ"],
      response: "గుండె ఆరోగ్యానికి తక్కువ ఉప్పు, రోజూ 30 నిమిషాల వ్యాయామం అవసరం.",
    },
    {
      keywords: ["diabetes", "మధుమేహం", "చక్కెర"],
      response: "మధుమేహాన్ని అదుపులో ఉంచుకోవడానికి ఫైబర్ మరియు ప్రోటీన్ ఉన్న ఆహారాన్ని తీసుకోండి.",
    },
    {
      keywords: ["pcos", "పిసిఒఎస్", "రుతుక్రమం", "లక్షణాలు"],
      response: "పిసిఒఎస్ నిర్వహణకు వ్యాయామం మరియు సరైన ఆహారం అవసరం. గైనకాలజిస్ట్‌ని సంప్రదించండి.",
    },
    {
      keywords: ["water", "నీరు", "దాహం", "త్రాగాలి"],
      response: "రోజుకు 8 నుండి 10 గ్లాసుల (సుమారు 2.5L) నీరు త్రాగాలి.",
    },
    {
      keywords: ["remedy", "నివారణ", "ఇంటి", "సహజ"],
      response: "దగ్గు కోసం అల్లం తేనె టీ త్రాగాలి. కడుపు ఉబ్బరానికి సోపు గింజలు నమలండి.",
    },
    {
      keywords: ["reminder", "రిమైండర్", "ఔషధ"],
      response: "మందుల రిమైండర్‌లను సెట్ చేయడానికి మా 'Medicine Reminder' పేజీని ఉపయోగించండి.",
    },
  ],
};

// --- AI Configuration ---
const _SYSTEM_PROMPTS: Record<Language, string> = {
  en: "You are DR.AI, a health assistant. Provide 2-3 specific natural home remedies (like herbal teas or kitchen ingredients). Keep it under 60 words. Always add a disclaimer that you are an AI, not a doctor.",
  hi: "आप DR.AI हैं, एक स्वास्थ्य सहायक। 2-3 विशिष्ट प्राकृतिक घरेलू उपचार प्रदान करें। इसे 60 शब्दों से कम रखें। हमेशा एक डिस्क्लेमर जोड़ें कि आप AI हैं, डॉक्टर नहीं।",
  ta: "நீங்கள் DR.AI, ஒரு சுகாதார உதவியாளர். 2-3 குறிப்பிட்ட இயற்கை வீட்டு வைத்தியங்களை வழங்கவும். 60 வார்த்தைகளுக்குள் வைக்கவும். நீங்கள் ఒక AI, மருத்துவர் அல்ல என்பதை எப்போதும் குறிப்பிடவும்.",
  te: "మీరు DR.AI, ఆరోగ్య సహాయకురాలు. 2-3 నిర్దిష్ట సహజ ఇంటి నివారణలను అందించండి. 60 పదాల లోపు ఉంచండి. మీరు AI అని, డాక్టర్ కాదు అని ఎల్లప్పుడూ తెలియజేయండి.",
};

async function getAIResponse(
  transcript: string,
  lang: Language,
  _history: { role: string; content: string }[],
): Promise<string> {
  // Use local response logic with multilingual support
  // In production, integrate with a backend proxy for external APIs
  return getBotResponse(transcript, lang);
}

function getBotResponse(input: string, lang: Language): string {
  const lower = input.toLowerCase();
  const responses = MULTILINGUAL_RESPONSES[lang] || MULTILINGUAL_RESPONSES.en;
  for (const item of responses) {
    if (item.keywords.some((kw) => lower.includes(kw))) return item.response;
  }
  return FALLBACKS[lang] || FALLBACKS.en;
}

function TypingDots() {
  return (
    <div className="flex items-center gap-1.5 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-primary/40"
          animate={{ y: [0, -4, 0] }}
          transition={{
            duration: 0.8,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 0.15,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export default function ChatbotPage() {
  const [language, setLanguage] = useState<Language>("en");
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [_isLoading, setIsLoading] = useState(false);
  const [localMessages, setLocalMessages] = useState<
    {
      id: string;
      role: "user" | "assistant";
      content: string;
      timestamp: number;
    }[]
  >([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { data: persistedMessages = [] } = useChatHistory();
  const addMessage = useAddChatMessage();
  const clearHistory = useClearChatHistory();

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
    }
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: We only want to initialize localMessages once when persistedMessages load
  useEffect(() => {
    if (persistedMessages.length > 0 && localMessages.length === 0) {
      setLocalMessages(
        persistedMessages.map((m) => ({
          id: m.id,
          role: m.role,
          content: m.content,
          timestamp: m.timestamp,
        })),
      );
    }
  }, [persistedMessages]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: Scroll when new messages are added or typing state changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [localMessages.length, isTyping]);

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;

    const userMsg = {
      id: `u-${Date.now()}`,
      role: "user" as const,
      content: trimmed,
      timestamp: Date.now(),
      language,
    };

    setLocalMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);
    setIsLoading(true);

    try {
      await addMessage.mutateAsync(userMsg);

      // Get AI response with context
      const botContent = await getAIResponse(trimmed, language, localMessages);

      const botMsg = {
        id: `b-${Date.now()}`,
        role: "assistant" as const,
        content: botContent,
        timestamp: Date.now(),
        language,
      };

      setLocalMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
      setIsLoading(false);

      await addMessage.mutateAsync(botMsg);

      // Auto-speak if it's a new interaction
      speakMessage(botContent, language);
    } catch (error) {
      console.error("Chat error:", error);
      setIsTyping(false);
      setIsLoading(false);
    }
  }

  function handleClear() {
    if (confirm("Are you sure you want to clear your chat history?")) {
      setLocalMessages([]);
      clearHistory.mutate();
    }
  }

  function speakMessage(text: string, lang: Language) {
    if (!text || !("speechSynthesis" in window)) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const langMap: Record<Language, string> = {
      en: "en-US",
      hi: "hi-IN",
      ta: "ta-IN",
      te: "te-IN",
    };
    const targetLang = langMap[lang] || "en-US";
    utterance.lang = targetLang;
    utterance.rate = 0.88;
    utterance.pitch = 1.05;

    // Get all available voices
    let voices = window.speechSynthesis.getVoices();
    if (voices.length === 0) {
      // Fallback for some browsers that load voices asynchronously
      setTimeout(() => speakMessage(text, lang), 100);
      return;
    }

    const normTarget = targetLang.toLowerCase().replace("_", "-");
    const targetPrefix = lang.toLowerCase();

    // Priority 1: Exact match (e.g., ta-IN)
    // Priority 2: Language prefix match (e.g., starts with "ta")
    // Priority 3: Name match (e.g., voice name contains "Tamil")
    const voice =
      voices.find(
        (v) => v.lang.toLowerCase().replace("_", "-") === normTarget,
      ) ||
      voices.find((v) => v.lang.toLowerCase().startsWith(targetPrefix)) ||
      voices.find((v) => {
        const name = v.name.toLowerCase();
        if (lang === "ta") return name.includes("tamil");
        if (lang === "te") return name.includes("telugu");
        if (lang === "hi") return name.includes("hindi");
        return false;
      });

    if (voice) {
      utterance.voice = voice;
      window.speechSynthesis.speak(utterance);
    } else {
      console.warn(`No voice found for ${lang}, using cloud fallback.`);
      const audioUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=${lang}&client=tw-ob`;
      const audio = new Audio(audioUrl);
      audio.play().catch(() => window.speechSynthesis.speak(utterance));
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-w-4xl mx-auto rounded-3xl overflow-hidden border border-white/20 bg-white/40 backdrop-blur-xl shadow-elevated transition-all duration-500">
      <div className="flex-none bg-white/80 border-b border-slate-100/50 px-6 py-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center gradient-primary shadow-lg">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full pulse-glow" />
          </div>
          <div>
            <h1 className="font-display font-bold text-slate-800 text-lg leading-tight flex items-center gap-2">
              DR.AI{" "}
              <span className="text-primary/60 text-xs font-black uppercase tracking-widest">
                Healthcare
              </span>
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            </h1>
            <div className="flex items-center gap-2 mt-0.5">
              <Badge
                variant="outline"
                className="bg-primary/5 text-primary border-primary/20 text-[10px] font-bold tracking-wider px-2 py-0 uppercase"
              >
                Online
              </Badge>
              <span className="text-[11px] text-slate-400 font-medium">
                Verified Medical Assistant
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Select
            value={language}
            onValueChange={(v) => setLanguage(v as Language)}
          >
            <SelectTrigger className="w-[120px] h-9 text-xs rounded-xl bg-slate-50/50 border-slate-200/50 focus:ring-primary/20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-slate-100 shadow-xl">
              {LANGUAGES.map((lang) => (
                <SelectItem
                  key={lang.value}
                  value={lang.value}
                  className="text-xs"
                >
                  <span className="mr-2">{lang.flag}</span>
                  {lang.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
            onClick={handleClear}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-8 space-y-6 scrollbar-none scroll-smooth">
        {localMessages.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center text-center py-10 space-y-4"
          >
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
              <ShieldCheck className="w-10 h-10" />
            </div>
            <div className="space-y-2 max-w-sm relative group">
              <h2 className="text-xl font-display font-bold text-slate-800">
                Your Clinical Sanctuary
              </h2>
              <div className="flex items-center justify-center gap-2">
                <p className="text-sm text-slate-500 leading-relaxed">
                  {GREETINGS[language]}
                </p>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full text-slate-400 hover:text-primary hover:bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => speakMessage(GREETINGS[language], language)}
                >
                  <Volume2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 w-full max-w-md mt-6">
              {QUICK_CHIPS[language].map((chip, idx) => (
                <motion.div
                  key={`${chip.label}-${idx}`}
                  whileHover={{ scale: 1.02 }}
                  className="p-4 rounded-2xl bg-white/60 border border-slate-100 shadow-sm flex items-center gap-3 cursor-pointer group/card"
                  onClick={() => sendMessage(chip.query)}
                >
                  <div
                    className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center group-hover/card:scale-110 transition-transform",
                      idx % 2 === 0
                        ? "bg-rose-50 text-rose-500"
                        : "bg-amber-50 text-amber-500",
                    )}
                  >
                    {idx % 2 === 0 ? (
                      <HeartPulse className="w-4 h-4" />
                    ) : (
                      <Utensils className="w-4 h-4" />
                    )}
                  </div>
                  <span className="text-[11px] font-bold text-slate-600 uppercase tracking-tight">
                    {chip.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        <AnimatePresence mode="popLayout">
          {localMessages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={cn(
                "flex gap-4 items-end",
                msg.role === "user" ? "flex-row-reverse" : "flex-row",
              )}
            >
              <div
                className={cn(
                  "w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm",
                  msg.role === "assistant"
                    ? "gradient-primary"
                    : "bg-slate-100",
                )}
              >
                {msg.role === "assistant" ? (
                  <Bot className="w-4 h-4 text-white" />
                ) : (
                  <span className="text-xs" />
                )}
              </div>

              <div
                className={cn(
                  "group relative max-w-[75%] px-5 py-3.5 rounded-2xl shadow-subtle",
                  msg.role === "user"
                    ? "bg-slate-800 text-white rounded-br-none"
                    : "bg-white/90 border border-slate-100 text-slate-700 rounded-bl-none",
                )}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                  {msg.content}
                </p>
                <div
                  className={cn(
                    "flex items-center justify-between mt-2 pt-2 border-t",
                    msg.role === "user"
                      ? "border-white/10 text-white/40"
                      : "border-slate-50 text-slate-300",
                  )}
                >
                  <span className="text-[10px] font-medium tracking-wide">
                    {new Date(msg.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                  {msg.role === "assistant" && (
                    <button
                      type="button"
                      onClick={() => speakMessage(msg.content, language)}
                      className="text-slate-400 hover:text-primary transition-colors"
                    >
                      <Volume2 className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-4 items-end"
          >
            <div className="w-8 h-8 rounded-xl gradient-primary flex items-center justify-center shadow-sm">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="bg-white/80 border border-slate-100 rounded-2xl rounded-bl-none shadow-subtle">
              <div className="flex flex-col">
                <TypingDots />
                <span className="px-4 pb-2 text-[10px] font-bold text-primary/40 uppercase tracking-widest animate-pulse">
                  DR.AI is thinking...
                </span>
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex-none p-6 pt-2 bg-white/80 backdrop-blur-sm space-y-4">
        {/* Persistent Quick Suggestions */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {QUICK_CHIPS[language].map((chip, idx) => (
            <button
              type="button"
              key={`${chip.label}-${idx}`}
              onClick={() => sendMessage(chip.query)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-primary/30 transition-all whitespace-nowrap group"
            >
              <span className="text-xs font-bold text-slate-600 group-hover:text-primary transition-colors">
                {chip.label}
              </span>
            </button>
          ))}
        </div>
        <div className="relative flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-2xl p-2 focus-within:ring-2 focus-within:ring-primary/10">
          <div className="pl-3 text-slate-400">
            <MessageCircle className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage(inputText);
              }
            }}
            placeholder="Type your health query..."
            disabled={isTyping}
            className="flex-1 bg-transparent py-3 text-sm text-slate-700 focus:outline-none disabled:opacity-50"
          />
          <Button
            onClick={() => sendMessage(inputText)}
            disabled={isTyping || !inputText.trim()}
            className="h-11 w-11 rounded-xl gradient-primary border-0 shadow-lg p-0 flex-shrink-0"
          >
            <Send className="w-5 h-5 text-white" />
          </Button>
        </div>
        <p className="text-[10px] text-center text-slate-400 mt-3 font-medium">
          Healthcare AI is for information purposes and doesn't replace
          professional medical advice.
        </p>
      </div>
    </div>
  );
}
