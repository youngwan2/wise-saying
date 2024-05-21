import { ChangeEventHandler } from "react"

interface PropsType {

    ariaLabel: string
    className: string
    type: string
    dataType: string
    value: number
    max: number
    placeholder: string
    onChangeSetSize: ChangeEventHandler<HTMLInputElement>

}

export default function SizeInput({ ariaLabel, className, type, dataType, value, max, placeholder, onChangeSetSize }: PropsType) {
    return (
        <input
            aria-label={ariaLabel}
            className={className}
            type={type}
            data-type={dataType}
            defaultValue={value}
            max={max}
            placeholder={placeholder}
            onChange={onChangeSetSize}
        ></input>
    )
}