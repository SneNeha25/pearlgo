'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Edit2, Share2, Download, ArrowLeft, MapPin, Calendar, Users, DollarSign, Trash2, Ticket } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

interface Place {
  id: string;
  name: string;
  days: number;
  description?: string;
}

interface Trip {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  budget: number;
  currency: string;
  travelers: number;
  places: Place[];
  createdAt: string;
}

export default function TripDetails() {
  const params = useParams();
  const router = useRouter();
  const tripId = params.id as string;

  const [trip, setTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedTrips = localStorage.getItem('trips');
    if (savedTrips) {
      const trips = JSON.parse(savedTrips);
      const foundTrip = trips.find((t: Trip) => t.id === tripId);
      setTrip(foundTrip);
    }
    setLoading(false);
  }, [tripId]);

  const deleteTrip = () => {
    if (confirm('Are you sure you want to delete this trip?')) {
      const savedTrips = localStorage.getItem('trips');
      if (savedTrips) {
        const trips = JSON.parse(savedTrips);
        const updatedTrips = trips.filter((t: Trip) => t.id !== tripId);
        localStorage.setItem('trips', JSON.stringify(updatedTrips));
        router.push('/new-trip');
      }
    }
  };

  const downloadTrip = () => {
    if (!trip) return;
    const dataStr = JSON.stringify(trip, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${trip.name}-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  const shareTrip = () => {
    const tripData = encodeURIComponent(JSON.stringify(trip));
    const text = `Check out my Sri Lanka trip plan: ${trip?.name}`;
    if (navigator.share) {
      navigator.share({
        title: trip?.name,
        text: text,
      });
    } else {
      const url = `${window.location.origin}?trip=${tripData}`;
      navigator.clipboard.writeText(url);
      alert('Trip link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="animate-spin h-12 w-12 border border-blue-600 border-t-transparent rounded-full mx-auto"></div>
        </div>
      </main>
    );
  }

  if (!trip) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Trip not found</h1>
          <Link href="/new-trip" className="text-blue-600 hover:underline">
            Create a new trip
          </Link>
        </div>
      </main>
    );
  }

  const totalDays = trip.places.reduce((sum, place) => sum + place.days, 0);
  const dailyBudget = totalDays > 0 ? (trip.budget / totalDays).toFixed(2) : '0';
  const perPersonDaily = totalDays > 0 ? (parseFloat(dailyBudget) / trip.travelers).toFixed(2) : '0';

  const startDate = new Date(trip.startDate);
  const endDate = new Date(trip.endDate);
  const actualDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-32 pb-20">
      <div className="max-w-5xl mx-auto px-6">
        {/* Back Button */}
        <Link href="/new-trip" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8">
          <ArrowLeft size={20} /> Back to Create Trip
        </Link>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">{trip.name}</h1>
          <p className="text-lg text-slate-600">Your personalized Sri Lanka itinerary</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Key Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-lg border border-slate-200 p-6"
          >
            <div className="flex items-center gap-3 mb-3">
              <Calendar className="text-blue-600" size={24} />
              <span className="text-sm text-slate-600">Duration</span>
            </div>
            <p className="text-2xl font-bold text-slate-900">{actualDays} days</p>
            <p className="text-xs text-slate-500 mt-2">
              {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg border border-slate-200 p-6"
          >
            <div className="flex items-center gap-3 mb-3">
              <Users className="text-green-600" size={24} />
              <span className="text-sm text-slate-600">Travelers</span>
            </div>
            <p className="text-2xl font-bold text-slate-900">{trip.travelers}</p>
            <p className="text-xs text-slate-500 mt-2">people</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg border border-slate-200 p-6"
          >
            <div className="flex items-center gap-3 mb-3">
              <MapPin className="text-red-600" size={24} />
              <span className="text-sm text-slate-600">Destinations</span>
            </div>
            <p className="text-2xl font-bold text-slate-900">{trip.places.length}</p>
            <p className="text-xs text-slate-500 mt-2">places to visit</p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Budget Breakdown */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="md:col-span-2 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-8 border border-blue-200"
          >
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <DollarSign className="text-blue-600" size={28} /> Budget Breakdown
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-blue-200">
                <span className="text-slate-700">Total Budget:</span>
                <span className="text-3xl font-bold text-blue-600">
                  {trip.budget.toLocaleString()} {trip.currency}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 border border-blue-200">
                  <p className="text-sm text-slate-600 mb-1">Total Days</p>
                  <p className="text-2xl font-bold text-slate-900">{totalDays}</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-blue-200">
                  <p className="text-sm text-slate-600 mb-1">Daily Budget</p>
                  <p className="text-2xl font-bold text-slate-900">
                    {dailyBudget} {trip.currency}
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 border border-blue-200">
                <p className="text-sm text-slate-600 mb-1">Per Person Daily</p>
                <p className="text-2xl font-bold text-slate-900">
                  {perPersonDaily} {trip.currency}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col gap-3"
          >
            <button
              onClick={shareTrip}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition flex items-center justify-center gap-2"
            >
              <Share2 size={20} /> Share Trip
            </button>
            <button
              onClick={downloadTrip}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition flex items-center justify-center gap-2"
            >
              <Download size={20} /> Download
            </button>
            <Link
              href={`/edit-trip/${trip.id}`}
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition flex items-center justify-center gap-2"
            >
              <Edit2 size={20} /> Edit Trip
            </Link>
            <Link
              href="/book-now"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition flex items-center justify-center gap-2"
            >
              <Ticket size={20} /> Book Now
            </Link>
            <button
              onClick={deleteTrip}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg transition flex items-center justify-center gap-2"
            >
              <Trash2 size={20} /> Delete
            </button>
          </motion.div>
        </div>

        {/* Itinerary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 bg-white rounded-lg border border-slate-200 p-8"
        >
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Your Itinerary</h2>

          <div className="space-y-4">
            {trip.places.map((place, index) => (
              <motion.div
                key={place.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * (index + 1) }}
                className="flex gap-4 p-6 bg-slate-50 rounded-lg border border-slate-200 hover:shadow-lg transition"
              >
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-full font-bold text-lg">
                    {index + 1}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-900">{place.name}</h3>
                  <p className="text-sm text-slate-600 mt-1 flex items-center gap-2">
                    <Calendar size={16} /> {place.days} {place.days === 1 ? 'day' : 'days'}
                  </p>
                  {place.description && <p className="text-slate-700 mt-3 leading-relaxed">{place.description}</p>}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-200 p-8"
        >
          <h3 className="text-lg font-semibold text-slate-900 mb-4">💡 Trip Tips</h3>
          <ul className="space-y-2 text-slate-700">
            <li>✓ Best time to visit Sri Lanka: December to March</li>
            <li>✓ Get travel insurance that covers your planned activities</li>
            <li>✓ Check visa requirements for your nationality</li>
            <li>✓ Exchange money before arrival for better rates</li>
            <li>✓ Book accommodations in advance during peak season</li>
          </ul>
        </motion.div>
      </div>
    </main>
  );
}
