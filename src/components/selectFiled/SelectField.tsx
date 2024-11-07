import styles from './SelectField.module.css'

type IconSizeType = 'small' | 'medium' | 'large'

type IconProps = {
    src: string,
    size: IconSizeType,
}

type SelectFieldProps = {
    leftIconUrl?: string,
    rightIconUrl?: string,
    text: string
    className?: string,
    iconSize: IconSizeType,
}

const SelectField = (props: SelectFieldProps) => {
    return (
        <button
            type="button"
        >
            {props.leftIconUrl && (
                <Icon 
                    src={props.leftIconUrl} 
                    size={props.iconSize}
                />
            )}
            {props.text}
            {props.rightIconUrl && (
                <Icon 
                    src={props.rightIconUrl} 
                    size={props.iconSize}
                />
            )}
        </button>
    )
}

const Icon = ({
    src, 
    size,
}: IconProps) => {
    const iconClass = styles[`${size}Icon`];

    return (
        <img src={src} className={iconClass} alt="icon"/>
    )
}

export {
    SelectField,
}