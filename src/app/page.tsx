'use client';

import useConfigurator from './configurator/hooks/useConfigurator';
import BusbarTypeStep from './configurator/components/BusbarTypeStep';
import ParametersStep from './configurator/components/ParametersStep';
import ComponentsStep from './configurator/components/ComponentsStep';
import SummaryStep from './configurator/components/SummaryStep';
import ProgressBar from './configurator/components/ProgressBar';

// Моковые данные для компонентов (замени на реальные из API)
const MOCK_COMPONENTS = [
    { id: 1, name: 'Компонент 1', category: 'Основные', description: 'Описание 1' },
    { id: 2, name: 'Компонент 2', category: 'Основные', description: 'Описание 2' },
    { id: 3, name: 'Компонент 3', category: 'Дополнительные', description: 'Описание 3' },
    { id: 4, name: 'Компонент 4', category: 'Дополнительные', description: 'Описание 4' },
];

export default function ConfiguratorPage() {
    const { config, next, prev, update, addComponent, removeComponent } = useConfigurator();

    // Обработчик выбора компонентов
    const handleComponentSelect = (id: number) => {
        const selectedComponent = MOCK_COMPONENTS.find((comp) => comp.id === id);
        const isSelected = config.components.some((comp) => comp.id === id);

        if (isSelected && selectedComponent) {
            removeComponent(id);
        } else if (selectedComponent) {
            addComponent(selectedComponent);
        }
    };

    // Обработчик отправки формы
    const handleSubmit = () => {
        console.log('Отправка конфигурации:', config);
        alert('Конфигурация отправлена!');
        // Здесь будет логика отправки на сервер
    };

    // Подготовка данных для ProgressBar
    const progressSteps = [
        { label: 'Тип шины', completed: config.step > 1, active: config.step === 1 },
        { label: 'Параметры', completed: config.step > 2, active: config.step === 2 },
        { label: 'Компоненты', completed: config.step > 3, active: config.step === 3 },
        { label: 'Итог', completed: config.step > 4, active: config.step === 4 },
    ];

    // Обогащаем компоненты информацией о выборе
    const componentsWithSelection = MOCK_COMPONENTS.map((comp) => ({
        ...comp,
        selected: config.components.some((selectedComp) => selectedComp.id === comp.id),
    }));

    return (
        <section className="min-h-screen bg-gray-50 dark:bg-gray-950 py-10">
            <div className="container max-w-4xl mx-auto px-4">
                <ProgressBar steps={progressSteps} />
                <div className="mt-10">
                    {config.step === 1 && (
                        <BusbarTypeStep
                            next={next}
                            update={update}
                            currentType={config.busbarType}
                        />
                    )}
                    {config.step === 2 && (
                        <ParametersStep
                            next={next}
                            prev={prev}
                            update={update}
                            currentValues={{
                                amperage: config.amperage,
                                phases: config.phases,
                            }}
                        />
                    )}
                    {config.step === 3 && (
                        <ComponentsStep
                            components={componentsWithSelection}
                            onSelect={handleComponentSelect}
                            onNext={next}
                        />
                    )}
                    {config.step === 4 && (
                        <SummaryStep prev={prev} config={config} onSubmit={handleSubmit} />
                    )}
                </div>
            </div>
        </section>
    );
}
