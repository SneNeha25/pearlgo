import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | PearlGo',
  description: 'Professional terms and conditions for using PearlGo travel planning services.',
};

export default function TermsPage() {
  return (
    <main className="bg-slate-50 text-slate-900 min-h-screen">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:px-10">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-700">Terms of Service</p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
              PearlGo Terms and Conditions
            </h1>
            <div className="mt-6 space-y-4 text-slate-600">
              <p className="text-lg leading-8">
                These terms govern your use of PearlGo and define the rights and responsibilities for both users and the
                platform. Please review them carefully before accessing or using our services.
              </p>
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Last updated: May 4, 2026</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 sm:px-10">
        <div className="grid gap-12 lg:grid-cols-[1fr_320px] lg:items-start">
          <div className="space-y-8">
            <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-900 font-semibold">
                  1
                </div>
                <h2 className="text-2xl font-semibold text-slate-900">Acceptance of Terms</h2>
              </div>
              <p className="mt-5 text-slate-600 leading-8">
                Your access to PearlGo is subject to these terms. By using the platform, you acknowledge that you have
                read, understood, and accepted them. If you do not agree with any section, please discontinue use
                immediately.
              </p>
            </article>

            <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-900 font-semibold">
                  2
                </div>
                <h2 className="text-2xl font-semibold text-slate-900">Use of the Service</h2>
              </div>
              <p className="mt-5 text-slate-600 leading-8">
                PearlGo provides tools for discovering destinations, building itineraries, and connecting with travel
                partners. You agree to use the service in a lawful, responsible manner and not to disrupt, abuse, or
                misuse any part of the platform.
              </p>
              <ul className="mt-5 space-y-3 pl-5 text-slate-600 leading-8 list-disc">
                <li>Submit only accurate and complete information.</li>
                <li>Do not infringe the rights of other users or third parties.</li>
                <li>Do not attempt to override, replicate, or bypass system protections.</li>
              </ul>
            </article>

            <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-900 font-semibold">
                  3
                </div>
                <h2 className="text-2xl font-semibold text-slate-900">Account Security</h2>
              </div>
              <p className="mt-5 text-slate-600 leading-8">
                You are responsible for safeguarding your account credentials and any activity that occurs under your
                account. Notify PearlGo immediately if you suspect unauthorized use or a security breach.
              </p>
            </article>

            <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-900 font-semibold">
                  4
                </div>
                <h2 className="text-2xl font-semibold text-slate-900">Bookings and Payments</h2>
              </div>
              <p className="mt-5 text-slate-600 leading-8">
                PearlGo may facilitate travel reservations through third-party partners. All bookings, payments,
                cancellations, and refunds are governed by the terms of those partners as well as our platform policies.
              </p>
            </article>

            <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-900 font-semibold">
                  5
                </div>
                <h2 className="text-2xl font-semibold text-slate-900">Intellectual Property</h2>
              </div>
              <p className="mt-5 text-slate-600 leading-8">
                All content on PearlGo, including text, graphics, logos, and software, is protected by copyright and
                intellectual property laws. You may not reproduce, distribute, or modify any of our materials without
                explicit permission.
              </p>
            </article>

            <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-900 font-semibold">
                  6
                </div>
                <h2 className="text-2xl font-semibold text-slate-900">Limitation of Liability</h2>
              </div>
              <p className="mt-5 text-slate-600 leading-8">
                PearlGo is provided on an as is and as available basis. To the fullest extent permitted by law, we are
                not responsible for indirect, incidental, or consequential losses arising from your use of the service.
              </p>
            </article>

            <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-900 font-semibold">
                  7
                </div>
                <h2 className="text-2xl font-semibold text-slate-900">Amendments</h2>
              </div>
              <p className="mt-5 text-slate-600 leading-8">
                PearlGo may update these terms periodically. We will publish the revised terms on this page, and your
                continued use of the service after such changes constitutes acceptance.
              </p>
            </article>
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-[#00337a]  p-8 text-white shadow-xl">
              <h3 className="text-xl font-semibold">Need assistance?</h3>
              <p className="mt-4 leading-7 text-slate-300">
                For questions about these terms, travel bookings, or account security, our team is here to help.
              </p>
              <div className="mt-6 rounded-2xl bg-white/10 p-5">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-300">Legal & support</p>
                <p className="mt-3 text-md font-semibold text-white">support@pearlgo.com</p>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900">Document overview</h3>
              <ul className="mt-5 space-y-3 text-slate-600 leading-8 list-disc pl-5">
                <li>Section 1: Agreement and acceptance.</li>
                <li>Section 2: Permitted use of the platform.</li>
                <li>Section 3: Account and security obligations.</li>
                <li>Section 4: Booking terms and third-party partner policies.</li>
                <li>Section 5: Ownership of intellectual property.</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
