import Link from 'next/link';

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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Pokédex</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {pokemon.map((poke) => (
          <Link
            href={`/blog/${poke.name}`}
            key={poke.name}
            className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200"
          >
            <h2 className="text-xl font-semibold capitalize text-gray-800">{poke.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}