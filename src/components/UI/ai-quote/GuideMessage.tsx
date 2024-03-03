const pElContents = ["안녕하세요. [ AI 명언 생성서비스 ] 를 이용해 주셔서 감사합니다. ", "현재의 기분이나 감정을 입력해주시면, ", "시인님에게 도움이 되는 명언을 생성해 보겠습니다. "]
export default function GuideMessage(){

    return (
        <>
        <p className="sm:text-[1.15em] p-[8px] inline-block py-[1.25em] min-h-[110px]">
        {pElContents.map((content) =>
            content.split('').map((splitText, i) =>
                <span className=" splitText opacity-100 relative" key={i}>{splitText}</span>
            )
        )}
    </p>
    <hr />
    </>

    )
}