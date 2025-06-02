"use client"
import React, { useState, ChangeEvent, FormEvent } from 'react';

interface ContactFormData {
  name: string;
  email: string;
  driverId: string;
  query: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    driverId: '',
    query: '',
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
   
    console.log('Submitted:', formData);
    alert('Query submitted successfully!');
    setFormData({ name: '', email: '', driverId: '', query: '' });
  };

  return (
    <div className="min-h-screen text-black bg-gray-100 flex items-center justify-center px-4 py-12">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 md:p-10 rounded-2xl shadow-lg w-full max-w-xl"
      >
        <h2 className="text-2xl font-bold text-purple-700 mb-6 text-center">
          Contact Us
        </h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Driver ID</label>
          <input
            type="text"
            name="driverId"
            required
            value={formData.driverId}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Your Query</label>
          <textarea
            name="query"
            rows={4}
            required
            value={formData.query}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-purple-700 text-white py-2 rounded-lg hover:bg-purple-800 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
