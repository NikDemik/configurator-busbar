// services/configuratorService.ts
import { apiClient } from './api/client';
import { API_ENDPOINTS } from './api/endpoints';
import {
    BusbarTypeFromDB,
    ComponentFromDB,
    ConfigurationFromDB,
    ConfigurationFormData,
    ApiResponse,
    PaginatedResponse,
} from '@/types/configurator';

export class ConfiguratorService {
    // Типы шинопроводов
    static async getBusbarTypes(): Promise<BusbarTypeFromDB[]> {
        const response = await apiClient.get<ApiResponse<BusbarTypeFromDB[]>>(
            API_ENDPOINTS.BUSBAR_TYPES,
        );
        return response.data;
    }

    static async getBusbarTypeByCode(code: string): Promise<BusbarTypeFromDB> {
        const response = await apiClient.get<ApiResponse<BusbarTypeFromDB>>(
            `${API_ENDPOINTS.BUSBAR_TYPES}/code/${code}`,
        );
        return response.data;
    }

    // Компоненты
    static async getComponents(): Promise<ComponentFromDB[]> {
        const response = await apiClient.get<ApiResponse<ComponentFromDB[]>>(
            API_ENDPOINTS.COMPONENTS,
        );
        return response.data;
    }

    static async getComponentsByBusbarType(busbarType: string): Promise<ComponentFromDB[]> {
        const response = await apiClient.get<ApiResponse<ComponentFromDB[]>>(
            API_ENDPOINTS.COMPONENTS_BY_BUSBAR_TYPE(busbarType),
        );
        return response.data;
    }

    static async getComponentsByCategory(category: string): Promise<ComponentFromDB[]> {
        const response = await apiClient.get<ApiResponse<ComponentFromDB[]>>(
            API_ENDPOINTS.COMPONENTS_BY_CATEGORY(category),
        );
        return response.data;
    }

    static async getComponentById(id: number): Promise<ComponentFromDB> {
        const response = await apiClient.get<ApiResponse<ComponentFromDB>>(
            `${API_ENDPOINTS.COMPONENTS}/${id}`,
        );
        return response.data;
    }

    // Конфигурации
    static async saveConfiguration(
        configData: ConfigurationFormData,
    ): Promise<ConfigurationFromDB> {
        const response = await apiClient.post<ApiResponse<ConfigurationFromDB>>(
            API_ENDPOINTS.CONFIGURATIONS,
            configData,
        );
        return response.data;
    }

    static async getConfigurationById(id: string): Promise<ConfigurationFromDB> {
        const response = await apiClient.get<ApiResponse<ConfigurationFromDB>>(
            API_ENDPOINTS.CONFIGURATION_BY_ID(id),
        );
        return response.data;
    }

    static async getUserConfigurations(userId: string): Promise<ConfigurationFromDB[]> {
        const response = await apiClient.get<ApiResponse<ConfigurationFromDB[]>>(
            `${API_ENDPOINTS.USER_CONFIGURATIONS}/user/${userId}`,
        );
        return response.data;
    }

    static async saveUserConfiguration(
        name: string,
        config: ConfigurationFormData,
        userId: string,
    ): Promise<ConfigurationFromDB> {
        const response = await apiClient.post<ApiResponse<ConfigurationFromDB>>(
            API_ENDPOINTS.USER_CONFIGURATIONS,
            { name, config, userId },
        );
        return response.data;
    }

    // Валидация конфигурации
    static async validateConfiguration(
        config: ConfigurationFormData,
    ): Promise<{ isValid: boolean; errors: string[] }> {
        const response = await apiClient.post<ApiResponse<{ isValid: boolean; errors: string[] }>>(
            `${API_ENDPOINTS.CONFIGURATIONS}/validate`,
            config,
        );
        return response.data;
    }

    // Расчет стоимости
    static async calculatePrice(
        componentIds: number[],
    ): Promise<{ subtotal: number; tax: number; total: number }> {
        const response = await apiClient.post<
            ApiResponse<{ subtotal: number; tax: number; total: number }>
        >(`${API_ENDPOINTS.CONFIGURATIONS}/calculate-price`, { componentIds });
        return response.data;
    }
}
