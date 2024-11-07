import styles from './Button.module.css'

type IconProps = {
    src: string,
    size: IconSizeType,
}

type ButtonProps = ButtonContentProps & {
    onClick: () => void,
}

type IconSizeType = 'small' | 'medium' | 'large'

type ButtonContentProps = ButtonIconProps | ButtonTextProps | ButtonTextIconProps | ButtonIconTextProps;

type ButtonIconProps = {
    type: 'icon',
    iconUrl: string
    iconSize: IconSizeType,
}

type ButtonTextProps = {
    type: 'text',
    label: string,
}

type ButtonIconTextProps = {
    type: 'icon-text'
    label: string,
    iconUrl: string,
    iconSize: IconSizeType,
}

type ButtonTextIconProps = {
    type: 'text-icon'
    label: string,
    iconUrl: string,
    iconSize: IconSizeType,
}

const Button = (props: ButtonProps) => (
        <button 
            className={styles.button} 
            onClick={props.onClick} 
        >
            {props.type == 'icon-text' && 
                <div>
                    <Icon 
                        src={props.iconUrl} 
                        size={props.iconSize}
                    />
                    <span>{props.label}</span>
                </div>
            }
            {props.type == 'text-icon' && 
                <div>
                    <Icon 
                        src={props.iconUrl} 
                        size={props.iconSize}
                    />
                    <span>{props.label}</span>
                </div>
            }
            {props.type == 'text' && 
                    <span>{props.label}</span>
            }
            {props.type == 'icon' && 
                <Icon 
                    src={props.iconUrl}
                    size={props.iconSize}
                />
            }
        </button>
)

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
    Button,
}