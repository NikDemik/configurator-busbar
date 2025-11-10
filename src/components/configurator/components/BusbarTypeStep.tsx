'use client';

import { Button } from '@/components/ui/button';
import { BusbarTypeStepProps } from '@/types/configurator';
import { BusbarType, BUSBAR_TYPE_LABELS, BUSBAR_TYPES } from '@/types/busbar';

export default function BusbarTypeStep({ next, update, currentType }: BusbarTypeStepProps) {
    const handleTypeSelect = (type: BusbarType) => {
        update({ busbarType: type });
        next();
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Выберите тип шинопровода</h2>
            <div className="grid grid-cols-2 gap-6">
                {BUSBAR_TYPES.map((type) => (
                    <Button
                        key={type}
                        onClick={() => handleTypeSelect(type)}
                        variant={currentType === type ? 'default' : 'outline'}
                    >
                        {BUSBAR_TYPE_LABELS[type]}
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
