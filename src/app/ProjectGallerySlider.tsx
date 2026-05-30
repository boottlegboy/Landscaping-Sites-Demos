"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const projects = [
  {
    image:
      "https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&w=1200&q=80",
    title: "Outdoor Renovation",
    label: "Project 01",
  },
  {
    image:
      "https://images.unsplash.com/photo-1598902108854-10e335adac99?auto=format&fit=crop&w=1200&q=80",
    title: "Garden Refresh",
    label: "Project 02",
  },
  {
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80",
    title: "Backyard Upgrade",
    label: "Project 03",
  },
  {
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
    title: "Landscape Design",
    label: "Project 04",
  },
];

export default function ProjectGallerySlider() {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={24}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 3500, disableOnInteraction: false }}
      loop={true}
      breakpoints={{
        768: { slidesPerView: 2 },
        1200: { slidesPerView: 3 },
      }}
      className="pb-14"
    >
      {projects.map((project, index) => (
        <SwiperSlide key={index}>
          <div className="group relative h-[520px] overflow-hidden rounded-2xl bg-neutral-900 shadow-2xl">
            <img
              src={project.image}
              alt={project.title}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-7 text-white">
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-green-200">
                {project.label}
              </p>
              <h3 className="mt-2 text-3xl font-bold drop-shadow-lg">
                {project.title}
              </h3>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}