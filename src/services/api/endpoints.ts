// services/api/endpoints.ts
export const API_ENDPOINTS = {
    // Конфигурации
    CONFIGURATIONS: '/configurations',
    CONFIGURATION_BY_ID: (id: string) => `/configurations/${id}`,

    // Типы шинопроводов
    BUSBAR_TYPES: '/busbar-types',

    // Компоненты
    COMPONENTS: '/components',
    COMPONENTS_BY_CATEGORY: (category: string) => `/components/category/${category}`,
    COMPONENTS_BY_BUSBAR_TYPE: (busbarType: string) => `/components/busbar-type/${busbarType}`,

    // Заказы
    ORDERS: '/orders',
    ORDER_BY_ID: (id: string) => `/orders/${id}`,

    // Пользовательские конфигурации
    USER_CONFIGURATIONS: '/user-configurations',
    USER_CONFIGURATION_BY_ID: (id: string) => `/user-configurations/${id}`,
} as const;
