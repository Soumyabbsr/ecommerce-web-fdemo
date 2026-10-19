"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  qEn: string;
  qHi: string;
  aEn: string;
  aHi: string;
}

const FAQS: FAQItem[] = [
  {
    qEn: "Does Height Veda really work?",
    qHi: "क्या Height Veda सच में काम करता है?",
    aEn: "Yes, Height Veda is scientifically formulated with pure Ayurvedic herbs. It works from within to stimulate the pituitary gland and promote natural growth plate nourishment.",
    aHi: "हाँ, Height Veda वैज्ञानिक और आयुर्वेदिक सिद्धांतों पर आधारित है। यह शरीर को अंदर से पोषण देकर प्राकृतिक विकास में मदद करता है।",
  },
  {
    qEn: "Does it contain chemicals?",
    qHi: "क्या इसमें कोई केमिकल हैं?",
    aEn: "No, Height Veda is 100% Ayurvedic, Ayush certified, and does not contain any steroids, heavy metals, or harmful chemical additives.",
    aHi: "नहीं, Height Veda 100% आयुर्वेदिक है और इसमें कोई हानिकारक केमिकल या स्टेरॉइड्स नहीं हैं।",
  },
  {
    qEn: "How long before I see results?",
    qHi: "परिणाम देखने में कितना समय लगता है?",
    aEn: "Visible changes and improved posture, energy, and growth progression can be experienced within 45 to 90 days of consistent daily intake.",
    aHi: "नियमित रूप से 45 से 90 दिनों के सेवन के भीतर स्पष्ट और सकारात्मक बदलाव देखे जा सकते हैं।",
  },
  {
    qEn: "Is it suitable for all age groups?",
    qHi: "क्या यह किसी भी उम्र के लिए सही है?",
    aEn: "Height Veda is formulated specifically for children, teenagers, and young adults between the ages of 12 and 35.",
    aHi: "Height Veda विशेष रूप से 12 से 35 वर्ष के युवाओं, किशोरों और वयस्कों के लिए अत्यंत प्रभावी है।",
  },
  {
    qEn: "Are there any side effects?",
    qHi: "क्या कोई साइड इफेक्ट हो सकते हैं?",
    aEn: "No, because it contains only natural herbal extracts like Ashwagandha, Shatavari, Safed Musli, and Amla, it has zero known side effects.",
    aHi: "नहीं, यह एक 100% शुद्ध प्राकृतिक आयुर्वेदिक उत्पाद है और पूरी तरह सुरक्षित है।",
  },
  {
    qEn: "Does Height Veda only increase height?",
    qHi: "क्या Height Veda से सिर्फ हाइट बढ़ती है?",
    aEn: "No, it also supports overall muscular development, bone mineral density, spinal posture improvement, stamina, and digestive metabolism.",
    aHi: "नहीं, यह समग्र शारीरिक विकास, हड्डियों की मजबूती, पोश्चर सुधार और ऊर्जा के स्तर को बढ़ाने में भी मदद करता है।",
  },
  {
    qEn: "Are there fake products in the market?",
    qHi: "क्या बाजार में नकली प्रोडक्ट भी हैं?",
    aEn: "Yes, beware of unauthorized copies and counterfeits. Always order only from the official website heightveda.com to receive genuine, batch-certified original products.",
    aHi: "हाँ, बाजार में नकली उत्पादों से सावधान रहें। केवल आधिकारिक वेबसाइट से ही असली Height Veda खरीदें।",
  },
];

export function Faqs() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-16 md:py-24 bg-[#fcfbfa] border-b border-gray-100" id="faqs-sec">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-emerald-800 bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-200">
            Got Questions?
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mt-3 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto mt-2">
            Clear answers to common questions about Height Veda usage, authenticity, and benefits.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-gray-200 shadow-xs overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 hover:bg-gray-50/50 transition cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <div>
                    <h3 className="font-extrabold text-base sm:text-lg text-gray-900">
                      {faq.qEn}
                    </h3>
                    <p className="text-xs font-semibold text-emerald-800 mt-0.5">
                      {faq.qHi}
                    </p>
                  </div>

                  <div
                    className={`w-8 h-8 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 bg-emerald-600 text-white" : ""
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 border-t border-gray-100 pt-4 text-sm text-gray-700 space-y-2 leading-relaxed animate-in fade-in duration-200">
                    <p>{faq.aEn}</p>
                    <p className="text-xs text-gray-600 font-medium pt-2 border-t border-gray-50">
                      {faq.aHi}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
