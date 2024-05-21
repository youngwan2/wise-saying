import { ChangeEventHandler, InputHTMLAttributes, forwardRef } from "react";

interface PropsType extends InputHTMLAttributes<HTMLElement> {
    value?: string;
    name?: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
}

const Input = forwardRef<HTMLInputElement, PropsType>(
    ({ value, name, onChange, ...props }, ref) => {
        return (
            <input
                name={name}
                ref={ref}
                defaultValue={value}
                onChange={onChange}
                {...props}
            />
        );
    }
);

Input.displayName = "Input";
export default Input;
