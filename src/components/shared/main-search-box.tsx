'use client';

import React, { useRef, useState } from 'react';
import { DivRow } from './div';
import { InputComponent, InputComponentWithRef, InputProps } from './input-component';
import { Search } from 'lucide-react';

type SearchBoxProps = InputProps & {
    searchRef?: React.RefObject<HTMLDivElement | null>;
};

export default function MainSearchBox({
    className: _className,
    onFocus,
    onClick,
    searchRef,
    ...restProps
}: SearchBoxProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [isReadOnly, setIsReadOnly] = useState<boolean>(true);

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        setIsReadOnly(true);
        setIsFocused(false);
    };

    const handleClickInput = (e: React.MouseEvent<HTMLInputElement>) => {
        if (searchRef?.current) {
            const { top } = searchRef.current.getBoundingClientRect();

            if (top < 100) {
                setIsReadOnly(false);
            } else {
                setTimeout(() => {
                    setIsReadOnly(false);
                }, 700);
            }
        } else {
            setIsReadOnly(false);
        }
        setIsFocused(true);

        onClick && onClick(e);
    };

    return (
        <DivRow
            className={`border-b-2 py-2 transition-colors ${isFocused ? 'border-primary' : 'border-input'} ${_className || ''}`}
        >
            {isReadOnly ? (
                <InputComponent
                    {...restProps}
                    id="mainSearchBox"
                    onBlur={handleBlur}
                    onClick={handleClickInput}
                    readOnly={true}
                    className={`grow text-lg ${isFocused ? 'caret-primary' : ''
                        } w-full`}
                />
            ) : (
                <InputComponentWithRef
                    {...restProps}
                    ref={inputRef}
                    id="mainSearchBox"
                    autoFocus={true}
                    onBlur={handleBlur}
                    className={`grow text-lg ${isFocused ? 'caret-primary' : ''
                        } w-full`}
                />
            )}

            <Search className={`shrink-0 w-6 h-6 transition-colors ${isFocused ? 'text-primary' : 'text-muted-foreground'}`} />
        </DivRow>
    );
}
