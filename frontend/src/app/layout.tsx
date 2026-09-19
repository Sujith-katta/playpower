import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Romantic Jacuzzi 18HK Candolim  Mirashya UG10 - Condominiums for Rent in Candolim, Goa, India - Airbnb',
  description:
    'Experience romantic luxury in Candolim, Goa! Private heated Jacuzzi, serene poolside view, plush king bed, and elegant interior design. Book now on Airbnb.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-screen bg-white text-gray-900 antialiased">{children}</body>
    </html>
  );
}
