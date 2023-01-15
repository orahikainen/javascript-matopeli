# Javascript Matopeli

Matopeli on 1970-luvulla kehitetty videopelityyppi, joka tuli suosituksi matkapuhelinpelinä 1990-luvulla. Tyypillisesti peleissä ohjataan matoa, joka kuolee törmätessään itseensä tai pelikentän laitoihin. Keräämällä pelikentältä "ruokaa" pelaaja saa pisteitä, mutta samalla mato kasvaa pituutta ja peli vaikeutuu. Madon liikevauhti saattaa myös nopeutua pisteiden karttuessa.

Tämä tutoriaali on suuniteltu niille, jotka eivät vielä ole käyttänyt JavaScript frameworkejä.

### Miksi Svelte eikä normaali JavaScript?

#### Syy 1:

- Sveltessä on hyvä dokumentointi (svelte.dev).

#### Syy 2:

- Vähän koodia, paljon toiminnallisuutta.

#### Syy 3

- Svelte on kevyt ja helppolukuinen.

## Vaatimukset

- Node.js
- Koodieditori on vahvasti suositeltu, mutta ei pakollinen (esim. Visual Studio Code)
- Vähän tietoa koodaamisesta

## Tutoriaalin aloittaminen

Avaa konsoli (tai Visual Studio Code terminaali), etsi kansio, johon haluat ladata projektin cd [kansion nimi] komentoa käyttäen. Voit nähdä kansiot, joihin voit liikkua käyttämällä komentoa "dir". Kun löydät oikean kansion, tai teet uuden kansion mkdir [kansion nimi] komennolla, kopioi alla oleva komento ja liitä se konsoliin/terminaaliin.

	git clone https://github.com/orahikainen/javascript-matopeli.git

### Malliprojektin toimintaan saanti

Alla olevilla ohjeilla pääsee testaamaan, millainen valmiin projektin pitäisi olla.
Pelissä liikutaan wasd tai nuolinäppäimillä.

```
cd javascript-matopeli
cd example-code
npm i
npm run dev
avaa selaimessa http://localhost:5000/
```

### Projektipohjan täydentäminen

Tehtävänä on muokata Snake-komponenttia niin, että se toimii samalla tavalla kuin malliprojektissa.
Muita komponentteja ei tarvitse muokata.

Tarvittavat toiminnot, jotta projektia pääsee testaamaan:

- Update-looppi
- Madon liikkuminen

### Koodin testaaminen

Näillä komennoilla projektiä pääsee testaamaan:

```
- cd javascript-matopeli
- cd tutorial-template
- npm i
- npm run dev
```

Kun jokin projektin tiedostoista tallennetaan, projekti päivitetään selaimessa alle sekunnissa.
Näin pystyt tekemään muutoksia nopeasti.

Virheet näkyvät selaimessa tai/ja koodieditorissa. Jos et ymmärrä mitä virhekoodi tarkoittaa, laita se googleen.

## Lisäys-ideat

- Pisteet
- Madon nopeuttaminen