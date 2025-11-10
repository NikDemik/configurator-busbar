'use client';

import { Button } from '@/components/ui/button';
import { BusbarTypeStepProps } from '@/types/configurator';
import { BusbarTypeFromDB } from '@/types/configurator';
import { BUSBAR_TYPE_LABELS } from '@/types/busbar';

interface ExtendedBusbarTypeStepProps extends BusbarTypeStepProps {
    busbarTypes: BusbarTypeFromDB[];
    loading?: boolean;
}

export default function BusbarTypeStep({
    next,
    update,
    currentType,
    busbarTypes,
    loading = false,
}: ExtendedBusbarTypeStepProps) {
    if (loading) {
        return (
            <div className="space-y-6">
                <h2 className="text-2xl font-semibold">Выберите тип шинопровода</h2>
                <div className="grid grid-cols-2 gap-6">
                    {[1, 2].map((item) => (
                        <div key={item} className="h-20 bg-gray-200 animate-pulse rounded-lg"></div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Выберите тип шинопровода</h2>
            <div className="grid grid-cols-2 gap-6">
                {busbarTypes.map((type) => (
                    <Button
                        key={type.id}
                        variant={currentType === type.code ? 'default' : 'outline'}
                        className="h-20 flex flex-col items-center justify-center p-4"
                        onClick={() => {
                            update({ busbarType: type.code });
                            next();
                        }}
                    >
                        <span className="text-lg font-medium">{type.name}</span>
                        <span className="text-sm text-gray-600 mt-1">{type.description}</span>
                    </Button>
                ))}
            </div>

            {currentType && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-800 font-medium">
                        ✅ Выбран:{' '}
                        <span className="font-semibold">{BUSBAR_TYPE_LABELS[currentType]}</span>
                    </p>
                </div>
            )}
        </div>
    );
}
