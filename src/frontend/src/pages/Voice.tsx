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
  ArrowRight,
  Bot,
  Loader2,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

// ─── Web Speech API types ─────────────────────────────────────────────────────
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionInstance extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onend: (() => void) | null;
  onerror: ((event: Event) => void) | null;
}

declare global {
  interface Window {
    SpeechRecognition?: new () => SpeechRecognitionInstance;
    webkitSpeechRecognition?: new () => SpeechRecognitionInstance;
  }
}

// ─── Types ────────────────────────────────────────────────────────────────────
interface VoiceInteraction {
  id: string;
  transcript: string;
  response: string;
  timestamp: number;
}

type VoiceLocale = "en-US" | "hi-IN" | "ta-IN" | "te-IN";

const VOICE_LOCALES: {
  value: VoiceLocale;
  label: string;
  flag: string;
  nativeName: string;
}[] = [
  { value: "en-US", label: "English", flag: "🇺🇸", nativeName: "English" },
  { value: "hi-IN", label: "Hindi", flag: "🇮🇳", nativeName: "हिंदी" },
  { value: "ta-IN", label: "Tamil", flag: "🇮🇳", nativeName: "தமிழ்" },
  { value: "te-IN", label: "Telugu", flag: "🇮🇳", nativeName: "తెలుగు" },
];

// ─── Suggestions per language ─────────────────────────────────────────────────
const SUGGESTIONS: Record<VoiceLocale, string[]> = {
  "en-US": [
    "Home remedy for cough",
    "Natural ways to sleep",
    "Ginger tea benefits",
    "Remedy for bloating",
    "Skin glow naturally",
    "Boost immunity",
    "Headache home remedy",
    "Turmeric milk benefits",
  ],
  "hi-IN": [
    "खांसी का घरेलू उपाय",
    "नींद के प्राकृतिक तरीके",
    "अदरक की चाय के फायदे",
    "पेट फूलने का उपाय",
    "त्वचा की चमक",
    "रोग प्रतिरोधక क्षमता",
    "सिरदर्द का उपाय",
    "हल्दी दूध के फायदे",
  ],
  "ta-IN": [
    "இருமல் வீட்டு வைத்தியம்",
    "தூக்கத்திற்கான வழிகள்",
    "இஞ்சி டீ நன்மைகள்",
    "செரிமான உதவி",
    "சரும பொலிவு",
    "நோய் எதிர்ப்பு சக்தி",
    "தலைவலி வைத்தியம்",
    "மஞ்சள் பால் நன்மைகள்",
  ],
  "te-IN": [
    "దగ్గు ఇంటి నివారణ",
    "నిద్రకు సహజ మార్గాలు",
    "అల్లం టీ ప్రయోజనాలు",
    "జీర్ణక్రియ సహాయం",
    "చర్మ సౌందర్యం",
    "రోగనిరోధక శక్తి",
    "తలనొప్పి నివారణ",
    "పసుపు పాలు ప్రయోజనాలు",
  ],
};

