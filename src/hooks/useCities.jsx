'use client';

import { useTranslation } from 'react-i18next';

const useCities = () => {
  const { t } = useTranslation();

  const cities = [
    {
      name: t('cities.dubai.name'),
      value: 'DXB',
      label: t('cities.dubai.label'),
    },
    {
      name: t('cities.kuwait.name'),
      value: 'KWI',
      label: t('cities.kuwait.label'),
    },
    {
      name: t('cities.damascus.name'),
      value: 'DAM',
      label: t('cities.damascus.label'),
    },
    {
      name: t('cities.aleppo.name'),
      value: 'ALP',
      label: t('cities.aleppo.label'),
    },
    {
      name: t('cities.muscat.name'),
      value: 'MCT',
      label: t('cities.muscat.label'),
    },
    {
      name: t('cities.abudhabi.name'),
      value: 'AUH',
      label: t('cities.abudhabi.label'),
    },
    {
      name: t('cities.sharjah.name'),
      value: 'SHJ',
      label: t('cities.sharjah.label'),
    },
    {
      name: t('cities.erbil.name'),
      value: 'EBL',
      label: t('cities.erbil.label'),
    },
    {
      name: t('cities.baghdad.name'),
      value: 'BGW',
      label: t('cities.baghdad.label'),
    },
  ];

  return cities;
};

export default useCities;
