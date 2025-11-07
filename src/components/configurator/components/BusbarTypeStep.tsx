import { Button } from '@/components/ui/button';
import { BusbarTypeStepProps, BusbarType } from '@/types/configurator';

const BUSBAR_TYPES: { value: BusbarType; label: string }[] = [
    { value: 'TROLLEY', label: 'Троллейный' },
    { value: 'MONO', label: 'Монотроллейный' },
];

export default function BusbarTypeStep({ next, update, currentType }: BusbarTypeStepProps) {
    const handleTypeSelect = (type: BusbarType) => {
        update({ busbarType: type });
        next();
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Выберите тип шинопровода</h2>
            <div className="grid grid-cols-2 gap-6">
                {BUSBAR_TYPES.map(({ value, label }) => (
                    <Button
                        key={value}
                        onClick={() => handleTypeSelect(value)}
                        variant={currentType === value ? 'default' : 'outline'}
                    >
                        {label}
                    </Button>
                ))}
            </div>

            {currentType && (
                <p className="text-sm text-muted-foreground">
                    Выбранный тип: {BUSBAR_TYPES.find((t) => t.value === currentType)?.label}
                </p>
            )}
        </div>
    );
}
