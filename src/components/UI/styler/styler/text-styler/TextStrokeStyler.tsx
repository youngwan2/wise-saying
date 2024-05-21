import TextStrokeColorStyler from './TextStrokeColorStyler'
import TextStrokeThicknessStyler from './TextStrokeThicknessStyler'
export default function TextStrokeStyler() {

  return (
    <article className='flex items-center mt-[0.25em]'>
      <TextStrokeColorStyler />
      <TextStrokeThicknessStyler />
    </article>
  )
}
