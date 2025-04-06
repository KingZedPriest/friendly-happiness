import { FieldValues, UseFormRegister, Path } from 'react-hook-form';

type InputType = 'text' | 'number' | 'email' | 'password' | 'checkbox' | 'radio' | 'datetime' | 'file' | 'tel';

type InputProps<T extends FieldValues> = {
    type: InputType;
    placeholder?: string;
    label?: string;
    id?: string;
    defaultValue?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    pattern?: string;
    title?: string;
    widthClass?: string;
    register: UseFormRegister<T>;
    name: Path<T>;
    required?: boolean;
    otherClass?: string;
    autoComplete?: string;
};

const ZodInput = <T extends FieldValues>({
    type,
    placeholder,
    label,
    id,
    defaultValue,
    onChange,
    pattern,
    title,
    widthClass = 'w-full',
    register,
    name,
    otherClass,
    required,
    autoComplete = 'off',
}: InputProps<T>) => {
    return (
        <main className="flex flex-col gap-y-1 w-full text-xs sm:text-sm xl:text-base">
            {label && (
                <label className="text-white cursor-pointer" htmlFor={id}>
                    {label}
                    {required && <span className="text-red-500">*</span>}
                </label>
            )}
            <input
                {...register(name)}
                type={type}
                placeholder={placeholder}
                id={id}
                defaultValue={defaultValue}
                onChange={onChange}
                pattern={pattern}
                title={title}
                autoComplete={autoComplete}
                className={`px-2 xl:px-4 py-3 border text-darkBlack rounded-[10px] border-[#716A7C] duration-300 focus:outline-primaryPurple focus:outline focus:border-0 ${widthClass} ${otherClass}`}
                required={required}
            />
        </main>
    );
};

export default ZodInput;
