// hooks/useBusbarTypes.ts
import { useQuery } from '@tanstack/react-query';

interface BusbarType {
    id: number;
    name: string; // 'TROLLEY' | 'MONO'
    label: string; // 'Троллейный' | 'Монотроллейный'
    description?: string;
}

export function useBusbarTypes() {
    return useQuery<BusbarType[]>({
        queryKey: ['busbar-types'],
        queryFn: async () => {
            const response = await fetch('/api/busbar-types');

            if (!response.ok) {
                throw new Error('Failed to fetch busbar types');
            }

            return response.json();
        },
    });
}
