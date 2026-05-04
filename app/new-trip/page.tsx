'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, MapPin, DollarSign, Calendar, Users, Save, ArrowRight, Ticket } from 'lucide-react';
import { useRouter } from 'next/navigation';

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

const sriLankaDestinations = [
  { name: 'Sigiriya', description: 'Ancient rock fortress' },
  { name: 'Galle Fort', description: 'Colonial coastal city' },
  { name: 'Pasikuda Beach', description: 'Crystal-clear waters' },
  { name: 'Nine Arches Bridge', description: 'Iconic railway bridge' },
  { name: "Adam's Peak", description: 'Sacred sunrise hike' },
  { name: 'Anuradhapura', description: 'Ancient sacred city' },
  { name: 'Ella', description: 'Scenic train town' },
  { name: 'Kandy', description: 'Cultural heart' },
  { name: 'Mirissa Beach', description: 'Whale watching' },
  { name: 'Nuwara Eliya', description: 'Hill country' },
];

export default function NewTrip() {
  const router = useRouter();
  const [tripName, setTripName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [budget, setBudget] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [travelers, setTravelers] = useState('1');
  const [places, setPlaces] = useState<Place[]>([]);
  const [selectedDestination, setSelectedDestination] = useState('');
  const [daysInPlace, setDaysInPlace] = useState('1');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState('');

  // Load trips from localStorage using lazy initializer
  const [trips, setTrips] = useState<Trip[]>(() => {
    if (typeof window !== 'undefined') {
      const savedTrips = localStorage.getItem('trips');
      return savedTrips ? JSON.parse(savedTrips) : [];
    }
    return [];
  });

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!tripName.trim()) newErrors.tripName = 'Trip name is required';
    if (!startDate) newErrors.startDate = 'Start date is required';
    if (!endDate) newErrors.endDate = 'End date is required';
    if (new Date(startDate) >= new Date(endDate)) {
      newErrors.endDate = 'End date must be after start date';
    }
    if (!budget || parseFloat(budget) <= 0) newErrors.budget = 'Valid budget is required';
    if (places.length === 0) newErrors.places = 'Add at least one place to visit';
    if (!travelers || parseInt(travelers) < 1) newErrors.travelers = 'Number of travelers must be at least 1';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addPlace = () => {
    if (!selectedDestination) {
      setErrors((prev) => ({ ...prev, selectedDestination: 'Select a destination' }));
      return;
    }

    const newPlace: Place = {
      id: Date.now().toString(),
      name: selectedDestination,
      days: parseInt(daysInPlace) || 1,
      description: description || undefined,
    };

    setPlaces([...places, newPlace]);
    setSelectedDestination('');
    setDaysInPlace('1');
    setDescription('');
    setErrors((prev) => {
      const newErr = { ...prev };
      delete newErr.selectedDestination;
      return newErr;
    });
  };

  const removePlace = (id: string) => {
    setPlaces(places.filter((p) => p.id !== id));
  };

  const createTrip = async () => {
    if (!validateForm()) return;

    setLoading(true);

    const newTrip: Trip = {
      id: Date.now().toString(),
      name: tripName,
      startDate,
      endDate,
      budget: parseFloat(budget),
      currency,
      travelers: parseInt(travelers),
      places,
      createdAt: new Date().toISOString(),
    };

    // Save to localStorage
    const updatedTrips = [...trips, newTrip];
    localStorage.setItem('trips', JSON.stringify(updatedTrips));
    setTrips(updatedTrips);

    // Show success message
    setSuccessMessage('🎉 Trip created successfully!');
    setTimeout(() => {
      router.push(`/trip-details/${newTrip.id}`);
    }, 1500);
  };

  const getTotalDays = () => {
    return places.reduce((sum, place) => sum + place.days, 0);
  };

  const getDailyBudget = () => {
    const total = getTotalDays();
    return total > 0 ? (parseFloat(budget) / total).toFixed(2) : '0';
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Plan Your Sri Lanka Trip</h1>
          <p className="text-lg text-slate-600">Create a personalized itinerary with budget and destinations</p>
        </motion.div>

        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700"
          >
            {successMessage}
          </motion.div>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            {/* Trip Name */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Trip Name</label>
              <input
                type="text"
                value={tripName}
                onChange={(e) => setTripName(e.target.value)}
                placeholder="e.g., Summer Sri Lanka Adventure"
                aria-label="Trip name"
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              />
              {errors.tripName && <p className="text-red-500 text-sm mt-1">{errors.tripName}</p>}
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  aria-label="Trip start date"
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                />
                {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">End Date</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  aria-label="Trip end date"
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                />
                {errors.endDate && <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>}
              </div>
            </div>

            {/* Budget & Travelers */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Total Budget</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder="10000"
                    aria-label="Total trip budget amount"
                    className="flex-1 px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  />
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    aria-label="Currency selection"
                    className="px-3 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white"
                  >
                    <option>USD</option>
                    <option>EUR</option>
                    <option>GBP</option>
                    <option>LKR</option>
                  </select>
                </div>
                {errors.budget && <p className="text-red-500 text-sm mt-1">{errors.budget}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Number of Travelers</label>
                <input
                  type="number"
                  value={travelers}
                  onChange={(e) => setTravelers(e.target.value)}
                  min="1"
                  aria-label="Total number of travelers"
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                />
                {errors.travelers && <p className="text-red-500 text-sm mt-1">{errors.travelers}</p>}
              </div>
            </div>

            {/* Add Destination */}
            <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
              <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <MapPin size={20} /> Add Destinations
              </h3>

              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Select Destination</label>
                  <select
                    value={selectedDestination}
                    onChange={(e) => setSelectedDestination(e.target.value)}
                    aria-label="Select Sri Lanka destination"
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white"
                  >
                    <option value="">Choose a destination...</option>
                    {sriLankaDestinations.map((dest) => (
                      <option key={dest.name} value={dest.name}>
                        {dest.name} - {dest.description}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Days at this place</label>
                  <input
                    type="number"
                    value={daysInPlace}
                    onChange={(e) => setDaysInPlace(e.target.value)}
                    min="1"
                    max="30"
                    aria-label="Number of days to spend at this destination"
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Description (optional)</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="What do you plan to do here?"
                    aria-label="Description of planned activities at this destination"
                    rows={2}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
                  />
                </div>

                <button
                  onClick={addPlace}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition flex items-center justify-center gap-2"
                >
                  <Plus size={18} /> Add Destination
                </button>
                {errors.selectedDestination && <p className="text-red-500 text-sm">{errors.selectedDestination}</p>}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            {/* Budget Summary */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <DollarSign size={22} /> Budget Summary
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Total Budget:</span>
                  <span className="text-2xl font-bold text-blue-600">{budget ? `${budget} ${currency}` : '-'}</span>
                </div>
                <div className="h-px bg-blue-200"></div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Total Days:</span>
                  <span className="text-xl font-semibold text-slate-900">{getTotalDays()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Daily Budget:</span>
                  <span className="text-xl font-semibold text-slate-900">
                    {getDailyBudget()} {currency}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Per Person (Daily):</span>
                  <span className="text-xl font-semibold text-slate-900">
                    {travelers && getTotalDays() > 0
                      ? (parseFloat(getDailyBudget()) / parseInt(travelers)).toFixed(2) + ' ' + currency
                      : '-'}
                  </span>
                </div>
              </div>
            </div>

            {/* Destinations List */}
            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Your Itinerary ({places.length})</h3>

              {places.length === 0 ? (
                <p className="text-slate-500 text-center py-8">No destinations added yet</p>
              ) : (
                <AnimatePresence>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {places.map((place, index) => (
                      <motion.div
                        key={place.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="flex items-start justify-between p-4 bg-slate-50 rounded-lg border border-slate-200 hover:shadow-md transition"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-600 text-white text-sm font-bold rounded-full">
                              {index + 1}
                            </span>
                            <h4 className="font-semibold text-slate-900">{place.name}</h4>
                          </div>
                          <p className="text-sm text-slate-600 ml-8">
                            📅 {place.days} {place.days === 1 ? 'day' : 'days'}
                          </p>
                          {place.description && <p className="text-sm text-slate-600 ml-8 mt-1">{place.description}</p>}
                        </div>
                        <button
                          onClick={() => removePlace(place.id)}
                          aria-label={`Remove ${place.name} from itinerary`}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded transition"
                        >
                          <Trash2 size={18} />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </AnimatePresence>
              )}
              {errors.places && <p className="text-red-500 text-sm mt-3">{errors.places}</p>}
            </div>

            {/* Create Trip Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={createTrip}
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 text-white font-bold py-3 px-6 rounded-lg transition flex items-center justify-center gap-2 shadow-lg"
            >
              {loading ? (
                <>
                  <div className="animate-spin h-5 w-5 border border-white border-t-transparent rounded-full"></div>
                  Creating...
                </>
              ) : (
                <>
                  <Save size={20} /> Create Trip
                </>
              )}
            </motion.button>

            <Link
              href="/"
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3 px-6 rounded-lg transition flex items-center justify-center gap-2"
            >
              Cancel
            </Link>

            <Link
              href="/book-now"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition flex items-center justify-center gap-2"
            >
              <Ticket size={20} /> Book Now
            </Link>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
