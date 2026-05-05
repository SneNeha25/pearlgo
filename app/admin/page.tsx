'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Package,
  MessageSquare,
  Calendar,
  Users,
  Settings,
  Plus,
  Edit,
  Trash2,
  Check,
  X,
  Eye,
  Search,
  Filter,
} from 'lucide-react';

// Types based on backend models
interface TourPackage {
  id: string;
  title: string;
  description: string;
  destination: string;
  price: number;
  durationDays: number;
  availableSeats: number;
  imageUrl?: string;
  tags?: string[];
  createdAt: Date;
}

interface Booking {
  id: string;
  userId: string;
  packageId: string;
  bookingDate: Date;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
  totalAmount: number;
  numberOfPeople: number;
}

interface ChatQuery {
  id: string;
  userId?: string;
  queryText: string;
  intentDetected: string | null;
  responseGiven?: string;
  timestamp: Date;
  status: 'ANSWERED' | 'UNKNOWN';
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('packages');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);

  // Login form state
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: '',
  });
  const [loginError, setLoginError] = useState('');

  // State for packages
  const [packages, setPackages] = useState<TourPackage[]>([]);
  const [showPackageForm, setShowPackageForm] = useState(false);
  const [editingPackage, setEditingPackage] = useState<TourPackage | null>(null);
  const [packageForm, setPackageForm] = useState({
    title: '',
    description: '',
    destination: '',
    price: '',
    durationDays: '',
    availableSeats: '',
    imageUrl: '',
    tags: '',
  });

  // State for FAQs
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [unknownQueries, setUnknownQueries] = useState<ChatQuery[]>([]);
  const [showFaqForm, setShowFaqForm] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);
  const [faqForm, setFaqForm] = useState({
    question: '',
    answer: '',
    category: '',
  });

  // State for bookings
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [bookingSearch, setBookingSearch] = useState('');
  const [bookingFilter, setBookingFilter] = useState<'ALL' | 'PENDING' | 'CONFIRMED' | 'CANCELLED'>('ALL');

  // State for queries
  const [queries, setQueries] = useState<ChatQuery[]>([]);
  const [querySearch, setQuerySearch] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoading(true);

    // Check hardcoded credentials
    if (loginForm.username === 'Admin' && loginForm.password === '123') {
      setIsAuthenticated(true);
      setLoading(false);
    } else {
      setLoginError('Invalid username or password');
      setLoading(false);
    }
  };

  const loadPackages = async () => {
    const response = await fetch('/api/admin/packages');
    if (response.ok) {
      const data = await response.json();
      setPackages(data);
    }
  };

  const loadFAQs = async () => {
    const response = await fetch('/api/admin/faqs');
    if (response.ok) {
      const data = await response.json();
      setFaqs(data);
    }
  };

  const loadUnknownQueries = async () => {
    const response = await fetch('/api/admin/queries/unknown');
    if (response.ok) {
      const data = await response.json();
      setUnknownQueries(data);
    }
  };

  const loadBookings = async () => {
    const response = await fetch('/api/admin/bookings');
    if (response.ok) {
      const data = await response.json();
      setBookings(data);
    }
  };

  const loadQueries = async () => {
    const response = await fetch('/api/admin/queries');
    if (response.ok) {
      const data = await response.json();
      setQueries(data);
    }
  };

  const loadData = async () => {
    setLoading(true);
    try {
      switch (activeTab) {
        case 'packages':
          await loadPackages();
          break;
        case 'chatbot':
          await loadFAQs();
          await loadUnknownQueries();
          break;
        case 'bookings':
          await loadBookings();
          break;
        case 'queries':
          await loadQueries();
          break;
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Package management functions
  const handlePackageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const packageData = {
      title: packageForm.title,
      description: packageForm.description,
      destination: packageForm.destination,
      price: parseFloat(packageForm.price),
      durationDays: parseInt(packageForm.durationDays),
      availableSeats: parseInt(packageForm.availableSeats),
      imageUrl: packageForm.imageUrl || undefined,
      tags: packageForm.tags ? packageForm.tags.split(',').map((tag) => tag.trim()) : undefined,
    };

    try {
      const url = editingPackage ? `/api/admin/packages/${editingPackage.id}` : '/api/admin/packages';
      const method = editingPackage ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(packageData),
      });

      if (response.ok) {
        await loadPackages();
        setShowPackageForm(false);
        setEditingPackage(null);
        resetPackageForm();
      }
    } catch (error) {
      console.error('Error saving package:', error);
    }
  };

  const handleDeletePackage = async (id: string) => {
    if (confirm('Are you sure you want to delete this package?')) {
      try {
        const response = await fetch(`/api/admin/packages/${id}`, { method: 'DELETE' });
        if (response.ok) {
          await loadPackages();
        }
      } catch (error) {
        console.error('Error deleting package:', error);
      }
    }
  };

  const resetPackageForm = () => {
    setPackageForm({
      title: '',
      description: '',
      destination: '',
      price: '',
      durationDays: '',
      availableSeats: '',
      imageUrl: '',
      tags: '',
    });
  };

  // FAQ management functions
  const handleFaqSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const faqData = {
      question: faqForm.question,
      answer: faqForm.answer,
      category: faqForm.category || undefined,
    };

    try {
      const url = editingFaq ? `/api/admin/faqs/${editingFaq.id}` : '/api/admin/faqs';
      const method = editingFaq ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(faqData),
      });

      if (response.ok) {
        await loadFAQs();
        setShowFaqForm(false);
        setEditingFaq(null);
        resetFaqForm();
      }
    } catch (error) {
      console.error('Error saving FAQ:', error);
    }
  };

  const handleDeleteFaq = async (id: string) => {
    if (confirm('Are you sure you want to delete this FAQ?')) {
      try {
        const response = await fetch(`/api/admin/faqs/${id}`, { method: 'DELETE' });
        if (response.ok) {
          await loadFAQs();
        }
      } catch (error) {
        console.error('Error deleting FAQ:', error);
      }
    }
  };

  const resetFaqForm = () => {
    setFaqForm({
      question: '',
      answer: '',
      category: '',
    });
  };

  // Booking management functions
  const handleBookingStatusChange = async (bookingId: string, status: 'CONFIRMED' | 'CANCELLED') => {
    try {
      const response = await fetch(`/api/admin/bookings/${bookingId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        await loadBookings();
      }
    } catch (error) {
      console.error('Error updating booking status:', error);
    }
  };

  // Query management functions
  const handleResolveQuery = async (queryId: string, answer: string) => {
    try {
      const response = await fetch(`/api/admin/queries/${queryId}/resolve`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answer }),
      });

      if (response.ok) {
        await loadUnknownQueries();
        await loadQueries();
      }
    } catch (error) {
      console.error('Error resolving query:', error);
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      bookingSearch === '' ||
      booking.id.toLowerCase().includes(bookingSearch.toLowerCase()) ||
      booking.userId.toLowerCase().includes(bookingSearch.toLowerCase());

    const matchesFilter = bookingFilter === 'ALL' || booking.status === bookingFilter;

    return matchesSearch && matchesFilter;
  });

  const filteredQueries = queries.filter(
    (query) =>
      querySearch === '' ||
      query.queryText.toLowerCase().includes(querySearch.toLowerCase()) ||
      (query.responseGiven && query.responseGiven.toLowerCase().includes(querySearch.toLowerCase()))
  );

  // Initialize component - no automatic auth check
  useEffect(() => {
    // Component is ready, no loading needed initially
  }, []);

  // Load data when authenticated and tab changes
  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    const initLoad = async () => {
      await loadData();
    };

    void initLoad();
  }, [isAuthenticated, activeTab]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f7f4f1] via-white to-blue-50">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-[#24112d]">Admin Login</h1>
            <p className="text-gray-600 mt-2">Enter your credentials to access the admin dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
              <input
                type="text"
                value={loginForm.username}
                onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                placeholder="Enter username"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004aad] focus:border-transparent"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                placeholder="Enter password"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004aad] focus:border-transparent"
                required
                disabled={loading}
              />
            </div>

            {loginError && <div className="text-red-600 text-sm text-center">{loginError}</div>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#004aad] text-white py-2 px-4 rounded-lg hover:bg-blue-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (isAuthenticated && loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f7f4f1] via-white to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#004aad] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f7f4f1] via-white to-blue-50 pt-12">
      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#24112d]">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage travel packages, bookings, and chatbot knowledge</p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 border-b border-gray-200">
            {[
              { id: 'packages', label: 'Travel Packages', icon: Package },
              { id: 'chatbot', label: 'Chatbot Knowledge', icon: MessageSquare },
              { id: 'bookings', label: 'User Bookings', icon: Calendar },
              { id: 'queries', label: 'User Queries', icon: Users },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-2 px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === id
                    ? 'border-[#004aad] text-[#004aad]'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon size={18} />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          {/* Travel Packages Tab */}
          {activeTab === 'packages' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-[#24112d]">Travel Packages</h2>
                <button
                  onClick={() => {
                    setEditingPackage(null);
                    resetPackageForm();
                    setShowPackageForm(true);
                  }}
                  className="flex items-center gap-2 bg-[#004aad] text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition"
                >
                  <Plus size={18} />
                  Add Package
                </button>
              </div>

              {/* Package Form Modal */}
              {showPackageForm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                  <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-lg font-semibold">{editingPackage ? 'Edit Package' : 'Add New Package'}</h3>
                      <button
                        onClick={() => setShowPackageForm(false)}
                        className="text-gray-400 hover:text-gray-600"
                        aria-label="Close form"
                      >
                        <X size={24} />
                      </button>
                    </div>

                    <form onSubmit={handlePackageSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                          <input
                            type="text"
                            value={packageForm.title}
                            onChange={(e) => setPackageForm({ ...packageForm, title: e.target.value })}
                            placeholder="Enter package title"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004aad] focus:border-transparent"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
                          <input
                            type="text"
                            value={packageForm.destination}
                            onChange={(e) => setPackageForm({ ...packageForm, destination: e.target.value })}
                            placeholder="Enter destination"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004aad] focus:border-transparent"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                          value={packageForm.description}
                          onChange={(e) => setPackageForm({ ...packageForm, description: e.target.value })}
                          rows={3}
                          placeholder="Describe the travel package"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004aad] focus:border-transparent"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                          <input
                            type="number"
                            value={packageForm.price}
                            onChange={(e) => setPackageForm({ ...packageForm, price: e.target.value })}
                            placeholder="0"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004aad] focus:border-transparent"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Duration (days)</label>
                          <input
                            type="number"
                            value={packageForm.durationDays}
                            onChange={(e) => setPackageForm({ ...packageForm, durationDays: e.target.value })}
                            placeholder="0"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004aad] focus:border-transparent"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Available Seats</label>
                          <input
                            type="number"
                            value={packageForm.availableSeats}
                            onChange={(e) => setPackageForm({ ...packageForm, availableSeats: e.target.value })}
                            placeholder="0"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004aad] focus:border-transparent"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                        <input
                          type="url"
                          value={packageForm.imageUrl}
                          onChange={(e) => setPackageForm({ ...packageForm, imageUrl: e.target.value })}
                          placeholder="https://example.com/image.jpg"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004aad] focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma-separated)</label>
                        <input
                          type="text"
                          value={packageForm.tags}
                          onChange={(e) => setPackageForm({ ...packageForm, tags: e.target.value })}
                          placeholder="adventure, budget, luxury"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004aad] focus:border-transparent"
                        />
                      </div>

                      <div className="flex justify-end gap-3 pt-4">
                        <button
                          type="button"
                          onClick={() => setShowPackageForm(false)}
                          className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 bg-[#004aad] text-white rounded-lg hover:bg-blue-800"
                        >
                          {editingPackage ? 'Update Package' : 'Add Package'}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* Packages List */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {packages.map((pkg) => (
                  <div key={pkg.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                    {pkg.imageUrl && (
                      <img src={pkg.imageUrl} alt={pkg.title} className="w-full h-32 object-cover rounded-lg mb-3" />
                    )}
                    <h3 className="font-semibold text-lg text-[#24112d] mb-2">{pkg.title}</h3>
                    <p className="text-gray-600 text-sm mb-2">{pkg.destination}</p>
                    <p className="text-gray-500 text-xs mb-3 line-clamp-2">{pkg.description}</p>
                    <div className="flex justify-between items-center text-sm mb-3">
                      <span className="font-medium text-[#004aad]">${pkg.price}</span>
                      <span className="text-gray-500">{pkg.durationDays} days</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">{pkg.availableSeats} seats available</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setEditingPackage(pkg);
                            setPackageForm({
                              title: pkg.title,
                              description: pkg.description,
                              destination: pkg.destination,
                              price: pkg.price.toString(),
                              durationDays: pkg.durationDays.toString(),
                              availableSeats: pkg.availableSeats.toString(),
                              imageUrl: pkg.imageUrl || '',
                              tags: pkg.tags?.join(', ') || '',
                            });
                            setShowPackageForm(true);
                          }}
                          className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                          aria-label="Edit package"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDeletePackage(pkg.id)}
                          className="p-1 text-red-600 hover:bg-red-50 rounded"
                          aria-label="Delete package"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Chatbot Knowledge Tab */}
          {activeTab === 'chatbot' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-[#24112d]">Chatbot Knowledge</h2>
                <button
                  onClick={() => {
                    setEditingFaq(null);
                    resetFaqForm();
                    setShowFaqForm(true);
                  }}
                  className="flex items-center gap-2 bg-[#004aad] text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition"
                >
                  <Plus size={18} />
                  Add FAQ
                </button>
              </div>

              {/* FAQ Form Modal */}
              {showFaqForm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                  <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-lg font-semibold">{editingFaq ? 'Edit FAQ' : 'Add New FAQ'}</h3>
                      <button
                        onClick={() => setShowFaqForm(false)}
                        className="text-gray-400 hover:text-gray-600"
                        aria-label="Close form"
                      >
                        <X size={24} />
                      </button>
                    </div>

                    <form onSubmit={handleFaqSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Question</label>
                        <input
                          type="text"
                          value={faqForm.question}
                          onChange={(e) => setFaqForm({ ...faqForm, question: e.target.value })}
                          placeholder="Enter FAQ question"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004aad] focus:border-transparent"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Answer</label>
                        <textarea
                          value={faqForm.answer}
                          onChange={(e) => setFaqForm({ ...faqForm, answer: e.target.value })}
                          rows={4}
                          placeholder="Enter FAQ answer"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004aad] focus:border-transparent"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category (optional)</label>
                        <input
                          type="text"
                          value={faqForm.category}
                          onChange={(e) => setFaqForm({ ...faqForm, category: e.target.value })}
                          placeholder="e.g., Booking, Payment, Travel"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004aad] focus:border-transparent"
                        />
                      </div>

                      <div className="flex justify-end gap-3 pt-4">
                        <button
                          type="button"
                          onClick={() => setShowFaqForm(false)}
                          className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 bg-[#004aad] text-white rounded-lg hover:bg-blue-800"
                        >
                          {editingFaq ? 'Update FAQ' : 'Add FAQ'}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* FAQs List */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-[#24112d] mb-4">FAQs ({faqs.length})</h3>
                <div className="space-y-4">
                  {faqs.map((faq) => (
                    <div key={faq.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-[#24112d]">{faq.question}</h4>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setEditingFaq(faq);
                              setFaqForm({
                                question: faq.question,
                                answer: faq.answer,
                                category: faq.category || '',
                              });
                              setShowFaqForm(true);
                            }}
                            className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                            aria-label="Edit FAQ"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteFaq(faq.id)}
                            className="p-1 text-red-600 hover:bg-red-50 rounded"
                            aria-label="Delete FAQ"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{faq.answer}</p>
                      {faq.category && (
                        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                          {faq.category}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Unknown Queries */}
              <div>
                <h3 className="text-lg font-semibold text-[#24112d] mb-4">Unknown Queries ({unknownQueries.length})</h3>
                <div className="space-y-4">
                  {unknownQueries.map((query) => (
                    <div key={query.id} className="border border-orange-200 bg-orange-50 rounded-lg p-4">
                      <p className="font-medium text-[#24112d] mb-2">{query.queryText}</p>
                      <p className="text-sm text-gray-600 mb-3">
                        Asked on {new Date(query.timestamp).toLocaleDateString()}
                      </p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            const answer = prompt('Enter answer for this query:');
                            if (answer) {
                              handleResolveQuery(query.id, answer);
                            }
                          }}
                          className="flex items-center gap-1 bg-[#004aad] text-white px-3 py-1 rounded text-sm hover:bg-blue-800"
                        >
                          <Check size={14} />
                          Resolve
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* User Bookings Tab */}
          {activeTab === 'bookings' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-[#24112d]">User Bookings</h2>
                <div className="flex gap-4">
                  <div className="relative">
                    <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search bookings..."
                      value={bookingSearch}
                      onChange={(e) => setBookingSearch(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004aad] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="booking-filter" className="block text-sm font-medium text-gray-700 mb-1">
                      Filter by Status
                    </label>
                    <select
                      id="booking-filter"
                      value={bookingFilter}
                      onChange={(e) =>
                        setBookingFilter(e.target.value as 'ALL' | 'PENDING' | 'CONFIRMED' | 'CANCELLED')
                      }
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004aad] focus:border-transparent"
                    >
                      <option value="ALL">All Status</option>
                      <option value="PENDING">Pending</option>
                      <option value="CONFIRMED">Confirmed</option>
                      <option value="CANCELLED">Cancelled</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Bookings List */}
              <div className="space-y-4">
                {filteredBookings.map((booking) => (
                  <div key={booking.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-[#24112d]">Booking #{booking.id}</h3>
                        <p className="text-sm text-gray-600">User: {booking.userId}</p>
                        <p className="text-sm text-gray-600">
                          Date: {new Date(booking.bookingDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <span
                          className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                            booking.status === 'CONFIRMED'
                              ? 'bg-green-100 text-green-800'
                              : booking.status === 'CANCELLED'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {booking.status}
                        </span>
                        <p className="text-sm font-medium text-[#004aad] mt-1">${booking.totalAmount}</p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-600">
                        Package: {booking.packageId} | People: {booking.numberOfPeople}
                      </div>
                      {booking.status === 'PENDING' && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleBookingStatusChange(booking.id, 'CONFIRMED')}
                            className="flex items-center gap-1 bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                          >
                            <Check size={14} />
                            Confirm
                          </button>
                          <button
                            onClick={() => handleBookingStatusChange(booking.id, 'CANCELLED')}
                            className="flex items-center gap-1 bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                          >
                            <X size={14} />
                            Cancel
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* User Queries Tab */}
          {activeTab === 'queries' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-[#24112d]">User Queries</h2>
                <div className="relative">
                  <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search queries..."
                    value={querySearch}
                    onChange={(e) => setQuerySearch(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004aad] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Queries List */}
              <div className="space-y-4">
                {filteredQueries.map((query) => (
                  <div key={query.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <p className="font-medium text-[#24112d] mb-1">{query.queryText}</p>
                        <p className="text-sm text-gray-600">
                          {query.userId ? `User: ${query.userId}` : 'Anonymous'} |
                          {new Date(query.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                      <span
                        className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                          query.status === 'ANSWERED' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                        }`}
                      >
                        {query.status}
                      </span>
                    </div>

                    {query.responseGiven && (
                      <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-700">
                          <strong>Response:</strong> {query.responseGiven}
                        </p>
                      </div>
                    )}

                    {query.intentDetected && (
                      <div className="mt-2">
                        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                          Intent: {query.intentDetected}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
