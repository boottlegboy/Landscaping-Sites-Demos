"use client";
import ProjectGallerySlider from "@/app/ProjectGallerySlider";
import ReviewsSlider from "@/app/ReviewsSlider";
import { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Raleway, Nobile, Baskervville } from "next/font/google";

const raleway = Raleway({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });
const nobile = Nobile({ subsets: ["latin"], weight: ["400", "500", "700"] });
const baskervville = Baskervville({ subsets: ["latin"], weight: ["400"] });

export default function LandscapeDemoHomepage() {
  const [estimateOpen, setEstimateOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [reviewOpen, setReviewOpen] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);
  const [hedgeLength, setHedgeLength] = useState(24);
  const [activeHedgeIndex, setActiveHedgeIndex] = useState(0);
  const [selectedHedgeSizeIndex, setSelectedHedgeSizeIndex] = useState(0);
  const [hedgePackageType, setHedgePackageType] = useState("Plants + Install");
  const [hedgeQuoteSubmitting, setHedgeQuoteSubmitting] = useState(false);
  const [hedgeQuoteMessage, setHedgeQuoteMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const formRef = useRef<HTMLFormElement | null>(null);
  const { scrollYProgress } = useScroll();

  const heroY = useTransform(scrollYProgress, [0, 0.35], [0, -120]);
  const heroScale = useTransform(scrollYProgress, [0, 0.35], [1.08, 1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.35], [0.75, 0.45]);
  const heroTextY = useTransform(scrollYProgress, [0, 0.28], [0, -55]);
  const heroTextOpacity = useTransform(scrollYProgress, [0, 0.28], [1, 0.25]);

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -450]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.2, 1], [0.45, 0.35, 0.32]);

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

  const heroImageY = useTransform(scrollYProgress, [0, 0.4], [0, -160]);
  const heroImageScale = useTransform(scrollYProgress, [0, 0.4], [1.12, 1.02]);
  const aboutRevealY = useTransform(scrollYProgress, [0.1, 0.35], [80, 0]);
  const aboutRevealOpacity = useTransform(scrollYProgress, [0.1, 0.35], [0, 1]);
  const portfolioY = useTransform(scrollYProgress, [0.45, 0.85], [90, -40]);
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
      image: "/projects/IMG_0323.jpeg",
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
      image: "/projects/IMG_0233.jpeg",
      tag: "Low, full screening",
      description:
        "A durable native-style hedge choice that can be kept lower and shaped into a full green border.",
      sizes: [
        { label: "3 gal - 2-3 ft tall x 1.5-2 ft wide", spacing: 2 },
        { label: "7 gal - 3-4 ft tall x 2-2.5 ft wide", spacing: 2.5 },
        { label: "15 gal - 4-5 ft tall x 2.5-3 ft wide", spacing: 3 },
      ],
    },
    {
      name: "Green Buttonwood Tree",
      image: "/projects/IMG_3864.jpeg",
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
  const activeHedge = hedgeVarieties[activeHedgeIndex];
  const selectedHedgeSize = activeHedge.sizes[Math.min(selectedHedgeSizeIndex, activeHedge.sizes.length - 1)];
  const hedgePlantCount = Math.max(1, Math.ceil(hedgeLength / selectedHedgeSize.spacing));

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
  const hedgeOptions = [
    {
      title: "Plants Only",
      description:
        "For homeowners who want a quick privacy upgrade and prefer to handle the planting themselves.",
      detail: "Choose the hedge type and order plants by quantity.",
    },
    {
      title: "Plants + Install",
      description:
        "ProView brings the hedge plants, lays out the spacing, plants them, and leaves the area clean.",
      detail: "Best for fast privacy without managing the labor.",
    },
  ];
  const services = [
    {
      title: "Landscape Design",
      description:
        "Transform your outdoor space with custom landscape designs tailored to your style and property. We create beautiful, functional landscapes that enhance curb appeal and bring your vision to life.",
    },
    {
      title: "Lawn Maintenance",
      description:
        "Keep your lawn healthy, clean, and beautiful year-round with our professional lawn maintenance services. We provide mowing, edging, trimming, and routine upkeep to ensure your property always looks its best.",
    },
    {
      title: "New Irrigation Installation",
      description:
        "Keep your landscape healthy and thriving with a professionally installed irrigation system. We design and install efficient watering solutions that provide proper coverage while helping conserve water and reduce maintenance.",
    },
    {
      title: "Hardscape Installation",
      description:
        "Enhance your outdoor living space with custom hardscape features, including patios, natural walkways, pavers, and more. We create durable, attractive solutions that add beauty, functionality, and value to your property.",
    },
    {
      title: "Landscape Lighting",
      description:
        "Highlight the beauty of your property with custom landscape lighting. We install elegant, energy-efficient lighting solutions that enhance curb appeal, improve safety, and create a welcoming outdoor atmosphere after dark.",
    },
    {
      title: "Privacy Hedge Packages",
      description:
        "A faster path to privacy using hedge plants like podocarpus, clusia, areca, and green buttonwood. Customers can order plants only for DIY installation or have ProView handle delivery, layout, planting, and cleanup.",
    },
  ];

  return (
    <main style={{ fontFamily: raleway.style.fontFamily }} className="relative min-h-screen overflow-hidden bg-neutral-950 text-neutral-900">
      <motion.div
        aria-hidden="true"
        style={{ y: backgroundY, scale: backgroundScale, opacity: backgroundOpacity }}
        className="pointer-events-none fixed inset-0 z-0"
      >
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=80"
          alt=""
          className="h-[130vh] w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/55 to-black/85" />
      </motion.div>
      <header className="absolute left-0 top-0 z-30 w-full px-6 py-5 text-white md:px-10 md:py-8">
        <nav className="mx-auto flex max-w-7xl items-center justify-between">
          <a href="#home" className="flex items-center">
          <img
            src="/images/ProView Logo4.png"
            alt="ProView Landscaping Logo"
            className="h-14 w-auto object-contain drop-shadow-[0_0_18px_rgba(134,239,172,0.25)] sm:h-16 md:h-20 lg:h-24"
            />
          </a>
          <div className="hidden items-center gap-8 text-sm font-medium uppercase tracking-wide md:flex">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#privacy-hedges">Hedges</a>
            <a href="#portfolio">Portfolio</a>
            <a href="#contact" className="rounded-full border border-white px-5 py-2">Get Started</a>
          </div>
        </nav>
      </header>

      <section
  id="home"
  className="relative z-10 flex min-h-screen w-full items-center justify-center overflow-hidden px-6 pb-24 pt-36 text-white md:px-8 md:py-28"
>
  <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/55 via-neutral-950/45 to-neutral-950/90" />
  <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/75 via-neutral-950/25 to-neutral-950/70" />
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_35%,rgba(34,197,94,0.18),transparent_35%)]" />

  <motion.div
    style={{ y: heroTextY, opacity: heroTextOpacity }}
    className="relative z-10 mx-auto grid w-full max-w-[1450px] grid-cols-1 items-center gap-20 md:grid-cols-[1.05fr_0.95fr]"
  >
    <div>
      <p className="mb-5 text-sm font-bold uppercase tracking-[0.45em] text-green-300">
        Landscape Design & Outdoor Services
      </p>

      <h1
        style={{ fontFamily: baskervville.style.fontFamily }}
        className="mb-6 max-w-4xl text-5xl font-normal leading-[0.98] text-white sm:text-6xl md:text-7xl"
      >
        Caring For Your Outdoor Space
      </h1>

      <p className="mb-10 max-w-2xl text-xl leading-8 text-neutral-200">
        Professional landscaping, outdoor maintenance, turf installation, and
        hardscape work built around clean details and reliable service.
      </p>

      <div className="flex flex-wrap items-center gap-4">
        <a
          href="#contact"
          className="rounded-full bg-green-700 px-9 py-4 text-sm font-bold uppercase tracking-[0.2em] text-white shadow-xl transition hover:bg-green-600"
        >
          Request a Quote
        </a>

        <a
          href="#portfolio"
          className="rounded-full border border-white/50 px-9 py-4 text-sm font-bold uppercase tracking-[0.2em] text-white transition hover:bg-white hover:text-neutral-950"
        >
          View Projects
        </a>
      </div>
    </div>

    <div className="rounded-[2rem] border border-white/10 bg-neutral-950/45 p-7 shadow-2xl backdrop-blur-md">
      <h2
        style={{ fontFamily: baskervville.style.fontFamily }}
        className="mb-5 text-4xl font-normal text-white"
      >
        Services Offered
      </h2>

      <div className="grid grid-cols-1 gap-4 text-sm text-neutral-200">
        <div className="rounded-2xl border border-white/10 bg-white/10 p-5">
          <p className="mb-2 font-bold text-green-300">Softscaping</p>
          <p>
            Grass, Sod, Turf, Mulch, Plants, Flower Beds, Sprinklers, and Lighting.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/10 p-5">
          <p className="mb-2 font-bold text-green-300">Hardscaping</p>
          <p>
            Natural Walkways, Pavers, and Outdoor Structure Details.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/10 p-5">
          <p className="mb-2 font-bold text-green-300">Work Area</p>
          <p>
            Serving Local Residential, Commercial, and Multi-Unit Properties.
          </p>
        </div>
      </div>
    </div>
  </motion.div>

  <div className="pointer-events-none absolute bottom-0 left-0 z-[2] h-48 w-full bg-gradient-to-b from-transparent via-neutral-950/70 to-neutral-950" />
