import Image from 'next/image';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Scott',
    age: 54,
    image: '/review1.webp',
    text: 'This is hands down the best AI travel agent I’ve ever used. It built a custom itinerary for our family vacation in minutes.',
  },
  {
    name: 'Yesenia',
    age: 32,
    image: '/reviewe3.webp',
    text: 'We booked our dream honeymoon through Pearlgo planner and it handled flights, hotels, and activities perfectly.',
  },
  {
    name: 'Neil',
    age: 60,
    image: '/review2.jpg',
    text: 'As a busy parent, I love how it works like a personal travel agent. It saved hours and delivered amazing experiences.',
  },
  {
    name: 'Aarav',
    age: 28,
    image: '/review4.jpg',
    text: 'Super easy to use and incredibly smart. It suggested places I would have never found myself.',
  },
];

export default function Testimonials() {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-12 px-4 md:px-10">
      {/* Heading */}
      <div className="max-w-6xl mx-auto mb-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">What travellers say about us</h2>
        <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-base">
          Real experiences from people who planned their journeys with our AI-powered travel assistant.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto">
        {testimonials.map((item, index) => (
          <div
            key={index}
            className="group relative bg-white/70 backdrop-blur-lg border border-gray-200 rounded-3xl p-6 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col"
          >
            {/* Gradient Top Border */}
            <div className="absolute inset-x-0 top-0 h-1 rounded-t-3xl bg-gradient-to-r from-blue-500 via-blue-200 to-blue-400 opacity-80"></div>

            {/* Quote Icon */}
            <Quote className="text-blue-500 mb-4 group-hover:scale-110 transition" size={24} />

            {/* Text */}
            <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow">“{item.text}”</p>

            {/* User */}
            <div className="flex items-center gap-3 mt-auto">
              <div className="relative w-11 h-11">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="rounded-full object-cover border-2 border-white shadow-md"
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">{item.name}</p>
                <span className="text-xs text-gray-400">Age {item.age}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
