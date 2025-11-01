// components/configurator/ComponentsStep.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ComponentItem {
    id: number;
    name: string;
    category: string;
    description?: string;
    selected?: boolean;
}

interface ComponentsStepProps {
    components: ComponentItem[];
    onSelect: (id: number) => void;
    onNext: () => void;
}

export default function ComponentsStep({ components, onSelect, onNext }: ComponentsStepProps) {
    const grouped = Object.groupBy(components, (c) => c.category);

    return (
        <section className="w-full max-w-5xl mx-auto space-y-8">
            <h2 className="text-2xl font-semibold text-center">Выберите необходимые компоненты</h2>

            {/* Группы компонентов */}
            {Object.entries(grouped).map(([category, items]) => (
                <div key={category} className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">
                        {category}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {items?.map((item) => (
                            <Card
                                key={item.id}
                                onClick={() => onSelect(item.id)}
                                className={`cursor-pointer border-2 transition-all duration-200 ${
                                    item.selected
                                        ? 'border-green-500 shadow-md'
                                        : 'border-gray-200 hover:border-green-400'
                                }`}
                            >
                                <CardHeader>
                                    <CardTitle>{item.name}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-gray-500">
                                        {item.description ?? 'Без описания'}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            ))}

            {/* Кнопка продолжить */}
            <div className="flex justify-end pt-4">
                <Button onClick={onNext} className="bg-green-600 hover:bg-green-700">
                    Продолжить
                </Button>
            </div>
        </section>
    );
}
