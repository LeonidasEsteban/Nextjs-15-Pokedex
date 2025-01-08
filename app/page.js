import Link from 'next/link';
import styles from './page.module.css'
async function getPokemonList() {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150', {
    cache: 'force-cache'
  });
  const data = await res.json();
  return data.results;
}

export default async function BlogPage() {
  const pokemon = await getPokemonList();

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="mb-8 text-4xl font-bold text-center">Pokédex</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {pokemon.map((poke) => (
          <Link
            href={`/${poke.name}`}
            key={poke.name}
            className="block p-6 transition-shadow duration-300 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg"
          >
            <h2 className="text-xl font-semibold text-gray-800 capitalize">{poke.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}