'use client';
import React from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import Image from 'next/image';

// Images (make sure these exist in your project)
import d1 from '@/assets/images/dest-slider/d1.webp';
import d2 from '@/assets/images/dest-slider/d2.webp';
import d3 from '@/assets/images/dest-slider/d3.webp';
import d4 from '@/assets/images/dest-slider/d4.webp';
import d5 from '@/assets/images/dest-slider/d5.webp';
import d6 from '@/assets/images/dest-slider/d6.webp';
import syria from '@/assets/images/Destenations/syria.webp';
import { useRouter } from "next/navigation";
import { useTranslation } from 'react-i18next';



function ThumbnailPlugin(mainRef) {
  return (slider) => {
    function removeActive() {
      slider.slides.forEach((slide) => {
        slide.classList.remove('active');
      });
    }

    function addActive(idx) {
      slider.slides[idx].classList.add('active');
    }

    function addClickEvents() {
      slider.slides.forEach((slide, idx) => {
        slide.addEventListener('click', () => {
          if (mainRef.current) mainRef.current.moveToIdx(idx);
        });
      });
    }

    slider.on('created', () => {
      if (!mainRef.current) return;
      addActive(slider.track.details.rel);
      addClickEvents();
      mainRef.current.on('animationStarted', (main) => {
        removeActive();
        const next = main.animator.targetIdx || 0;
        addActive(main.track.absToRel(next));
        slider.moveToIdx(Math.min(slider.track.details.maxIdx, next));
      });
    });
  };
}

const DestinationCarousel = () => {
  const { t } = useTranslation()
  const slides = [
    {
      image: d1, title: t('home.destinations.slider.muscat')
    },
    { image: d2, title: 'Flights to Kuwait' },
    { image: d3, title: 'Flights to Sharjah' },
    { image: d6, title: ' Flights to Abu Dhabi' },
    { image: d5, title: 'Flights to Erbil' },
    { image: syria, title: 'Flights to Damascus' },
  ];
  const router = useRouter()

  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    loop: true,
  });

  const [thumbnailRef] = useKeenSlider(
    {
      initial: 0,
      loop: true,
      slides: {
        perView: 4,
        spacing: 10,
      },
    },
    [ThumbnailPlugin(instanceRef)]
  );

  return (
    <div className="w-full  mx-auto " dir='ltr'>
      {/* Main Carousel */}
      <div ref={sliderRef} className="keen-slider mb-6 h-[300px] md:h-[400px]">
        {slides.map((slide, idx) => (
          <div
            onClick={() => router.push(`/destenations`)}

            key={idx} className="keen-slider__slide relative rounded-xl overflow-hidden">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority={idx === 0}
            />
            <div className="absolute bottom-3 left-4 text-white bg-black/60 px-3 py-1 rounded-full text-xs font-semibold">
              {slide.title}
            </div>
          </div>
        ))}
      </div>

      {/* Thumbnail Navigation */}
<div ref={thumbnailRef} className="keen-slider thumbnail h-[60px] sm:h-[70px] md:h-[80px]">
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className="keen-slider__slide relative rounded-md overflow-hidden cursor-pointer"
          >
            <Image
              src={slide.image}
              alt={`Thumb ${slide.title}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DestinationCarousel;