</section>

  <motion.section
  id="about"
  style={{ y: aboutRevealY }}
  className="relative z-10 my-24 mx-auto max-w-7xl grid grid-cols-1 gap-14 rounded-[2.5rem] border-y border-white/10 bg-neutral-950/75 px-10 py-32 text-white shadow-2xl backdrop-blur-md md:grid-cols-[1fr_0.9fr]"
>
  <div className="relative z-10">
    <p className="mb-5 text-sm font-bold uppercase tracking-[0.45em] text-green-400">
      About Us
    </p>

    <h2
      style={{ fontFamily: baskervville.style.fontFamily }}
      className="mb-8 max-w-2xl text-5xl font-normal leading-tight text-white"
    >
      Professional landscaping and maintenance for every property.
    </h2>

    <p className="mb-6 max-w-2xl text-lg leading-8 text-neutral-200">
      With years of experience, we provide professional landscaping and
      maintenance services for both residential and commercial properties. Our
      team is dedicated to delivering quality workmanship, reliable service, and
      beautiful results that keep your property looking its best year-round.
    </p>

    <p className="max-w-2xl text-lg leading-8 text-neutral-300">
      No job is too big or too small—we take pride in every project we complete.
    </p>
  </div>

  <div className="relative z-10 flex items-center">
    <div className="w-full rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-md">
      <img
        src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1000&q=80"
        alt="Modern landscaped property"
        className="h-[360px] w-full rounded-[1.5rem] object-cover opacity-95 shadow-xl"
      />

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
          <p className="text-sm font-bold text-green-300">Reliable Work</p>
          <p className="mt-2 text-sm leading-6 text-neutral-300">
            Clean, consistent, and professional service.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
          <p className="text-sm font-bold text-green-300">Local Service</p>
          <p className="mt-2 text-sm leading-6 text-neutral-300">
            Focused on nearby homes and businesses.
          </p>
        </div>
      </div>
    </div>
  </div>
