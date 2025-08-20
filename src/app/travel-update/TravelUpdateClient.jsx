'use client';

import React from 'react';
import bg1 from '@/assets/images/travel-update/bg1.webp';
import { useTranslation } from 'react-i18next';
import TravelCard from '@/components/Travel-update/TravelCard';
import Hero from '@/components/Travel-update/Hero';

const TravelUpdateClient = () => {
  const { t } = useTranslation();

  const slides = [bg1];

  const countryKeys = ['UAE', 'Kuwait', 'Iraq', 'Muscat'];

  const updates = countryKeys.map((key) => ({
    label: t('travelCard.updateLabel'),
    date: t('travelCard.lastUpdated'),
    title: t(`travelCard.title${key}`),
    description: t(`travelCard.description${key}`),
    linkText: t('travelCard.linkText'),
    moreText: t('travelCard.moreText'),
    buttonText: t('travelCard.buttonText'),
    contactText: t('travelCard.contactText'),
    slug: `flight-suspension-${key.toLowerCase().replace(/\s+/g, '-')}`
  }));

  const today = new Date();
  const formattedDate = `${t('travelCard.lastUpdated')}`;
  const formattedDate1 = t('travelCard.lastUpdated1');
  const formattedDate2 = t('travelCard.lastUpdated2');



  return (
    <>
      <Hero
        slides={slides}
        title={t('travelsliderTitle')}
        objectFit="cover"
        parentHeight="responsive"
        height="responsive"
        subTitle={t("travelsliderSubTitle")}
      />

      <div className="w-[90%] md:w-[80%] mx-auto my-6 px-2 py-4">
        <div className='mb-10'>

          <TravelCard update={{
            label: t('travelCard.updateLabel'),
            date: t('travelCard.lastUpdated3'),
            title: t(`travelCard.updateLabel3`),
            description: t(`travelCard.updatecontinue`),
            slug: `flight-continue-dam-aleppo`
          }} />


        </div>
        <div className='mb-10'>

          <TravelCard update={{
            label: t('travelCard.updateLabel'),
            date: t('travelCard.lastUpdated2'),
            title: t(`travelCard.newUpdate`),
            description: t(`travelCard.descriptionnewUpdate`),
            slug: `flight-suspension-dam-aleppo`
          }} />


        </div>
        <div className='mb-10'>

          <TravelCard update={{
            label: t('travelCard.updateLabel'),
            date: t('travelCard.lastUpdated1'),
            title: t(`travelCard.damAleppo`),
            description: t(`travelCard.descriptionDamAleppo`),
            slug: `flight-suspension-dam-aleppo`
          }} />


        </div>
        {updates.map((update, index) => (
          <div key={index} className="mb-10">
            <TravelCard update={update} isFindMore />
          </div>
        ))}
      </div>
    </>
  );

};

export default TravelUpdateClient;
