import { VisualElement } from './types';
import { Plus } from 'lucide-react';

interface Props {
    onAdd: (el: VisualElement) => void;
}

export default function ComponentPalette({ onAdd }: Props) {
    const items: VisualElement[] = [
        {
            id: crypto.randomUUID(),
            type: 'HOUSING',
            label: 'Корпус 1м',
            color: '#3b82f6',
            length: 1,
        },
        {
            id: crypto.randomUUID(),
            type: 'HOUSING',
            label: 'Корпус 2м',
            color: '#2563eb',
            length: 2,
        },
        { id: crypto.randomUUID(), type: 'SUPPORT', label: 'Подвес', color: '#a855f7' },
        { id: crypto.randomUUID(), type: 'CONNECTOR', label: 'Соединитель', color: '#f59e0b' },
        { id: crypto.randomUUID(), type: 'END_CAP', label: 'Заглушка', color: '#9ca3af' },
    ];

    return (
        <div className="w-full lg:w-72 bg-white dark:bg-gray-800 rounded-2xl shadow p-4">
            <h3 className="text-lg font-semibold mb-4">Компоненты</h3>
            <div className="space-y-3">
                {items.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => onAdd({ ...item, id: crypto.randomUUID() })}
                        className="flex items-center justify-between w-full px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
                    >
                        <span>{item.label}</span>
                        <Plus size={18} />
                    </button>
                ))}
            </div>
        </div>
    );
}
