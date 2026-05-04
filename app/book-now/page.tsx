'use client';

import { useState } from 'react';

export default function BookingPage() {
  const [email, setEmail] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [contactType, setContactType] = useState('video');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const dates = ['04.05', '05.05', '06.05', '07.05', '08.05', '09.05'];
  const times = ['09:30', '10:00', '10:30', '21:00', '23:30'];

  const handleSubmit = () => {
    if (!email || !selectedDate || !selectedTime) {
      alert('Please fill all fields');
      return;
    }

    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-5xl flex overflow-hidden shadow-xl">
        {/* LEFT PANEL */}
        <div className="bg-[#00337a] text-white w-1/3 p-8 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-6">Built by AI. Perfected by Humans.</h2>

            <ul className="space-y-4 text-sm opacity-90">
              <li>✔ Local expert reviews and fixes logistics</li>
              <li>✔ Free help to secure best rates</li>
              <li>✔ On-ground support during your trip</li>
            </ul>
          </div>

          <div>
            <p className="mb-3 text-sm">How should we contact you?</p>

            {/* VIDEO */}
            <button
              onClick={() => setContactType('video')}
              className={`w-full border rounded-lg p-2 mb-2 ${
                contactType === 'video' ? 'bg-white text-[#00337a]' : 'border-white'
              }`}
            >
              Video Call
            </button>

            {/* PHONE (CLICKABLE) */}
            <a href="tel:0750251030">
              <button
                onClick={() => setContactType('phone')}
                className={`w-full border rounded-lg p-2 ${
                  contactType === 'phone' ? 'bg-white text-[#00337a]' : 'border-white'
                }`}
              >
                Call 0750251030
              </button>
            </a>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="w-2/3 p-8">
          {!isSubmitted ? (
            <>
              <h3 className="text-lg font-semibold mb-4">Book Your Slot</h3>

              {/* EMAIL */}
              <div className="mb-5">
                <label className="text-sm">Email address</label>
                <input
                  type="email"
                  className="w-full border rounded-lg p-2 mt-1"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
                />
              </div>

              {/* DATE */}
              <div className="mb-5">
                <p className="text-sm mb-2">Select a date</p>
                <div className="flex gap-2 flex-wrap">
                  {dates.map((date) => (
                    <button
                      key={date}
                      onClick={() => setSelectedDate(date)}
                      className={`px-4 py-2 rounded-lg border ${
                        selectedDate === date ? 'bg-[#00337a] text-white' : ''
                      }`}
                    >
                      {date}
                    </button>
                  ))}
                </div>
              </div>

              {/* TIME */}
              <div className="mb-6">
                <p className="text-sm mb-2">Select a time</p>
                <div className="flex gap-2 flex-wrap">
                  {times.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`px-4 py-2 rounded-lg border ${
                        selectedTime === time ? 'bg-[#00337a] text-white' : ''
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              {/* SUBMIT */}
              <button
                onClick={handleSubmit}
                disabled={!email || !selectedDate || !selectedTime}
                className="w-full bg-[#00337a] text-white py-3 rounded-xl font-semibold hover:opacity-90 disabled:opacity-50"
              >
                Finalise trip with an Expert
              </button>
            </>
          ) : (
            <>
              {/* SUCCESS STATE */}
              <div className="text-center">
                <div className="w-16 h-16 bg-[#00337a]/10 text-[#00337a] flex items-center justify-center rounded-full mx-auto mb-4">
                  ✔
                </div>

                <h2 className="text-2xl font-bold mb-2">You are all set!</h2>

                <p className="text-gray-600 mb-6">We will reply via email within 30 minutes</p>

                {/* STEPS */}
                <div className="bg-gray-100 rounded-xl p-4 text-left mb-6">
                  <p className="font-semibold mb-2">What happens next</p>
                  <ol className="text-sm space-y-2">
                    <li>1. Expert receives your request</li>
                    <li>2. Reviews your trip details</li>
                    <li>3. Sends personalized recommendations</li>
                  </ol>
                </div>

                {/* CALL BUTTON */}
                <a href="tel:0750251030">
                  <button className="w-full bg-[#00337a] text-white py-3 rounded-xl font-semibold mb-3">
                    Call Now (0750251030)
                  </button>
                </a>

                <button
                  onClick={() => setIsSubmitted(false)}
                  className="w-full border border-[#00337a] text-[#00337a] py-3 rounded-xl font-semibold"
                >
                  Book Another Slot
                </button>

                <p className="text-xs text-gray-500 mt-4">Trusted by 50,000+ travelers</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
