'use client';
import Image from "next/image";
import c1 from "@/assets/images/cards/c1.webp";
import c2 from "@/assets/images/cards/c2.webp";
import c3 from "@/assets/images/cards/c3.webp";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

export default function AboutFlyChamSection() {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const cards = [
    {
      image: c1,
      title: t("aboutFlyCham.cards.company.title"),
      description: t("aboutFlyCham.cards.company.description"),
      link: 'about'
    },
    {
      image: c2,
      title: t("aboutFlyCham.cards.mission.title"),
      description: t("aboutFlyCham.cards.mission.description"),
      link: 'Mission'
    },
    {
      image: c3,
      title: t("aboutFlyCham.cards.responsibility.title"),
      description: t("aboutFlyCham.cards.responsibility.description"),
      link: 'whoweare'
    },
  ];

  return (
    <section>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            // onClick={() => router.push(`/${card.link}`)}
            className="relative overflow-hidden rounded-2xl shadow-md transition duration-300 hover:shadow-xl hover:-translate-y-1 h-[300px] flex flex-col justify-end"
          >
            <div className="relative w-full h-full">
              <Image
                src={card.image}
                alt={card.title}
                fill
                className="object-cover w-full h-full"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent backdrop-blur-[0.5px]" />
            </div>

            <div className={`absolute bottom-4 w-full `}>
              <div className={`text-white max-w-[80%] flex flex-col text-start ${isRTL ? ' pr-4' : 'pl-4'}`}>
                <h3 className="text-lg md:text-xl font-bold drop-shadow-lg">{card.title}</h3>
                <p className="text-sm md:text-base text-secondary font-bold drop-shadow-md">{card.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
