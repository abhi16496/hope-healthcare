import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { faqs } from '../data/faqs';

const FAQPage = () => {
  const [openId, setOpenId] = useState(1);
  const toggle = (id) => setOpenId(openId === id ? null : id);

  return (
    <div className="page-wrapper">
      <div className="page-hero-sm">
        <div className="container"><h1>Frequently Asked Questions</h1><p>Find answers to common questions about our clinic</p></div>
      </div>
      <section className="section bg-light">
        <div className="container-sm">
          {faqs.map((faq) => (
            <div key={faq.id} style={{ background: 'var(--white)', borderRadius: '12px', border: '1px solid var(--border)', marginBottom: '12px', overflow: 'hidden', transition: 'all 0.3s ease' }}>
              <button onClick={() => toggle(faq.id)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', background: 'none', border: 'none', fontSize: '1rem', fontWeight: 600, color: openId === faq.id ? 'var(--primary)' : 'var(--dark)', cursor: 'pointer', textAlign: 'left' }}>
                {faq.question}
                <ChevronDown size={20} style={{ transform: openId === faq.id ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.3s', flexShrink: 0, marginLeft: '16px' }} />
              </button>
              <div style={{ maxHeight: openId === faq.id ? '300px' : '0', overflow: 'hidden', transition: 'max-height 0.3s ease' }}>
                <p style={{ padding: '0 24px 20px', fontSize: '0.95rem', color: 'var(--gray-600)', lineHeight: 1.7 }}>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default FAQPage;
