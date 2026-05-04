'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white ">
      {/* CTA Section */}
      <div className="px-6 lg:px-20">
        <div className="max-w-6xl mx-auto bg-gradient-to-r from-indigo-50 to-purple-50 rounded-3xl py-14 px-6 text-center shadow-sm">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-3">Ready to plan your next trip?</h2>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            Let PearlGo turn your ideas into a personalized travel experience in seconds.
          </p>

          <button className="inline-flex items-center gap-2 bg-[#004aad] text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-800 transition">
            Try PearlGo now
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Footer Links */}
      <div className="px-6 lg:px-20 mt-16 pb-10 max-w-7xl mx-auto mt-24">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 text-sm text-gray-600">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">PearlGo</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Smart AI travel planning for modern explorers. Build your perfect journey with ease.
            </p>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#">Home</Link>
              </li>
              <li>
                <Link href="#">About</Link>
              </li>
              <li>
                <Link href="#">Blog</Link>
              </li>
              <li>
                <Link href="#">Contact</Link>
              </li>
              <li>
                <Link href="#">FAQ</Link>
              </li>
            </ul>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Product</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#">Explore</Link>
              </li>
              <li>
                <Link href="#">Itineraries</Link>
              </li>
              <li>
                <Link href="#">Destinations</Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#">Privacy Policy</Link>
              </li>
              <li>
                <Link href="#">Terms of Service</Link>
              </li>
            </ul>
          </div>

          {/* Plans */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Plans</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#">Solo Trips</Link>
              </li>
              <li>
                <Link href="#">Couple Trips</Link>
              </li>
              <li>
                <Link href="#">Family Trips</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>© {new Date().getFullYear()} PearlGo. All rights reserved.</p>
          <div className="flex gap-4 mt-3 md:mt-0">
            <Link href="#">Privacy</Link>
            <Link href="#">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
