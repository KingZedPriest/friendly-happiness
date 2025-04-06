
type InputType = 'text' | 'number' | 'email' | 'password' | 'checkbox' | 'radio' | 'date' | 'datetime-local' | 'file' | 'tel';

type InputProps = {
    type: InputType;
    placeholder?: string;
    label?: string;
    name?: string;
    id?: string;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    pattern?: string;
    title?: string;
    widthClass?: string;
    required?: boolean;
    otherClass?: string;
    autoComplete?: string;
};

const Input = ({ type, placeholder, label, id, value, name, onChange, pattern, title, widthClass = 'w-full', otherClass, required, autoComplete = 'off' }: InputProps) => {
    return (
        <main className="flex flex-col gap-y-2 text-xs sm:text-sm xl:text-base">
            {label && (
                <label className="text-[#4E4955] text-left cursor-pointer" htmlFor={id}>
                    {label}
                    {required && <span className="text-red-500">*</span>}
                </label>
            )}
            <input type={type} placeholder={placeholder} name={name} id={id} value={value} onChange={onChange} pattern={pattern} title={title} autoComplete={autoComplete} min="0"
                className={`px-2 xl:px-4 py-3 border rounded-lg border-[#716A7C] duration-300 focus:outline-primaryPurple focus:outline focus:border-0 bg-inherit placeholder:text-[#A7A1AF] ${widthClass} ${otherClass}`}
                required={required} />
        </main>
    );
};

export default Input;
