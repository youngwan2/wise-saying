import {mockAiCommentation, mockToday} from './mockData'
import { http, HttpResponse } from 'msw';

export const handlers = [
    // 오늘의 명언
    http.get('/api/quotes/today', () => {
        return HttpResponse.json(mockToday)
    }),
    // AI 명언 해석
    http.post('/api/quotes/ai/commentation', () => {
        return HttpResponse.json(mockAiCommentation)
    })
]

