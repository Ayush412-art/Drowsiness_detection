'use client';

import React, { useState } from 'react';
import Link from 'next/link';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-white shadow-sm">
      <div className="max-w-[90%] mx-auto py-4 px-2 flex justify-between items-center">
        {/* Logo */}
        <p className="font-semibold text-2xl font-serif text-black">EyeWatch</p>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-12 items-center font-medium font-serif text-lg text-gray-800">
          <li className="hover:text-gray-500">
            <Link href="/contact">Contact</Link>
          </li>
          <li className="hover:text-gray-500">
            <Link href="/pricing">Pricing</Link>
          </li>
          <li className="hover:text-gray-500">
            <Link href="/map">Map</Link>
          </li>
        </ul>

        {/* Hamburger Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-3xl focus:outline-none"
            aria-label="Toggle Menu"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-6 pb-4">
          <ul className="flex flex-col gap-4 text-gray-800 font-serif text-lg">
            <li className="hover:text-gray-500">
              <Link href="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
            </li>
            <li className="hover:text-gray-500">
              <Link href="/pricing" onClick={() => setIsOpen(false)}>Pricing</Link>
            </li>
            <li className="hover:text-gray-500">
              <Link href="/map" onClick={() => setIsOpen(false)}>Map</Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
