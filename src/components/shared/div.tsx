import { DetailedHTMLProps, HTMLAttributes, PropsWithChildren } from 'react'

export type ReactDivProps = DetailedHTMLProps<
    HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
>

export type DivProps = ReactDivProps & PropsWithChildren

export const Div = ({ ...props }: DivProps) => {
    return <div {...props} />
}

export const DivRow = ({ className: _className, ...props }: DivProps) => {
    const className = ['flex', _className].filter(Boolean).join(' ')
    return <div {...props} className={className} />
}

export const DivColumn = ({ className: _className, ...props }: DivProps) => {
    const className = ['flex flex-col', _className].filter(Boolean).join(' ')
    return <div {...props} className={className} />
}
