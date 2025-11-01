import { Button } from '@/components/ui/button';

export default function SummaryStep({ prev, config }: any) {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Итоговая конфигурация</h2>
            <ul className="space-y-2">
                <li>
                    <b>Тип:</b> {config.busbarType}
                </li>
                <li>
                    <b>Ток:</b> {config.amperage}A
                </li>
                <li>
                    <b>Жил:</b> {config.phases}
                </li>
                <li>
                    <b>Компонентов:</b> {config.components.length}
                </li>
            </ul>
            <Button className="w-full mt-6">Отправить запрос</Button>
            <Button variant="outline" onClick={prev}>
                Назад
            </Button>
        </div>
    );
}
