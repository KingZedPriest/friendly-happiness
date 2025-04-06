

type CheckboxProps = {
    label: string;
    checked: boolean;
    name: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox = ({ label, checked, name, onChange }: CheckboxProps) => {
    return (
        <div className="flex items-center">
            <input type="checkbox" name={name} className="border-gray-300 rounded focus:ring-green-500 w-5 h-5 accent-green-500 form-checkbox" checked={checked}
                onChange={onChange}
                id={`checkbox-${label.replace(/\s+/g, '-')}`} />
            <label htmlFor={`checkbox-${label.replace(/\s+/g, '-')}`} className="block ml-2 text-darkWhite cursor-pointer">
                {label}
            </label>
        </div>
    );
};

export default Checkbox;