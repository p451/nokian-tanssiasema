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
      <ClassOffering />
      <Schedule />
      <Gallery />
      <Registration />
      <Contact />
      <Footer />
    </main>
  );
}
