import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import ClassOffering from '@/components/ClassOffering';
import Schedule from '@/components/Schedule';
import Gallery from '@/components/Gallery';
import Registration from '@/components/Registration';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      
      {/* Esittelyteksti Section */}
      <section className="py-32 my-24">
        <div className="max-w-xl mx-auto text-center space-y-12 px-8 min-h-[400px] flex flex-col justify-center">
          <h2 className="heading_h2">Nokian Tanssiasema</h2>
          <p className="paragraph_large leading-relaxed">
            On kulkenut nokialaisten rinnalla jo yli 50 vuotta – tanssin ilon, ilmaisun ja kasvun paikkana. Meillä jokainen saa tanssia omalla tavallaan, omassa tahdissaan. Opetus on monipuolista ja etenee lempeästi tasolta toiselle, kokeneiden ja sydämellisten opettajien ohjauksessa. Tunnit ovat avoimia kaikenikäisille ja -tasoisille – meiltä löydät oman paikkasi tanssin maailmassa.
          </p>
        </div>
      </section>

      <ClassOffering />
      <Schedule />
      <Gallery />
      <Registration />
      <Contact />
      <Footer />
    </main>
  );
}
