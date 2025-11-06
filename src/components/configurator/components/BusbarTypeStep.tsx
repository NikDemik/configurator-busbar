import { Button } from '@/components/ui/button';
import { BusbarTypeStepProps } from '@/types/configurator';

export default function BusbarTypeStep({ next, update, currentType }: BusbarTypeStepProps) {
    const handleTypeSelect = (busbarType: 'TROLLEY' | 'MONO') => {
        update({ busbarType });
        next();
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Выберите тип шинопровода</h2>
            <div className="grid grid-cols-2 gap-6">
                <Button
                    onClick={() => handleTypeSelect('TROLLEY')}
                    variant={currentType === 'TROLLEY' ? 'default' : 'outline'}
                >
                    Троллейный
                </Button>
                <Button
                    onClick={() => handleTypeSelect('MONO')}
                    variant={currentType === 'MONO' ? 'default' : 'outline'}
                >
                    Монотроллейный
                </Button>
            </div>

            {currentType && (
                <p className="text-sm text-muted-foreground">
                    Выбранный тип: {currentType === 'TROLLEY' ? 'Троллейный' : 'Монотроллейный'}
                </p>
            )}
        </div>
    );
}
