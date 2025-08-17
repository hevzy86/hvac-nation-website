"use client";
import Image from "next/image";
import { useState } from "react";
import MapSection from "./components/MapSection";
import QuoteModal, { type QuoteService } from "./components/QuoteModal";
import ReviewModal from "./components/ReviewModal";
import ReviewsCarousel from "./components/ReviewsCarousel";

const services = [
  {
    key: "heating",
    name: "Heater / Furnace",
    icon: "/icons/heating.svg",
    desc: "Repair, maintenance, and installation of furnaces.",
    basePrice: 180,
  },
  {
    key: "cooling",
    name: "Air Conditioner",
    icon: "/icons/cooling.svg",
    desc: "Repair, maintenance, and installation of air conditioners.",
    basePrice: 190,
  },
  {
    key: "electrical",
    name: "Electrical",
    icon: "/icons/electrical.svg",
    desc: "Electrical repairs, electric vehicle chargers, and more.",
    basePrice: 150,
  },
  {
    key: "plumbing",
    name: "Plumbing",
    icon: "/icons/plumbing.svg",
    desc: "Plumbing repairs, maintenance, and installation.",
    basePrice: 170,
  },
  {
    key: "drain",
    name: "Drain & Sewer",
    icon: "/icons/plumbing.svg",
    desc: "Drain clearing, hydro jetting, sewer services.",
    basePrice: 140,
  },
  {
    key: "water_heater",
    name: "Water Heater",
    icon: "/icons/heating.svg",
    desc: "Repair, and installation of tank/tankless water heaters.",
    basePrice: 220,
  },
];

const features = [
  {
    title: "Fast Response",
    desc: "We arrive in minutes, not days. Always ready to help.",
    icon: "🚀",
  },
  {
    title: "100% Satisfaction Guarantee",
    desc: "If you’re not happy, you get your money back.",
    icon: "✅",
  },
  {
    title: "Thousands of 5-Star Reviews",
    desc: "Trusted by homeowners across the region.",
    icon: "⭐",
  },
];

const reviews = [
  {
    name: "Maria G.",
    text: "Super fast and professional! Highly recommend.",
    rating: 5,
  },
  {
    name: "James R.",
    text: "Solved my AC issue the same day. Excellent service.",
    rating: 5,
  },
];

