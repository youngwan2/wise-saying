# TTS(음성 듣기) 기능 구현 가이드

이 문서는 wise-saying 프로젝트에서 TTS(Text-to-Speech, 음성 듣기) 기능을 Web Speech API와 커스텀 React 훅으로 구현하는 방법을 안내합니다.

## 1. 개요
- 사용자가 명언을 클릭하면 해당 텍스트가 음성으로 재생됩니다.
- 진행률, 재생 상태, 현재 읽고 있는 텍스트 등도 UI에 표시할 수 있습니다.
- 모바일/데스크톱 모두 지원하며, SSR 환경에서도 안전하게 동작하도록 설계되었습니다.

## 2. 주요 파일 구조

- 커스텀 훅: `src/custom/useTTS.tsx`
- 사용 컴포넌트:
    - `src/components/UI/quote/card/QuoteCard.tsx`
    - `src/components/UI/quote/list/TodayQuoteList.tsx`
    - `src/components/UI/detail-quote/button/DetailPageControlButtons.tsx`
    - `src/components/UI/ai-quote/ConversationList.tsx`

## 3. 커스텀 훅 구현 방식

```tsx
// src/custom/useTTS.tsx
import { useCallback, useEffect, useState } from 'react';

export default function useTTS() {
  const [text, setText] = useState('');
  const [readText, setReadText] = useState('');
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const speakText = useCallback((text: string) => {
    const synth = window.speechSynthesis;
    if (synth && text.length > 1) {
      const utterance = new SpeechSynthesisUtterance(text);
      const readString = utterance.text;
      synth.speak(utterance);
      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      utterance.onboundary = (event) => {
        const charIndex = event.charIndex;
        const readingQuote = readString.slice(0, charIndex + 5);
        const progress = Math.min(Number(((charIndex + 7) / text.length * 100).toFixed(0)), 100);
        setProgress(progress);
        setReadText(readingQuote);
      };
      setText('');
    }
  }, []);

  useEffect(() => {
    if (window['speechSynthesis'] === undefined) return;
    speakText(text);
  }, [text, speakText, readText]);

  return { text, setText, readText, progress, isPlaying };
}
```

- `setText(텍스트)`를 호출하면 음성 재생이 시작됩니다.
- 진행률(progress), 현재 읽는 텍스트(readText), 재생 상태(isPlaying) 등도 함께 제공되어 UI에 활용할 수 있습니다.

## 4. 실제 사용 예시

```tsx
// 예시: QuoteCard.tsx
const { setText, readText, progress, isPlaying } = useTTS();
<button onClick={() => setText(quote)}>듣기</button>
// 진행률, 읽는 텍스트, 재생 상태 등도 UI에 표시 가능
```

## 5. SSR/클라이언트 안전성
- Next.js 환경에서 window/document 접근은 useEffect, isMounted 등으로 클라이언트에서만 실행되도록 처리해야 합니다.
- useTTS 훅은 클라이언트 전용으로 설계되어 있습니다.

## 6. 참고
- Web Speech API: [MDN 문서](https://developer.mozilla.org/ko/docs/Web/API/Web_Speech_API)
- 프로젝트 내 실제 구현 예시는 위 주요 파일 참고

---

문의/기여: youngwan2
