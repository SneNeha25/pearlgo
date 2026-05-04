'use client';

import { MapPin, Users, Sparkles, Heart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f7f4f1] via-white to-blue-50">
      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-semibold text-[#004aad] mb-6">
            <Sparkles size={16} />
            About PearlGo
          </span>

          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-[#24112d] mb-6">
            Redefining Travel Planning
            <br />
            <span className="text-[#004aad]">for Sri Lanka</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We are on a mission to make Sri Lanka accessible to every traveler through intelligent, personalized trip
            planning powered by AI. From ancient temples to pristine beaches, we help you discover the Pearl of the
            Indian Ocean like never before.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed content-center">
                <p>
                  PearlGo was born from a simple belief: that every traveler deserves a seamless, personalized journey
                  through Sri Lanka. Our founders, having witnessed countless travelers struggle with complex planning,
                  decided to harness the power of AI to revolutionize travel planning.
                </p>
                <p>
                  What started as a passion project has evolved into Sri Lankas most intelligent travel companion. We
                  combine local expertise with cutting-edge technology to create unforgettable experiences that respect
                  both travelers and the destinations they visit.
                </p>
                <p>
                  Today, PearlGo serves thousands of travelers annually, helping them discover hidden gems, optimize
                  their itineraries, and create memories that last a lifetime.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="">
                <div className="w-full h-[400px] bg-white rounded-xl shadow-lg overflow-hidden relative">
                  <Image
                    src="/tourist.webp" // put your image inside /public folder
                    alt="Sri Lanka"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Mission & Values</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We are guided by principles that put people and places first
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-[#004aad]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Innovation</h3>
              <p className="text-gray-600">
                Leveraging AI to create smarter, more intuitive travel planning experiences.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Authenticity</h3>
              <p className="text-gray-600">
                Preserving the genuine spirit of Sri Lanka while sharing its beauty with the world.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Community</h3>
              <p className="text-gray-600">
                Building connections between travelers and local communities for mutual growth.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Sustainability</h3>
              <p className="text-gray-600">
                Promoting responsible tourism that benefits both visitors and local ecosystems.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-gradient-to-r from-[#004aad] to-[#24112d]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Plan Your Sri Lankan Adventure?</h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of travelers who have discovered Sri Lanka through PearlGo. Your perfect trip is just a
            conversation away.
          </p>
          <Link href="/new-trip">
            <button className="bg-white text-[#004aad] px-8 py-4 rounded-full font-semibold hover:bg-blue-50 transition-colors">
              Start Planning Now
            </button>
          </Link>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">What We Do</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Comprehensive travel planning powered by AI and local expertise
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="w-8 h-8 text-[#004aad]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Smart Itineraries</h3>
              <p className="text-gray-600">
                AI-powered trip planning that considers your preferences, budget, and time constraints to create perfect
                itineraries for Sri Lankas diverse destinations.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Local Insights</h3>
              <p className="text-gray-600">
                Deep knowledge of Sri Lankan culture, seasons, and hidden gems ensures you experience authentic moments
                that guidebooks often miss.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Seamless Booking</h3>
              <p className="text-gray-600">
                Integrated booking system for accommodations, transportation, and activities, all optimized for the best
                value and convenience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
    </div>
  );
}
