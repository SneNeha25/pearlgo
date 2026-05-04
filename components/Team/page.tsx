import Image from 'next/image';

const team = [
  {
    name: 'Sneha Theresa',
    role: 'Product',
    image: '/snehaa.jpg',
    desc: 'Story-seeking cultural explorer focused on crafting meaningful product experiences.',
  },
  {
    name: 'Thurhaa',
    role: 'Marketing',
    image: '/thurhaa.png',
    desc: 'Adventure-driven marketer helping the company grow through creative strategies.',
  },
  {
    name: 'Rahila',
    role: 'Engineering',
    image: '/rahila.jpg',
    desc: 'Immersive traveler and engineer building seamless, scalable solutions.',
  },
];

export default function TeamSection() {
  return (
    <section className="bg-gray-50 py-16 px-4 md:px-10">
      {/* Heading */}
      <div className="max-w-6xl mx-auto mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Minds behind the Mission</h2>
        <p className="text-gray-500 mt-3 max-w-xl">
          Meet the passionate people building unforgettable travel experiences.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {team.map((member, index) => (
          <div
            key={index}
            className="group bg-white border border-gray-200 rounded-2xl p-6 text-center hover:shadow-xl transition duration-300"
          >
            {/* Image */}
            <div className="relative w-20 h-20 mx-auto mb-4">
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="rounded-full border-2 border-gray-100 group-hover:scale-105 transition object-contain"
              />
            </div>

            {/* Name */}
            <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>

            {/* Role */}
            <p className="text-sm text-[#004aad] font-medium mt-1">{member.role}</p>

            {/* Description */}
            <p className="text-sm text-gray-500 mt-3 leading-relaxed">{member.desc}</p>

            {/* Read More */}
          </div>
        ))}
      </div>
    </section>
  );
}
