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
    "Landscape Design",
    "Lawn Maintenance",
    "Tree & Shrub Care",
    "Hardscape Installation",
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
      <header className="absolute left-0 top-0 z-30 w-full px-10 py-6 text-white">
        <nav className="mx-auto flex max-w-7xl items-center justify-between">
          <div style={{ fontFamily: nobile.style.fontFamily }} className="text-2xl font-bold tracking-wide">Evergreen Demo</div>
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
  className="relative z-10 flex min-h-screen w-full items-center justify-center overflow-hidden px-8 py-28 text-white"
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
        className="mb-6 max-w-4xl text-6xl font-normal leading-[0.98] text-white md:text-7xl"
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
            Grass, sod, turf, mulch, plants, flower beds, sprinklers, and lighting.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/10 p-5">
          <p className="mb-2 font-bold text-green-300">Hardscaping</p>
          <p>
            Retaining walls, pavers, stones, boulders, and outdoor structure details.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/10 p-5">
          <p className="mb-2 font-bold text-green-300">Work Area</p>
          <p>
            Serving local residential, commercial, and multi-unit properties.
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
      A clean, reliable team for modern landscape projects.
    </h2>

    <p className="mb-6 max-w-2xl text-lg leading-8 text-neutral-200">
      This demo section uses placeholder copy to represent the company’s story,
      mission, and approach to landscaping. The layout focuses on trust,
      professionalism, and a premium service feel.
    </p>

    <p className="max-w-2xl text-lg leading-8 text-neutral-300">
      Future customers can quickly understand who the company is, what kind of
      work they specialize in, and why they should feel confident requesting an
      estimate.
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
          <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
            {services.map((service, index) => (
              <div key={service} className="rounded-2xl border border-white/10 bg-white/10 p-8 shadow-xl backdrop-blur-md transition hover:-translate-y-1 hover:bg-white/15 hover:shadow-2xl">
                <div className="mb-8 text-5xl font-bold text-green-300/35">0{index + 1}</div>
                <h3 className="mb-4 text-xl font-bold text-white">{service}</h3>
                <p className="leading-7 text-neutral-300">
                  Placeholder description for this service area. Short, clean, and focused on the value delivered to the customer.
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
                      <option value="">Select a service</option>
                      <optgroup label="Softscaping">
                        <option value="Lay grass or sod">Lay grass or sod</option>
                        <option value="Lay artificial turf">Lay artificial turf</option>
                        <option value="Plant trees or shrubs">Plant trees or shrubs</option>
                        <option value="Plant flower beds">Plant flower beds</option>
                        <option value="Apply mulch">Apply mulch</option>
                        <option value="Install or repair sprinklers">Install or repair sprinklers</option>
                        <option value="Install or repair outdoor lighting">Install or repair outdoor lighting</option>
                      </optgroup>
                      <optgroup label="Hardscaping">
                        <option value="Retaining wall">Retaining wall</option>
                        <option value="Pavers, boulders, or stones">Pavers, boulders, or stones</option>
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
                      <option value="Smaller landscape changes">Smaller landscape changes</option>
                      <option value="Larger landscape changes">Larger landscape changes</option>
                      <option value="Complete renovation">Complete renovation</option>
                    </select>

                    <select
                      name="propertyType"
                      className="rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition focus:border-green-700"
                      defaultValue=""
                    >
                      <option value="" disabled>Property Type</option>
                      <option value="Home">Home</option>
                      <option value="Multi-unit building">Multi-unit building</option>
                      <option value="Office / business">Office / business</option>
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
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-bold">Evergreen Demo</h2>
            <p className="mt-2 text-neutral-400">Private test website recreation demo.</p>
          </div>
          <div className="text-sm text-neutral-400">© 2026 Evergreen Demo. Placeholder content only.</div>
        </div>
      </footer>
    </main>
  );
}
