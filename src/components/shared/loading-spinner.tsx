import React from 'react'
import { Div } from './div'

export default function LoadingSpinner() {
    return (
        <Div className="absolute top-0 left-0 w-screen h-screen flex items-center justify-center z-50 bg-background/50 backdrop-blur-sm">
            <Div className="border-4 border-muted border-t-4 border-t-primary rounded-[50%] w-12 h-12 animate-spin" />
        </Div>
    )
}
