'use client';

import { createContext, use, useState, ReactNode, useCallback, useMemo } from 'react';

type ModalConfig = {
    title: string;
    description?: string;
    onConfirm: () => void | Promise<void>;
    confirmText?: string;
    cancelText?: string;
    variant?: 'default' | 'destructive';
};

type ModalState = {
    isOpen: boolean;
    config: ModalConfig | null;
};

type ModalActions = {
    openModal: (config: ModalConfig) => void;
    closeModal: () => void;
};

const ModalStateContext = createContext<ModalState | undefined>(undefined);
const ModalActionContext = createContext<ModalActions | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [config, setConfig] = useState<ModalConfig | null>(null);

    const openModal = useCallback((newConfig: ModalConfig) => {
        setConfig(newConfig);
        setIsOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        setIsOpen(false);
        setTimeout(() => setConfig(null), 300);
    }, []);

    const state = useMemo(() => ({ isOpen, config }), [isOpen, config]);
    const actions = useMemo(() => ({ openModal, closeModal }), [openModal, closeModal]);

    return (
        <ModalActionContext.Provider value={actions}>
            <ModalStateContext.Provider value={state}>
                {children}
            </ModalStateContext.Provider>
        </ModalActionContext.Provider>
    );
}

export function useModalState() {
    const context = use(ModalStateContext);
    if (context === undefined) {
        throw new Error('useModalState must be used within a ModalProvider');
    }
    return context;
}

export function useModalAction() {
    const context = use(ModalActionContext);
    if (context === undefined) {
        throw new Error('useModalAction must be used within a ModalProvider');
    }
    return context;
}
