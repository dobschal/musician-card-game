import {Band} from "./classes/Band";
import Instrument, {InstrumentType} from "./classes/Instrument";
import Musician from "./classes/Musician";
import Song from "./classes/Song";

export const musicians: Array<Musician> = [
    new Musician(
        "Jack White",
        Band.TheWhiteStripes,
        [InstrumentType.Guitar, InstrumentType.Vocals],
        "musician-the-white-stripes-jack-white.png"
    ),
    new Musician(
        "Meg White",
        Band.TheWhiteStripes,
        [InstrumentType.Drums],
        "musician-the-white-stripes-meg-white.png"
    ),
    new Musician("Farin Urlaub",
        Band.DieAerzte,
        [InstrumentType.Guitar, InstrumentType.Vocals],
        "musician-die-aerzte-farin-urlaub.png"
    ),
    new Musician(
        "Rodrigo González",
        Band.DieAerzte,
        [InstrumentType.Bass, InstrumentType.Vocals],
        "musician-die-aerzte-rodrigo-gonzalez.png"
    ),
    new Musician(
        "Bela B.",
        Band.DieAerzte,
        [InstrumentType.Drums, InstrumentType.Vocals],
        "musician-die-aerzte-bela-b.png"
    ),
    new Musician(
        "Billie Joe Armstrong",
        Band.GreenDay,
        [InstrumentType.Guitar, InstrumentType.Vocals],
        "musician-green-day-billie-joe-armstrong.png"
    ),
    new Musician(
        "Mike Dirnt",
        Band.GreenDay,
        [InstrumentType.Bass, InstrumentType.Vocals],
        "musician-green-day-mike-dirnt.png"
    ),
    new Musician(
        "Tré Cool",
        Band.GreenDay,
        [InstrumentType.Drums],
        "musician-green-day-tre-cool.png"
    ),
    new Musician(
        "Kurt Cobain",
        Band.Nirvana,
        [InstrumentType.Guitar, InstrumentType.Vocals],
        "musician-nirvana-kurt-cobain.png"
    ),
    new Musician(
        "Dave Grohl",
        Band.Nirvana,
        [InstrumentType.Drums],
        "musician-nirvana-dave-grohl.png"
    ),
    new Musician(
        "Krist Novoselic",
        Band.Nirvana,
        [InstrumentType.Bass],
        "musician-nirvana-krist-novoselic.png"
    ),
    new Musician(
        "Dan Auerbach",
        Band.TheBlackKeys,
        [InstrumentType.Guitar, InstrumentType.Vocals],
        "musician-the-black-keys-dan-auerbach.png"
    ),
    new Musician(
        "Patrick Carney",
        Band.TheBlackKeys,
        [InstrumentType.Drums],
        "musician-the-black-keys-patrick-carney.png"
    ),
    new Musician(
        "Matt Bellamy",
        Band.Muse,
        [InstrumentType.Guitar, InstrumentType.Vocals],
        "musician-muse-matt-bellamy.png"
    ),
    new Musician(
        "Chris Wolstenholme",
        Band.Muse,
        [InstrumentType.Bass],
        "musician-muse-chris-wolstenholme.png"
    ),
    new Musician(
        "Dominic Howard",
        Band.Muse,
        [InstrumentType.Drums],
        "musician-muse-dominic-howard.png"
    ),
    new Musician(
        "Andrew Stockdale",
        Band.Wolfmother,
        [InstrumentType.Guitar, InstrumentType.Vocals],
        "musician-wolfmother-andrew-stockdale.png"
    ),
    new Musician(
        "Chris Ross",
        Band.Wolfmother,
        [InstrumentType.Bass],
        "musician-wolfmother-chris-ross.png"
    ),
    new Musician(
        "Myles Heskett",
        Band.Wolfmother,
        [InstrumentType.Drums],
        "musician-wolfmother-myles-heskett.png"
    ),
    new Musician(
        "Anthony Kiedis",
        Band.RedHotChiliPeppers,
        [InstrumentType.Vocals],
        "musician-red-hot-chili-peppers-anthony-kiedis.png"
    ),
    new Musician(
        "Flea",
        Band.RedHotChiliPeppers,
        [InstrumentType.Bass],
        "musician-red-hot-chili-peppers-flea.png"
    ),
    new Musician(
        "John Frusciante",
        Band.RedHotChiliPeppers,
        [InstrumentType.Guitar],
        "musician-red-hot-chili-peppers-john-frusciante.png"
    ),
    new Musician(
        "Chad Smith",
        Band.RedHotChiliPeppers,
        [InstrumentType.Drums],
        "musician-red-hot-chili-peppers-chad-smith.png"
    ),
    new Musician(
        "John Lennon",
        Band.Beatles,
        [InstrumentType.Guitar, InstrumentType.Vocals],
        "musician-the-beatles-john-lennon.png"
    ),
    new Musician(
        "Paul McCartney",
        Band.Beatles,
        [InstrumentType.Bass, InstrumentType.Vocals],
        "musician-the-beatles-paul-mccartney.png"
    ),
    new Musician(
        "George Harrison",
        Band.Beatles,
        [InstrumentType.Guitar, InstrumentType.Vocals],
        "musician-the-beatles-george-harrison.png"
    ),
    new Musician(
        "Ringo Starr",
        Band.Beatles,
        [InstrumentType.Drums],
        "musician-the-beatles-ringo-starr.png"
    ),
    new Musician(
        "Robert Plant",
        Band.LedZeppelin,
        [InstrumentType.Vocals],
        "musician-led-zeppelin-robert-plant.png"
    ),
    new Musician(
        "Jimmy Page",
        Band.LedZeppelin,
        [InstrumentType.Guitar],
        "musician-led-zeppelin-jimmy-page.png"
    ),
    new Musician(
        "John Paul Jones",
        Band.LedZeppelin,
        [InstrumentType.Bass],
        "musician-led-zeppelin-john-paul-jones.png"
    ),
    new Musician(
        "John Bonham",
        Band.LedZeppelin,
        [InstrumentType.Drums],
        "musician-led-zeppelin-john-bonham.png"
    ),
    new Musician(
        "Serj Tankian",
        Band.SystemOfADown,
        [InstrumentType.Vocals],
        "musician-system-of-a-down-serj-tankian.png"
    ),
    new Musician(
        "Daron Malakian",
        Band.SystemOfADown,
        [InstrumentType.Guitar, InstrumentType.Vocals],
        "musician-system-of-a-down-daron-malakian.png"
    ),
    new Musician(
        "Shavo Odadjian",
        Band.SystemOfADown,
        [InstrumentType.Bass],
        "musician-system-of-a-down-shavo-odadjian.png"
    ),
    new Musician(
        "John Dolmayan",
        Band.SystemOfADown,
        [InstrumentType.Drums],
        "musician-system-of-a-down-john-dolmayan.png"
    ),
    new Musician(
        "Chris Martin",
        Band.Coldplay,
        [InstrumentType.Vocals, InstrumentType.Guitar],
        "musician-coldplay-chris-martin.png"
    ),
    new Musician(
        "Jonny Buckland",
        Band.Coldplay,
        [InstrumentType.Guitar],
        "musician-coldplay-jonny-buckland.png"
    ),
    new Musician(
        "Guy Berryman",
        Band.Coldplay,
        [InstrumentType.Bass],
        "musician-coldplay-guy-berryman.png"
    ),
    new Musician(
        "Will Champion",
        Band.Coldplay,
        [InstrumentType.Drums],
        "musician-coldplay-will-champion.png"
    ),
];

