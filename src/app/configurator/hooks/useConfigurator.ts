'use client';

import { useState } from 'react';
import { ConfiguratorState, Component } from '@/types/configurator';

export default function useConfigurator() {
    const [config, setConfig] = useState<ConfiguratorState>({
        step: 1,
        components: [],
    });

    const next = () => setConfig((c) => ({ ...c, step: c.step + 1 }));
    const prev = () => setConfig((c) => ({ ...c, step: c.step - 1 }));

    const update = (data: Partial<ConfiguratorState>) => setConfig((c) => ({ ...c, ...data }));

    const addComponent = (comp: Component) =>
        setConfig((c) => ({ ...c, components: [...c.components, comp] }));

    const removeComponent = (id: number) =>
        setConfig((c) => ({ ...c, components: c.components.filter((x) => x.id !== id) }));

    return { config, next, prev, update, addComponent, removeComponent };
}
