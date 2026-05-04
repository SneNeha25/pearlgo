import { Heart, DollarSign, Gem, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function TripPlanner() {
  return (
    <div className="bg-white py-10 px-4 md:px-10">
      {/* Top Card */}
      <div className="max-w-7xl mx-auto bg-gray-100 rounded-2xl p-8 shadow-sm">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">All-in-One AI Trip Planner</h1>

        <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-4">
          Looking for the perfect trip planner for your next family vacation, romantic getaway, anniversary escape, or
          birthday trip? You are in the right place. Ask me anything about planning your vacation — from dreamy
          destinations and cozy stays to flights, road trips, and more.
        </p>

        <Link href="/plan-trip">
          <button className="mt-4 inline-flex items-center gap-2 bg-[#004aad] text-white px-5 py-2.5 rounded-full text-sm hover:bg-blue-500 transition">
            Create a new trip →
          </button>
        </Link>
      </div>

      {/* Middle Section */}
      <div className="text-center mt-20">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 ">
          I will be there for you in <br /> every step
        </h2>

        <p className="text-gray-500 mt-4">Curate, save and get notified about your trips on the go.</p>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-14 max-w-7xl mx-auto px-4">
        {/* Card */}
        <div className="group bg-white border border-[#004aad] rounded-2xl p-6 text-center hover:shadow-lg transition duration-300">
          <div className="w-12 h-12 mx-auto flex items-center justify-center rounded-xl bg-purple-50 text-purple-700 mb-4 group-hover:scale-110 transition">
            <Heart size={22} />
          </div>
          <h3 className="font-bold text-gray-900 text-lg">Tailor-made</h3>
          <p className="text-sm text-gray-600 mt-2 leading-relaxed">
            Personalized itineraries crafted around your travel style and preferences.
          </p>
        </div>

        {/* Card */}
        <div className="group bg-white border border-[#004aad] rounded-2xl p-6 text-center hover:shadow-lg transition duration-300">
          <div className="w-12 h-12 mx-auto flex items-center justify-center rounded-xl bg-green-50 text-green-600 mb-4 group-hover:scale-110 transition">
            <DollarSign size={22} />
          </div>
          <h3 className="font-bold text-gray-900 text-lg">Cheaper</h3>
          <p className="text-sm text-gray-600 mt-2 leading-relaxed">
            Find the best deals and save more with smart travel recommendations.
          </p>
        </div>

        {/* Card */}
        <div className="group bg-white border border-[#004aad] rounded-2xl p-6 text-center hover:shadow-lg transition duration-300">
          <div className="w-12 h-12 mx-auto flex items-center justify-center rounded-xl bg-yellow-50 text-yellow-600 mb-4 group-hover:scale-110 transition">
            <Gem size={22} />
          </div>
          <h3 className="font-bold text-gray-900 text-lg">Hidden Gems</h3>
          <p className="text-sm text-gray-600 mt-2 leading-relaxed">
            Explore unique destinations beyond the usual tourist spots.
          </p>
        </div>

        {/* Card */}
        <div className="group bg-white border border-[#004aad] rounded-2xl p-6 text-center hover:shadow-lg transition duration-300">
          <div className="w-12 h-12 mx-auto flex items-center justify-center rounded-xl bg-blue-50 text-blue-600 mb-4 group-hover:scale-110 transition">
            <ShieldCheck size={22} />
          </div>
          <h3 className="font-bold text-gray-900 text-lg">No Surprises</h3>
          <p className="text-sm text-gray-600 mt-2 leading-relaxed">
            Enjoy smooth trips with clear plans and zero unexpected issues.
          </p>
        </div>
      </div>
    </div>
  );
}