export const instruments: Array<Instrument> = [];
for (const musician of musicians) {
    for (const instrumentType of musician.instruments) {
        instruments.push(
            new Instrument(
                instrumentType,
                instrumentType,
                "instrument-" + instrumentType.toLowerCase() + ".png"
            )
        );
    }
}

export const songs = [
    new Song(
        "Ball and Biscuit",
        Band.TheWhiteStripes,
        "song-ball-and-biscuit.png",
        [InstrumentType.Guitar, InstrumentType.Drums, InstrumentType.Vocals]
    ),
    new Song("Deine Schuld",
        Band.DieAerzte,
        "song-deine-schuld.png",
        [InstrumentType.Guitar, InstrumentType.Drums, InstrumentType.Vocals, InstrumentType.Bass]
    ),
    new Song(
        "Basket Case",
        Band.GreenDay,
        "song-basket-case.png",
        [InstrumentType.Guitar, InstrumentType.Drums, InstrumentType.Vocals, InstrumentType.Bass]
    ),
    new Song(
        "Have Love Will Travel",
        Band.TheBlackKeys,
        "song-have-love-will-travel.png",
        [InstrumentType.Guitar, InstrumentType.Drums, InstrumentType.Vocals]
    ),
    new Song(
        "Heart-Shaped Box",
        Band.Nirvana,
        "song-heart-shaped-box.png",
        [InstrumentType.Guitar, InstrumentType.Drums, InstrumentType.Vocals, InstrumentType.Bass]
    ),
    new Song(
        "Supermassive Black Hole",
        Band.Muse,
        "song-supermassive-black-hole.png",
        [InstrumentType.Guitar, InstrumentType.Drums, InstrumentType.Vocals, InstrumentType.Bass]
    ),
    new Song(
        "Joker and the Thief",
        Band.Wolfmother,
        "song-joker-and-the-thief.png",
        [InstrumentType.Guitar, InstrumentType.Drums, InstrumentType.Vocals, InstrumentType.Bass]
    ),
    new Song(
        "Can't Stop",
        Band.RedHotChiliPeppers,
        "song-cant-stop.png",
        [InstrumentType.Guitar, InstrumentType.Drums, InstrumentType.Vocals, InstrumentType.Bass]
    ),
    new Song(
        "Twist And Shout",
        Band.Beatles,
        "song-twist-and-shout.png"
    ),
    new Song(
        "Whole Lotta Love",
        Band.LedZeppelin,
        "song-whole-lotta-love.png",
        [InstrumentType.Guitar, InstrumentType.Drums, InstrumentType.Vocals, InstrumentType.Bass]
    ),
    new Song(
        "Chop Suey!",
        Band.SystemOfADown,
        "song-chop-suey.png",
        [InstrumentType.Guitar, InstrumentType.Drums, InstrumentType.Vocals, InstrumentType.Bass]
    ),
    new Song(
        "Viva La Vida",
        Band.Coldplay,
        "song-viva-la-vida.png",
        [InstrumentType.Guitar, InstrumentType.Drums, InstrumentType.Vocals, InstrumentType.Bass]
    )
];

export const allCards = [...songs, ...musicians, ...instruments];
