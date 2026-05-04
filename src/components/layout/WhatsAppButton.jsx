import React from 'react';
import { MessageCircle } from 'lucide-react';
import './WhatsAppButton.css';
import { useAdminData } from '../../context/AdminDataContext';

const WhatsAppButton = () => {
  const { contactInfo } = useAdminData();

  return (
    <a
      href={`https://wa.me/${contactInfo.whatsapp}?text=Hello%2C%20I%20would%20like%20to%20book%20an%20appointment%20at%20Hope%20Healthcare.`}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-btn"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={28} />
    </a>
  );
};

export default WhatsAppButton;
