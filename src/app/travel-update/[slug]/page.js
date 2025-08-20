import React from 'react';
import bg1 from '@/assets/images/travel-update/bg1.webp';
import Hero from '@/components/Travel-update/Hero';
import TravelCard from '@/components/Travel-update/TravelCard';
import { TravelUpdateDetail } from '@/components/Travel-update/TravelUpdateDetail';

export async function generateStaticParams() {
  const slugs = [
    'flight-suspension-uae',
    'flight-suspension-kuwait',
    'flight-suspension-iraq',
    'flight-suspension-muscat'
  ];

  return slugs.map(slug => ({ slug }));
}


const travelUpdates = {
  'flight-suspension-uae': {
    label: 'Update',
    pageTitle: "travelCard.pageTitle",
    date: 'travelCard.lastUpdated',
    title: 'travelCard.titleUAE',
    subTitle: 'travelPage.subTitleUAE',
    country: 'travelPage.countryUAE'
  },
  'flight-suspension-kuwait': {
    label: 'Update', pageTitle: "travelCard.pageTitle",

    date: 'travelCard.lastUpdated',
    title: 'travelCard.titleKuwait',
    subTitle: 'travelPage.subTitleKuwait',
    country: 'travelPage.countryKuwait'

  },
  'flight-suspension-iraq': {
    label: 'Update', pageTitle: "travelCard.pageTitle",

    date: 'travelCard.lastUpdated',
    title: 'travelCard.titleIraq',
    subTitle: 'travelPage.subTitleIraq',
    country: 'travelPage.countryIraq'

  },
  'flight-suspension-muscat': {
    label: 'Update', pageTitle: "travelCard.pageTitle",

    date: 'travelCard.lastUpdated',
    title: 'travelCard.titleMuscat',
    subTitle: 'travelPage.subTitleMuscat',
    country: 'travelPage.countryMuscat'

  }
};


const Page = ({ params }) => {
  const { slug } = params;
  const updateData = travelUpdates[slug];
  const slides = [bg1];

  if (!updateData) {
    return (
      <div className="text-center py-10 text-xl text-red-500">
        Update not found for <span className="font-bold">{slug}</span>
      </div>
    );
  }

  return (
    <>
      <Hero
        slides={slides}
        title={(updateData.pageTitle)}
        subTitle={(updateData.subTitle)}
        country={(updateData.country)}
        objectFit="cover"
        parentHeight="responsive"
        height="responsive"
      />

      <div className="w-[90%] md:w-[80%] mx-auto px-2 py-4">
        <TravelUpdateDetail slug={slug} />
      </div>
    </>
  );
};

export default Page;
