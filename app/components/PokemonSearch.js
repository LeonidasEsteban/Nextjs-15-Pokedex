'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PokemonSearch({ initialId, initialName }) {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState(initialName);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      router.push(`/blog/${searchValue.toLowerCase()}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 bg-white rounded-lg search">
      <div className="flex items-center gap-3">
        <span className="font-mono text-lg text-black">
          #{String(initialId).padStart(3, '0')}
        </span>
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="text-xl font-bold text-black capitalize bg-transparent outline-none placeholder:text-sm"
          placeholder="¿Quién es ese Pokemon?"
        />
      </div>
    </form>
  );
}