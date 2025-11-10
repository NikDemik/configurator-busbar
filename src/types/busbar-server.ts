// types/busbar-server.ts (для серверных компонентов)
import { BusbarType as PrismaBusbarType } from '../../prisma/generated/prisma/client';

// Реэкспортируем для серверных компонентов
export { PrismaBusbarType as BusbarType };

export const BUSBAR_TYPE_LABELS: Record<PrismaBusbarType, string> = {
    TROLLEY: 'Троллейный',
    MONO: 'Монотроллейный',
    FESTON: 'Фестонные системы',
};

export const BUSBAR_TYPES = Object.values(PrismaBusbarType);
