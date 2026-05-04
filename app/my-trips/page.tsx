'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Eye, MapPin, Calendar, DollarSign, Users } from 'lucide-react';

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

export default function MyTrips() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedTrips = localStorage.getItem('trips');
    if (savedTrips) {
      setTrips(JSON.parse(savedTrips));
    }
    setLoading(false);
  }, []);

  const deleteTrip = (id: string) => {
    if (confirm('Are you sure you want to delete this trip?')) {
      const updatedTrips = trips.filter((t) => t.id !== id);
      setTrips(updatedTrips);
      localStorage.setItem('trips', JSON.stringify(updatedTrips));
    }
  };

  const getTotalDays = (places: Place[]) => {
    return places.reduce((sum, place) => sum + place.days, 0);
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="animate-spin h-12 w-12 border border-blue-600 border-t-transparent rounded-full mx-auto"></div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 flex items-center justify-between"
        >
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">My Trips</h1>
            <p className="text-lg text-slate-600">Manage and view all your travel plans</p>
          </div>
          <Link
            href="/new-trip"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition flex items-center gap-2 whitespace-nowrap"
          >
            <Plus size={20} /> New Trip
          </Link>
        </motion.div>

        {trips.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
            <div className="mb-6">
              <MapPin className="w-16 h-16 text-slate-300 mx-auto" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">No trips yet</h2>
            <p className="text-slate-600 mb-6">Start planning your Sri Lanka adventure!</p>
            <Link
              href="/new-trip"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition"
            >
              Create Your First Trip
            </Link>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {trips.map((trip, index) => (
                <motion.div
                  key={trip.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-lg border border-slate-200 overflow-hidden hover:shadow-lg transition"
                >
                  {/* Card Header */}
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
                    <h3 className="text-xl font-bold text-white truncate">{trip.name}</h3>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 space-y-4">
                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center gap-2 text-slate-700">
                        <Calendar size={16} className="text-blue-600" />
                        <div>
                          <p className="text-xs text-slate-500">Duration</p>
                          <p className="font-semibold">{getTotalDays(trip.places)} days</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-slate-700">
                        <Users size={16} className="text-green-600" />
                        <div>
                          <p className="text-xs text-slate-500">Travelers</p>
                          <p className="font-semibold">{trip.travelers}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-slate-700">
                        <MapPin size={16} className="text-red-600" />
                        <div>
                          <p className="text-xs text-slate-500">Places</p>
                          <p className="font-semibold">{trip.places.length}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-slate-700">
                        <DollarSign size={16} className="text-amber-600" />
                        <div>
                          <p className="text-xs text-slate-500">Budget</p>
                          <p className="font-semibold">
                            {trip.budget} {trip.currency}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Dates */}
                    <div className="pt-4 border-t border-slate-200">
                      <p className="text-sm text-slate-600">
                        {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                      </p>
                    </div>

                    {/* Destinations Preview */}
                    <div>
                      <p className="text-xs font-semibold text-slate-700 mb-2 uppercase">Places</p>
                      <div className="flex flex-wrap gap-1">
                        {trip.places.slice(0, 3).map((place) => (
                          <span
                            key={place.id}
                            className="inline-block text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded"
                          >
                            {place.name}
                          </span>
                        ))}
                        {trip.places.length > 3 && (
                          <span className="inline-block text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded">
                            +{trip.places.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-4">
                      <Link
                        href={`/trip-details/${trip.id}`}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-3 rounded-lg transition flex items-center justify-center gap-2 text-sm"
                      >
                        <Eye size={16} /> View
                      </Link>
                      <button
                        onClick={() => deleteTrip(trip.id)}
                        className="flex-1 bg-red-100 hover:bg-red-200 text-red-600 font-semibold py-2 px-3 rounded-lg transition flex items-center justify-center gap-2 text-sm"
                      >
                        <Trash2 size={16} /> Delete
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </main>
  );
}
