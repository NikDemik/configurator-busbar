// components/configurator/ProgressBar.tsx
'use client';

import { cn } from '@/lib/utils'; // если используешь clsx или свой утилитарный helper

type ProgressStep = {
    label: string;
    completed: boolean;
    active: boolean;
};

interface ProgressBarProps {
    steps: ProgressStep[];
}

export default function ProgressBar({ steps }: ProgressBarProps) {
    return (
        <div className="flex items-center justify-center gap-4 w-full py-6">
            {steps.map((step, index) => (
                <div key={index} className="flex items-center gap-2">
                    {/* Круг с состоянием */}
                    <div
                        className={cn(
                            'w-8 h-8 flex items-center justify-center rounded-full border-2 font-medium transition-all duration-300',
                            step.completed
                                ? 'bg-green-500 border-green-500 text-white'
                                : step.active
                                ? 'border-green-500 text-green-500'
                                : 'border-gray-300 text-gray-400',
                        )}
                    >
                        {index + 1}
                    </div>

                    {/* Название шага */}
                    <span
                        className={cn(
                            'text-sm font-medium',
                            step.active ? 'text-green-500' : 'text-gray-400',
                        )}
                    >
                        {step.label}
                    </span>

                    {/* Линия между шагами */}
                    {index < steps.length - 1 && (
                        <div
                            className={cn(
                                'w-16 h-[2px] transition-all duration-300',
                                step.completed ? 'bg-green-500' : 'bg-gray-300',
                            )}
                        />
                    )}
                </div>
            ))}
        </div>
    );
}
