import React from "react";
import WhatsAppChatface from "./WhatsAppChatface";

const WhatsAppChat = () => {
  const phoneNumber = "1234567890"; // Replace with actual number
  const message = "Hello! I'm interested in your services.";

  const handleWhatsAppChat = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="flex justify-center items-center bg-gray-100">
      <button
        onClick={handleWhatsAppChat}
        className="bg-blue-500 text-white px-3 py-2 rounded-lg text-sm font-semibold shadow-md hover:bg-blue-600 transition"
      >
        Chat on WhatsApp
      </button>
     <WhatsAppChatface/>
    </div>
  );
};

export default WhatsAppChat;
