import { X } from 'lucide-react';
import { VisualElement } from './types';

interface Props {
    element: VisualElement;
    onRemove: () => void;
}

export default function BusbarSegment({ element, onRemove }: Props) {
    return (
        <div
            className="relative flex flex-col items-center justify-center min-w-[100px] h-[100px] rounded-xl shadow-md transition-all hover:shadow-lg hover:scale-105 cursor-pointer"
            style={{ backgroundColor: element.color || '#e5e7eb' }}
        >
            <button
                onClick={onRemove}
                className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center"
            >
                <X size={14} />
            </button>
            <span className="text-sm font-medium text-white">{element.label}</span>
            {element.length && <span className="text-xs text-white/80">{element.length} м</span>}
        </div>
    );
}
