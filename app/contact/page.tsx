import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f7f4f1] via-white to-blue-50 pt-24 pb-20">
      <section className="px-6">
        <div className="max-w-6xl mx-auto grid gap-12 lg:grid-cols-2 items-center">
          {/* LEFT SIDE */}
          <div className="space-y-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-semibold text-[#004aad]">
              <Mail size={16} />
              Contact PearlGo
            </span>

            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-[#24112d]">
                Have a question? We are here to help.
              </h1>
              <p className="max-w-3xl text-lg text-gray-600 leading-relaxed">
                Whether you need help planning a custom Sri Lanka itinerary, have a booking question, or want to share
                feedback, PearlGo travel experts are ready to assist.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-lg">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-[#004aad]">
                  <MapPin size={20} />
                </div>
                <h2 className="mt-6 text-xl font-semibold text-gray-900">Visit Us</h2>
                <p className="mt-3 text-gray-600 leading-relaxed">
                  24 Pearl Street, Colombo
                  <br />
                  Sri Lanka, 00100
                </p>
              </div>

              <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-lg">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-[#004aad]">
                  <Phone size={20} />
                </div>
                <h2 className="mt-6 text-xl font-semibold text-gray-900">Call Us</h2>
                <p className="mt-3 text-gray-600 leading-relaxed">+94 11 234 5678</p>
              </div>

              <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-lg">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-[#004aad]">
                  <Mail size={20} />
                </div>
                <h2 className="mt-6 text-xl font-semibold text-gray-900">Email</h2>
                <p className="mt-3 text-gray-600 leading-relaxed">support@pearlgo.com</p>
              </div>

              <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-lg">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-[#004aad]">
                  <Clock size={20} />
                </div>
                <h2 className="mt-6 text-xl font-semibold text-gray-900">Working Hours</h2>
                <p className="mt-3 text-gray-600 leading-relaxed">
                  Mon - Fri: 8am - 6pm
                  <br />
                  Sat: 9am - 2pm
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - MAP */}
          <div className="rounded-[32px] overflow-hidden border border-gray-200 bg-white shadow-xl h-[650px]">
            <iframe
              title="Colombo Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63370.10325896388!2d79.821186!3d6.927079!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2593e3b2b3b2b%3A0x5f1b2c3d4e5f6a7b!2sColombo!5e0!3m2!1sen!2slk!4v1710000000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
