'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ParametersStepProps } from '@/types/configurator';
import { ConfiguratorService } from '@/services';

interface ExtendedParametersStepProps extends ParametersStepProps {
    busbarType?: string;
}

export default function ParametersStep({
    next,
    prev,
    update,
    currentValues,
    busbarType,
}: ExtendedParametersStepProps) {
    const [availableAmperages, setAvailableAmperages] = useState<number[]>([]);
    const [availablePhases, setAvailablePhases] = useState<number[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (busbarType) {
            loadBusbarTypeParameters(busbarType);
        }
    }, [busbarType]);

    const loadBusbarTypeParameters = async (type: string) => {
        setLoading(true);
        try {
            const busbarTypeData = await ConfiguratorService.getBusbarTypeByCode(type);
            // Предполагаем, что эти данные приходят из БД
            setAvailableAmperages(busbarTypeData.availableAmperages || [40, 60, 100]);
            setAvailablePhases(busbarTypeData.availablePhases || [3, 4, 5]);
        } catch (error) {
            console.error('Failed to load busbar type parameters:', error);
            // Fallback значения
            setAvailableAmperages([40, 60, 100]);
            setAvailablePhases([3, 4, 5]);
        } finally {
            setLoading(false);
        }
    };

    const canProceed = currentValues.amperage && currentValues.phases;

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Параметры системы</h2>

            {loading ? (
                <div className="grid grid-cols-2 gap-4">
                    {[1, 2].map((item) => (
                        <div key={item} className="h-16 bg-gray-200 animate-pulse rounded"></div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <label className="block space-y-2">
                        <span className="text-sm font-medium">Ток (A)</span>
                        <select
                            value={currentValues.amperage || ''}
                            className="w-full rounded border border-gray-300 p-3"
                            onChange={(e) => update({ amperage: parseInt(e.target.value) })}
                        >
                            <option value="">Выберите ток</option>
                            {availableAmperages.map((amp) => (
                                <option key={amp} value={amp}>
                                    {amp}A
                                </option>
                            ))}
                        </select>
                    </label>

                    <label className="block space-y-2">
                        <span className="text-sm font-medium">Количество жил</span>
                        <select
                            value={currentValues.phases || ''}
                            className="w-full rounded border border-gray-300 p-3"
                            onChange={(e) => update({ phases: parseInt(e.target.value) })}
                        >
                            <option value="">Выберите количество жил</option>
                            {availablePhases.map((phase) => (
                                <option key={phase} value={phase}>
                                    {phase}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
            )}

            <div className="flex justify-between pt-6">
                <Button variant="outline" onClick={prev}>
                    Назад
                </Button>
                <Button onClick={next} disabled={!canProceed || loading}>
                    Далее
                </Button>
            </div>
        </div>
    );
}
