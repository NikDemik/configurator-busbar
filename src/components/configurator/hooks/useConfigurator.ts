// components/configurator/hooks/useConfigurator.ts
'use client';

import { useState } from 'react';
import { ConfiguratorState } from '@/types/configurator';

export default function useConfigurator() {
    const [config, setConfig] = useState<ConfiguratorState>({
        step: 1,
        busbarType: undefined,
        amperage: undefined,
        phases: undefined,
        components: [], // Теперь это массив ID (number[])
    });

    const next = () => {
        setConfig((c) => ({
            ...c,
            step: Math.min(c.step + 1, 4), // Защита от выхода за пределы
        }));
    };

    const prev = () => {
        setConfig((c) => ({
            ...c,
            step: Math.max(c.step - 1, 1), // Защита от ухода ниже 1
        }));
    };

    const update = (data: Partial<ConfiguratorState>) => {
        setConfig((c) => ({
            ...c,
            ...data,
        }));
    };

    const toggleComponent = (id: number) => {
        setConfig((c) => ({
            ...c,
            components: c.components.includes(id)
                ? c.components.filter((compId) => compId !== id)
                : [...c.components, id],
        }));
    };

    const addComponent = (id: number) => {
        setConfig((c) => ({
            ...c,
            components: c.components.includes(id) ? c.components : [...c.components, id],
        }));
    };

    const removeComponent = (id: number) => {
        setConfig((c) => ({
            ...c,
            components: c.components.filter((compId) => compId !== id),
        }));
    };

    const reset = () => {
        setConfig({
            step: 1,
            busbarType: undefined,
            amperage: undefined,
            phases: undefined,
            components: [],
        });
    };

    return {
        config,
        next,
        prev,
        update,
        toggleComponent,
        addComponent,
        removeComponent,
        reset,
    };
}
