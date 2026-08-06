"use client";

import ProjectGallerySlider from "@/app/ProjectGallerySlider";
import ReviewsSlider from "@/app/ReviewsSlider";
import { AnimatePresence, motion } from "framer-motion";
import { Baskervville, Raleway } from "next/font/google";
import { useRef, useState } from "react";

const raleway = Raleway({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });
const baskervville = Baskervville({ subsets: ["latin"], weight: ["400"] });

const services = [
  {
    title: "Landscape Design",
    description:
      "Clean planting plans, outdoor refreshes, and curb appeal upgrades shaped around the property.",
  },
  {
    title: "Lawn Maintenance",
    description:
      "Routine mowing, edging, trimming, and upkeep for properties that need to stay sharp week after week.",
  },
  {
    title: "Irrigation Installation",
    description:
      "Efficient watering layouts for healthy turf, plant beds, and long-term outdoor performance.",
  },
  {
    title: "Hardscape Installation",
    description:
      "Pavers, walkways, patios, and outdoor details installed with clean lines and durable materials.",
  },
  {
    title: "Landscape Lighting",
    description:
      "Low-voltage lighting to highlight plants, paths, entries, and outdoor living areas after dark.",
  },
  {
    title: "Privacy Hedge Packages",
    description:
      "A quicker path to privacy with plant-only or installed hedge options for homes and businesses.",
  },
];

const serviceAreas = [
  "Homestead",
  "Miami",
  "Kendall",
  "Cutler Bay",
  "Palmetto Bay",
  "Coral Gables",
  "Miami Beach",
  "Pinecrest",
  "South Miami",
  "Surrounding Areas",
];

const hedgeVarieties = [
  {
    name: "Podocarpus",
    image: "/hedges/podocarpus.jpg",
    tag: "Clean vertical privacy",
    description:
      "A polished evergreen option for tall, structured privacy along entries, fences, and property lines.",
    sizes: [
      { label: "3 gal - 2-3 ft tall x 1-1.5 ft wide", spacing: 1.5 },
      { label: "7 gal - 3-4 ft tall x 1.5-2 ft wide", spacing: 2 },
      { label: "15 gal - 4-5 ft tall x 2-2.5 ft wide", spacing: 2.5 },
    ],
  },
  {
    name: "Clusia",
    image: "/hedges/clusia.jpg",
    tag: "Dense tropical coverage",
    description:
      "A hardy South Florida favorite with broad green leaves that fill in well for privacy screens.",
    sizes: [
      { label: "3 gal - 2-3 ft tall x 1.5-2 ft wide", spacing: 2 },
      { label: "7 gal - 3-4 ft tall x 2-2.5 ft wide", spacing: 2.5 },
      { label: "15 gal - 4-5 ft tall x 2.5-3 ft wide", spacing: 3 },
    ],
  },
  {
    name: "Areca",
    image: "/hedges/areca-palm.png",
    tag: "Soft palm screening",
    description:
      "A tropical palm option for customers who want privacy with a softer, resort-style look.",
    sizes: [
      { label: "7 gal - 3-4 ft tall x 2-3 ft wide", spacing: 3 },
      { label: "15 gal - 5-6 ft tall x 3-4 ft wide", spacing: 4 },
      { label: "25 gal - 7-8 ft tall x 4-5 ft wide", spacing: 5 },
    ],
  },
  {
    name: "Green Buttonwood Bush",
    image: "/hedges/green-buttonwood-hedge.png",
    tag: "Low, full screening",
    description:
      "A durable hedge choice that can be kept lower and shaped into a full green border.",
    sizes: [
      { label: "3 gal - 2-3 ft tall x 1.5-2 ft wide", spacing: 2 },
      { label: "7 gal - 3-4 ft tall x 2-2.5 ft wide", spacing: 2.5 },
      { label: "15 gal - 4-5 ft tall x 2.5-3 ft wide", spacing: 3 },
    ],
  },
  {
    name: "Green Buttonwood Tree",
    image: "/hedges/green-buttonwood-tree.png",
    tag: "Taller privacy presence",
    description:
      "A stronger vertical option for larger spaces that need privacy, shade, and a more established look.",
    sizes: [
      { label: "15 gal - 5-6 ft tall x 2.5-3 ft wide", spacing: 4 },
      { label: "25 gal - 7-8 ft tall x 3-4 ft wide", spacing: 5 },
      { label: "45 gal - 9-10 ft tall x 4-5 ft wide", spacing: 6 },
    ],
  },
];

