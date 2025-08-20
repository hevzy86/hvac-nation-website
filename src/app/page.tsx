"use client";
import Image from "next/image";
import { useState } from "react";
import Script from "next/script";
import MapSection from "./components/MapSection";
import QuoteModal, { type QuoteService } from "./components/QuoteModal";
import ReviewModal from "./components/ReviewModal";
import ReviewsCarousel from "./components/ReviewsCarousel";
import GoogleReviews from "./components/GoogleReviews";

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

// Primary nav dropdown data
const coolingMenu = [
  "Air Conditioning Repair",
  "Air Conditioning Install",
  "Air Conditioning Maintenance",
  "Heat Pumps",
  "Mini-Splits",
  "Indoor Air Quality Assessment",
  "Air Duct Repair",
  "Air Duct Install",
  "Air Duct Sealing",
];

const plumbingMenu = [
  "Plumbing Repair",
  "Plumbing Inspection",
  "Repiping Install",
  "Water Heaters",
  "Tankless Services",
  "Sump Pumps",
  "Gas Lines",
  "Kitchen Plumbing Repair",
  "Kitchen Plumbing Install",
  "Water Lines",
  "Water Filtration",
  "Slab Leak Detection",
];

const drainsMenu = [
  "Drain Clearing Service",
  "Rooter Services",
  "Burst Pipe Repair",
  "Camera Inspection Service",
  "Hydro Jetting Service",
  "Trenchless Sewer Lines",
  "Sewer Lines",
  "Slab Leak Detection",
];

