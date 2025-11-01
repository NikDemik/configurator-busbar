import { Button } from '@/components/ui/button';

export default function BusbarTypeStep({ next, update }: any) {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Выберите тип шинопровода</h2>
            <div className="grid grid-cols-2 gap-6">
                <Button
                    onClick={() => {
                        update({ busbarType: 'TROLLEY' });
                        next();
                    }}
                >
                    Троллейный
                </Button>
                <Button
                    onClick={() => {
                        update({ busbarType: 'MONO' });
                        next();
                    }}
                >
                    Монотроллейный
                </Button>
            </div>
        </div>
    );
}
