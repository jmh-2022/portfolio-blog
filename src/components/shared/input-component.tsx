import type { DetailedHTMLProps } from 'react';
import React from 'react';

export type ReactInputProps = DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export type InputProps = ReactInputProps;

export const InputComponent = ({ className: _className, type: _type = 'text', ...props }: InputProps) => {
    const className = ['outline-none bg-transparent', _className].filter(Boolean).join(' ');
    return <input {...props} type={_type} className={className} />;
};

// eslint-disable-next-line react/display-name
export const InputComponentWithRef = React.forwardRef<HTMLInputElement, InputProps>(
    ({ style: _style, className: _className, type: _type = 'text', ...props }, ref) => {
        const className = ['outline-none bg-transparent', _className].filter(Boolean).join(' ');

        return <input {...props} type={_type} className={className} style={_style} ref={ref} />;
    },
);
