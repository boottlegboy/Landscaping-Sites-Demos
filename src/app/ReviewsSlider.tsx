"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const reviews = [
  {
    quote:
      "ProView did a great job cleaning up our beds, trimming everything back, and leaving the yard looking better than it has in years.",
    name: "Maria G.",
    role: "Homeowner",
  },
  {
    quote:
      "They showed up when they said they would, explained the estimate clearly, and finished the work with a clean attention to detail.",
    name: "Daniel R.",
    role: "Property Owner",
  },
  {
    quote:
      "Our irrigation and lawn maintenance have been much easier since working with ProView. The property looks consistent week after week.",
    name: "Sofia M.",
    role: "Residential Client",
  },
  {
    quote:
      "The hardscape work came out exactly how we pictured it. The crew was respectful, organized, and easy to work with.",
    name: "Carlos T.",
    role: "Homeowner",
  },
];

export default function ReviewsSlider() {
  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      spaceBetween={24}
      slidesPerView={1}
      pagination={{ clickable: true }}
      autoplay={{ delay: 4000, disableOnInteraction: false }}
      loop={true}
      className="pb-14"
    >
      {reviews.map((review, index) => (
        <SwiperSlide key={index}>
          <div className="rounded-2xl border border-white/10 bg-white/10 p-8 text-white backdrop-blur-md">
            <p className="mb-6 text-lg leading-8 text-green-50">
              &quot;{review.quote}&quot;
            </p>
            <p className="text-base font-bold leading-6 tracking-normal text-white">{review.name}</p>
            <p className="text-sm font-normal leading-5 tracking-normal text-green-200">{review.role}</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
