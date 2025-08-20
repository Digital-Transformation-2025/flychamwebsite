import ContactClient from './ContactClient';

export const metadata = {
  title: 'Contact Us – Fly Cham',
  description: 'Reach out to Fly Cham for inquiries, support, or partnership opportunities.',
  icons: {
    icon: '/tabicon.svg',
  },
  openGraph: {
    title: 'Contact Us – Fly Cham',
    description: 'Reach out to Fly Cham for inquiries, support, or partnership opportunities.',
    images: [
      {
        url: 'https://flycham.com/og-cover.jpg',
        width: 1200,
        height: 630,
        alt: 'Fly Cham OG Cover',
      },
    ],
  },
};

const Contact = () => {
  return <ContactClient />;
};

export default Contact;
