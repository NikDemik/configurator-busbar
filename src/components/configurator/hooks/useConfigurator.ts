// components/configurator/hooks/useConfigurator.ts
'use client';

import { useState, useEffect } from 'react';
import { ConfiguratorState, BusbarType, ComponentFromDB } from '@/types/configurator';
import { ConfiguratorService, ComponentService } from '@/services';

export default function useConfigurator() {
    const [config, setConfig] = useState<ConfiguratorState>({
        step: 1,
        busbarType: undefined,
        amperage: undefined,
        phases: undefined,
        components: [], // Теперь это массив ID (number[])
    });

    const [availableComponents, setAvailableComponents] = useState<ComponentFromDB[]>([]);
    const [busbarTypes, setBusbarTypes] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Загрузка типов шинопроводов при инициализации
    useEffect(() => {
        loadBusbarTypes();
    }, []);

    // Загрузка компонентов при выборе типа шины
    useEffect(() => {
        if (config.busbarType) {
            loadComponents(config.busbarType);
        }
    }, [config.busbarType]);

    const loadBusbarTypes = async () => {
        setLoading(true);
        try {
            const types = await ConfiguratorService.getBusbarTypes();
            setBusbarTypes(types);
        } catch (err) {
            setError('Ошибка загрузки типов шинопроводов');
            console.error('Failed to load busbar types:', err);
        } finally {
            setLoading(false);
        }
    };

    const loadComponents = async (busbarType: string) => {
        setLoading(true);
        try {
            const components = await ConfiguratorService.getComponentsByBusbarType(busbarType);
            setAvailableComponents(components);
        } catch (err) {
            setError('Ошибка загрузки компонентов');
            console.error('Failed to load components:', err);
        } finally {
            setLoading(false);
        }
    };

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
        setAvailableComponents([]);
        setError(null);
    };

    return {
        config,
        availableComponents,
        busbarTypes,
        loading,
        error,
        next,
        prev,
        update,
        toggleComponent,
        addComponent,
        removeComponent,
        reset,
    };
}
