// prisma/seed.ts
import { PrismaClient, BusbarType, ComponentCategory } from '../prisma/generated/prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Начало seeding...');

    // Очистка существующих данных
    await prisma.config.deleteMany();
    await prisma.component.deleteMany();
    await prisma.busbarSeries.deleteMany();

    // Создание компонентов
    // Для компонентов, которые совместимы с несколькими типами, создаем отдельные записи
    const componentsData = [
        // Корпус 1м - совместим с TROLLEY и MONO (создаем две записи)
        {
            name: 'Корпус 1м (Троллейный)',
            slug: 'housing-1m-trolley',
            category: ComponentCategory.HOUSING,
            compatibleFor: BusbarType.TROLLEY,
            params: { length: 1, material: 'aluminum' },
        },
        {
            name: 'Корпус 1м (Монотроллейный)',
            slug: 'housing-1m-mono',
            category: ComponentCategory.HOUSING,
            compatibleFor: BusbarType.MONO,
            params: { length: 1, material: 'aluminum' },
        },
        // Корпус 2м - совместим с TROLLEY и MONO (создаем две записи)
        {
            name: 'Корпус 2м (Троллейный)',
            slug: 'housing-2m-trolley',
            category: ComponentCategory.HOUSING,
            compatibleFor: BusbarType.TROLLEY,
            params: { length: 2, material: 'aluminum' },
        },
        {
            name: 'Корпус 2м (Монотроллейный)',
            slug: 'housing-2m-mono',
            category: ComponentCategory.HOUSING,
            compatibleFor: BusbarType.MONO,
            params: { length: 2, material: 'aluminum' },
        },
        // Подвес - совместим с TROLLEY и MONO (создаем две записи)
        {
            name: 'Подвес (Троллейный)',
            slug: 'support-trolley',
            category: ComponentCategory.SUPPORT,
            compatibleFor: BusbarType.TROLLEY,
            params: { mount_type: 'ceiling' },
        },
        {
            name: 'Подвес (Монотроллейный)',
            slug: 'support-mono',
            category: ComponentCategory.SUPPORT,
            compatibleFor: BusbarType.MONO,
            params: { mount_type: 'ceiling' },
        },
        // Подвод питания - совместим с TROLLEY и MONO (создаем две записи)
        {
            name: 'Подвод питания (Троллейный)',
            slug: 'feed-trolley',
            category: ComponentCategory.FEED,
            compatibleFor: BusbarType.TROLLEY,
            params: { voltage: 380 },
        },
        {
            name: 'Подвод питания (Монотроллейный)',
            slug: 'feed-mono',
            category: ComponentCategory.FEED,
            compatibleFor: BusbarType.MONO,
            params: { voltage: 380 },
        },
        // Соединитель - только для MONO
        {
            name: 'Соединитель',
            slug: 'connector',
            category: ComponentCategory.CONNECTOR,
            compatibleFor: BusbarType.MONO,
            params: { type: 'mechanical' },
        },
        // Заглушка - совместим с TROLLEY и MONO (создаем две записи)
        {
            name: 'Заглушка (Троллейный)',
            slug: 'end-cap-trolley',
            category: ComponentCategory.END_CAP,
            compatibleFor: BusbarType.TROLLEY,
            params: { sealed: true },
        },
        {
            name: 'Заглушка (Монотроллейный)',
            slug: 'end-cap-mono',
            category: ComponentCategory.END_CAP,
            compatibleFor: BusbarType.MONO,
            params: { sealed: true },
        },
        // Кронштейн - только для TROLLEY
        {
            name: 'Кронштейн',
            slug: 'bracket',
            category: ComponentCategory.ACCESSORY,
            compatibleFor: BusbarType.TROLLEY,
            params: { mount_type: 'wall' },
        },
    ];

    // Создаем компоненты
    const createdComponents = await Promise.all(
        componentsData.map((component) =>
            prisma.component.create({
                data: component,
            }),
        ),
    );

    // Создаем карту slug -> id для компонентов
    const componentMap = createdComponents.reduce((acc, component) => {
        acc[component.slug] = component.id;
        return acc;
    }, {} as Record<string, number>);

    // Создание серий шин
    const busbarSeriesData = [
        {
            name: 'Троллейный 60A 5 жил (медь)',
            type: BusbarType.TROLLEY,
            amperage: 60,
            phases: 5,
            material: 'copper',
            components: {
                connect: [
                    { id: componentMap['housing-1m-trolley'] },
                    { id: componentMap['support-trolley'] },
                    { id: componentMap['feed-trolley'] },
                    { id: componentMap['end-cap-trolley'] },
                    { id: componentMap['bracket'] },
                ],
            },
        },
        {
            name: 'Монотроллейный 100A 3 жил (алюминий)',
            type: BusbarType.MONO,
            amperage: 100,
            phases: 3,
            material: 'aluminum',
            components: {
                connect: [
                    { id: componentMap['housing-2m-mono'] },
                    { id: componentMap['support-mono'] },
                    { id: componentMap['connector'] },
                    { id: componentMap['feed-mono'] },
                    { id: componentMap['end-cap-mono'] },
                ],
            },
        },
    ];

    // Создаем серии шин
    await Promise.all(
        busbarSeriesData.map((series) =>
            prisma.busbarSeries.create({
                data: series,
            }),
        ),
    );

    console.log('Seeding завершен успешно!');
    console.log(`Создано ${createdComponents.length} компонентов`);
    console.log(`Создано ${busbarSeriesData.length} серий шин`);
}

main()
    .catch((e) => {
        console.error('Ошибка при seeding:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
