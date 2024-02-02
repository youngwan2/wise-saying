import { useCallback, useEffect, useState } from 'react';



/**
 * 
 * @example const [setText] = useTTL();
 * <button onClick={()=> setText('듣기할 텍스트를 전달하면 됩니다.')}>
 */
export default function useTTL() {
  const [text, setText] = useState('');

  const speakText = useCallback((text: string) => {
    const synth = window ? window.speechSynthesis : null
    if (synth !== null && text.length>1) {
      const utterance = new SpeechSynthesisUtterance(text);
      synth.speak(utterance);
    }
  }, []);

  useEffect(() => {
    speakText(text)
  }, [text, speakText])

  return [setText]
}