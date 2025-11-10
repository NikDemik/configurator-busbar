// components/configurator/components/SummaryStep.tsx
'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { SummaryStepProps, ComponentFromDB } from '@/types/configurator';
import { ConfiguratorService } from '@/services';

interface ExtendedSummaryStepProps extends SummaryStepProps {
    availableComponents?: ComponentFromDB[];
}

export default function SummaryStep({
    prev,
    config,
    availableComponents = [],
    onSubmit,
}: ExtendedSummaryStepProps) {
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [loading, setLoading] = useState(false);

    // Расчет общей стоимости
    useEffect(() => {
        calculateTotalPrice();
    }, [config.components, availableComponents]);

    const calculateTotalPrice = async () => {
        if (config.components.length === 0) {
            setTotalPrice(0);
            return;
        }

        setLoading(true);
        try {
            const priceData = await ConfiguratorService.calculatePrice(config.components);
            setTotalPrice(priceData.total);
        } catch (error) {
            console.error('Failed to calculate price:', error);
            // Fallback расчет
            const fallbackPrice = config.components.reduce((total, compId) => {
                const component = availableComponents.find((c) => c.id === compId);
                return total + (component?.price || 0);
            }, 0);
            setTotalPrice(fallbackPrice);
        } finally {
            setLoading(false);
        }
    };

    const getComponentName = (id: number): string => {
        const component = availableComponents.find((c) => c.id === id);
        return component?.name || `Компонент #${id}`;
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            await onSubmit();
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Итоговая конфигурация</h2>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <h3 className="font-medium text-gray-500">Тип шинопровода</h3>
                        <p className="text-lg">
                            {config.busbarType === 'TROLLEY'
                                ? 'Троллейный'
                                : config.busbarType === 'MONO'
                                ? 'Монотроллейный'
                                : 'Не выбран'}
                        </p>
                    </div>

                    <div>
                        <h3 className="font-medium text-gray-500">Ток</h3>
                        <p className="text-lg">
                            {config.amperage ? `${config.amperage}A` : 'Не выбран'}
                        </p>
                    </div>

                    <div>
                        <h3 className="font-medium text-gray-500">Количество жил</h3>
                        <p className="text-lg">{config.phases || 'Не выбрано'}</p>
                    </div>

                    <div>
                        <h3 className="font-medium text-gray-500">Общая стоимость</h3>
                        <p className="text-lg font-semibold">
                            {loading ? 'Расчет...' : `${totalPrice.toLocaleString()} ₽`}
                        </p>
                    </div>
                </div>

                {config.components.length > 0 && (
                    <div className="mt-6">
                        <h3 className="font-medium text-gray-500 mb-3">Выбранные компоненты:</h3>
                        <ul className="space-y-2">
                            {config.components.map((compId) => (
                                <li key={compId} className="flex justify-between">
                                    <span>{getComponentName(compId)}</span>
                                    <span className="font-medium">
                                        {availableComponents
                                            .find((c) => c.id === compId)
                                            ?.price?.toLocaleString()}{' '}
                                        ₽
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            <div className="flex gap-4">
                <Button variant="outline" onClick={prev} className="flex-1">
                    Назад
                </Button>
                <Button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                >
                    {loading ? 'Отправка...' : 'Отправить запрос'}
                </Button>
            </div>
        </div>
    );
}