</motion.section>

      <section id="services" className="relative z-10 my-24 border-y border-white/10 bg-neutral-950/75 px-10 py-32 text-white shadow-2xl backdrop-blur-md">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 max-w-3xl">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-green-400">Services</p>
            <h2 style={{ fontFamily: baskervville.style.fontFamily }} className="text-5xl font-normal leading-tight text-white">Complete outdoor solutions for homes and businesses.</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service, index) => (
              <div key={service.title} className="rounded-2xl border border-white/10 bg-white/10 p-8 shadow-xl backdrop-blur-md transition hover:-translate-y-1 hover:bg-white/15 hover:shadow-2xl">
                <div className="mb-8 text-5xl font-bold text-green-300/35">0{index + 1}</div>
                <h3 className="mb-4 text-xl font-bold text-white">{service.title}</h3>
                <p className="leading-7 text-neutral-300">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="privacy-hedges" className="relative z-10 my-24 overflow-hidden bg-green-950 px-6 py-28 text-white shadow-2xl md:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(74,222,128,0.18),transparent_32%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-green-900/35 via-transparent to-neutral-950/35" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="mb-14 grid grid-cols-1 gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
            <div>
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-green-300">Privacy Hedge Packages</p>
              <h2 style={{ fontFamily: baskervville.style.fontFamily }} className="mb-6 text-5xl font-normal leading-tight text-white md:text-6xl">
                Fast privacy without a full landscape redesign.
              </h2>
              <p className="max-w-2xl text-lg leading-8 text-green-50">
                Choose from podocarpus, clusia, areca, green buttonwood bush, or green buttonwood tree options to add privacy, soften a property line, or cover an open view without waiting on a full design process. Buy the plants and install them yourself, or have ProView install them for you.
              </p>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/10 p-4 shadow-2xl backdrop-blur-md">
              <div className="relative overflow-hidden rounded-[1.5rem] bg-green-900/60 shadow-xl">
                <img
                  src={activeHedge.image}
                  alt={`${activeHedge.name} hedge option`}
                  className="h-[380px] w-full object-cover transition duration-500"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-green-200">{activeHedge.tag}</p>
                  <h3 className="mt-2 text-4xl font-extrabold text-white">{activeHedge.name}</h3>
                  <p className="mt-2 max-w-xl text-sm leading-6 text-green-50">{activeHedge.description}</p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-5 gap-2">
                {hedgeVarieties.map((hedge, index) => (
                  <button
                    key={hedge.name}
                    type="button"
                    onClick={() => {
                      setActiveHedgeIndex(index);
                      setSelectedHedgeSizeIndex(0);
                    }}
                    aria-label={`View ${hedge.name}`}
                    className={`h-16 overflow-hidden rounded-xl border transition ${
                      index === activeHedgeIndex ? "border-green-300 opacity-100" : "border-white/10 opacity-60 hover:opacity-90"
                    }`}
                  >
                    <img src={hedge.image} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-8 grid grid-cols-1 gap-3 text-sm md:grid-cols-5">
            {hedgeVarieties.map((hedge, index) => (
              <button
                key={hedge.name}
                type="button"
                onClick={() => {
                  setActiveHedgeIndex(index);
                  setSelectedHedgeSizeIndex(0);
                }}
                className={`rounded-2xl border p-4 text-left transition ${
                  index === activeHedgeIndex
                    ? "border-green-300 bg-green-400 text-green-950"
                    : "border-white/10 bg-black/20 text-green-50 hover:bg-white/10"
                }`}
              >
                <span className="block font-extrabold">{hedge.name}</span>
                <span className={`mt-1 block text-xs font-semibold ${index === activeHedgeIndex ? "text-green-950/75" : "text-green-200"}`}>
                  {hedge.tag}
                </span>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="rounded-[2rem] border border-white/10 bg-white/10 p-7 shadow-xl backdrop-blur-md">
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-green-200">Quick Estimator</p>
              <h3 className="mb-5 text-3xl font-bold text-white">How many plants do I need?</h3>

              <label className="mb-2 block text-sm font-bold text-green-100" htmlFor="hedge-length">
                Hedge length in feet
              </label>
              <input
                id="hedge-length"
                type="number"
                min="1"
                max="300"
                value={hedgeLength}
                onChange={(event) => setHedgeLength(Number(event.target.value) || 1)}
                className="mb-5 w-full rounded-xl border border-white/10 bg-white px-4 py-3 text-sm font-bold text-neutral-900 outline-none transition focus:border-green-400"
              />

              <label className="mb-2 block text-sm font-bold text-green-100" htmlFor="hedge-type">
                Hedge option
              </label>
              <select
                id="hedge-type"
                value={activeHedgeIndex}
                onChange={(event) => {
                  setActiveHedgeIndex(Number(event.target.value));
                  setSelectedHedgeSizeIndex(0);
                }}
                className="mb-5 w-full rounded-xl border border-white/10 bg-white px-4 py-3 text-sm font-bold text-neutral-900 outline-none transition focus:border-green-400"
              >
                {hedgeVarieties.map((hedge, index) => (
                  <option key={hedge.name} value={index}>
                    {hedge.name}
                  </option>
                ))}
              </select>

              <label className="mb-2 block text-sm font-bold text-green-100" htmlFor="hedge-size">
                Available size
              </label>
              <select
                id="hedge-size"
                value={selectedHedgeSizeIndex}
                onChange={(event) => setSelectedHedgeSizeIndex(Number(event.target.value))}
                className="mb-6 w-full rounded-xl border border-white/10 bg-white px-4 py-3 text-sm font-bold text-neutral-900 outline-none transition focus:border-green-400"
              >
                {activeHedge.sizes.map((size, index) => (
                  <option key={size.label} value={index}>
                    {size.label}
                  </option>
                ))}
              </select>

              <div className="rounded-2xl bg-green-400 p-6 text-green-950">
                <p className="text-sm font-bold uppercase tracking-[0.2em]">Estimated Plants</p>
                <p className="mt-2 text-6xl font-extrabold leading-none">{hedgePlantCount}</p>
                <p className="mt-2 text-sm font-bold">
                  Based on {activeHedge.name} at about {selectedHedgeSize.spacing} ft apart.
                </p>
                <p className="mt-3 text-sm font-semibold">
                  Final quantity depends on plant size, spacing, corners, gates, and site conditions.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {hedgeOptions.map((option) => (
                <div key={option.title} className="flex min-h-[360px] flex-col rounded-[2rem] border border-white/10 bg-white/10 p-7 shadow-xl backdrop-blur-md">
                  <div className="mb-6 h-48 overflow-hidden rounded-[1.5rem] bg-green-900/60">
                    <img
                      src={option.title === "Plants Only" ? "/projects/IMG_0233.jpeg" : "/projects/IMG_0323.jpeg"}
                      alt={option.title === "Plants Only" ? "Rows of potted plants ready for a landscape project" : "Installed tropical landscaping with privacy plants"}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <h3 className="mb-3 text-3xl font-extrabold text-white">{option.title}</h3>
                  <p className="mb-5 leading-7 text-green-50">{option.description}</p>
                  <p className="mb-7 rounded-2xl bg-black/20 p-4 text-sm font-bold text-green-200">{option.detail}</p>
                  <a
                    href="#hedge-quote-form"
                    onClick={() => {
                      setHedgePackageType(option.title);
                    }}
                    className="mt-auto inline-flex justify-center rounded-full bg-green-600 px-7 py-4 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-green-500"
                  >
                    Request Hedge Quote
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div id="hedge-quote-form" className="mt-8 rounded-[2rem] border border-white/10 bg-white p-7 text-neutral-950 shadow-2xl md:p-9">
            <div className="mb-7 grid grid-cols-1 gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-green-700">Hedge Quote Request</p>
                <h3 className="mb-4 text-3xl font-extrabold text-neutral-950">Request this hedge package.</h3>
                <p className="leading-7 text-neutral-600">
                  This form sends ProView the hedge option, size, length, recommended spacing, and estimated plant count from the calculator above.
                </p>
              </div>

              <div className="rounded-2xl bg-green-950 p-5 text-white">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-green-300">Selected Hedge Details</p>
                <div className="mt-4 grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
                  <p><span className="font-bold text-green-200">Option:</span> {activeHedge.name}</p>
                  <p><span className="font-bold text-green-200">Size:</span> {selectedHedgeSize.label}</p>
                  <p><span className="font-bold text-green-200">Length:</span> {hedgeLength} ft</p>
                  <p><span className="font-bold text-green-200">Plants:</span> {hedgePlantCount}</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleHedgeQuoteSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-neutral-500" htmlFor="hedge-package-type">
                  Package Type
                </label>
                <select
                  id="hedge-package-type"
                  value={hedgePackageType}
                  onChange={(event) => setHedgePackageType(event.target.value)}
                  className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition focus:border-green-700"
                >
                  <option value="Plants Only">Plants Only</option>
                  <option value="Plants + Install">Plants + Install</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-neutral-500" htmlFor="hedge-property-type">
                  Property Type
                </label>
                <select
                  id="hedge-property-type"
                  name="propertyType"
                  defaultValue=""
                  className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition focus:border-green-700"
                >
                  <option value="" disabled>Property Type</option>
                  <option value="Home">Home</option>
                  <option value="Multi-Unit Building">Multi-Unit Building</option>
                  <option value="Office / Business">Office / Business</option>
                  <option value="Commercial">Commercial</option>
                </select>
              </div>

              <input
                name="fullName"
                type="text"
                placeholder="Full Name"
                required
                className="rounded-xl border border-neutral-300 px-4 py-3 text-sm outline-none transition focus:border-green-700"
              />
              <input
                name="phone"
                type="tel"
                placeholder="Phone Number"
                required
                className="rounded-xl border border-neutral-300 px-4 py-3 text-sm outline-none transition focus:border-green-700"
              />
              <input
                name="email"
                type="email"
                placeholder="Email Address"
                className="rounded-xl border border-neutral-300 px-4 py-3 text-sm outline-none transition focus:border-green-700"
              />
              <input
                name="city"
                type="text"
                placeholder="City / Work Area"
                className="rounded-xl border border-neutral-300 px-4 py-3 text-sm outline-none transition focus:border-green-700"
              />
              <textarea
                name="notes"
                placeholder="Anything else we should know about the hedge area?"
                rows={4}
                className="rounded-xl border border-neutral-300 px-4 py-3 text-sm outline-none transition focus:border-green-700 md:col-span-2"
              />

              {hedgeQuoteMessage ? (
                <p className={`text-sm md:col-span-2 ${hedgeQuoteMessage.includes("successfully") ? "text-green-700" : "text-red-700"}`}>
                  {hedgeQuoteMessage}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={hedgeQuoteSubmitting}
                className="rounded-full bg-green-800 px-8 py-4 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-green-900/70 md:col-span-2"
              >
                {hedgeQuoteSubmitting ? "Sending..." : "Submit Hedge Quote Request"}
              </button>
            </form>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 text-sm font-semibold text-green-50 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-5">Good for fast privacy along fences, patios, pools, and side yards.</div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-5">Multiple hedge choices let customers match the privacy, height, and look they want.</div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-5">Available as plant-only orders or installed hedge packages.</div>
          </div>
        </div>
      </section>

      <section id="work-area" className="relative z-10 mx-auto my-24 max-w-7xl rounded-[2.5rem] border border-white/10 bg-neutral-950/70 px-14 py-24 text-white shadow-2xl backdrop-blur-md">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-green-400">Service Area</p>
            <h2 style={{ fontFamily: baskervville.style.fontFamily }} className="mb-6 text-5xl font-normal leading-tight text-white">
              Proudly serving local homes and businesses.
            </h2>
            <p className="mb-6 leading-8 text-neutral-300">
              This section helps customers quickly confirm whether their property is within the company’s work range before submitting an estimate request.
            </p>
            <div className="grid grid-cols-1 gap-3 text-neutral-200 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/10 p-5">Miami</div>
              <div className="rounded-2xl border border-white/10 bg-white/10 p-5">Homestead</div>
              <div className="rounded-2xl border border-white/10 bg-white/10 p-5">Kendall</div>
              <div className="rounded-2xl border border-white/10 bg-white/10 p-5">Cutler Bay</div>
              <div className="rounded-2xl border border-white/10 bg-white/10 p-5">Palmetto Bay</div>
              <div className="rounded-2xl border border-white/10 bg-white/10 p-5">Coral Gables</div>
              <div className="rounded-2xl border border-white/10 bg-white/10 p-5">Miami Beach</div>
              <div className="rounded-2xl border border-white/10 bg-white/10 p-5">Pinecrest</div>
              <div className="rounded-2xl border border-white/10 bg-white/10 p-5">South Miami</div>
              <div className="rounded-2xl border border-white/10 bg-white/10 p-5">Surrounding Areas</div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/10 p-8 shadow-xl backdrop-blur-md">
            <h3 className="mb-4 text-2xl font-bold text-white">Not sure if you’re in range?</h3>
            <p className="mb-6 leading-7 text-neutral-300">
              Customers can include their city or property address in the request form, and the team will confirm availability before scheduling an estimate.
            </p>
            <a href="#contact" className="inline-flex rounded-full bg-green-700 px-7 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-green-600">
              Check Availability
            </a>
          </div>
        </div>
      </section>

      <motion.section id="portfolio" style={{ y: portfolioY }} className="relative z-10 mx-auto max-w-[1650px] rounded-[2.5rem] border border-white/10 bg-neutral-950/70 px-16 py-32 text-white shadow-2xl backdrop-blur-md">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 flex items-end justify-between gap-8">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-green-400">Portfolio</p>
              <h2 style={{ fontFamily: baskervville.style.fontFamily }} className="text-5xl font-normal text-white">Featured Project Gallery</h2>
            </div>
            <button className="hidden rounded-full border border-white/50 px-7 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-white hover:text-neutral-950 md:block">
              See More
            </button>
          </div>
          <div className="relative">
            <ProjectGallerySlider />
          </div>
        </div>
      </motion.section>

      <section id="reviews" className="relative z-10 bg-green-950/90 px-10 py-24 text-white shadow-2xl backdrop-blur-sm">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-3xl">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-green-200">Reviews</p>
            <h2 style={{ fontFamily: baskervville.style.fontFamily }} className="mb-6 text-5xl font-normal leading-tight">
              Trusted by homeowners who care about quality.
            </h2>
            <p className="text-lg leading-8 text-green-50">
              Homeowners and local property managers count on ProView Landscaping for dependable communication, clean workmanship, and outdoor spaces that stay looking sharp.
            </p>
          </div>

          <div className="mb-16">
            <ReviewsSlider />
            <div className="mx-auto mt-12 max-w-3xl rounded-2xl border border-white/10 bg-white/10 p-8 text-white shadow-xl backdrop-blur-md">
  <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
    <div>
      <h3 className="text-2xl font-bold">Leave a Review</h3>
      <p className="mt-2 text-sm text-green-50">
        Tell us how your project went and help future customers choose ProView with confidence.
      </p>
    </div>

    <button
      type="button"
      onClick={() => setReviewOpen((prev) => !prev)}
      className="rounded-full bg-green-700 px-7 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-green-600"
    >
      Write Review
    </button>
  </div>

  {reviewOpen && (
    <form
      onSubmit={async (e) => {
        e.preventDefault();

        const form = e.currentTarget as HTMLFormElement;
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
            headers: {
              "Content-Type": "application/json",
            },
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
      className="mt-6 space-y-5"
    >
      <div>
        <label className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-green-200">
          Star Rating
        </label>

        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setReviewRating(star)}
              className={`text-4xl transition ${
                star <= reviewRating ? "text-yellow-400" : "text-white/30"
              }`}
            >
              ★
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <input
          name="fullName"
          type="text"
          placeholder="Full Name"
          required
          className="rounded-xl border border-white/10 bg-white px-4 py-3 text-sm text-neutral-900 outline-none"
        />

        <input
          name="city"
          type="text"
          placeholder="City"
          className="rounded-xl border border-white/10 bg-white px-4 py-3 text-sm text-neutral-900 outline-none"
        />

        <select
          name="serviceUsed"
          defaultValue=""
          className="rounded-xl border border-white/10 bg-white px-4 py-3 text-sm text-neutral-900 outline-none md:col-span-2"
        >
          <option value="" disabled>
            Service Used
          </option>
          <option value="Lawn Maintenance">Lawn Maintenance</option>
          <option value="Landscape Design">Landscape Design</option>
          <option value="New Irrigation Installation">New Irrigation Installation</option>
          <option value="Hardscape Installation">Hardscape Installation</option>
          <option value="Natural Walkway">Natural Walkway</option>
          <option value="Landscape Lighting">Landscape Lighting</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <textarea
        name="reviewMessage"
        placeholder="Write your review..."
        rows={5}
        required
        className="w-full rounded-xl border border-white/10 bg-white px-4 py-3 text-sm text-neutral-900 outline-none"
      />

      <button
        type="submit"
        className="w-full rounded-full bg-green-700 px-8 py-4 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-green-600"
      >
        Submit Review
      </button>
    </form>
  )}
</div>
          </div>

          <div id="contact" className="mx-auto max-w-3xl rounded-2xl bg-white p-10 text-neutral-900 shadow-xl">
            <h3 className="mb-4 text-2xl font-bold">Ready to improve your outdoor space?</h3>
            <p className="mb-7 leading-7 text-neutral-600">
              Submit a quick estimate request with your contact information, property type, service needed, and project details.
            </p>
            <button
              onClick={() => setEstimateOpen((prev) => !prev)}
              className="rounded-full bg-green-800 px-8 py-4 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-green-700"
            >
              Request Estimate
            </button>

            <AnimatePresence>
              {estimateOpen && (
                <motion.form
                  ref={formRef}
                  initial={{ opacity: 0, y: -12, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -12, height: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  onSubmit={handleEstimateSubmit}
                  className="mt-8 overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50 p-6 text-left"
                >
                  <div className="mb-5">
                    <label className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-neutral-500">
                      Service Needed
                    </label>
                    <select
                      name="serviceNeeded"
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition focus:border-green-700"
                      required
                    >
                      <option value="">Select A Service</option>
                      <optgroup label="Maintenance & Landscaping">
                        <option value="Lawn Maintenance">Lawn Maintenance</option>
                        <option value="Landscape Design">Landscape Design</option>
                        <option value="New Irrigation Installation">New Irrigation Installation</option>
                        <option value="Landscape Lighting">Landscape Lighting</option>
                        <option value="Privacy Hedge Plants Only">Privacy Hedge Plants Only</option>
                        <option value="Privacy Hedge Plants + Install">Privacy Hedge Plants + Install</option>
                      </optgroup>
                      <optgroup label="Hardscaping">
                        <option value="Hardscape Installation">Hardscape Installation</option>
                        <option value="Natural Walkway">Natural Walkway</option>
                        <option value="Pavers Or Stones">Pavers Or Stones</option>
                      </optgroup>
                      <option value="Other / Not Sure Yet">Other / Not Sure Yet</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <select
                      name="workNeeded"
                      className="rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition focus:border-green-700"
                      defaultValue=""
                    >
                      <option value="" disabled>Work Needed</option>
                      <option value="Smaller Landscape Changes">Smaller Landscape Changes</option>
                      <option value="Larger Landscape Changes">Larger Landscape Changes</option>
                      <option value="Complete Renovation">Complete Renovation</option>
                    </select>

                    <select
                      name="propertyType"
                      className="rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition focus:border-green-700"
                      defaultValue=""
                    >
                      <option value="" disabled>Property Type</option>
                      <option value="Home">Home</option>
                      <option value="Multi-Unit Building">Multi-Unit Building</option>
                      <option value="Office / Business">Office / Business</option>
                      <option value="Commercial">Commercial</option>
                    </select>

                    <input
                      name="fullName"
                      type="text"
                      placeholder="Full Name"
                      className="rounded-xl border border-neutral-300 px-4 py-3 text-sm outline-none transition focus:border-green-700"
                      required
                    />
                    <input
                      name="phone"
                      type="tel"
                      placeholder="Phone Number"
                      className="rounded-xl border border-neutral-300 px-4 py-3 text-sm outline-none transition focus:border-green-700"
                      required
                    />
                    <input
                      name="email"
                      type="email"
                      placeholder="Email Address"
                      className="rounded-xl border border-neutral-300 px-4 py-3 text-sm outline-none transition focus:border-green-700"
                    />
                    <input
                      name="city"
                      type="text"
                      placeholder="City / Work Area"
                      className="rounded-xl border border-neutral-300 px-4 py-3 text-sm outline-none transition focus:border-green-700"
                    />
                  </div>

                  <textarea
                    name="projectDescription"
                    placeholder="Briefly describe the project..."
                    rows={4}
                    className="mt-4 w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm outline-none transition focus:border-green-700"
                  />

                  {submitMessage ? (
                    <p className={`mt-4 text-sm ${submitMessage.includes("successfully") ? "text-green-700" : "text-red-700"}`}>
                      {submitMessage}
                    </p>
                  ) : null}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-5 w-full rounded-full bg-green-800 px-8 py-4 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-green-900/70"
                  >
                    {isSubmitting ? "Sending..." : "Submit Request"}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <footer className="relative z-10 bg-neutral-950 px-10 py-12 text-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-3 md:items-start">
          <div>
      <img
        src="/images/ProView Logo4.png"
        alt="ProView Landscaping Logo"
        className="mb-4 h-20 w-auto object-contain drop-shadow-[0_0_18px_rgba(134,239,172,0.25)]"
      />
      <p className="max-w-sm text-sm leading-7 text-neutral-400">
        Professional landscaping, lawn maintenance, irrigation, hardscape, and
        landscape lighting services for residential and commercial properties.
      </p>
    </div>

    <div>
      <h3 className="mb-4 text-lg font-bold text-white">Contact Info</h3>

      <div className="space-y-3 text-sm text-neutral-300">
        <p>
          <span className="font-bold text-green-300">Email:</span>{" "}
          <a
            href="mailto:Proviewlandsacaping@gmail.com"
            className="hover:text-green-300"
          >
            Proviewlandscaping@gmail.com
          </a>
        </p>

        <p>
          <span className="font-bold text-green-300">Phone:</span>{" "}
          <a href="tel:3054846098" className="hover:text-green-300">
            (305) 484-6098
          </a>
        </p>

        <p>
          <span className="font-bold text-green-300">Address:</span>{" "}
          28032 SW 164 PL, Homestead, FL 33033
        </p>
      </div>
    </div>

    <div>
      <h3 className="mb-4 text-lg font-bold text-white">Service Area</h3>

      <p className="text-sm leading-7 text-neutral-400">
        Serving Homestead, Miami, Kendall, Cutler Bay, Palmetto Bay, Coral
        Gables, Miami Beach, Pinecrest, South Miami, and surrounding areas.
      </p>
    </div>
  </div>

  <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 pt-6 text-sm text-neutral-500">
    © 2026 ProView Landscaping. All rights reserved.
    </div>
      </footer>
    </main>
  );
}
