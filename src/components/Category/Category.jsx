import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

const FAQSection = ({ faqs }) => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="py-6">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-5 text-black">
                    Frequently Asked Questions
                </h2>

                <div className="space-y-5">
                    {faqs?.map((faq, index) => {
                        const isOpen = openIndex === index;
                        return (
                            <div key={index}
                                className="border rounded-2xl overflow-hidden bg-white shadow-sm border-gray-200"
                            >
                                <button onClick={() => toggleFAQ(index)} className="w-full flex items-center justify-between p-5 text-left">
                                    <span className="font-medium text-lg text-black">
                                        {faq.question}
                                    </span>

                                    <motion.div className="text-black"
                                        animate={{ rotate: isOpen ? 180 : 0 }}
                                        transition={{ duration: 0.25 }}
                                    >
                                        {isOpen ? (
                                            <ChevronUp size={22} />
                                        ) : (
                                            <ChevronDown size={22} />
                                        )}
                                    </motion.div>
                                </button>

                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1, }}
                                            exit={{ height: 0, opacity: 0, }}
                                            transition={{ duration: 0.3, ease: "easeInOut", }}
                                            className="overflow-hidden bg-gray-50"
                                        >
                                            <div className="px-5 py-4 text-gray-800">
                                                {faq.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default FAQSection;