import type { Metadata } from 'next';
import Breadcrumb from '@/components/Breadcrumb';
import HinnastoContent from '@/components/HinnastoContent';

export const metadata: Metadata = {
  title: 'Hinnasto',
  description: 'Nokian Tanssiaseman hinnasto 2026: viikoittaisten tanssituntien kuukausimaksut sekä tanssikorttien hinnat aikuisille ja opiskelijoille.',
  alternates: {
    canonical: 'https://nokiantanssiasema.fi/hinnasto'
  },
  openGraph: {
    title: 'Hinnasto | Nokian Tanssiasema',
    description: 'Nokian Tanssiaseman hinnasto 2026: viikoittaisten tanssituntien kuukausimaksut sekä tanssikorttien hinnat aikuisille ja opiskelijoille.',
    url: 'https://nokiantanssiasema.fi/hinnasto',
    locale: 'fi_FI',
    type: 'website'
  }
};

export default function Hinnasto() {
  return (
    <>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Breadcrumb
          items={[
            { name: 'Etusivu', url: 'https://nokiantanssiasema.fi' },
            { name: 'Hinnasto', url: 'https://nokiantanssiasema.fi/hinnasto' }
          ]}
        />
      </div>
      <HinnastoContent />
    </>
  );
}
