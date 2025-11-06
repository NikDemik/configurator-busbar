// services/componentService.ts
import { apiClient } from './api/client';
import { API_ENDPOINTS } from './api/endpoints';
import {
    ComponentFromDB,
    ComponentFilters,
    ApiResponse,
    PaginatedResponse,
} from '@/types/configurator';

export class ComponentService {
    static async searchComponents(
        filters: ComponentFilters,
        page = 1,
        limit = 20,
    ): Promise<PaginatedResponse<ComponentFromDB>> {
        const queryParams = new URLSearchParams({
            page: page.toString(),
            limit: limit.toString(),
            ...(filters.category && { category: filters.category }),
            ...(filters.busbarType && { busbarType: filters.busbarType }),
            ...(filters.minPrice && { minPrice: filters.minPrice.toString() }),
            ...(filters.maxPrice && { maxPrice: filters.maxPrice.toString() }),
            ...(filters.searchTerm && { search: filters.searchTerm }),
        });

        const response = await apiClient.get<ApiResponse<PaginatedResponse<ComponentFromDB>>>(
            `${API_ENDPOINTS.COMPONENTS}/search?${queryParams}`,
        );
        return response.data;
    }

    static async getComponentCategories(): Promise<string[]> {
        const response = await apiClient.get<ApiResponse<string[]>>(
            `${API_ENDPOINTS.COMPONENTS}/categories`,
        );
        return response.data;
    }

    static async getFeaturedComponents(): Promise<ComponentFromDB[]> {
        const response = await apiClient.get<ApiResponse<ComponentFromDB[]>>(
            `${API_ENDPOINTS.COMPONENTS}/featured`,
        );
        return response.data;
    }

    static async checkComponentAvailability(
        componentId: number,
    ): Promise<{ available: boolean; quantity: number }> {
        const response = await apiClient.get<ApiResponse<{ available: boolean; quantity: number }>>(
            `${API_ENDPOINTS.COMPONENTS}/${componentId}/availability`,
        );
        return response.data;
    }
}