const heatingMenu = [
  "Heating Repair",
  "Heating Install",
  "Heating Maintenance",
  "Furnaces",
  "Heat Pumps",
  "Air Quality",
  "Smart Thermostat Service",
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

  const quoteServices: QuoteService[] = services.map((s) => ({
    key: s.key,
    label: s.name,
    basePrice: s.basePrice,
  }));
  const openQuote = (serviceKey?: string) => {
    setPresetService(serviceKey ?? null);
    setQuoteOpen(true);
  };
  const closeQuote = () => setQuoteOpen(false);
  const openReview = () => setReviewOpen(true);
  const closeReview = () => setReviewOpen(false);

  return (
    <div className="bg-[#f7faff] min-h-screen text-[#222] font-sans pb-16 md:pb-0">
      {/* LocalBusiness JSON-LD for SEO */}
      <Script id="ld-localbusiness" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "HVAC Nation",
          image: ["/images/Hero_HVAC.jpg"],
          url: "https://www.hvacnation.local/",
          telephone: "+1-234-567-0890",
          priceRange: "$$",
          address: {
            "@type": "PostalAddress",
            streetAddress: "",
            addressLocality: "",
            addressRegion: "",
            postalCode: "",
            addressCountry: "US",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: 0,
            longitude: 0,
          },
          sameAs: [
            process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID
              ? `https://www.google.com/maps/place/?q=place_id:${process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID}`
              : undefined,
          ].filter(Boolean),
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "5.0",
            reviewCount: 6222,
          },
          openingHoursSpecification: [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ],
              opens: "00:00",
              closes: "23:59",
            },
          ],
        })}
      </Script>
      {/* Top Bar (2px) — switch to Royal Blue by changing color to #1E73E8 */}
      <div className="sticky top-0 z-50">
        <div className="h-2 bg-[#005baa]" />
      </div>

      {/* Header (white) */}
      <header className="sticky top-2 z-50 bg-white border-b border-[#e0e4ea] shadow-sm">
        <div className="w-full px-0 lg:px-2 h-14 relative grid grid-cols-[auto,1fr,auto] items-center gap-2">
          <div className="flex h-14 items-center gap-2">
            <Image
              src="/next.svg"
              alt="Company Logo"
              width={104}
              height={36}
              className="block object-contain h-9 w-auto translate-y-[1px]"
            />
            <span className="ml-0.5 text-[#005baa] font-bold text-lg tracking-wide leading-none translate-y-[1px]">
              HVAC Nation
            </span>
          </div>

          {/* primary nav with dropdowns */}
          <nav className="hidden md:flex items-center justify-center justify-self-center gap-1 text-sm text-[#2c3545] relative z-10 whitespace-nowrap">
            {/* Cooling */}
            <div className="relative group">
              <button className="px-2 py-1.5 hover:text-[#005baa] font-medium flex items-center gap-1">
                <span>Cooling</span>
                <span className="text-[#9aa6b2]">▾</span>
              </button>
              <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition pointer-events-none group-hover:pointer-events-auto absolute left-0 top-full mt-2 w-[320px] bg-white border border-[#e0e4ea] rounded-lg shadow-xl p-3 z-[70]">
                <ul className="max-h-[70vh] overflow-auto">
                  {coolingMenu.map((label) => (
                    <li key={label}>
                      <a
                        href="#"
                        className="block px-3 py-2 rounded hover:bg-[#f5f7fa] text-[#2c3545]"
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Plumbing */}
            <div className="relative group">
              <button className="px-2 py-1.5 hover:text-[#005baa] font-medium flex items-center gap-1">
                <span>Plumbing</span>
                <span className="text-[#9aa6b2]">▾</span>
              </button>
              <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition pointer-events-none group-hover:pointer-events-auto absolute left-0 top-full mt-2 w-[320px] bg-white border border-[#e0e4ea] rounded-lg shadow-xl p-3">
                <ul className="max-h-[70vh] overflow-auto">
                  {plumbingMenu.map((label) => (
                    <li key={label}>
                      <a
                        href="#"
                        className="block px-3 py-2 rounded hover:bg-[#f5f7fa] text-[#2c3545]"
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Drains */}
            <div className="relative group">
              <button className="px-2 py-1.5 hover:text-[#005baa] font-medium flex items-center gap-1">
                <span>Drains</span>
                <span className="text-[#9aa6b2]">▾</span>
              </button>
              <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition pointer-events-none group-hover:pointer-events-auto absolute left-0 top-full mt-2 w-[320px] bg-white border border-[#e0e4ea] rounded-lg shadow-xl p-3">
                <ul className="max-h-[70vh] overflow-auto">
                  {drainsMenu.map((label) => (
                    <li key={label}>
                      <a
                        href="#"
                        className="block px-3 py-2 rounded hover:bg-[#f5f7fa] text-[#2c3545]"
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Heating */}
            <div className="relative group">
              <button className="px-2 py-1.5 hover:text-[#005baa] font-medium flex items-center gap-1">
                <span>Heating</span>
                <span className="text-[#9aa6b2]">▾</span>
              </button>
              <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition pointer-events-none group-hover:pointer-events-auto absolute left-0 top-full mt-2 w-[320px] bg-white border border-[#e0e4ea] rounded-lg shadow-xl p-3">
                <ul className="max-h-[70vh] overflow-auto">
                  {heatingMenu.map((label) => (
                    <li key={label}>
                      <a
                        href="#"
                        className="block px-3 py-2 rounded hover:bg-[#f5f7fa] text-[#2c3545]"
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </nav>

          {/* ghost pill to reserve width of the real pill; keeps nav centered and left of pill */}
          <div
            className="hidden md:flex items-center justify-self-end mr-0 lg:mr-0"
            aria-hidden="true"
          >
            <div className="inline-flex items-center gap-2 whitespace-nowrap px-3 md:px-4 py-1.5 max-w-[600px] invisible">
              <span className="shrink-0 inline-flex items-center gap-2 px-2 md:px-3 py-1.5 font-semibold">
                ☎ (234) 567-890
              </span>
              <span className="shrink-0 inline-flex items-center gap-2 px-2 md:px-3 py-1.5 font-semibold">
                📅 Schedule Now
              </span>
              <span className="hidden xl:inline-flex items-center gap-2 ml-auto">
                <span>★★★★★</span>
                <span className="text-xs md:text-sm">6222 Reviews</span>
              </span>
            </div>
            <div className="w-1" />
          </div>

          {/**
           * Header CTA Pill — anchored to the right edge of the header
           *
           * Positioning (wrapper):
           *  - размещена в 3-й колонке грида, justify-self-end
           *    -> правое выравнивание, единая линия с логотипом и навигацией
           *
           * Внутренний контейнер (сама «пилюля»):
           *  - whitespace-nowrap -> запрещает перенос строк внутри
           *  - max-w-[680px]     -> контролируем «длину» пилюли (под макет)
           *  - rounded-full / shadow-xl / border / px-3 md:px-4 / py-1.5
           *    -> форма и визуальный стиль. py-1.5 = «узкая» версия; py-2 = как в Hero
           *
           * Элементы внутри:
           *  - кнопки и блок отзывов: className="shrink-0" -> не сжимаются, не ломают овал
           *  - reviews: hidden lg:flex + ml-auto -> уезжает вправо и скрывается на < lg
           *
           * Responsive:
           *  - hidden md:flex на wrapper -> показываем пилюлю только с md и выше
           */}
          <div className="hidden md:flex absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 z-20">
            <div
              className="flex items-center gap-2 whitespace-nowrap bg-white rounded-full w-full max-w-[600px] px-3 md:px-4 py-1.5 shadow-xl border border-[#e0e4ea]"
              style={{ boxShadow: "0 14px 30px rgba(0,0,0,0.15)" }}
            >
              <a
                href="tel:+1234567890"
                className="shrink-0 flex items-center gap-2 rounded-full bg-[#d7263d] text-white px-2 md:px-3 py-1.5 font-semibold"
                style={{ boxShadow: "inset 0 2px 0 rgba(255,255,255,0.35)" }}
              >
                <span>☎</span>
                <span>(234) 567-890</span>
              </a>
              <button
                onClick={() => openQuote()}
                className="shrink-0 flex items-center gap-2 rounded-full bg-[#005baa] text-white px-2 md:px-3 py-1.5 font-semibold hover:bg-[#004a8d]"
                style={{ boxShadow: "inset 0 2px 0 rgba(255,255,255,0.35)" }}
              >
                <span>📅</span>
                <span>Schedule Now</span>
              </button>
              <div className="hidden xl:flex items-center gap-2 text-[#2c3545] ml-auto shrink-0">
                <span className="text-[#f59e0b]">★★★★★</span>
                <span className="text-xs md:text-sm">6222 Reviews</span>
                <Image
                  src="/globe.svg"
                  alt="reviews"
                  width={18}
                  height={18}
                />
              </div>
            </div>
          </div>
        </div>

        {/* secondary nav — compact utility bar (right-aligned) */}
        <div className="hidden md:flex bg-white h-9 items-center justify-end gap-6 text-sm text-[#2c3545]/80 px-2 lg:px-4">
          <div className="max-w-6xl ml-auto px-4 flex items-center gap-6 text-sm text-[#2c3545]">
            <a
              href="#"
              className="hover:text-[#005baa] underline decoration-transparent hover:decoration-[#005baa] decoration-2 underline-offset-8"
            >
              Make‑A‑Wish®
            </a>
            <a
              href="#"
              className="hover:text-[#005baa] underline decoration-transparent hover:decoration-[#005baa] decoration-2 underline-offset-8"
            >
              All Offers
            </a>
            <a
              href="#"
              className="hover:text-[#005baa] underline decoration-transparent hover:decoration-[#005baa] decoration-2 underline-offset-8"
            >
              Contact Us
            </a>
            <a
              href="#"
              className="hover:text-[#005baa] underline decoration-transparent hover:decoration-[#005baa] decoration-2 underline-offset-8"
            >
              About Us
            </a>
          </div>
        </div>
      </header>

      {/* Promo Banner removed as requested */}

      {/* Language Switcher removed as requested */}

      {/* Hero Section — reference style with gradient overlay and CTA pill */}
      <section className="relative w-full overflow-hidden pb-40 md:pb-52">
        {/* Background image */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url(/images/Hero_HVAC.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        {/* Blue gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#005baa]/70 via-[#005baa]/55 to-[#005baa]/35" />

        <div className="relative max-w-6xl mx-auto px-4 pt-12 md:pt-16">
          <div className="max-w-3xl text-white">
            <div className="text-sm uppercase tracking-wide opacity-90">
              Excellence with a Personal Touch
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mt-2 drop-shadow">
              Trusted Plumbing, Drains & HVAC Services
            </h1>
            <p className="text-base md:text-lg mt-3 opacity-95 drop-shadow">
              Proudly serving our local communities with fast, reliable, and
              trusted service.
            </p>
          </div>

          {/* CTA pill (centered) */}
          <div
            className="mt-6 md:mt-8 mx-auto inline-flex items-center gap-3 bg-white rounded-full px-3 md:px-4 py-2 md:py-2.5 shadow-xl border border-[#e0e4ea]"
            style={{ boxShadow: "0 14px 30px rgba(0,0,0,0.15)" }}
          >
            <a
              href="tel:+1234567890"
              className="flex items-center gap-2 rounded-full bg-[#d7263d] text-white px-3 md:px-4 py-2 font-semibold"
              style={{ boxShadow: "inset 0 2px 0 rgba(255,255,255,0.35)" }}
            >
              <span>☎</span>
              <span>(234) 567-890</span>
            </a>
            <button
              onClick={() => openQuote()}
              className="flex items-center gap-2 rounded-full bg-[#005baa] text-white px-3 md:px-4 py-2 font-semibold hover:bg-[#004a8d]"
              style={{ boxShadow: "inset 0 2px 0 rgba(255,255,255,0.35)" }}
            >
              <span>📅</span>
              <span>Schedule Now</span>
            </button>
            <div className="hidden sm:flex items-center gap-2 text-[#2c3545] ml-1">
              <span className="text-[#f59e0b]">★★★★★</span>
              <span className="text-xs md:text-sm">6222 Reviews</span>
              <Image
                src="/globe.svg"
                alt="reviews"
                width={18}
                height={18}
              />
            </div>
          </div>
        </div>

        {/* Floating service cards */}
        <div className="relative max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 -mb-12 md:-mb-16 translate-y-12 md:translate-y-14">
            {[
              {
                key: "cooling",
                title: "Cooling",
                icon: "/images/cooling-icon.webp",
                items: [
                  "A/C Repair",
                  "A/C Installation",
                  "A/C Maintenance",
                  "All Cooling Services",
                ],
              },
              {
                key: "plumbing",
                title: "Plumbing",
                icon: "/images/plumbing-icon.webp",
                items: [
                  "Plumbing Repair",
                  "Water Heaters",
                  "Plumbing Inspections",
                  "All Plumbing Services",
                ],
              },
              {
                key: "drains",
                title: "Drains",
                icon: "/images/drains-icon.webp",
                items: [
                  "Drain Clearing",
                  "Camera Inspections",
                  "Sewer Lines",
                  "All Drains Services",
                ],
              },
              {
                key: "heating",
                title: "Heating",
                icon: "/images/heating-icon.webp",
                items: [
                  "General Heating Repair",
                  "Furnace Install",
                  "Heat Pump Repair",
                  "All Heating Services",
                ],
              },
            ].map((card) => (
              <div
                key={card.title}
                className="bg-[#d7263d] text-white rounded-2xl shadow-xl p-4 md:p-5 flex flex-col items-center border border-[#c01f32]"
                style={{ boxShadow: "0 18px 30px rgba(215,38,61,0.25)" }}
              >
                <div className="-mt-9 mb-2 md:mb-3 w-14 h-14 md:w-16 md:h-16 rounded-full bg-white shadow flex items-center justify-center border border-[#e0e4ea]">
                  <Image
                    src={card.icon}
                    alt={card.title}
                    width={36}
                    height={36}
                  />
                </div>
                <div className="text-lg md:text-xl font-extrabold tracking-wide mb-3">
                  {card.title}
                </div>
                <div className="w-full flex flex-col gap-2">
                  {card.items.map((it) => (
                    <button
                      type="button"
                      key={it}
                      onClick={() => openQuote(card.key)}
                      className="w-full bg-white text-[#2c3545] rounded-full py-2 text-xs md:text-sm font-semibold shadow hover:bg-[#f5f7fa]"
                    >
                      {it}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us — hybrid (headline + guarantees + badges) */}
      <section className="relative left-1/2 right-1/2 -mx-[50vw] w-screen mt-6 md:mt-10 bg-gradient-to-b from-[#f5f5f5] to-[#ececec] border-y border-[#e6e6e6] rounded-none shadow-sm">
        {/* Full-bleed right-side background image */}
        <div className="pointer-events-none absolute inset-0 hidden md:block z-0">
          {/* cover right portion from 40% to right edge */}
          <div className="absolute inset-y-0 left-[40%] right-0">
            <div className="relative h-full w-full">
              <Image
                src="/images/why-choose-us.webp"
                alt=""
                fill
                className="object-cover opacity-35"
                priority
              />
            </div>
            {/* soft left fade into light background */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#ececec] to-transparent" />
          </div>
        </div>
        <div className="relative max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-8 overflow-hidden">
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#0b0f1a] relative z-10">
          We arrive in minutes, not days.
        </h2>
        <div className="mt-4 grid md:grid-cols-2 gap-6 md:gap-8 items-start relative z-10">
          {/* Guarantees list */}
          <ul className="space-y-3 bg-white border border-[#cfe2ff] rounded-2xl p-5 shadow-md">
            {[
              "Happy Money Promise Guarantee",
              "Better Than We Found It Guarantee",
              "Installation Workmanship Guarantee",
              "24-Hour Fix It Or Hotel Guarantee",
              "Lifetime Installation Guarantee",
              "No Change Order Guarantee",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-[#005baa]">
                <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-[#eaf3ff] to-[#d8eaff] border border-[#bcd8ff] shadow-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    width="16"
                    height="16"
                    className="text-[#005baa]"
                    fill="none"
                  >
                    <path d="M5 10.5l3 3 7-8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="text-sm md:text-base font-medium">{item}</span>
              </li>
            ))}
          </ul>

          {/* Right column intentionally empty; background image covers it */}
          <div className="hidden md:block" />
        </div>
        </div>
      </section>

      {/* Trust KPIs under Hero — large numbers with line icons */}
      <section className="relative left-1/2 right-1/2 -mx-[50vw] w-screen bg-[#f3f7fc] border-y border-[#e6edf7] py-8 md:py-10 -mt-1 md:-mt-2 mb-6">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
            {/* KPI: Clients served */}
            <div className="flex items-start gap-4">
              <div
                className="shrink-0 text-[#005baa]"
                aria-hidden
              >
                {/* Thumb up line icon */}
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 9V5a3 3 0 0 0-3-3l-1 5-3 4v10h10a3 3 0 0 0 3-3v-6a3 3 0 0 0-3-3h-3z" />
                  <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                </svg>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#0b0f1a]">
                  200k+
                </div>
                <div className="text-sm md:text-base text-[#4a5568]">
                  clients served
                </div>
              </div>
            </div>

            {/* KPI: Client reviews */}
            <div className="flex items-start gap-4">
              <div
                className="shrink-0 text-[#005baa]"
                aria-hidden
              >
                {/* Review card line icon */}
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect
                    x="3"
                    y="4"
                    width="18"
                    height="14"
                    rx="2"
                  />
                  <path d="M7 9h6" />
                  <path d="M7 13h10" />
                  <path d="M10 19l2-3" />
                </svg>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#0b0f1a]">
                  13k+
                </div>
                <div className="text-sm md:text-base text-[#4a5568]">
                  client reviews
                </div>
              </div>
            </div>

            {/* KPI: Same‑day service */}
            <div className="flex items-start gap-4">
              <div
                className="shrink-0 text-[#005baa]"
                aria-hidden
              >
                {/* Bolt line icon */}
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
                </svg>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#0b0f1a]">
                  24/7
                </div>
                <div className="text-sm md:text-base text-[#4a5568]">
                  same‑day service
                </div>
              </div>
            </div>

            {/* KPI: Technicians */}
            <div className="flex items-start gap-4">
              <div
                className="shrink-0 text-[#005baa]"
                aria-hidden
              >
                {/* Shield/check line icon */}
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2l7 3v6c0 5-3.5 9-7 11-3.5-2-7-6-7-11V5l7-3z" />
                  <path d="M9.5 12l2 2 3.5-3.5" />
                </svg>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#0b0f1a]">
                  100%
                </div>
                <div className="text-sm md:text-base text-[#4a5568]">
                  licensed & insured
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full Reviews (Carousel) below Hero */}
      <section className="max-w-6xl mx-auto px-4 py-10 md:py-12 bg-[#005baa] rounded-2xl">
        {/* Top: primary CTA to leave a review on Google */}
        <div className="mb-6 flex justify-center">
          <a
            href={`https://search.google.com/local/writereview?placeid=${
              process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID ?? ""
            }`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 rounded-none bg-[#d7263d] text-white font-medium transition hover:-translate-y-0.5 hover:shadow-lg hover:bg-[#c01f32]"
            style={{
              boxShadow:
                "inset 0 2px 0 rgba(255,255,255,0.35), 0 8px 18px rgba(215, 38, 61, 0.25)",
            }}
          >
            Leave a Review on Google
          </a>
        </div>
        <ReviewsCarousel items={reviews} />
        {/* Bottom: trust strip with 'Read More Reviews' */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 bg-white border border-[#e0e4ea] rounded-full px-4 py-2 shadow-sm">
          <div className="flex items-center gap-2 text-[#2c3545] text-sm">
            <span className="text-[#f59e0b]">★★★★★</span>
            <span className="font-semibold text-[#005baa]">5.0</span>
            <span>•</span>
            <span>6,222 Google reviews</span>
          </div>
          <a
            href={`https://www.google.com/maps/place/?q=place_id:${
              process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID ?? ""
            }`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-1.5 rounded-full bg-[#005baa] text-white text-sm font-medium transition hover:-translate-y-0.5 hover:shadow-md"
            style={{
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.35), 0 6px 14px rgba(0, 91, 170, 0.22)",
            }}
          >
            Read More Reviews
          </a>
        </div>
      </section>

      {/* Trust Section — compact KPI + Warranty (placed right after Hero) */}
      <section className="max-w-6xl mx-auto px-4 mt-10 md:mt-12">
        <div className="relative max-w-5xl mx-auto">
          {/* KPI pill bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 bg-white/70 backdrop-blur-sm border border-[#e0e4ea] rounded-3xl shadow-sm px-6 py-5 md:px-8 md:py-6 sm:divide-x sm:divide-[#e0e4ea]/60">
            <div className="flex flex-col items-center text-center gap-1.5 py-1.5 sm:px-6">
              <div className="text-3xl md:text-4xl font-semibold text-[#005baa]">
                13k+
              </div>
              <div className="text-sm leading-tight text-[#2c3545]">
                <div className="font-semibold text-[#005baa]">
                  Happy Clients
                </div>
                <div className="text-xs text-[#2c3545]/60">
                  Across the region
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center text-center gap-1.5 py-1.5 sm:px-6">
              <div className="text-3xl md:text-4xl font-semibold text-[#005baa]">
                5.0★
              </div>
              <div className="text-sm leading-tight text-[#2c3545]">
                <div className="font-semibold text-[#005baa]">
                  5-Star Reviews
                </div>
                <div className="text-xs text-[#2c3545]/60">
                  Thousands of ratings
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center text-center gap-1.5 py-1.5 sm:px-6">
              <div className="text-3xl md:text-4xl font-semibold text-[#005baa]">
                200+
              </div>
              <div className="text-sm leading-tight text-[#2c3545]">
                <div className="font-semibold text-[#005baa]">
                  Expert Technicians
                </div>
                <div className="text-xs text-[#2c3545]/60">
                  Trusted & certified
                </div>
              </div>
            </div>
          </div>

          {/* Warranty badge overlapping */}
          <div className="relative z-10 flex justify-center">
            <div className="-mt-6 inline-flex items-center gap-2 bg-white border border-[#e0e4ea] rounded-full px-5 py-2 shadow-md">
              <span className="text-xs font-medium text-[#2c3545]">
                5-Year Warranty
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section (moved up) */}
      <MapSection />

      {/* Booking Section */}
      <section
        id="book"
        className="max-w-3xl mx-auto px-4 py-12 bg-[#eef5ff] rounded-2xl"
      >
        <h2 className="text-2xl font-bold mb-6 text-[#005baa]">
          Book a Service
        </h2>
        <form className="bg-[#f5f7fa] rounded-xl p-8 flex flex-col gap-4 shadow border border-[#e0e4ea]">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Your Name"
              className="p-3 rounded bg-white text-[#222] placeholder-gray-400 outline-none border border-[#e0e4ea]"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className="p-3 rounded bg-white text-[#222] placeholder-gray-400 outline-none border border-[#e0e4ea]"
              required
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="tel"
              placeholder="Phone Number"
              className="p-3 rounded bg-white text-[#222] placeholder-gray-400 outline-none border border-[#e0e4ea]"
              required
            />
            <select
              defaultValue=""
              className="p-3 rounded bg-white text-[#222] outline-none border border-[#e0e4ea]"
              required
            >
              <option
                value=""
                disabled
              >
                Select Service
              </option>
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
            <input
              type="date"
              className="p-3 rounded bg-white text-[#222] placeholder-gray-400 outline-none border border-[#e0e4ea]"
              required
            />
            <input
              type="time"
              className="p-3 rounded bg-white text-[#222] placeholder-gray-400 outline-none border border-[#e0e4ea]"
              required
            />
          </div>
          <textarea
            placeholder="Additional Comments (Optional)"
            className="p-3 rounded bg-white text-[#222] placeholder-gray-400 outline-none border border-[#e0e4ea]"
            rows={3}
          ></textarea>
          <button
            type="submit"
            className="block w-fit mx-auto px-10 py-3.5 rounded-none bg-[#d7263d] text-white font-semibold text-lg hover:bg-[#c01f32] transition transform hover:-translate-y-0.5 mt-2 shadow-lg hover:shadow-xl"
            style={{
              boxShadow:
                "inset 0 2px 0 rgba(255,255,255,0.35), 0 10px 22px rgba(215, 38, 61, 0.25)",
            }}
          >
            Book Service
          </button>
        </form>
      </section>

      {/* Google approved reviews (moderated) */}
      <GoogleReviews />

      {/* Extended Footer (moved to very bottom) */}
      <footer className="bg-[#f5f7fa] text-[#005baa] py-10 mt-10 border-t-4 border-[#005baa]">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8">
          <div>
            <Image
              src="/next.svg"
              alt="Company Logo"
              width={100}
              height={32}
            />
            <div className="mt-3 text-sm">
              Your Comfort, Our Mission.
              <br />
              Serving the region with pride.
            </div>
          </div>
          <div>
            <div className="font-bold text-[#005baa] mb-2">Quick Links</div>
            <ul className="space-y-1 text-sm">
              <li>
                <a
                  href="#"
                  className="hover:text-[#005baa]"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-[#005baa]"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-[#005baa]"
                >
                  Book Now
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-[#005baa]"
                >
                  Reviews
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-[#005baa]"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <div className="font-bold text-[#005baa] mb-2">Contact Us</div>
            <div className="text-sm">
              Phone:{" "}
              <a
                href="tel:+1234567890"
                className="hover:text-[#d7263d]"
              >
                (234) 567-890
              </a>
            </div>
            <div className="text-sm">
              Email:{" "}
              <a
                href="mailto:info@hvacnation.com"
                className="hover:text-[#d7263d]"
              >
                info@hvacnation.com
              </a>
            </div>
            <div className="text-sm mt-2">
              Address: 123 Main St, City, State
            </div>
          </div>
        </div>
        <div className="text-center text-[#005baa] pt-8 text-xs mt-6 border-t border-[#e0e4ea]">
          &copy; {new Date().getFullYear()} HVAC Nation. All rights reserved.
        </div>
      </footer>

      {/* Sticky Mobile CTA (Call + Schedule) */}
      <div className="fixed md:hidden bottom-0 inset-x-0 z-[60]">
        <div className="mx-auto max-w-3xl px-3 pb-[env(safe-area-inset-bottom)]">
          <div
            className="m-3 grid grid-cols-2 gap-3 rounded-full bg-white border border-[#e0e4ea] shadow-xl"
            style={{ boxShadow: "0 16px 30px rgba(0,0,0,0.18)" }}
          >
            <a
              href="tel:+1234567890"
              className="flex items-center justify-center gap-2 rounded-full bg-[#d7263d] text-white py-3 font-semibold"
              style={{ boxShadow: "inset 0 2px 0 rgba(255,255,255,0.35)" }}
            >
              <span>☎</span>
              <span>Call</span>
            </a>
            <button
              onClick={() => openQuote()}
              className="flex items-center justify-center gap-2 rounded-full bg-[#005baa] text-white py-3 font-semibold hover:bg-[#004a8d]"
              style={{ boxShadow: "inset 0 2px 0 rgba(255,255,255,0.35)" }}
            >
              <span>📅</span>
              <span>Schedule</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <QuoteModal
        open={quoteOpen}
        onClose={closeQuote}
        presetService={presetService}
        services={quoteServices}
      />
      <ReviewModal
        open={reviewOpen}
        onClose={closeReview}
      />
    </div>
  );
}
