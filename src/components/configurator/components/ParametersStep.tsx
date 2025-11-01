import { Button } from '@/components/ui/button';

export default function ParametersStep({ next, prev, update }: any) {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Параметры системы</h2>
            <div className="grid grid-cols-2 gap-4">
                <label>
                    Ток (A)
                    <select
                        className="w-full mt-1 rounded border p-2"
                        onChange={(e) => update({ amperage: parseInt(e.target.value) })}
                    >
                        <option value="40">40A</option>
                        <option value="60">60A</option>
                        <option value="100">100A</option>
                    </select>
                </label>
                <label>
                    Количество жил
                    <select
                        className="w-full mt-1 rounded border p-2"
                        onChange={(e) => update({ phases: parseInt(e.target.value) })}
                    >
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </label>
            </div>
            <div className="flex justify-between mt-8">
                <Button variant="outline" onClick={prev}>
                    Назад
                </Button>
                <Button onClick={next}>Далее</Button>
            </div>
        </div>
    );
}
