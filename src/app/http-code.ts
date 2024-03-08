
interface HTTP_CODE_TYPE {
    [key: string]: {
        meg: string,
        success: boolean,
        status: number
    }
}
/**
 * @example
 * import {HTTP_CODE} from '..'
 * 
 * // 200 | HTTP_CODE.OK
 * // 201 | HTTP_CODE.CREATED
 * // 204 | HTTP_CODE.NO_CONTENT
 * // 400 | HTTP_CODE.BAD_REQUEST
 * // 401 | HTTP_CODE.UNAUTHORIZED
 * // 404 | HTTP_CODE.NOT_FOUND
 * // 500 | HTTP_CODE.INTERNAL_SERVER_ERROR
 */
export const HTTP_CODE= {
    'OK': {
        meg: '성공적으로 요청을 처리하였습니다.',
        success: true,
        status: 200
    },
    'CREATED': {
        meg: '성공적으로 요청하신 데이터를 반영 하였습니다. ',
        success: true,
        status: 201
    },
    'NO_CONTENT': {
        meg: '정상적으로 삭제처리 되었습니다. ',
        success: true,
        status: 204
    },
    'BAD_REQUEST': {
        meg: '잘못된 요청입니다.',
        success: false,
        status: 400
    },
    'UNAUTHORIZED': {
        meg: '요청 권한이 없습니다. 현재 사이트에서 요구하는 접근 권한이 존재하는지 확인해주세요.',
        success: false,
        status: 401
    },
    'NOT_FOUND': {
        meg: '요청하신 데이터를 찾을 수 없습니다.',
        success: false,
        status: 404
    },
    'INTERNAL_SERVER_ERROR': {
        meg: '서버에서 문제가 발생하였습니다. 나중에 다시시도 해주세요.',
        success: false,
        status: 500
    }
}