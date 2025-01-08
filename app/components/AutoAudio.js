'use client';
import { useEffect } from 'react';

export default function AutoAudio({ text }) {
  useEffect(() => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES';
    speechSynthesis.speak(utterance);

    return () => {
      speechSynthesis.cancel(); // Limpia el audio al desmontar
    };
  }, [text]);

  return null;
}