import { useCallback, useEffect, useState } from 'react';

export default function useTTL() {
  const [text, setText] = useState('');


  const speakText = useCallback((text: string) => {
    const synth = window ? window.speechSynthesis : null
    if (synth !== null) {
      const utterance = new SpeechSynthesisUtterance(text);
      synth.speak(utterance);
      console.log(utterance)
    }
  }, []);

  useEffect(() => {
    speakText(text)
  }, [text, speakText])

  return [setText]
}