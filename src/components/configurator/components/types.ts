export type VisualElementType =
    | 'FEED' // подвод питания
    | 'HOUSING' // корпус шинопровода
    | 'SUPPORT' // подвес / крепёж
    | 'CONNECTOR' // соединитель
    | 'END_CAP'; // заглушка

export interface VisualElement {
    id: string;
    type: VisualElementType;
    label: string;
    color?: string;
    length?: number; // для корпуса
    icon?: JSX.Element;
}
