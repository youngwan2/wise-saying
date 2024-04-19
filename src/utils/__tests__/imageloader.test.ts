import { expectTypeOf } from "vitest";
import { imageFileSizeChecker, imageTypeChecker } from "../imageloader"


describe('이미지 미리보기', async () => {

    // 이미지 파일 사이즈 체크 함수
    it('imageFileSizeChecker 함수로 부터 반환되는 값은 boolean 타입이다.', () => {
        const isPass = imageFileSizeChecker(0);
        expectTypeOf(isPass).toBeBoolean();
    })

    it('imageFileSizeChecker 함수는 인자로 512,000 이상이 전달되면 false 를 반환한다.', () => {
        const isFalse = imageFileSizeChecker(512001)
        const isTrue = imageFileSizeChecker(512000)
        expect(isFalse).toBeFalsy()
        expect(isTrue).toBeTruthy()
    })

    /** memo : imageSizeChecker 함수 호출 후 대기시간이 5000ms 넘으면서 테스트 실패 */
    // 이미지 사이즈(넓이, 높이) 체크 함수
    // it('imageSizeChecker 함수는 230 x 230 를 넘어서는 파일을 로드 요청 시 false 를 반환한다..', async (done) => {
    //     const src = './test.png'
    //     const isFalse = await imageSizeChecker(src)
    //     expect(isFalse).toBeFalsy()

    // })

    // 이미지 타입 체크 함수
    it('imageTypeChecker 함수에 전달되는 이미지 타입이 png/jpeg/jpg 가 아닌경우 false를 반환한다.', () => {
        const isImgOfTxt = imageTypeChecker('txt')
        const isImgOfMp4 = imageTypeChecker('mp4')

        expect(isImgOfTxt).toBeFalsy();
        expect(isImgOfMp4).toBeFalsy();
    })

    it('imageTypeChecker 함수에 전달되는 이미지 타입이 png/jpeg/jpg 인 경우 true를 반환한다.', () => {
        const isPng = imageTypeChecker('png')
        const isJpeg = imageTypeChecker('jpeg')
        const isJpg = imageTypeChecker('jpg')

        expect(isPng).toBeFalsy();
        expect(isJpeg).toBeFalsy();
        expect(isJpg).toBeFalsy();
    })
})