const hedgeOptions = [
  {
    title: "Plants Only",
    description:
      "For customers who want the plants ready to go and prefer to handle the install themselves.",
    image: "/projects/IMG_0233.jpeg",
  },
  {
    title: "Plants + Install",
    description:
      "ProView brings the plants, lays out the spacing, installs them, and leaves the area clean.",
    image: "/projects/IMG_0323.jpeg",
  },
];

export default function LandscapeDemoHomepage() {
  const [estimateOpen, setEstimateOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [reviewOpen, setReviewOpen] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);
  const [hedgeLengthInput, setHedgeLengthInput] = useState("24");
  const [activeHedgeIndex, setActiveHedgeIndex] = useState(0);
  const [selectedHedgeSizeIndex, setSelectedHedgeSizeIndex] = useState(0);
  const [hedgePackageType, setHedgePackageType] = useState("Plants + Install");
  const [hedgeQuoteSubmitting, setHedgeQuoteSubmitting] = useState(false);
  const [hedgeQuoteMessage, setHedgeQuoteMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const formRef = useRef<HTMLFormElement | null>(null);

  const activeHedge = hedgeVarieties[activeHedgeIndex];
  const selectedHedgeSize = activeHedge.sizes[Math.min(selectedHedgeSizeIndex, activeHedge.sizes.length - 1)];
  const parsedHedgeLength = Number(hedgeLengthInput);
  const hedgeLength = Number.isFinite(parsedHedgeLength) && parsedHedgeLength > 0 ? parsedHedgeLength : 1;
  const hedgePlantCount = Math.max(1, Math.ceil(hedgeLength / selectedHedgeSize.spacing));

  async function handleEstimateSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    const formData = new FormData(event.currentTarget);
    const payload = {
      serviceNeeded: formData.get("serviceNeeded")?.toString() || "",
      workNeeded: formData.get("workNeeded")?.toString() || "",
      propertyType: formData.get("propertyType")?.toString() || "",
      fullName: formData.get("fullName")?.toString() || "",
      phone: formData.get("phone")?.toString() || "",
      email: formData.get("email")?.toString() || "",
      city: formData.get("city")?.toString() || "",
      projectDescription: formData.get("projectDescription")?.toString() || "",
    };

    try {
      const response = await fetch("/estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data?.error || "Unable to send estimate request.");
      }

      setSubmitMessage("Estimate request sent successfully.");
      setSelectedService("");
      formRef.current?.reset();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to send estimate request.";
      setSubmitMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleHedgeQuoteSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setHedgeQuoteSubmitting(true);
    setHedgeQuoteMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const notes = formData.get("notes")?.toString() || "";
    const payload = {
      serviceNeeded: "Privacy Hedge Quote",
      workNeeded: hedgePackageType,
      propertyType: formData.get("propertyType")?.toString() || "",
      fullName: formData.get("fullName")?.toString() || "",
      phone: formData.get("phone")?.toString() || "",
      email: formData.get("email")?.toString() || "",
      city: formData.get("city")?.toString() || "",
      projectDescription: [
        `Hedge option: ${activeHedge.name}`,
        `Selected size: ${selectedHedgeSize.label}`,
        `Hedge length: ${hedgeLength} ft`,
        `Recommended spacing: ${selectedHedgeSize.spacing} ft apart`,
        `Estimated plants needed: ${hedgePlantCount}`,
        `Package type: ${hedgePackageType}`,
        notes ? `Customer notes: ${notes}` : "",
      ]
        .filter(Boolean)
        .join("\n"),
    };

    try {
      const response = await fetch("/estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data?.error || "Unable to send hedge quote request.");
      }

      setHedgeQuoteMessage("Hedge quote request sent successfully.");
      form.reset();
      setHedgePackageType("Plants + Install");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to send hedge quote request.";
      setHedgeQuoteMessage(message);
    } finally {
      setHedgeQuoteSubmitting(false);
    }
  }

  return (
    <main style={{ fontFamily: raleway.style.fontFamily }} className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f]">
      <header className="fixed left-0 top-0 z-50 w-full border-b border-white/20 bg-white/75 px-5 py-3 shadow-sm backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between">
          <a href="#home" className="flex items-center gap-3">
            <img src="/images/ProView Logo4.png" alt="ProView Landscaping Logo" className="h-12 w-auto object-contain" />
          </a>
          <div className="hidden items-center gap-7 text-xs font-bold uppercase tracking-[0.18em] text-neutral-700 md:flex">
            <a href="#services" className="transition hover:text-green-700">Services</a>
            <a href="#privacy-hedges" className="transition hover:text-green-700">Hedges</a>
            <a href="#portfolio" className="transition hover:text-green-700">Projects</a>
            <a href="#reviews" className="transition hover:text-green-700">Reviews</a>
            <a href="#contact" className="rounded-full bg-[#1d1d1f] px-5 py-2.5 text-white transition hover:bg-green-700">Get Quote</a>
          </div>
        </nav>
      </header>

      <section id="home" className="relative isolate flex min-h-screen items-center overflow-hidden bg-black px-5 pb-16 pt-28 text-white">
        <img
          src="/projects/IMG_0323.jpeg"
          alt="Finished tropical landscape installation"
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/45 via-black/35 to-black/70" />
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-end gap-10 lg:grid-cols-[1fr_0.82fr]">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.45em] text-green-200">ProView Landscaping</p>
            <h1 style={{ fontFamily: baskervville.style.fontFamily }} className="max-w-5xl text-6xl font-normal leading-[0.92] text-white sm:text-7xl lg:text-8xl">
              Outdoor spaces with a quieter kind of luxury.
            </h1>
            <p className="mt-8 max-w-2xl text-xl leading-8 text-white/85">
              Landscape design, maintenance, hardscape, lighting, irrigation, and privacy hedge packages for South Florida properties.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a href="#contact" className="rounded-full bg-white px-7 py-3 text-sm font-extrabold uppercase tracking-[0.16em] text-neutral-950 transition hover:bg-green-200">
                Request Estimate
              </a>
              <a href="#privacy-hedges" className="rounded-full border border-white/50 px-7 py-3 text-sm font-extrabold uppercase tracking-[0.16em] text-white transition hover:bg-white hover:text-neutral-950">
                View Hedges
              </a>
            </div>
          </motion.div>

          <div className="grid grid-cols-3 gap-3 rounded-lg border border-white/15 bg-white/10 p-4 backdrop-blur-xl">
            {[
              ["6", "Core services"],
              ["10+", "Local areas"],
              ["2", "Hedge paths"],
            ].map(([value, label]) => (
              <div key={label} className="rounded-lg bg-white/12 p-4 text-center">
                <p className="text-3xl font-extrabold">{value}</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-white/70">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="bg-white px-5 py-28">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="mb-4 text-sm font-extrabold uppercase tracking-[0.35em] text-green-700">A cleaner process</p>
            <h2 style={{ fontFamily: baskervville.style.fontFamily }} className="text-5xl font-normal leading-tight sm:text-6xl">
              Designed, installed, and maintained with the details in mind.
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <p className="text-lg leading-8 text-neutral-600">
              ProView helps homeowners, multi-unit properties, and commercial spaces make their landscaping feel organized, polished, and easier to maintain.
            </p>
            <p className="text-lg leading-8 text-neutral-600">
              From complete outdoor upgrades to quick privacy hedges, the goal is simple: clear communication, clean work, and results that look finished.
            </p>
          </div>
        </div>
      </section>

      <section id="services" className="bg-[#f5f5f7] px-5 py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-14 max-w-4xl text-center">
            <p className="mb-4 text-sm font-extrabold uppercase tracking-[0.35em] text-green-700">Services</p>
            <h2 style={{ fontFamily: baskervville.style.fontFamily }} className="text-5xl font-normal leading-tight sm:text-6xl">
              Everything outside, handled with one connected team.
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service, index) => (
              <article key={service.title} className="group rounded-lg bg-white p-8 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-xl">
                <p className="mb-8 text-sm font-extrabold text-green-700">0{index + 1}</p>
                <h3 className="mb-4 text-2xl font-extrabold">{service.title}</h3>
                <p className="leading-7 text-neutral-600">{service.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="privacy-hedges" className="bg-[#07180f] px-5 py-28 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
            <div>
              <p className="mb-4 text-sm font-extrabold uppercase tracking-[0.35em] text-green-300">Privacy Hedge Packages</p>
              <h2 style={{ fontFamily: baskervville.style.fontFamily }} className="text-5xl font-normal leading-tight sm:text-6xl">
                Privacy, without the full landscape timeline.
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">
                Choose podocarpus, clusia, areca, green buttonwood bush, or green buttonwood tree. Order plants only or have ProView install the hedge for you.
              </p>
            </div>

            <div className="rounded-lg bg-white/10 p-3 ring-1 ring-white/15">
              <div className="relative overflow-hidden rounded-lg">
                <img src={activeHedge.image} alt={`${activeHedge.name} hedge option`} className="h-[420px] w-full object-cover" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent p-6">
                  <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-green-200">{activeHedge.tag}</p>
                  <h3 className="mt-2 text-4xl font-extrabold">{activeHedge.name}</h3>
                  <p className="mt-2 max-w-xl text-sm leading-6 text-white/80">{activeHedge.description}</p>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-5 gap-2">
                {hedgeVarieties.map((hedge, index) => (
                  <button
                    key={hedge.name}
                    type="button"
                    onClick={() => {
                      setActiveHedgeIndex(index);
                      setSelectedHedgeSizeIndex(0);
                    }}
                    aria-label={`View ${hedge.name}`}
                    className={`h-16 overflow-hidden rounded-lg border transition ${
                      index === activeHedgeIndex ? "border-green-300 opacity-100" : "border-white/10 opacity-55 hover:opacity-90"
                    }`}
                  >
                    <img src={hedge.image} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-3 text-sm md:grid-cols-5">
            {hedgeVarieties.map((hedge, index) => (
              <button
                key={hedge.name}
                type="button"
                onClick={() => {
                  setActiveHedgeIndex(index);
                  setSelectedHedgeSizeIndex(0);
                }}
                className={`rounded-lg border p-4 text-left transition ${
                  index === activeHedgeIndex
                    ? "border-green-300 bg-green-300 text-green-950"
                    : "border-white/10 bg-white/5 text-white hover:bg-white/10"
                }`}
              >
                <span className="block font-extrabold">{hedge.name}</span>
                <span className={`mt-1 block text-xs font-bold ${index === activeHedgeIndex ? "text-green-950/70" : "text-green-200"}`}>
                  {hedge.tag}
                </span>
              </button>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-[0.82fr_1.18fr]">
            <div className="rounded-lg bg-white p-7 text-neutral-950">
              <p className="mb-3 text-sm font-extrabold uppercase tracking-[0.24em] text-green-700">Quick Estimator</p>
              <h3 className="mb-6 text-3xl font-extrabold">How many plants do I need?</h3>

              <label className="mb-2 block text-sm font-bold" htmlFor="hedge-length">Hedge length in feet</label>
              <input
                id="hedge-length"
                type="number"
                min="1"
                max="300"
                value={hedgeLengthInput}
                onChange={(event) => setHedgeLengthInput(event.target.value)}
                onBlur={() => {
                  if (hedgeLengthInput.trim() === "") {
                    setHedgeLengthInput("1");
                    return;
                  }

                  const nextLength = Number(hedgeLengthInput);
                  if (!Number.isFinite(nextLength) || nextLength < 1) {
                    setHedgeLengthInput("1");
                  } else if (nextLength > 300) {
                    setHedgeLengthInput("300");
                  }
                }}
                className="mb-5 w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 text-sm font-bold outline-none transition focus:border-green-700"
              />

              <label className="mb-2 block text-sm font-bold" htmlFor="hedge-type">Hedge option</label>
              <select
                id="hedge-type"
                value={activeHedgeIndex}
                onChange={(event) => {
                  setActiveHedgeIndex(Number(event.target.value));
                  setSelectedHedgeSizeIndex(0);
                }}
                className="mb-5 w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 text-sm font-bold outline-none transition focus:border-green-700"
              >
                {hedgeVarieties.map((hedge, index) => (
                  <option key={hedge.name} value={index}>{hedge.name}</option>
                ))}
              </select>

              <label className="mb-2 block text-sm font-bold" htmlFor="hedge-size">Available size</label>
              <select
                id="hedge-size"
                value={selectedHedgeSizeIndex}
                onChange={(event) => setSelectedHedgeSizeIndex(Number(event.target.value))}
                className="mb-6 w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 text-sm font-bold outline-none transition focus:border-green-700"
              >
                {activeHedge.sizes.map((size, index) => (
                  <option key={size.label} value={index}>{size.label}</option>
                ))}
              </select>

              <div className="rounded-lg bg-[#12d66b] p-6 text-green-950">
                <p className="text-sm font-extrabold uppercase tracking-[0.18em]">Estimated Plants</p>
                <p className="mt-2 text-6xl font-extrabold leading-none">{hedgePlantCount}</p>
                <p className="mt-2 text-sm font-bold">Based on {activeHedge.name} at about {selectedHedgeSize.spacing} ft apart.</p>
                <p className="mt-3 text-sm font-semibold">Final quantity depends on plant size, corners, gates, and site conditions.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {hedgeOptions.map((option) => (
                <article key={option.title} className="flex flex-col rounded-lg bg-white/10 p-6 ring-1 ring-white/10">
                  <img src={option.image} alt={`${option.title} hedge service`} className="mb-5 h-52 w-full rounded-lg object-cover" />
                  <h3 className="text-3xl font-extrabold">{option.title}</h3>
                  <p className="mt-4 flex-1 leading-7 text-white/75">{option.description}</p>
                  <a
                    href="#hedge-quote-form"
                    onClick={() => setHedgePackageType(option.title)}
                    className="mt-7 rounded-full bg-white px-6 py-3 text-center text-sm font-extrabold uppercase tracking-[0.14em] text-neutral-950 transition hover:bg-green-200"
                  >
                    Request Hedge Quote
                  </a>
                </article>
              ))}
            </div>
          </div>

          <div id="hedge-quote-form" className="mt-6 rounded-lg bg-white p-7 text-neutral-950 md:p-9">
            <div className="mb-7 grid grid-cols-1 gap-6 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <p className="mb-3 text-sm font-extrabold uppercase tracking-[0.24em] text-green-700">Hedge Quote Request</p>
                <h3 className="text-3xl font-extrabold">Request this hedge package.</h3>
                <p className="mt-3 leading-7 text-neutral-600">
                  The selected hedge, size, length, spacing, and estimated plant count are included with the request.
                </p>
              </div>
              <div className="rounded-lg bg-[#f5f5f7] p-5">
                <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-green-700">Selected Details</p>
                <div className="mt-4 grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
                  <p><span className="font-bold">Option:</span> {activeHedge.name}</p>
                  <p><span className="font-bold">Size:</span> {selectedHedgeSize.label}</p>
                  <p><span className="font-bold">Length:</span> {hedgeLength} ft</p>
                  <p><span className="font-bold">Plants:</span> {hedgePlantCount}</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleHedgeQuoteSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <select value={hedgePackageType} onChange={(event) => setHedgePackageType(event.target.value)} className="rounded-lg border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition focus:border-green-700">
                <option value="Plants Only">Plants Only</option>
                <option value="Plants + Install">Plants + Install</option>
              </select>
              <select name="propertyType" defaultValue="" className="rounded-lg border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition focus:border-green-700">
                <option value="" disabled>Property Type</option>
                <option value="Home">Home</option>
                <option value="Multi-Unit Building">Multi-Unit Building</option>
                <option value="Office / Business">Office / Business</option>
                <option value="Commercial">Commercial</option>
              </select>
              <input name="fullName" type="text" placeholder="Full Name" required className="rounded-lg border border-neutral-300 px-4 py-3 text-sm outline-none transition focus:border-green-700" />
              <input name="phone" type="tel" placeholder="Phone Number" required className="rounded-lg border border-neutral-300 px-4 py-3 text-sm outline-none transition focus:border-green-700" />
              <input name="email" type="email" placeholder="Email Address" className="rounded-lg border border-neutral-300 px-4 py-3 text-sm outline-none transition focus:border-green-700" />
              <input name="city" type="text" placeholder="City / Work Area" className="rounded-lg border border-neutral-300 px-4 py-3 text-sm outline-none transition focus:border-green-700" />
              <textarea name="notes" placeholder="Anything else we should know about the hedge area?" rows={4} className="rounded-lg border border-neutral-300 px-4 py-3 text-sm outline-none transition focus:border-green-700 md:col-span-2" />

              {hedgeQuoteMessage ? (
                <p className={`text-sm md:col-span-2 ${hedgeQuoteMessage.includes("successfully") ? "text-green-700" : "text-red-700"}`}>{hedgeQuoteMessage}</p>
              ) : null}

              <button type="submit" disabled={hedgeQuoteSubmitting} className="rounded-full bg-[#1d1d1f] px-8 py-4 text-sm font-extrabold uppercase tracking-[0.14em] text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-neutral-500 md:col-span-2">
                {hedgeQuoteSubmitting ? "Sending..." : "Submit Hedge Quote Request"}
              </button>
            </form>
          </div>
        </div>
      </section>

      <section id="work-area" className="bg-white px-5 py-28">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="mb-4 text-sm font-extrabold uppercase tracking-[0.35em] text-green-700">Service Area</p>
            <h2 style={{ fontFamily: baskervville.style.fontFamily }} className="text-5xl font-normal leading-tight sm:text-6xl">
              Serving South Florida properties.
            </h2>
            <p className="mt-6 text-lg leading-8 text-neutral-600">
              Customers can include their city or property address in the request form, and the team will confirm availability before scheduling an estimate.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {serviceAreas.map((area) => (
              <div key={area} className="rounded-lg bg-[#f5f5f7] p-4 text-sm font-bold text-neutral-700">{area}</div>
            ))}
          </div>
        </div>
      </section>

      <section id="portfolio" className="bg-[#f5f5f7] px-5 py-28">
        <div className="mx-auto max-w-[1650px]">
          <div className="mx-auto mb-14 max-w-7xl">
            <p className="mb-4 text-sm font-extrabold uppercase tracking-[0.35em] text-green-700">Portfolio</p>
            <h2 style={{ fontFamily: baskervville.style.fontFamily }} className="text-5xl font-normal leading-tight sm:text-6xl">
              Real installations, real outdoor spaces.
            </h2>
          </div>
          <ProjectGallerySlider />
        </div>
      </section>

      <section id="reviews" className="bg-[#07180f] px-5 py-28 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-3xl">
            <p className="mb-4 text-sm font-extrabold uppercase tracking-[0.35em] text-green-300">Reviews</p>
            <h2 style={{ fontFamily: baskervville.style.fontFamily }} className="text-5xl font-normal leading-tight sm:text-6xl">
              Trusted by homeowners who care about quality.
            </h2>
            <p className="mt-6 text-lg leading-8 text-white/75">
              Homeowners and local property managers count on ProView for dependable communication, clean workmanship, and outdoor spaces that stay looking sharp.
            </p>
          </div>

          <ReviewsSlider />

          <div className="mx-auto mt-10 max-w-3xl rounded-lg bg-white/10 p-7 ring-1 ring-white/10">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-2xl font-extrabold">Leave a Review</h3>
                <p className="mt-2 text-sm text-white/70">Tell us how your project went and help future customers choose ProView with confidence.</p>
              </div>
              <button type="button" onClick={() => setReviewOpen((prev) => !prev)} className="rounded-full bg-white px-7 py-3 text-sm font-extrabold uppercase tracking-[0.14em] text-neutral-950 transition hover:bg-green-200">
                Write Review
              </button>
            </div>

            {reviewOpen && (
              <form
                onSubmit={async (event) => {
                  event.preventDefault();
                  const form = event.currentTarget as HTMLFormElement;
                  const formData = new FormData(form);

                  if (reviewRating === 0) {
                    alert("Please select a star rating.");
                    return;
                  }

                  const payload = {
                    fullName: formData.get("fullName"),
                    rating: reviewRating,
                    serviceUsed: formData.get("serviceUsed"),
                    city: formData.get("city"),
                    reviewMessage: formData.get("reviewMessage"),
                  };

                  try {
                    const response = await fetch("/review", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(payload),
                    });

                    if (!response.ok) {
                      alert("Something went wrong. Please try again.");
                      return;
                    }

                    alert("Thank you! Your review has been submitted.");
                    form.reset();
                    setReviewRating(0);
                    setReviewOpen(false);
                  } catch (error) {
                    console.error("Review submit error:", error);
                    alert("Something went wrong. Please try again.");
                  }
                }}
                className="mt-7 space-y-5"
              >
                <div>
                  <label className="mb-2 block text-xs font-extrabold uppercase tracking-[0.18em] text-green-200">Star Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReviewRating(star)}
                        className={`text-4xl transition ${star <= reviewRating ? "text-yellow-300" : "text-white/25"}`}
                      >
                        *
                      </button>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <input name="fullName" type="text" placeholder="Full Name" required className="rounded-lg border border-white/10 bg-white px-4 py-3 text-sm text-neutral-900 outline-none" />
                  <input name="city" type="text" placeholder="City" className="rounded-lg border border-white/10 bg-white px-4 py-3 text-sm text-neutral-900 outline-none" />
                  <select name="serviceUsed" defaultValue="" className="rounded-lg border border-white/10 bg-white px-4 py-3 text-sm text-neutral-900 outline-none md:col-span-2">
                    <option value="" disabled>Service Used</option>
                    <option value="Lawn Maintenance">Lawn Maintenance</option>
                    <option value="Landscape Design">Landscape Design</option>
                    <option value="New Irrigation Installation">New Irrigation Installation</option>
                    <option value="Hardscape Installation">Hardscape Installation</option>
                    <option value="Landscape Lighting">Landscape Lighting</option>
                    <option value="Privacy Hedge Package">Privacy Hedge Package</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <textarea name="reviewMessage" placeholder="Write your review..." rows={5} required className="w-full rounded-lg border border-white/10 bg-white px-4 py-3 text-sm text-neutral-900 outline-none" />
                <button type="submit" className="w-full rounded-full bg-white px-8 py-4 text-sm font-extrabold uppercase tracking-[0.14em] text-neutral-950 transition hover:bg-green-200">
                  Submit Review
                </button>
              </form>
            )}
          </div>

          <div id="contact" className="mx-auto mt-10 max-w-3xl rounded-lg bg-white p-8 text-neutral-950">
            <h3 className="text-3xl font-extrabold">Ready to improve your outdoor space?</h3>
            <p className="mt-3 leading-7 text-neutral-600">Submit a quick estimate request with your contact information, property type, service needed, and project details.</p>
            <button onClick={() => setEstimateOpen((prev) => !prev)} className="mt-7 rounded-full bg-[#1d1d1f] px-8 py-4 text-sm font-extrabold uppercase tracking-[0.14em] text-white transition hover:bg-green-700">
              Request Estimate
            </button>

            <AnimatePresence>
              {estimateOpen && (
                <motion.form
                  ref={formRef}
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  onSubmit={handleEstimateSubmit}
                  className="mt-8 overflow-hidden rounded-lg bg-[#f5f5f7] p-6 text-left"
                >
                  <select name="serviceNeeded" value={selectedService} onChange={(event) => setSelectedService(event.target.value)} className="mb-4 w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition focus:border-green-700" required>
                    <option value="">Select A Service</option>
                    <option value="Lawn Maintenance">Lawn Maintenance</option>
                    <option value="Landscape Design">Landscape Design</option>
                    <option value="New Irrigation Installation">New Irrigation Installation</option>
                    <option value="Landscape Lighting">Landscape Lighting</option>
                    <option value="Privacy Hedge Plants Only">Privacy Hedge Plants Only</option>
                    <option value="Privacy Hedge Plants + Install">Privacy Hedge Plants + Install</option>
                    <option value="Hardscape Installation">Hardscape Installation</option>
                    <option value="Natural Walkway">Natural Walkway</option>
                    <option value="Pavers Or Stones">Pavers Or Stones</option>
                    <option value="Other / Not Sure Yet">Other / Not Sure Yet</option>
                  </select>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <select name="workNeeded" className="rounded-lg border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition focus:border-green-700" defaultValue="">
                      <option value="" disabled>Work Needed</option>
                      <option value="Smaller Landscape Changes">Smaller Landscape Changes</option>
                      <option value="Larger Landscape Changes">Larger Landscape Changes</option>
                      <option value="Complete Renovation">Complete Renovation</option>
                    </select>
                    <select name="propertyType" className="rounded-lg border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition focus:border-green-700" defaultValue="">
                      <option value="" disabled>Property Type</option>
                      <option value="Home">Home</option>
                      <option value="Multi-Unit Building">Multi-Unit Building</option>
                      <option value="Office / Business">Office / Business</option>
                      <option value="Commercial">Commercial</option>
                    </select>
                    <input name="fullName" type="text" placeholder="Full Name" className="rounded-lg border border-neutral-300 px-4 py-3 text-sm outline-none transition focus:border-green-700" required />
                    <input name="phone" type="tel" placeholder="Phone Number" className="rounded-lg border border-neutral-300 px-4 py-3 text-sm outline-none transition focus:border-green-700" required />
                    <input name="email" type="email" placeholder="Email Address" className="rounded-lg border border-neutral-300 px-4 py-3 text-sm outline-none transition focus:border-green-700" />
                    <input name="city" type="text" placeholder="City / Work Area" className="rounded-lg border border-neutral-300 px-4 py-3 text-sm outline-none transition focus:border-green-700" />
                  </div>

                  <textarea name="projectDescription" placeholder="Briefly describe the project..." rows={4} className="mt-4 w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm outline-none transition focus:border-green-700" />

                  {submitMessage ? (
                    <p className={`mt-4 text-sm ${submitMessage.includes("successfully") ? "text-green-700" : "text-red-700"}`}>{submitMessage}</p>
                  ) : null}

                  <button type="submit" disabled={isSubmitting} className="mt-5 w-full rounded-full bg-[#1d1d1f] px-8 py-4 text-sm font-extrabold uppercase tracking-[0.14em] text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-neutral-500">
                    {isSubmitting ? "Sending..." : "Submit Request"}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <footer className="bg-[#050805] px-5 py-12 text-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <img src="/images/ProView Logo4.png" alt="ProView Landscaping Logo" className="mb-4 h-20 w-auto object-contain" />
            <p className="max-w-sm text-sm leading-7 text-white/55">
              Professional landscaping, lawn maintenance, irrigation, hardscape, privacy hedge, and lighting services.
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-extrabold">Contact Info</h3>
            <div className="space-y-3 text-sm text-white/65">
              <p><span className="font-bold text-green-300">Email:</span> <a href="mailto:Proviewlandsacaping@gmail.com" className="hover:text-green-300">Proviewlandscaping@gmail.com</a></p>
              <p><span className="font-bold text-green-300">Phone:</span> <a href="tel:3054846098" className="hover:text-green-300">(305) 484-6098</a></p>
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-extrabold">Service Area</h3>
            <p className="text-sm leading-7 text-white/55">
              Serving Homestead, Miami, Kendall, Cutler Bay, Palmetto Bay, Coral Gables, Miami Beach, Pinecrest, South Miami, and surrounding areas.
            </p>
          </div>
        </div>
        <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 pt-6 text-sm text-white/35">
          &copy; 2026 ProView Landscaping. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
