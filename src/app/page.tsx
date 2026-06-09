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
              Placeholder reviews can be replaced with verified Google reviews, customer testimonials, or before-and-after project feedback.
            </p>
          </div>

          <div className="mb-16">
            <ReviewsSlider />
            <div className="mx-auto mt-12 max-w-3xl rounded-2xl border border-white/10 bg-white/10 p-8 text-white shadow-xl backdrop-blur-md">
  <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
    <div>
      <h3 className="text-2xl font-bold">Leave a Review</h3>
      <p className="mt-2 text-sm text-green-50">
        Share your experience so the team can review it before publishing.
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