// ─── System prompts — AI responds in the user's language ─────────────────────
const SYSTEM_PROMPTS: Record<VoiceLocale, string> = {
  "en-US": `You are DR.AI, a knowledgeable health assistant specializing in natural home remedies.
- Respond ONLY in English.
- Give 2-3 specific natural remedies using kitchen ingredients or simple stretches.
- Keep it under 3 sentences.
- Never diagnose. For serious symptoms, advise consulting a doctor.`,

  "hi-IN": `आप DR.AI हैं, एक स्वास्थ्य सहायक जो प्राकृतिक घरेलू उपचारों में विशेषज्ञ हैं।
- केवल हिंदी में उत्तर दें।
- रसोई की सामग्री या सरल स्ट्रेच का उपयोग करके 2-3 विशिष्ट प्राकृतिक उपचार दें।
- इसे 3 वाक्यों से कम रखें।
- रोगों का निदान न करें। गंभीर लक्षणों के लिए डॉक्टर से मिलने की सलाह दें।`,

  "ta-IN": `நீங்கள் DR.AI, இயற்கை வீட்டு வைத்தியத்தில் நிபுணத்துவம் பெற்ற ஒரு சுகாதார உதவியாளர்.
- கேவலம் தமிழில் மட்டுமே பதில் சொல்லுங்கள்.
- சமையலறை பொருட்கள் அல்லது எளிய பயிற்சிகளைப் பயன்படுத்தி 2-3 குறிப்பிட்ட இயற்கை வைத்தியங்களை வழங்கவும்.
- 3 வாக்கியங்களுக்குள் வைக்கவும்.
- நோய்களை கண்டறிய வேண்டாம். தீவிர அறிகுறிகளுக்கு மருத்துவரை அணுகவும்.`,

  "te-IN": `మీరు DR.AI, సహజ ఇంటి నివారణలలో నిపుణులైన ఆరోగ్య సహాయకులు.
- కేవలం తెలుగులో మాత్రమే సమాధానం ఇవ్వండి.
- వంటగది పదార్థాలు లేదా సాధారణ వ్యాయామాలను ఉపయోగించి 2-3 నిర్దిష్ట సహజ నివారణలను ఇవ్వండి.
- 3 వాక్యాల లోపు ఉంచండి.
- వ్యాధులను నిర్ధారించవద్దు. తీవ్రమైన లక్షణాలకు డాక్టర్‌ను సంప్రదించండి.`,
};

// ─── Offline fallback keyword tips ───────────────────────────────────────────
const FALLBACK_TIPS: Record<
  VoiceLocale,
  { keywords: string[]; tip: string }[]
