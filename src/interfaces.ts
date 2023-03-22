export interface INavlinkButton {
    name: string,
    navigate: string,
    onClick?: React.MouseEventHandler<HTMLButtonElement> 
}

export interface IButtonGeneral {
    name: string,
    src?: string,
    alt?: string,
    class?:string,
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    id?:string,
}