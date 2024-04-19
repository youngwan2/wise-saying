import {mockToday} from './mockData'
import { http, HttpResponse } from 'msw';
//  quote_id, quote, author, job, birth
export const handlers = [
    http.get('http://localhost:3000/api/quote/today', () => {
        return HttpResponse.json(mockToday)
    })
]