> = {
  "en-US": [
    {
      keywords: ["stress", "anxiety", "mental", "worry"],
      tip: "Try the 4-7-8 breathing technique: inhale 4 counts, hold 7, exhale 8. It quickly calms your nervous system.",
    },
    {
      keywords: ["sleep", "insomnia", "tired", "rest"],
      tip: "Keep a consistent sleep schedule. Avoid screens 1 hour before bed and keep your room cool and dark.",
    },
    {
      keywords: ["exercise", "workout", "fitness", "walk"],
      tip: "A 30-minute brisk walk daily reduces cardiovascular disease risk significantly.",
    },
    {
      keywords: ["diet", "food", "eat", "nutrition", "healthy"],
      tip: "Fill half your plate with vegetables, a quarter with lean protein, and a quarter with whole grains.",
    },
    {
      keywords: ["water", "hydration", "drink", "thirsty"],
      tip: "Drink at least 8 glasses of water daily. It boosts energy, digestion, and skin health.",
    },
    {
      keywords: ["headache", "migraine", "head"],
      tip: "Headaches are often caused by dehydration. Drink water and rest in a dark, quiet room.",
    },
    {
      keywords: ["heart", "blood pressure", "cardio"],
      tip: "Reduce sodium, exercise regularly, and eat fiber-rich foods to keep your heart healthy.",
    },
    {
      keywords: ["digestion", "stomach", "gut", "bloat"],
      tip: "Eat more fiber, stay hydrated, and include probiotic foods like yogurt to improve gut health.",
    },
  ],
  "hi-IN": [
    {
      keywords: ["तनाव", "चिंता", "मानसिक"],
      tip: "4-7-8 श्वास तकनीक आज़माएं: 4 की गिनती पर श्वास लें, 7 पर रोकें, 8 पर छोड़ें।",
    },
    {
      keywords: ["नींद", "थकान", "आराम"],
      tip: "रोज़ एक ही समय पर सोएं। सोने से एक घंटे पहले स्क्रीन बंद करें।",
    },
    {
      keywords: ["व्यायाम", "कसरत", "चलना"],
      tip: "रोज़ 30 मिनट तेज़ चलने से हृदय रोग का खतरा काफी कम होता है।",
    },
    {
      keywords: ["आहार", "खाना", "भोजन", "पोषण"],
      tip: "थाली में आधी सब्ज़ियाँ, एक चौथाई प्रोटीन और एक चौथाई साबुत अनाज रखें।",
    },
    {
      keywords: ["पानी", "पीना", "प्यास"],
      tip: "रोज़ कम से कम 8 गिलास पानी पिएं। यह ऊर्जा और पाचन के लिए ज़रूरी है।",
    },
    {
      keywords: ["सिरदर्द", "दर्द"],
      tip: "सिरदर्द अक्सर पानी की कमी से होता है। पानी पिएं और अंधेरे कमरे में आराम करें।",
    },
    {
      keywords: ["हृदय", "दिल", "ब्लड प्रेशर"],
      tip: "नमक कम खाएं, रोज़ व्यायाम करें और फाइबर युक्त भोजन लें।",
    },
    {
      keywords: ["पाचन", "पेट"],
      tip: "फाइबर युक्त भोजन खाएं और दही जैसे प्रोबायोटिक खाद्य पदार्थ लें।",
    },
  ],
  "ta-IN": [
    {
      keywords: ["மன அழுத்தம்", "கவலை", "மன"],
      tip: "4-7-8 மூச்சுப்பயிற்சி: 4 எண்ணிக்கையில் சுவாசிக்கவும், 7-ல் நிறுத்தவும், 8-ல் மூச்சை வெளியிடவும்.",
    },
    {
      keywords: ["தூக்கம்", "உறக்கம்", "சோர்வு"],
      tip: "ஒவ்வொரு நாளும் ஒரே நேரத்தில் தூங்கவும். படுக்கைக்கு முன் திரைகளை தவிர்க்கவும்.",
    },
    {
      keywords: ["உடற்பயிற்சி", "நடைபயிற்சி"],
      tip: "தினமும் 30 நிமிடம் நடைபயிற்சி இதய நோய் அபாயத்தை குறைக்கும்.",
    },
    {
      keywords: ["உணவு", "சாப்பாடு", "ஊட்டச்சத்து"],
      tip: "தட்டில் பாதி காய்கறிகள், கால் பங்கு புரதம், கால் பங்கு முழு தானியங்கள் வைக்கவும்.",
    },
    {
      keywords: ["தண்ணீர்", "நீர்", "தாகம்"],
      tip: "தினமும் குறைந்தது 8 கிளாஸ் தண்ணீர் குடிக்கவும். இது சக்தி மற்றும் செரிமானத்திற்கு அவசியம்.",
    },
    {
      keywords: ["தலைவலி", "வலி"],
      tip: "தலைவலி நீரிழப்பால் வரலாம். தண்ணீர் குடித்து இருட்டான அறையில் ஓய்வெடுங்கள்.",
    },
    {
      keywords: ["இதயம்", "ரத்த அழுத்தம்"],
      tip: "உப்பை குறைத்து தினமும் உடற்பயிற்சி செய்யுங்கள்.",
    },
    {
      keywords: ["செரிமானம்", "வயிறு"],
      tip: "நார்சத்து நிறைந்த உணவுகளை சாப்பிட்டு தயிர் போன்ற புரோபயோடிக் உணவுகளை சேர்க்கவும்.",
    },
  ],
  "te-IN": [
    {
      keywords: ["ఒత్తిడి", "ఆందోళన", "మానసిక"],
      tip: "4-7-8 శ్వాస పద్ధతి: 4 లెక్కలకు తీసుకోండి, 7కు పట్టుకోండి, 8కు వదలండి.",
    },
    {
      keywords: ["నిద్ర", "అలసట", "విశ్రాంతి"],
      tip: "ప్రతిరోజు ఒకే సమయానికి పడుకోండి. పడుకునే ముందు స్క్రీన్లు వదలండి.",
    },
    {
      keywords: ["వ్యాయామం", "నడక", "ఫిట్‌నెస్"],
      tip: "రోజూ 30 నిమిషాలు నడక గుండె జబ్బుల ప్రమాదాన్ని తగ్గిస్తుంది.",
    },
    {
      keywords: ["ఆహారం", "భోజనం", "పోషణ", "తినడం"],
      tip: "పళ్ళెంలో సగం కూరగాయలు, పాతిక ప్రోటీన్, పాతిక తృణధాన్యాలు వేసుకోండి.",
    },
    {
      keywords: ["నీరు", "త్రాగడం", "దాహం"],
      tip: "రోజూ కనీసం 8 గ్లాసుల నీరు త్రాగండి. శక్తి మరియు జీర్ణక్రియకు అవసరం.",
    },
    {
      keywords: ["తలనొప్పి", "నొప్పి"],
      tip: "తలనొప్పి తరచుగా నీరు తక్కువగా వల్ల వస్తుంది. నీరు త్రాగి చీకటి గదిలో విశ్రమించండి.",
    },
    {
      keywords: ["గుండె", "బిపి", "రక్తపోటు"],
      tip: "ఉప్పు తగ్గించండి, రోజూ వ్యాయామం చేయండి, పీచు పదార్థాలు తిండి.",
    },
    {
      keywords: ["జీర్ణక్రియ", "కడుపు"],
      tip: "పీచు పదార్థాలు తిండి, నీరు త్రాగండి, పెరుగు తీసుకోండి.",
    },
  ],
};

