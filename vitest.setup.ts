import { beforeAll, afterEach, afterAll} from 'vitest'
import {server} from './src/mocks/node'

beforeAll(()=> server.listen())
afterEach(()=> server.restoreHandlers())
afterAll(()=> server.close())

// reference: https://mswjs.io/docs/integrations/node
// memo: 수명주기 이벤트를 등록한 것으로 네트워크 트래픽에 영향을 주지 않음.
server.events.on('request:start', ({request})=> {
    console.log('MSW intercepted', request.method, request.url)
})