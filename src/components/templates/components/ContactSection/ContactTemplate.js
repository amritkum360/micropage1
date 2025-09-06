'use client';

import React from 'react';
import { Phone, MapPin, Mail, Clock, MessageCircle } from 'lucide-react';

export default function ContactTemplate({ section, businessName }) {
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const message = formData.get('message');
    
    // Create WhatsApp message
    const whatsappMessage = `*New Contact Form Message from ${businessName}*

*Name:* ${name}
*Email:* ${email}
${phone ? `*Phone:* ${phone}` : ''}
*Message:* ${message}

*Sent from:* ${businessName} Website`;

    // Check if WhatsApp number is available
    if (section.whatsapp && section.whatsapp.trim() !== '') {
      // Format phone number for WhatsApp (remove all non-digits)
      const whatsappNumber = section.whatsapp.replace(/\D/g, '');
      const encodedMessage = encodeURIComponent(whatsappMessage);
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
      
      // Open WhatsApp with pre-filled message
      window.open(whatsappUrl, '_blank');
      
      // Show success message
      alert('Opening WhatsApp with your message. Please send the message to complete the process.');
      e.target.reset();
    } else {
      // Fallback to email if no WhatsApp number
      const mailtoUrl = `mailto:${section.email || 'info@yourbusiness.com'}?subject=Contact Form Message from ${businessName}&body=${encodeURIComponent(whatsappMessage)}`;
      window.open(mailtoUrl, '_self');
      alert('Opening email client with your message. Please send the email to complete the process.');
      e.target.reset();
    }
  };

  return (
    <section className="py-16 px-4 bg-gray-50" role="region" aria-label="Contact" id='contact'>
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">{section.title}</h2>
            {section.subtitle && (
              <p className="text-xl text-gray-600">{section.subtitle}</p>
            )}
          </div>
          <div className="grid lg:grid-cols-2 gap-8 md:gap-16">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-8">Get In Touch</h3>
              <div className="space-y-6">
                                 {section.address && (
                   <div className="flex items-center space-x-4">
                     <div className="w-12 h-12 rounded-full flex items-center justify-center theme-primary-bg">
                       <MapPin className="w-6 h-6 text-white" />
                     </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Address</h4>
                      <p className="text-gray-600">{section.address}</p>
                    </div>
                  </div>
                )}
                                 {section.phone && (
                   <div className="flex items-center space-x-4">
                     <div className="w-12 h-12 rounded-full flex items-center justify-center theme-primary-bg">
                       <Phone className="w-6 h-6 text-white" />
                     </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Phone</h4>
                      <p className="text-gray-600">{section.phone}</p>
                    </div>
                  </div>
                )}
                                 {section.whatsapp && (
                   <div className="flex items-center space-x-4">
                     <div className="w-12 h-12 rounded-full flex items-center justify-center theme-primary-bg">
                       <MessageCircle className="w-6 h-6 text-white" />
                     </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">WhatsApp</h4>
                      <p className="text-gray-600">{section.whatsapp}</p>
                    </div>
                  </div>
                )}
                                 {section.email && (
                   <div className="flex items-center space-x-4">
                     <div className="w-12 h-12 rounded-full flex items-center justify-center theme-primary-bg">
                       <Mail className="w-6 h-6 text-white" />
                     </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Email</h4>
                      <p className="text-gray-600">{section.email}</p>
                    </div>
                  </div>
                )}
                                 {section.hours && (
                   <div className="flex items-center space-x-4">
                     <div className="w-12 h-12 rounded-full flex items-center justify-center theme-primary-bg">
                       <Clock className="w-6 h-6 text-white" />
                     </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Business Hours</h4>
                      <p className="text-gray-600">{section.hours}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {section.form && (
              <div className="bg-white p-8 rounded-3xl shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Send us a Message</h3>
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  {section.form.name && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <input
                        type="text"
                        name="name"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  )}
                  {section.form.email && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        name="email"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  )}
                  {section.form.phone && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  )}
                  {section.form.message && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                      <textarea
                        name="message"
                        rows={4}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      ></textarea>
                    </div>
                  )}
                  <button
                    type="submit"
                    className="w-full text-white py-3 rounded-full font-semibold hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                style={{ backgroundColor: 'var(--primary-color, #10B981)' }}
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Send via WhatsApp</span>
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
