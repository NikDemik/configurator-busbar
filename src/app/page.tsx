'use client';

import useConfigurator from '@/components/configurator/hooks/useConfigurator';
import BusbarTypeStep from '@/components/configurator/components/BusbarTypeStep';
import ParametersStep from '@/components/configurator/components/ParametersStep';
import ComponentsStep from '@/components/configurator/components/ComponentsStep';
import SummaryStep from '@/components/configurator/components/SummaryStep';
import ProgressBar from '@/components/configurator/components/ProgressBar';
import { ConfiguratorService } from '@/services';

export default function ConfiguratorPage() {
    const {
        config,
        availableComponents,
        busbarTypes,
        loading,
        error,
        next,
        prev,
        update,
        toggleComponent,
    } = useConfigurator();

    const handleSubmit = async () => {
        try {
            // Подготовка данных для отправки в БД
            const configData = {
                busbarType: config.busbarType!,
                amperage: config.amperage!,
                phases: config.phases!,
                componentIds: config.components,
            };

            const savedConfig = await ConfiguratorService.saveConfiguration(configData);
            console.log('Configuration saved to DB:', savedConfig);
            alert('Конфигурация успешно сохранена! ID: ' + savedConfig.id);

            // Можно добавить редирект или сброс конфигурации
            // reset();
        } catch (error) {
            console.error('Failed to save configuration:', error);
            alert('Ошибка при сохранении конфигурации');
        }
    };

    const progressSteps = [
        { label: 'Тип шины', completed: config.step > 1, active: config.step === 1 },
        { label: 'Параметры', completed: config.step > 2, active: config.step === 2 },
        { label: 'Компоненты', completed: config.step > 3, active: config.step === 3 },
        { label: 'Итог', completed: config.step > 4, active: config.step === 4 },
    ];

    // Обогащаем компоненты информацией о выборе
    const componentsWithSelection = availableComponents.map((comp) => ({
        ...comp,
        selected: config.components.includes(comp.id),
    }));

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-xl text-red-600 mb-4">Ошибка</h2>
                    <p className="text-gray-600">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
                    >
                        Перезагрузить
                    </button>
                </div>
            </div>
        );
    }

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
                            busbarTypes={busbarTypes}
                            loading={loading && busbarTypes.length === 0}
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
                            busbarType={config.busbarType}
                        />
                    )}

                    {config.step === 3 && (
                        <ComponentsStep
                            components={componentsWithSelection}
                            onSelect={toggleComponent}
                            onNext={next}
                            loading={loading}
                        />
                    )}

                    {config.step === 4 && (
                        <SummaryStep
                            prev={prev}
                            config={config}
                            availableComponents={availableComponents}
                            onSubmit={handleSubmit}
                        />
                    )}
                </div>
            </div>
        </section>
    );
}
