import Image from "next/image";

const services = [
  { name: "Heating", icon: "/icons/heating.svg" },
  { name: "Cooling", icon: "/icons/cooling.svg" },
  { name: "Plumbing", icon: "/icons/plumbing.svg" },
  { name: "Electrical", icon: "/icons/electrical.svg" },
  { name: "Insulation", icon: "/icons/insulation.svg" },
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
  return (
    <div className="bg-white min-h-screen text-[#222] font-sans">
      {/* Top Banner & Contact */}
      <header className="flex flex-col md:flex-row items-center justify-between px-4 py-3 bg-[#005baa] border-b-4 border-[#d7263d] shadow-lg">
        <div className="flex items-center gap-3">
          <Image src="/next.svg" alt="Company Logo" width={120} height={38} />
          <span className="ml-2 text-white font-bold text-lg tracking-wide">HVAC Nation</span>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6 mt-2 md:mt-0">
          <span className="text-white font-semibold text-sm">4.9 ★</span>
          <a href="tel:+1234567890" className="text-white font-semibold text-sm hover:underline">(234) 567-890</a>
          <a href="#book" className="px-4 py-2 rounded bg-[#d7263d] text-white font-medium hover:bg-[#003366] hover:text-white transition text-sm shadow">Schedule My Visit</a>
        </div>
      </header>

      {/* Promo Banner */}
      <section className="w-full bg-[#f5f7fa] py-8 px-4 flex flex-col md:flex-row items-center justify-between border-b-4 border-[#005baa]">
        <div className="mb-4 md:mb-0">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-[#003366]">Electrical Services <span className="text-[#d7263d]">$75 OFF</span></h2>
          <p className="text-lg">Repair or installation</p>
        </div>
        <a href="#book" className="px-8 py-3 rounded-lg bg-[#005baa] text-white font-semibold text-lg shadow-lg hover:bg-[#d7263d] hover:text-white transition">Schedule my visit</a>
      </section>

      {/* Language Switcher */}
      <div className="flex justify-end p-4">
        <button className="text-sm px-3 py-1 rounded bg-[#005baa] text-white hover:bg-[#d7263d] transition mr-2 border border-[#005baa]">EN</button>
        <button className="text-sm px-3 py-1 rounded bg-white text-[#005baa] border border-[#005baa] hover:bg-[#f5f7fa] hover:text-[#d7263d] transition">ES</button>
      </div>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 py-12 flex flex-col md:flex-row items-center bg-white border-b border-[#f5f7fa]">
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#003366] drop-shadow">Your Comfort, Our Mission</h1>
          <p className="text-lg md:text-xl text-[#222] mb-6">HVAC, Plumbing & Electrical Services — Fast, Reliable, Trusted.</p>
          <a href="#book" className="inline-block px-8 py-3 rounded-lg bg-[#005baa] text-white font-semibold text-lg shadow hover:bg-[#d7263d] hover:text-white transition">Book Service</a>
        </div>
        <div className="flex-1 flex justify-center md:justify-end mt-8 md:mt-0">
          <Image src="/icons/cooling.svg" alt="Hero" width={180} height={180} className="drop-shadow-xl" />
        </div>
      </section>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-lg">Your Comfort, Our Mission</h1>
        <p className="text-lg md:text-xl text-gray-300 mb-7">HVAC, Plumbing & Electrical Services — Fast, Reliable, Trusted.</p>
        <a href="#book" className="inline-block px-8 py-3 rounded-lg bg-[#38BDF8] text-[#111827] font-semibold text-lg shadow-lg hover:bg-[#2563EB] hover:text-white transition">Book Service</a>
      </section>

      {/* Services Menu */}
      <section className="bg-[#f5f7fa] max-w-6xl mx-auto px-4 py-12 rounded-xl my-8 border border-[#e0e4ea]">
        <h2 className="text-2xl font-bold mb-8 text-[#003366] text-center">Our Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {services.map((s) => (
            <div key={s.name} className="bg-white rounded-xl p-6 flex flex-col items-center shadow border border-[#e0e4ea]">
              <div className="mb-2">
                <Image src={s.icon} alt={s.name} width={48} height={48} />
              </div>
              <span className="text-lg font-medium text-[#003366]">{s.name}</span>
              <button className="mt-3 px-4 py-1 rounded bg-[#005baa] text-white text-xs font-semibold hover:bg-[#d7263d] hover:text-white transition">Learn More</button>
            </div>
          ))}
        </div>
      </section>

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
            <select className="p-3 rounded bg-white text-[#222] outline-none border border-[#e0e4ea]" required>
              <option value="" disabled selected>Select Service</option>
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
          <button type="submit" className="px-8 py-3 rounded bg-[#005baa] text-white font-semibold hover:bg-[#d7263d] hover:text-white transition mt-2">Submit Booking</button>
        </form>
      </section>

      {/* Stats Section */}
      <section className="bg-[#f5f7fa] max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-10 rounded-xl my-8 border border-[#e0e4ea]">
        <div className="flex flex-col items-center">
{{ ... }}
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

      {/* Map Section */}
      <section className="max-w-6xl mx-auto px-4 py-8 bg-[#f5f7fa] border border-[#e0e4ea] rounded-xl">
        <h2 className="text-2xl font-bold mb-4 text-[#003366]">Our Service Area</h2>
        <div className="rounded-xl overflow-hidden shadow border border-[#005baa]">
          <iframe title="Service Area Map" src="https://www.google.com/maps/d/embed?mid=1Qwq2T9nF3k3i4wP3M8k7M8k7M8k7M8k7" width="100%" height="320" className="w-full h-80"></iframe>
        </div>
      </section>

      {/* Extended Footer */}
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

      {/* Reviews */}
      <section className="max-w-3xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold mb-6 text-[#003366]">What Our Clients Say</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {reviews.map((r, i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow border border-[#e0e4ea] flex flex-col">
              <div className="flex items-center mb-2">
                <span className="text-lg font-semibold text-[#003366] mr-2">{r.name}</span>
                <span className="text-[#005baa]">{'★'.repeat(r.rating)}</span>
              </div>
              <div className="text-[#222]">{r.text}</div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <button className="px-6 py-2 rounded bg-[#005baa] text-white font-medium hover:bg-[#d7263d] hover:text-white transition">Leave a Review</button>
        </div>
      </section>

      {/* Contact */}
      <section className="max-w-3xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold mb-6 text-[#003366]">Contact Us</h2>
        <form className="bg-[#f5f7fa] rounded-xl p-8 flex flex-col gap-4 shadow border border-[#e0e4ea]">
          <input type="text" placeholder="Your Name" className="p-3 rounded bg-white text-[#222] placeholder-gray-400 outline-none border border-[#e0e4ea]" />
          <input type="email" placeholder="Your Email" className="p-3 rounded bg-white text-[#222] placeholder-gray-400 outline-none border border-[#e0e4ea]" />
          <textarea placeholder="How can we help you?" className="p-3 rounded bg-white text-[#222] placeholder-gray-400 outline-none border border-[#e0e4ea]" rows={4}></textarea>
          <button type="submit" className="px-6 py-2 rounded bg-[#005baa] text-white font-semibold hover:bg-[#d7263d] hover:text-white transition">Send Message</button>
        </form>
      </section>

      <footer className="text-center text-[#003366] py-8 text-sm bg-white border-t border-[#e0e4ea]">
        &copy; {new Date().getFullYear()} HVAC Nation. All rights reserved.
      </footer>
    </div>
  );
}