// ─── Offline fallback ─────────────────────────────────────────────────────────
function getFallbackResponse(transcript: string, locale: VoiceLocale): string {
  const lower = transcript.toLowerCase();
  const tips = FALLBACK_TIPS[locale];
  for (const item of tips) {
    if (item.keywords.some((kw) => lower.includes(kw.toLowerCase())))
      return item.tip;
  }
  const defaults: Record<VoiceLocale, string> = {
    "en-US":
      "Stay healthy: eat balanced meals, drink enough water, exercise daily, and sleep 7–8 hours. Small consistent habits make a big difference!",
    "hi-IN":
      "स्वस्थ रहें: संतुलित भोजन करें, पर्याप्त पानी पिएं, रोज़ व्यायाम करें और 7–8 घंटे सोएं।",
    "ta-IN":
      "ஆரோக்கியமாக இருங்கள்: சமச்சீரான உணவு, போதுமான தண்ணீர், தினசரி உடற்பயிற்சி மற்றும் 7–8 மணி தூக்கம்!",
    "te-IN":
      "ఆరోగ్యంగా ఉండండి: సమతుల్య ఆహారం, తగినంత నీరు, రోజువారీ వ్యాయామం మరియు 7–8 గంటల నిద్ర!",
  };
  return defaults[locale];
}

// ─── Anthropic API call ───────────────────────────────────────────────────────
async function getAIResponse(
  transcript: string,
  locale: VoiceLocale,
): Promise<string> {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      system: SYSTEM_PROMPTS[locale],
      messages: [{ role: "user", content: transcript }],
    }),
  });
  if (!res.ok) throw new Error("API error");
  const data = await res.json();
  const text =
    data.content
      ?.filter((b: { type: string }) => b.type === "text")
      .map((b: { text: string }) => b.text)
      .join("") ?? "";
  if (!text) throw new Error("Empty response");
  return text;
}

