import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-neutral-secondary/10 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h1 className="heading_h1 mb-8 text-center">Tietosuojaseloste</h1>
          <div className="prose prose-lg max-w-none">
            <p className="text-center mb-8"><em>Voimassa 1.1.2025 alkaen</em></p>

            <h2>1. Rekisterinpitäjä</h2>
            <p><strong>Balettikoulu Katja Suova / Nokian Tanssiasema</strong><br />
            Y-tunnus: 1139259-9<br />
            Osoite: Nokian valtatie 25, 37100 Nokia<br />
            Puhelin: 050 554 1382<br />
            Sähköposti: info@nokiantanssiasema.fi</p>

            <h2>2. Yhteyshenkilö tietosuoja-asioissa</h2>
            <p>Katja Suova<br />
            Puhelin: 050 554 1382<br />
            Sähköposti: info@nokiantanssiasema.fi</p>

            <h2>3. Henkilötietojen käsittelyn tarkoitus ja oikeusperuste</h2>
            <h3>Käsittelyn tarkoitus:</h3>
            <ul>
              <li>Oppilaiden ilmoittautumisten käsittely ja hallinta</li>
              <li>Asiakassuhteen hoitaminen ja ylläpitäminen</li>
              <li>Laskutus ja maksujen seuranta</li>
              <li>Opetuksen järjestäminen</li>
              <li>Viestintä oppilaiden ja huoltajien kanssa</li>
              <li>Lakisääteisten velvoitteiden täyttäminen</li>
            </ul>

            <h3>Oikeusperuste (GDPR artikla 6):</h3>
            <ul>
              <li>Sopimuksen täyttäminen (oppilassopimus)</li>
              <li>Rekisterinpitäjän oikeutettu etu (asiakassuhteen hoitaminen, liiketoiminnan harjoittaminen)</li>
              <li>Lakisääteisen velvoitteen noudattaminen (kirjanpito)</li>
              <li>Suostumus (markkinointiviestintä)</li>
            </ul>

            <h2>4. Käsiteltävät henkilötietoryhmät</h2>
            <h3>Oppilastiedot:</h3>
            <ul>
              <li>Nimi</li>
              <li>Syntymäaika</li>
              <li>Yhteystiedot (osoite, puhelinnumero, sähköpostiosoite)</li>
              <li>Ilmoittautumistiedot (valitut tunnit, taitotaso)</li>
              <li>Aiempi tanssikokemus</li>
              <li>Terveydentila ja mahdolliset rajoitukset (vapaaehtoinen)</li>
              <li>Poissaolotiedot</li>
              <li>Laskutus- ja maksutiedot</li>
            </ul>

            <h3>Huoltajatiedot (alaikäisten oppilaiden osalta):</h3>
            <ul>
              <li>Nimi</li>
              <li>Yhteystiedot</li>
              <li>Suhde oppilaaseen</li>
            </ul>

            <h2>5. Henkilötietojen säilytysaika</h2>
            <ul>
              <li><strong>Oppilastiedot</strong>: Säilytetään asiakassuhteen ajan ja 3 vuotta sen päättymisen jälkeen</li>
              <li><strong>Laskutustiedot</strong>: Säilytetään kirjanpitolain mukaisesti 10 vuotta</li>
              <li><strong>Markkinointisuostumukset</strong>: Säilytetään suostumuksen peruuttamiseen saakka</li>
            </ul>

            <h2>6. Henkilötietojen luovutus ja siirto</h2>
            <p>Henkilötietoja ei luovuteta kolmansille osapuolille, paitsi:</p>
            <ul>
              <li>Lakisääteisten velvoitteiden täyttämiseksi (esim. verottaja, kirjanpitäjä)</li>
              <li>Laskutuspalvelun toteuttamiseksi (pankit, maksunvälityspalvelut)</li>
            </ul>
            <p>Henkilötietoja ei siirretä EU/ETA-alueen ulkopuolelle.</p>

            <h2>7. Henkilötietojen suojaus</h2>
            <p>Henkilötiedot suojataan asiattomalta käsittelyltä seuraavilla toimenpiteillä:</p>
            <ul>
              <li>Käyttöoikeuksien hallinta</li>
              <li>Salasanasuojaus</li>
              <li>Fyysinen suojaus (lukitut tilat)</li>
              <li>Säännölliset varmuuskopioinnit</li>
              <li>Henkilöstön koulutus tietosuoja-asioissa</li>
            </ul>

            <h2>8. Rekisteröidyn oikeudet</h2>
            <p>Sinulla on oikeus:</p>
            <ul>
              <li><strong>Tarkastusoikeus</strong>: Saada tieto käsiteltävistä henkilötiedoistasi</li>
              <li><strong>Oikeus tietojen oikaisemiseen</strong>: Vaatia virheellisten tietojen korjaamista</li>
              <li><strong>Oikeus tietojen poistamiseen</strong>: Vaatia henkilötietojesi poistamista tietyissä tilanteissa</li>
              <li><strong>Oikeus käsittelyn rajoittamiseen</strong>: Vaatia käsittelyn rajoittamista tietyissä olosuhteissa</li>
              <li><strong>Vastustamisoikeus</strong>: Vastustaa henkilötietojesi käsittelyä oikeutetun edun perusteella</li>
              <li><strong>Oikeus siirtää tiedot järjestelmästä toiseen</strong>: Saada henkilötietosi koneellisesti luettavassa muodossa</li>
              <li><strong>Oikeus peruuttaa suostumus</strong>: Peruuttaa antamasi suostumus milloin tahansa</li>
            </ul>

            <h2>9. Yhteydenotto ja valitusoikeus</h2>
            <p>Voit ottaa yhteyttä rekisterinpitäjään tietosuoja-asioissa:</p>
            <ul>
              <li>Sähköpostitse: info@nokiantanssiasema.fi</li>
              <li>Puhelimitse: 050 554 1382</li>
            </ul>

            <p>Sinulla on oikeus tehdä valitus tietosuojaviranomaiselle, jos katsot, että henkilötietojesi käsittely rikkoo tietosuoja-asetusta.</p>

            <p><strong>Tietosuojavaltuutetun toimisto</strong><br />
            Käyntiosoite: Ratapihantie 9, 6. krs, 00520 Helsinki<br />
            Postiosoite: PL 800, 00521 Helsinki<br />
            Sähköposti: tietosuoja@om.fi<br />
            Puhelin: 029 566 6700</p>

            <h2>10. Evästeet (cookies)</h2>
            <p>Verkkosivustomme käyttää teknisesti välttämättömiä evästeitä sivuston toimivuuden varmistamiseksi. Emme käytä seurantaevästeitä tai analytiikkapalveluja ilman erillistä suostumustasi.</p>

            <h2>11. Muutokset tietosuojaselosteeseen</h2>
            <p>Pidätämme oikeuden päivittää tätä tietosuojaselosteen. Merkittävistä muutoksista ilmoitamme etukäteen verkkosivuillamme tai sähköpostitse.</p>

            <hr className="my-8" />
            <p className="text-center"><em>Tämä tietosuojaseloste on laadittu EU:n yleisen tietosuoja-asetuksen (GDPR) ja Suomen tietosuojalain vaatimusten mukaisesti.</em></p>
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