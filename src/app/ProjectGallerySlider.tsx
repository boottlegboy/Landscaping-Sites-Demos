"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const projects = [
  { image: "/projects/IMG_0233.jpeg", title: "Outdoor Renovation", label: "Project 01" },
  { image: "/projects/IMG_0239.jpeg", title: "Garden Refresh", label: "Project 02" },
  { image: "/projects/IMG_0323.jpeg", title: "Backyard Upgrade", label: "Project 03" },
  { image: "/projects/IMG_1837.jpeg", title: "Landscape Design", label: "Project 04" },
  { image: "/projects/IMG_1942.jpeg", title: "Modern Courtyard", label: "Project 05" },
  { image: "/projects/IMG_2520.jpeg", title: "Patio Makeover", label: "Project 06" },
  { image: "/projects/IMG_2521.jpeg", title: "Poolside Retreat", label: "Project 07" },
  { image: "/projects/IMG_3037.jpeg", title: "Lawn Revival", label: "Project 08" },
  { image: "/projects/IMG_3864.jpeg", title: "Garden Pathway", label: "Project 09" },
  { image: "/projects/IMG_3865.jpeg", title: "Tree Line Upgrade", label: "Project 10" },
  { image: "/projects/IMG_5833.jpeg", title: "Full Landscape Redesign", label: "Project 11" },
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