// ─── Pulse rings ──────────────────────────────────────────────────────────────
function PulseRings({ active }: { active: boolean }) {
  if (!active) return null;
  return (
    <>
      {[1, 2, 3].map((i) => (
        <motion.span
          key={i}
          className="absolute inset-0 rounded-full border-2 border-primary/40"
          initial={{ scale: 1, opacity: 0.6 }}
          animate={{ scale: 1 + i * 0.35, opacity: 0 }}
          transition={{
            duration: 1.8,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 0.4,
            ease: "easeOut",
          }}
        />
      ))}
    </>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function VoicePage() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [locale, setLocale] = useState<VoiceLocale>("en-US");
  const [history, setHistory] = useState<VoiceInteraction[]>([]);

  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);

  // ── Preload TTS voices on mount ────────────────────────────────────────
  useEffect(() => {
    const load = () => {
      voicesRef.current = window.speechSynthesis?.getVoices() ?? [];
    };
    load();
    window.speechSynthesis?.addEventListener("voiceschanged", load);
    return () =>
      window.speechSynthesis?.removeEventListener("voiceschanged", load);
  }, []);

  const isSupported =
    typeof window !== "undefined" &&
    !!(window.SpeechRecognition || window.webkitSpeechRecognition);

  // ── Speak text with correct voice ─────────────────────────────────────
  const speakText = useCallback((text: string, currentLocale: VoiceLocale) => {
    if (!text || typeof window === "undefined" || !window.speechSynthesis)
      return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    // Get all available voices
    let voices = window.speechSynthesis.getVoices();

    // If voices aren't loaded yet, retry shortly
    if (voices.length === 0) {
      setTimeout(() => speakText(text, currentLocale), 100);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = currentLocale;
    utterance.rate = 0.9;
    utterance.pitch = 1.0;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = (e) => {
      console.error("TTS Error:", e);
      setIsSpeaking(false);
    };

    const norm = currentLocale.toLowerCase().replace("_", "-");
    const prefix = norm.split("-")[0];

    // Priority matching:
    // 1. Exact language match (e.g., ta-IN)
    // 2. Language prefix match (e.g., ta)
    // 3. Name-based match (contains "Tamil", "Telugu", etc.)
    const voice =
      voices.find((v) => v.lang.toLowerCase().replace("_", "-") === norm) ??
      voices.find((v) => v.lang.toLowerCase().startsWith(prefix)) ??
      voices.find((v) => {
        const name = v.name.toLowerCase();
        if (prefix === "ta") return name.includes("tamil");
        if (prefix === "te") return name.includes("telugu");
        if (prefix === "hi") return name.includes("hindi");
        return false;
      });

    if (voice) {
      utterance.voice = voice;
      window.speechSynthesis.speak(utterance);
    } else {
      console.warn(
        `No specific voice found for ${currentLocale}, attempting cloud fallback.`,
      );

      // Fallback to Google Translate TTS (unofficial but effective for small snippets)
      // Note: This is a best-effort fallback for environments without regional language packs.
      const langCode = currentLocale.split("-")[0];
      const audioUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=${langCode}&client=tw-ob`;

      const audio = new Audio(audioUrl);
      audio.onplay = () => setIsSpeaking(true);
      audio.onended = () => setIsSpeaking(false);
      audio.onerror = () => {
        console.error("Cloud TTS Fallback failed");
        setIsSpeaking(false);
        // Last resort: try system default anyway
        window.speechSynthesis.speak(utterance);
      };

      audio.play().catch((err) => {
        console.error("Audio play failed:", err);
        setIsSpeaking(false);
        window.speechSynthesis.speak(utterance);
      });
    }
  }, []);

  // ── Process text: try AI, fall back to offline tips ───────────────────
  const handleTranscriptEnd = useCallback(
    async (text: string, currentLocale: VoiceLocale) => {
      if (!text.trim()) return;
      setIsLoading(true);
      setResponse("");

      let tip: string;
      try {
        tip = await getAIResponse(text, currentLocale);
      } catch {
        tip = getFallbackResponse(text, currentLocale);
      }

      setIsLoading(false);
      setResponse(tip);
      setHistory((prev) => [
        {
          id: `${Date.now()}`,
          transcript: text,
          response: tip,
          timestamp: Date.now(),
        },
        ...prev.slice(0, 9),
      ]);
      setTimeout(() => speakText(tip, currentLocale), 400);
    },
    [speakText],
  );

  // ── Speech recognition ────────────────────────────────────────────────
  function startListening() {
    if (!isSupported) return;
    const API = window.SpeechRecognition ?? window.webkitSpeechRecognition;
    if (!API) return;

    const rec = new API();
    rec.lang = locale;
    rec.continuous = false;
    rec.interimResults = true;

    rec.onresult = (e: SpeechRecognitionEvent) => {
      const t = Array.from({ length: e.results.length }, (_, i) => e.results[i])
        .map((r) => r[0].transcript)
        .join("");
      setTranscript(t);
    };
    rec.onend = () => {
      setIsListening(false);
      setTranscript((prev) => {
        if (prev.trim()) handleTranscriptEnd(prev, locale);
        return prev;
      });
    };
    rec.onerror = () => {
      setIsListening(false);
      toast.error("Voice error. Please try again.");
    };

    recognitionRef.current = rec;
    rec.start();
    setIsListening(true);
    setTranscript("");
    setResponse("");
  }

  function stopListening() {
    recognitionRef.current?.stop();
    setIsListening(false);
  }
  function toggleListening() {
    isListening ? stopListening() : startListening();
  }
  function stopSpeaking() {
    window.speechSynthesis?.cancel();
    setIsSpeaking(false);
  }

  function handleSuggestionClick(s: string) {
    if (isListening || isLoading) return;
    setTranscript(s);
    handleTranscriptEnd(s, locale);
  }

  useEffect(() => {
    return () => {
      recognitionRef.current?.stop();
      window.speechSynthesis?.cancel();
    };
  }, []);

  const localeInfo = VOICE_LOCALES.find((l) => l.value === locale)!;
  const currentSuggestions = SUGGESTIONS[locale];

  // Check if voice exists for current locale
  useEffect(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      const checkVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        const prefix = locale.split("-")[0];
        const hasVoice = voices.some(
          (v) =>
            v.lang.toLowerCase().startsWith(prefix) ||
            v.name
              .toLowerCase()
              .includes(
                prefix === "ta"
                  ? "tamil"
                  : prefix === "te"
                    ? "telugu"
                    : prefix === "hi"
                      ? "hindi"
                      : "english",
              ),
        );
        if (voices.length > 0 && !hasVoice && locale !== "en-US") {
          toast.info(`Using Cloud Voice for ${localeInfo.label}`, {
            description:
              "Native voice not found on system, switching to high-quality cloud backup.",
          });
        }
      };
      checkVoices();
      window.speechSynthesis.onvoiceschanged = checkVoices;
    }
  }, [locale, localeInfo.label]);

  return (
    <div
      data-ocid="voice.page"
      className="max-w-2xl mx-auto px-4 py-8 space-y-8"
    >
      {/* ── Header ── */}
      <div className="flex items-center justify-between bg-white/40 backdrop-blur-md p-6 rounded-3xl border border-white/20 shadow-subtle">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-800 flex items-center gap-2">
            Voice <span className="gradient-text">Assistant</span>
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Ask any health query in your language
          </p>
        </div>
        <Select
          value={locale}
          onValueChange={(v) => setLocale(v as VoiceLocale)}
        >
          <SelectTrigger className="w-40 h-10 rounded-xl bg-white/80 border-slate-200 shadow-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="rounded-xl border-slate-100 shadow-xl">
            {VOICE_LOCALES.map((l) => (
              <SelectItem key={l.value} value={l.value} className="text-xs">
                <span className="mr-2">{l.flag}</span>
                {l.nativeName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* ── Mic UI ── */}
      <div className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-[40px] shadow-elevated p-12 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-teal-500/5 rounded-full -ml-16 -mb-16 blur-3xl" />

        <div className="flex flex-col items-center gap-8 relative z-10">
          <div className="relative flex items-center justify-center">
            <PulseRings active={isListening} />
            <button
              type="button"
              onClick={isSupported ? toggleListening : undefined}
              disabled={!isSupported || isLoading}
              className={cn(
                "relative z-10 w-32 h-32 rounded-full flex items-center justify-center transition-all duration-500 shadow-lg group-hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-primary/20 disabled:opacity-60 disabled:cursor-not-allowed",
                isListening
                  ? "bg-gradient-to-br from-rose-500 to-orange-500 shadow-rose-200"
                  : "gradient-primary shadow-primary/20",
              )}
            >
              <AnimatePresence mode="wait">
                {isListening ? (
                  <motion.div
                    key="off"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                  >
                    <MicOff className="w-12 h-12 text-white" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="on"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                  >
                    <Mic className="w-12 h-12 text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>

          <div className="text-center min-h-[4rem] px-4">
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center gap-2"
                >
                  <Loader2 className="w-6 h-6 text-primary animate-spin" />
                  <p className="text-sm text-slate-500 font-medium">
                    Getting health advice...
                  </p>
                </motion.div>
              ) : isListening ? (
                <motion.div
                  key="listening"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-3"
                >
                  <p className="text-sm font-bold text-rose-500 uppercase tracking-widest flex items-center gap-2 justify-center">
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                    Listening Now
                  </p>
                  {transcript && (
                    <p className="text-slate-800 text-lg font-semibold max-w-sm mx-auto italic leading-tight">
                      "{transcript}"
                    </p>
                  )}
                </motion.div>
              ) : transcript ? (
                <motion.div
                  key="transcript"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                    Recognized
                  </p>
                  <p className="text-slate-700 text-base font-medium max-w-sm mx-auto">
                    "{transcript}"
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <p className="text-slate-500 text-sm font-medium">
                    {isSupported
                      ? `Tap to speak in ${localeInfo.nativeName}`
                      : "Voice features require Chrome or Edge"}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Badge
            variant="outline"
            className={cn(
              "px-4 py-1.5 rounded-full border-2 text-[10px] font-bold uppercase tracking-widest transition-all duration-300",
              isListening
                ? "bg-rose-50 text-rose-500 border-rose-100"
                : isLoading
                  ? "bg-amber-50 text-amber-500 border-amber-100"
                  : "bg-primary/5 text-primary border-primary/10",
            )}
          >
            {isListening
              ? "● Recording Active"
              : isLoading
                ? "◌ Processing..."
                : "○ Ready to Listen"}
          </Badge>
        </div>
      </div>

      {/* ── Response card ── */}
      <AnimatePresence>
        {response && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-teal-500/10 blur-2xl -z-10 rounded-3xl" />
            <div className="bg-white/80 backdrop-blur-md border border-white rounded-[32px] shadow-elevated p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-lg shadow-primary/20">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-800 uppercase tracking-tight">
                      DR.AI
                    </h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">
                      {localeInfo.flag} {localeInfo.nativeName}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "h-10 rounded-xl px-4 flex items-center gap-2 transition-all",
                    isSpeaking
                      ? "bg-rose-50 text-rose-500 hover:bg-rose-100"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200",
                  )}
                  onClick={
                    isSpeaking
                      ? stopSpeaking
                      : () => speakText(response, locale)
                  }
                >
                  {isSpeaking ? (
                    <>
                      <VolumeX className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase">Stop</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase">Speak</span>
                    </>
                  )}
                </Button>
              </div>
              <div className="bg-slate-50/50 rounded-2xl p-6 border border-slate-100">
                <p className="text-slate-700 text-base leading-relaxed font-medium">
                  {response}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Suggestions ── */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 px-1">
          <div className="w-1 h-4 bg-primary rounded-full" />
          <h3 className="font-display font-bold text-sm text-slate-800 uppercase tracking-wider">
            Try Asking About...
          </h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {currentSuggestions.map((s) => (
            <motion.button
              key={s}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleSuggestionClick(s)}
              disabled={isLoading || isListening}
              className="px-4 py-3 rounded-2xl bg-white border border-slate-100 shadow-sm text-xs font-bold text-slate-600 hover:border-primary hover:text-primary hover:shadow-md transition-all text-left flex items-center justify-between group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>{s}</span>
              <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
            </motion.button>
          ))}
        </div>
      </div>

      {/* ── History ── */}
      {history.length > 0 && (
        <div className="space-y-4 pt-4">
          <div className="flex items-center gap-3 px-1">
            <div className="w-1 h-4 bg-slate-300 rounded-full" />
            <h3 className="font-display font-bold text-sm text-slate-500 uppercase tracking-wider">
              Recent Consultations
            </h3>
          </div>
          <div className="space-y-3">
            {history.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white/40 border border-white/60 rounded-2xl p-5 hover:bg-white/60 transition-colors shadow-sm"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Mic className="w-3 h-3 text-primary" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase">
                      Voice Interaction
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400">
                    {new Date(item.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <p className="text-sm font-bold text-slate-800 mb-2">
                  "{item.transcript}"
                </p>
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                  {item.response}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
