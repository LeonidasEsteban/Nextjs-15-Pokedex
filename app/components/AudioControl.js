'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function AudioControl({ text }) {
  const [isAutoPlayEnabled, setIsAutoPlayEnabled] = useState(false);
  const pathname = usePathname();

  // Cargar preferencia al montar
  useEffect(() => {
    const savedPreference = localStorage.getItem('pokedexAutoPlay');
    setIsAutoPlayEnabled(savedPreference === 'true');
  }, []);

  // Efecto para manejar la reproducción
  useEffect(() => {
    if (isAutoPlayEnabled && text) {
      console.log('Intentando reproducir:', text); // Para depuración
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-ES';
      speechSynthesis.cancel(); // Cancelar cualquier reproducción anterior
      speechSynthesis.speak(utterance);
    }

    return () => {
      speechSynthesis.cancel();
    };
  }, [text, isAutoPlayEnabled, pathname]);

  const toggleAutoPlay = () => {
    const newValue = !isAutoPlayEnabled;
    setIsAutoPlayEnabled(newValue);
    localStorage.setItem('pokedexAutoPlay', newValue.toString());

    if (newValue && text) {
      // Reproducir inmediatamente al activar
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-ES';
      speechSynthesis.cancel();
      speechSynthesis.speak(utterance);
    } else {
      speechSynthesis.cancel();
    }
  };

  return (
    <button
      onClick={toggleAutoPlay}
      className="p-2 hover:bg-[#8b1c21] rounded-lg transition-colors"
      title={isAutoPlayEnabled ? "Desactivar narración automática" : "Activar narración automática"}
    >
      {isAutoPlayEnabled ? (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
        </svg>
      ) : (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15zM17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
        </svg>
      )}
    </button>
  );
}