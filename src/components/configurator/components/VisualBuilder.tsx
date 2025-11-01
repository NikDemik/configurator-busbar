'use client';

import { useState } from 'react';
import { VisualElement } from './types';
import BusbarSegment from './BusbarSegment';
import ComponentPalette from './ComponentPalette';
import { Button } from '@/components/ui/button';

export default function VisualBuilder() {
    const [elements, setElements] = useState<VisualElement[]>([
        { id: '1', type: 'FEED', label: 'Подвод питания', color: '#16a34a' },
        { id: '2', type: 'HOUSING', label: 'Корпус 1м', color: '#3b82f6', length: 1 },
        { id: '3', type: 'END_CAP', label: 'Заглушка', color: '#9ca3af' },
    ]);

    const addElement = (el: VisualElement) => setElements([...elements, el]);
    const removeElement = (id: string) => setElements(elements.filter((e) => e.id !== id));

    return (
        <div className="flex flex-col lg:flex-row gap-8 mt-10">
            {/* Левая панель */}
            <ComponentPalette onAdd={addElement} />

            {/* Основная зона визуализации */}
            <div className="flex-1 bg-gray-100 dark:bg-gray-900 rounded-2xl p-6 shadow-inner relative">
                <h2 className="text-xl font-semibold mb-4">Схема сборки</h2>

                <div className="flex items-center gap-4 overflow-x-auto py-4 px-2 scrollbar-thin">
                    {elements.map((el) => (
                        <BusbarSegment
                            key={el.id}
                            element={el}
                            onRemove={() => removeElement(el.id)}
                        />
                    ))}
                </div>

                <div className="flex justify-end mt-6">
                    <Button variant="outline">Сбросить</Button>
                </div>
            </div>
        </div>
    );
}