export default function Home() {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [presetService, setPresetService] = useState<string | null>(null);
  const [reviewOpen, setReviewOpen] = useState(false);

  const quoteServices: QuoteService[] = services.map((s) => ({ key: s.key, label: s.name, basePrice: s.basePrice }));
  const openQuote = (serviceKey?: string) => {
    setPresetService(serviceKey ?? null);
    setQuoteOpen(true);
  };
  const closeQuote = () => setQuoteOpen(false);
  const openReview = () => setReviewOpen(true);
  const closeReview = () => setReviewOpen(false);

  return (
    <div className="bg-white min-h-screen text-[#222] font-sans">
      {/* Top Banner & Contact (sticky) */}
      <header className="sticky top-0 z-50 flex flex-col md:flex-row items-center justify-between px-4 py-3 bg-[#005baa] border-b-4 border-[#d7263d] shadow-lg">
        <div className="flex items-center gap-3">
          <Image src="/next.svg" alt="Company Logo" width={120} height={38} />
          <span className="ml-2 text-white font-bold text-lg tracking-wide">HVAC Nation</span>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6 mt-2 md:mt-0">
          <span className="text-white font-semibold text-sm">4.9 ★</span>
          <a href="tel:+1234567890" className="text-white font-semibold text-sm hover:underline">(234) 567-890</a>
          <button
            onClick={() => openQuote()}
            className="px-4 py-2 rounded-none bg-[#d7263d] text-white font-medium hover:bg-[#c01f32] transition text-sm shadow transform hover:-translate-y-0.5 hover:shadow-lg"
            style={{ boxShadow: "inset 0 2px 0 rgba(255,255,255,0.35), 0 8px 18px rgba(215, 38, 61, 0.22)" }}
          >
            Get My Quote
          </button>
        </div>
      </header>

      {/* Promo Banner removed as requested */}

      {/* Language Switcher removed as requested */}

      {/* Hero Section (full-width background including CTA) */}
      <section className="relative w-full border-b border-[#f5f7fa] overflow-hidden">
        {/* Background image with semi-transparency */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'url(/images/Hero_HVAC.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.2,
          }}
        />
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-center">
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#003366] drop-shadow">Your Comfort, Our Mission</h1>
              <p className="text-lg md:text-xl text-[#222] mb-6">HVAC, Plumbing & Electrical Services — Fast, Reliable, Trusted.</p>
            </div>
            <div className="flex-1 flex justify-center md:justify-end mt-8 md:mt-0">
              <Image src="/icons/cooling.svg" alt="Hero" width={180} height={180} className="drop-shadow-xl" />
            </div>
          </div>
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => openQuote()}
              className="px-10 py-3.5 rounded-none bg-[#d7263d] text-white font-semibold text-lg shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5 hover:bg-[#c01f32]"
              style={{ boxShadow: "inset 0 2px 0 rgba(255,255,255,0.35), 0 10px 22px rgba(215, 38, 61, 0.25)" }}
            >
              Get My Quote
            </button>
          </div>
        </div>
      </section>

      {/* Services Menu (reference style) */}
      <section className="bg-[#f5f7fa] max-w-6xl mx-auto px-4 py-12 rounded-xl my-8 border border-[#e0e4ea]">
        <h2 className="text-2xl font-bold mb-8 text-[#003366] text-center">Our Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {services.map((s) => (
            <div
              key={s.name}
              className="bg-white rounded-xl p-8 flex flex-col items-center shadow border border-[#e0e4ea] transition transform hover:-translate-y-0.5 hover:shadow-lg cursor-pointer"
              onClick={() => openQuote(s.key)}
            >
              <div className="mb-3 opacity-90" style={{ filter: 'grayscale(100%)' }}>
                <Image src={s.icon} alt={s.name} width={56} height={56} />
              </div>
              <div className="text-xl font-bold text-[#222] text-center mb-2">{s.name}</div>
              <div className="text-[#222] text-center text-sm mb-4 max-w-[260px]">{s.desc}</div>
              <button
                className="px-5 py-2 rounded-full bg-[#d7263d] text-white text-sm font-semibold shadow-md hover:bg-[#c01f32] transition transform hover:-translate-y-0.5 hover:shadow-lg"
                onClick={(e) => { e.stopPropagation(); openQuote(s.key); }}
                style={{ boxShadow: '0 10px 22px rgba(215, 38, 61, 0.25)' }}
              >
                Get My Quote {'>'}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Map Section (moved up) */}
      <MapSection />

      {/* Booking Section */}
      <section id="book" className="max-w-3xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6 text-[#003366]">Book a Service</h2>
        <form className="bg-[#f5f7fa] rounded-xl p-8 flex flex-col gap-4 shadow border border-[#e0e4ea]">
          <div className="grid md:grid-cols-2 gap-4">
            <input type="text" placeholder="Your Name" className="p-3 rounded bg-white text-[#222] placeholder-gray-400 outline-none border border-[#e0e4ea]" required />
            <input type="email" placeholder="Your Email" className="p-3 rounded bg-white text-[#222] placeholder-gray-400 outline-none border border-[#e0e4ea]" required />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <input type="tel" placeholder="Phone Number" className="p-3 rounded bg-white text-[#222] placeholder-gray-400 outline-none border border-[#e0e4ea]" required />
            <select defaultValue="" className="p-3 rounded bg-white text-[#222] outline-none border border-[#e0e4ea]" required>
              <option value="" disabled>Select Service</option>
              <option>Heating</option>
              <option>Cooling</option>
              <option>Plumbing</option>
              <option>Electrical</option>
              <option>Insulation</option>
              <option>Drain & Sewer</option>
              <option>Water Heater</option>
              <option>Ductwork</option>
              <option>Water Filtration</option>
            </select>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <input type="date" className="p-3 rounded bg-white text-[#222] placeholder-gray-400 outline-none border border-[#e0e4ea]" required />
            <input type="time" className="p-3 rounded bg-white text-[#222] placeholder-gray-400 outline-none border border-[#e0e4ea]" required />
          </div>
          <textarea placeholder="Additional Comments (Optional)" className="p-3 rounded bg-white text-[#222] placeholder-gray-400 outline-none border border-[#e0e4ea]" rows={3}></textarea>
          <button
            type="submit"
            className="block w-fit mx-auto px-10 py-3.5 rounded-none bg-[#d7263d] text-white font-semibold text-lg hover:bg-[#c01f32] transition transform hover:-translate-y-0.5 mt-2 shadow-lg hover:shadow-xl"
            style={{ boxShadow: "inset 0 2px 0 rgba(255,255,255,0.35), 0 10px 22px rgba(215, 38, 61, 0.25)" }}
          >
            Book Service
          </button>
        </form>
      </section>

      {/* Stats Section */}
      <section className="bg-[#f5f7fa] max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-10 rounded-xl my-8 border border-[#e0e4ea]">
        <div className="flex flex-col items-center">
          <span className="text-[#003366] mt-2">Happy Clients</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-4xl font-bold text-[#005baa]">13k+</span>
          <span className="text-[#003366] mt-2">5-Star Reviews</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-4xl font-bold text-[#005baa]">200+</span>
          <span className="text-[#003366] mt-2">Expert Technicians</span>
        </div>
      </section>

      {/* Guarantees & Features */}
      <section className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-2 gap-10 items-center bg-white border-b border-[#f5f7fa]">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <Image src="/icons/cooling.svg" alt="Fast" width={48} height={48} />
            <div>
              <div className="text-lg font-bold text-[#003366]">We arrive in minutes, not days.</div>
              <div className="text-[#222] text-sm">Always a live person, always ready to help, fully stocked trucks.</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-3xl">💯</span>
            <div>
              <div className="text-lg font-bold text-[#003366]">100% money-back guarantee.</div>
              <div className="text-[#222] text-sm">If you’re not satisfied — you get your money back.</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-3xl">⭐</span>
            <div>
              <div className="text-lg font-bold text-[#003366]">Thousands of 5-Star reviews.</div>
              <div className="text-[#222] text-sm">Professional, careful, and trusted by thousands of homeowners.</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-6">
          <Image src="/next.svg" alt="Guarantee Badge" width={120} height={38} />
          <div className="flex flex-col items-center">
            <span className="text-[#d7263d] text-5xl font-bold">5</span>
            <span className="text-[#003366] text-lg">Year Warranty</span>
          </div>
        </div>
      </section>

      

      {/* Features */}
      <section className="max-w-5xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-8">
        {features.map((f) => (
          <div key={f.title} className="bg-white rounded-xl p-7 flex flex-col items-center shadow border border-[#e0e4ea]">
            <div className="text-3xl mb-2 text-[#005baa]">{f.icon}</div>
            <div className="text-xl font-semibold text-[#003366] mb-1">{f.title}</div>
            <div className="text-[#222] text-center">{f.desc}</div>
          </div>
        ))}
      </section>

      {/* Reviews (Carousel) */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6 text-[#003366] text-center">Homeowners are talking about us daily</h2>
        <ReviewsCarousel items={reviews} />
        <div className="mt-8 flex justify-center gap-3">
          <button
            onClick={openReview}
            className="px-6 py-2 rounded-none bg-[#005baa] text-white font-medium transition hover:-translate-y-0.5 hover:shadow-lg"
            style={{ boxShadow: "inset 0 2px 0 rgba(255,255,255,0.35), 0 8px 18px rgba(0, 91, 170, 0.22)" }}
          >
            Leave a Review
          </button>
          <a
            href="#"
            className="px-6 py-2 rounded-none bg-white text-[#005baa] font-medium border border-[#005baa] transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            Read more reviews
          </a>
        </div>
      </section>

      {/* Contact */}
      <section className="max-w-3xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold mb-6 text-[#003366]">Contact Us</h2>
        <form className="bg-[#f5f7fa] rounded-xl p-8 flex flex-col gap-4 shadow border border-[#e0e4ea]">
          <input type="text" placeholder="Your Name" className="p-3 rounded bg-white text-[#222] placeholder-gray-400 outline-none border border-[#e0e4ea]" />
          <input type="email" placeholder="Your Email" className="p-3 rounded bg-white text-[#222] placeholder-gray-400 outline-none border border-[#e0e4ea]" />
          <textarea placeholder="How can we help you?" className="p-3 rounded bg-white text-[#222] placeholder-gray-400 outline-none border border-[#e0e4ea]" rows={4}></textarea>
          <button
            type="submit"
            className="px-6 py-2 rounded-none bg-[#005baa] text-white font-semibold transition hover:-translate-y-0.5 hover:shadow-lg"
            style={{ boxShadow: "inset 0 2px 0 rgba(255,255,255,0.35), 0 8px 18px rgba(0, 91, 170, 0.22)" }}
          >
            Send Message
          </button>
        </form>
      </section>

      {/* Extended Footer (moved to very bottom) */}
      <footer className="bg-[#f5f7fa] text-[#003366] py-10 mt-10 border-t-4 border-[#005baa]">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8">
          <div>
            <Image src="/next.svg" alt="Company Logo" width={100} height={32} />
            <div className="mt-3 text-sm">Your Comfort, Our Mission.<br/>Serving the region with pride.</div>
          </div>
          <div>
            <div className="font-bold text-[#003366] mb-2">Quick Links</div>
            <ul className="space-y-1 text-sm">
              <li><a href="#" className="hover:text-[#005baa]">Home</a></li>
              <li><a href="#" className="hover:text-[#005baa]">Services</a></li>
              <li><a href="#" className="hover:text-[#005baa]">Book Now</a></li>
              <li><a href="#" className="hover:text-[#005baa]">Reviews</a></li>
              <li><a href="#" className="hover:text-[#005baa]">Contact</a></li>
            </ul>
          </div>
          <div>
            <div className="font-bold text-[#003366] mb-2">Contact Us</div>
            <div className="text-sm">Phone: <a href="tel:+1234567890" className="hover:text-[#d7263d]">(234) 567-890</a></div>
            <div className="text-sm">Email: <a href="mailto:info@hvacnation.com" className="hover:text-[#d7263d]">info@hvacnation.com</a></div>
            <div className="text-sm mt-2">Address: 123 Main St, City, State</div>
          </div>
        </div>
        <div className="text-center text-[#003366] pt-8 text-xs mt-6 border-t border-[#e0e4ea]">&copy; {new Date().getFullYear()} HVAC Nation. All rights reserved.</div>
      </footer>

      {/* Modals */}
      <QuoteModal open={quoteOpen} onClose={closeQuote} presetService={presetService} services={quoteServices} />
      <ReviewModal open={reviewOpen} onClose={closeReview} />
    </div>
  );
}
