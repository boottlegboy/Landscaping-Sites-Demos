"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const reviews = [
  {
    quote:
      "The team was professional, fast, and the final result made the property look completely refreshed.",
    name: "Maria R.",
    role: "Residential Client",
  },
  {
    quote:
      "Great communication from start to finish. They explained the estimate clearly and delivered clean work.",
    name: "Daniel P.",
    role: "Property Owner",
  },
  {
    quote:
      "Reliable landscaping service with attention to detail. I would definitely recommend them.",
    name: "Sofia M.",
    role: "Local Customer",
  },
  {
    quote:
      "Very easy to work with and the project came out exactly how we wanted.",
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
              “{review.quote}”
            </p>
            <p className="font-bold">{review.name}</p>
            <p className="text-sm text-green-200">{review.role}</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}