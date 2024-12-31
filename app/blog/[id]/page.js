import { Vibrant } from "node-vibrant/node";
import Link from 'next/link';
import { typeColors } from '../utils/typeColors';
import StatsRadar from '../components/StatsRadar';
import AudioControl from '../components/AudioControl';
import PokemonImage from '../components/PokemonImage';
import { translateType } from '../../utils/typeTranslations';
import PokemonSearch from '../components/PokemonSearch';
async function getPokemonData(name) {
  const [pokemonRes, speciesRes] = await Promise.all([
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`, {
      cache: 'force-cache'
    }),
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`, {
      cache: 'force-cache'
    })
  ]);

  const [data, speciesData] = await Promise.all([
    pokemonRes.json(),
    speciesRes.json()
  ]);

  const description = speciesData.flavor_text_entries
    .find(entry => entry.language.name === 'es')?.flavor_text
    .replace(/\f/g, ' ')
    || speciesData.flavor_text_entries[0].flavor_text;

  const listRes = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150', {
    cache: 'force-cache'
  });
  const listData = await listRes.json();
  const currentIndex = listData.results.findIndex(p => p.name === name);

  const prevPokemon = currentIndex > 0 ? listData.results[currentIndex - 1] : null;
  const nextPokemon = currentIndex < 149 ? listData.results[currentIndex + 1] : null;

  const palette = await Vibrant.from(data.sprites.front_default).getPalette();
  const colors = [
    palette.Vibrant?.hex,
    palette.LightVibrant?.hex,
    palette.DarkVibrant?.hex
  ].filter(Boolean);

  return { ...data, colors, prevPokemon, nextPokemon, description };
}

export async function generateStaticParams() {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
  const data = await res.json();

  return data.results.map((pokemon) => ({
    id: pokemon.name
  }));
}

export default async function PokemonPage({ params }) {
  const { id } = await params;
  const pokemon = await getPokemonData(id);

  return (
    <main className="pokedex is-open" id="pokedex" tabIndex="0">
      <div className="pokedex-main" aria-label="Información general del Pokémon">
        <div className="header-shadow">
          <div className="header">
            <span className="light is-big is-sky" id="light"></span>
            <span className="light is-red"></span>
            <span className="light is-yellow"></span>
            <span className="light is-green"></span>
            <AudioControl text={pokemon.description} />
          </div>
        </div>
        <PokemonImage
          sprite={pokemon.sprites.front_default}
          name={pokemon.name}
          colors={pokemon.colors}
        />

        <div className="actions">
          <PokemonSearch
            initialId={pokemon.id}
            initialName={pokemon.name}
          />

          <div className="description">
            <p id="description">{pokemon.description}</p>
          </div>
          <div className="variants">
            {pokemon.types.map((typeObj) => (
              <span
                key={typeObj.type.name}
                className={`px-2 py-1 rounded text-white text-sm`}
                style={{ background: typeColors[typeObj.type.name].bg }}
              >
                <span style={{ color: typeColors[typeObj.type.name].text }}>
                  {translateType(typeObj)}
                </span>
              </span>
            ))}
          </div>
          <div className="navigation">
            {pokemon.prevPokemon && (
              <Link
                className="navigation-left" aria-label={pokemon.prevPokemon.name}
                href={`/blog/${pokemon.prevPokemon.name}`}
              >
              </Link>
            )}
            {pokemon.nextPokemon && (
              <Link
                href={`/blog/${pokemon.nextPokemon.name}`}
                className="navigation-right"
                aria-label={pokemon.nextPokemon.name}
              >
              </Link>
            )}
            <button id="next-image" className="navigation-down" aria-label="Siguiente imagen del pokémon"></button>
            <button id="prev-image" className="navigation-up" aria-label="Imagen anterior del pokémon"></button>
          </div>
        </div>
      </div>

      <div className="cover-front">
      </div>
      <section className="cover-back" aria-label="Estadísticas del Pokémon">
        <div className="stats">
          <StatsRadar stats={pokemon.stats} />
        </div>
      </section>
    </main>
  );
}