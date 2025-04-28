
type buttonProps = {
  type: "submit" | "reset" | "button";
  text: string;
  loading: boolean;
  disabled?: boolean;
  onClick?: () => void;
  classNames?: string
}

const Button = ({ type, text, loading, disabled, onClick, classNames }: buttonProps) => {
  return (
    <main>
      <button onClick={onClick} disabled={disabled} type={type} className={`group relative bg-primaryPurple hover:bg-inherit my-6 py-3 border border-primaryPurple rounded-[4px] capitalize font-semibold w-full text-white hover:text-primaryPurple transition-all duration-300 disabled:cursor-not-allowed ease-in-out ${classNames}`}>
        <span className={`transition-opacity duration-300 ${loading ? 'opacity-0' : 'opacity-100'}`}>
          {text}
        </span>
        {loading && (
          <span className="absolute inset-0 flex justify-center items-center">
            <span className="flex space-x-1">
              <span className="bg-white group-hover:bg-primaryPurple rounded-full w-2 h-2 animate-bounce duration-300" style={{ animationDelay: '0ms' }}></span>
              <span className="bg-white group-hover:bg-primaryPurple rounded-full w-2 h-2 animate-bounce duration-300" style={{ animationDelay: '150ms' }}></span>
              <span className="bg-white group-hover:bg-primaryPurple rounded-full w-2 h-2 animate-bounce duration-300" style={{ animationDelay: '300ms' }}></span>
            </span>
          </span>
        )}
      </button>
    </main>
  );
}

export default Button;