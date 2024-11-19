import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Why does the withdrawal amount increase every year?",
      answer: "The withdrawal amount typically increases annually to account for inflation, ensuring your purchasing power remains consistent throughout retirement."
    },
    {
      question: "Why do I have to include taxes in the amount needed to live?",
      answer: "You should include taxes in your living expenses because they're a real cost you'll face in retirement. Most calculators don't automatically include taxes because tax situations vary widely among individuals."
    },
    {
      question: "What if I want the earnings to include taxes?",
      answer: "If you want earnings to include taxes, you should input your expected after-tax rate of return. This will give you a more conservative estimate of your investment growth."
    },
    {
      question: "How much do I need to live on?",
      answer: "This varies greatly depending on your lifestyle and location. A common rule of thumb is to plan for 70-80% of your pre-retirement income, but it's best to create a detailed retirement budget."
    },
    {
      question: "I don't understand compounding. Does it really make a difference?",
      answer: "Compounding is when you earn returns on your initial investment plus previous returns. It can make a significant difference over time, especially for long-term investments like retirement savings."
    },
    {
      question: "What can I expect the inflation rate to be?",
      answer: "Historically, inflation in the U.S. has averaged around 3% annually. However, it can vary. Many retirement calculators use a default of 2-3%, but allow you to adjust this assumption."
    }
  ];

  return (
    <section className="mt-16">
      <h2 className="section-title text-center">Frequently Asked Questions</h2>
      <div className="mt-8 space-y-4 max-w-3xl mx-auto">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="card transition-all duration-200 hover:shadow-lg"
          >
            <button
              className="w-full text-left flex justify-between items-center p-4"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              aria-expanded={openIndex === index}
              aria-controls={`faq-answer-${index}`}
            >
              <h3 className="text-lg font-semibold text-gray-900 pr-8">
                {faq.question}
              </h3>
              <ChevronDown
                className={`w-5 h-5 text-gray-500 transition-transform duration-200 flex-shrink-0 ${
                  openIndex === index ? 'transform rotate-180' : ''
                }`}
                aria-hidden="true"
              />
            </button>
            <div
              id={`faq-answer-${index}`}
              role="region"
              aria-labelledby={`faq-question-${index}`}
              className={`overflow-hidden transition-all duration-200 ${
                openIndex === index ? 'max-h-96' : 'max-h-0'
              }`}
            >
              <p className="px-4 pb-4 text-gray-600">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FAQSection;