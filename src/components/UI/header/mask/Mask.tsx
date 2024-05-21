// interface Props { }
  
export default function Mask({XY}:{XY:{x:number, y:number}}) {
return (
    <svg className="transition fixed top-0 w-[100%] min-h-[100%] z-[-1] mix-blend-overlay">
    <defs>
      {/* 마스크에 표시할 패턴을 생성 */}
      <pattern id="pattern" x={0} y={0} width={0.1} height={0.1}>
        <rect
          x={0}
          y={0}
          width={200}
          height={200}
          className="fill-[white] blur-[10px]"
        ></rect>
      </pattern>
      {/* 마스크 생성 */}
      <mask id="glass">
        <circle fill="white" cx={XY.x} cy={XY.y} r={80}></circle>
      </mask>
    </defs>
    {/* 마스크를 적용하는 그룹 지정 : 해당 그룹(마스크) 내의 rect 요소에 링크된 패턴이 표시. */}
    <g mask="url(#glass)">
      <rect
        x={0}
        y={0}
        width={'100%'}
        height={'100%'}
        className="fill-[url('#pattern')]"
      ></rect>
    </g>
    <circle
      className="fill-transparent stroke-[white] stroke-[10px] blur-[15px] "
      cx={XY.x}
      cy={XY.y}
      r={80}
    ></circle>
  </svg>
)}