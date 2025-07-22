import Link from 'next/link';

export default function TermsOfUse() {
  return (
    <div className="min-h-screen bg-neutral-secondary/10 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h1 className="heading_h1 mb-8 text-center">Käyttöehdot</h1>
          <div className="prose prose-lg max-w-none">
            <h2>Ilmoittautuminen</h2>
            <p>Oppilaaksi ilmoittaudutaan Tanssiaseman kotisivujen kautta. Ilmoittautuminen on voimassa sekä syys- että kevätkauden.</p>

            <h2>Ilmoittautumisen peruminen</h2>
            <p>Oppilaspaikan peruminen on aina ilmoitettava kirjallisella ilmoituksella sähköpostitse. Tunneilta poisjääminen tai suullisesti opettajalle kertominen ei ole oppilaspaikan peruutus. Oppilasmaksu tulee suorittaa siihen asti, kunnes kirjallinen ilmoitus on tehty.</p>

            <h2>Maksut</h2>
            <p><strong>OPPILASMAKSUT</strong> suoritetaan koululta saadulla pankkisiirrolla eräpäivään mennessä viitenumeroa käyttäen. Kuukausimaksun eräpäivä on aina kuukauden 10. päivänä. Huomautusmaksuun lisätään 8% viivästyskorkoa.</p>

            <p><strong>TANSSIKORTTI</strong> on tarkoitettu aikuisille ja opiskelijoille (lukion jälk. opinnot), jotka eivät pääse käymään tunneilla säännöllisesti. Kortti on voimassa 3 kuukautta ostopäivästä. Käyttämättömiä kertoja ei lunasteta takaisin, eikä niitä voi siirtää seuraavaan korttiin. Voimassaolopäivää muutetaan vain lääkärintodistusta vastaan. Tanssikortti on henkilökohtainen.</p>

            <p><strong>SISARALENNUS</strong> on 20% ja se lasketaan vähemmän viikkotunteja käyvälle sisarukselle.</p>

            <h2>Poissaolot</h2>
            <p>Satunnaisia poissaoloja ei korvata rahassa. Tunteja voi käydä korvaamassa saman tason tai tasoa alemmalla tunnilla. Korvauksista tulee sopia etukäteen opettajan kanssa. Arkipyhinä ei ole opetusta, joten niiden vuoksi pois jääviä tunteja ei hyvitetä. Pitkäaikaisesta sairaudesta (n.3-4vkoa) johtuvasta poissaolosta hyvitetään vain lääkärintodistusta vastaan.</p>

            <h2>Vastuu</h2>
            <p>Opettajan vastuu oppilaasta rajoittuu opetustilanteeseen. Ennen oppituntia huoltajan tulee odottaa, kunnes oppilas on oppitunnilla, ja tunnin jälkeen huoltajan tulee olla ajoissa oppilasta odottamassa (lasten tunnit). Opisto ei vastaa kadonneista tavaroista. Opisto ei vastaa turhasta tunnille tulosta, mikäli oppilas ei ole ilmoittanut ajan tasalla olevia yhteystietoja opistolle. Opisto ei ole vakuuttanut oppilaita. Oppilas voi itse hankkia oman tapaturmavakuutuksen.</p>

            <h2>Yleistä</h2>
            <p>Opiston toimitilat avataan viimeistään 15min ennen päivän ensimmäisen oppitunnin alkua. Pukutilat ovat pääsääntöisesti tarkoitettu vain oppilaille. Opiston tiloissa käyttäydytään rauhallisesti, opettajien ja oppilaiden työtä kunnioittaen. Tuntien aikana matkapuhelimet pidetään äänettömällä. Opistolla on oikeus tunti- ja opettajamuutoksiin. Älä tule sairaana tunnille. Ilmoita poissaoloista opettajalle. Jokainen oppilas maksaa itse mahdolliset kisamatkat ja niistä aiheutuvat kulut. Tanssiaseman tunneilla ja kursseilla valmistetut esitykset ja koreografiat ovat tekijänoikeuslain alaisia. Niitä ei saa esittää eikä julkaista ilman tanssikoulun ja koreografin lupaa.</p>

            <h2>Poikkeustilanteet</h2>
            <p>Meistä riippumattoman ylivoimaisen esteen sattuessa, esim. Covid-19 kaltaisen epidemian ilmaantuessa, tanssikoulun opetus siirtyy etäopetukseen hallituksen tai Avi:n linjauksen mukaan. Tanssikoulu ei ole velvollinen korvaamaan tilanteesta peruuntuvia lähiopetustunteja.</p>
          </div>
          
          <div className="text-center mt-8">
            <Link href="/" className="btn btn_primary_solid">
              Palaa etusivulle
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}