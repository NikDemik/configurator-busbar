// types/configurator.ts

export interface Component {
    id: number;
    name: string;
    category: string;
    description?: string;
    price?: number;
    sku?: string;
    imageUrl?: string;
    specifications?: Record<string, any>;
    compatibleWith?: BusbarType[]; // С какими типами шин совместим
    isActive?: boolean; // Активен ли компонент в системе
}

export type BusbarType = 'TROLLEY' | 'MONO';

export interface ConfiguratorState {
    step: number;
    busbarType?: BusbarType;
    amperage?: number;
    phases?: number;
    components: number[]; // ID выбранных компонентов
}

export interface ProgressStep {
    label: string;
    completed: boolean;
    active: boolean;
}

// Пропсы для компонентов конфигуратора
export interface BusbarTypeStepProps {
    next: () => void;
    update: (data: Partial<ConfiguratorState>) => void;
    currentType?: BusbarType;
}

export interface ParametersStepProps {
    next: () => void;
    prev: () => void;
    update: (data: Partial<ConfiguratorState>) => void;
    currentValues: {
        amperage?: number;
        phases?: number;
    };
}

export interface ComponentsStepProps {
    components: (Component & { selected: boolean })[];
    onSelect: (id: number) => void;
    onNext: () => void;
    loading?: boolean;
}

export interface SummaryStepProps {
    prev: () => void;
    config: ConfiguratorState;
    availableComponents?: Component[];
    onSubmit: () => void;
}

export interface ProgressBarProps {
    steps: ProgressStep[];
}

// Типы для API и БД
export interface BusbarTypeFromDB {
    id: string;
    name: string;
    code: BusbarType;
    description: string;
    imageUrl?: string;
    minAmperage?: number;
    maxAmperage?: number;
    availablePhases?: number[];
}

export interface ComponentFromDB {
    id: number;
    name: string;
    category: string;
    description: string;
    price: number;
    sku: string;
    imageUrl: string;
    compatibleWith: BusbarType[];
    specifications: Record<string, any>;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface ConfigurationFromDB {
    id: string;
    busbarType: BusbarType;
    amperage: number;
    phases: number;
    components: number[];
    totalPrice?: number;
    createdAt: string;
    updatedAt: string;
    createdBy?: string;
}

// Типы для форм и валидации
export interface ConfigurationFormData {
    busbarType: BusbarType;
    amperage: number;
    phases: number;
    componentIds: number[];
}

// Типы для ответов API
export interface ApiResponse<T> {
    data: T;
    success: boolean;
    message?: string;
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

// Типы для фильтров и поиска
export interface ComponentFilters {
    category?: string;
    busbarType?: BusbarType;
    minPrice?: number;
    maxPrice?: number;
    searchTerm?: string;
}

// Типы для корзины/заказа
export interface CartItem {
    componentId: number;
    quantity: number;
    component?: Component;
}

export interface OrderSummary {
    subtotal: number;
    tax: number;
    total: number;
    items: CartItem[];
}

// Типы для пользовательских конфигураций
export interface UserConfiguration {
    id: string;
    name: string;
    config: ConfiguratorState;
    createdAt: string;
    isFavorite: boolean;
}
