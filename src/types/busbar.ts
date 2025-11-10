// types/busbar.ts (для клиентских компонентов)
// НЕ импортируем @prisma/client здесь!

// Дублируем тип вручную для клиентской части
export type BusbarType = 'TROLLEY' | 'MONO' | 'FESTON';

export const BUSBAR_TYPE_LABELS: Record<BusbarType, string> = {
    TROLLEY: 'Троллейный',
    MONO: 'Монотроллейный',
    FESTON: 'Фестонные системы',
};

export const BUSBAR_TYPES: BusbarType[] = ['TROLLEY', 'MONO', 'FESTON'];
