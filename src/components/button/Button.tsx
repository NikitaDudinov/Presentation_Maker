
type ButtonProps = {
    label: string,
    onClick: () => void,
}

const Button = ({label, onClick}: ButtonProps) => (
        <button 
            className="button" 
            onClick={onClick} 
        >
            {label}
        </button>
)

export {
    Button,
}