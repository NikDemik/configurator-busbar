// services/orderService.ts
import { apiClient } from './api/client';
import { API_ENDPOINTS } from './api/endpoints';
import { ConfigurationFormData, ApiResponse } from '@/types/configurator';

export interface OrderData {
    configuration: ConfigurationFormData;
    customerInfo: {
        name: string;
        email: string;
        phone: string;
        company?: string;
    };
    shippingAddress?: {
        address: string;
        city: string;
        country: string;
        postalCode: string;
    };
}

export interface OrderFromDB {
    id: string;
    configuration: ConfigurationFormData;
    customerInfo: OrderData['customerInfo'];
    status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    totalAmount: number;
    createdAt: string;
    updatedAt: string;
}

export class OrderService {
    static async createOrder(orderData: OrderData): Promise<OrderFromDB> {
        const response = await apiClient.post<ApiResponse<OrderFromDB>>(
            API_ENDPOINTS.ORDERS,
            orderData,
        );
        return response.data;
    }

    static async getOrderById(id: string): Promise<OrderFromDB> {
        const response = await apiClient.get<ApiResponse<OrderFromDB>>(
            API_ENDPOINTS.ORDER_BY_ID(id),
        );
        return response.data;
    }

    static async getUserOrders(userId: string): Promise<OrderFromDB[]> {
        const response = await apiClient.get<ApiResponse<OrderFromDB[]>>(
            `${API_ENDPOINTS.ORDERS}/user/${userId}`,
        );
        return response.data;
    }

    static async updateOrderStatus(
        orderId: string,
        status: OrderFromDB['status'],
    ): Promise<OrderFromDB> {
        const response = await apiClient.put<ApiResponse<OrderFromDB>>(
            API_ENDPOINTS.ORDER_BY_ID(orderId),
            { status },
        );
        return response.data;
    }

    static async sendOrderConfirmation(orderId: string): Promise<{ success: boolean }> {
        const response = await apiClient.post<ApiResponse<{ success: boolean }>>(
            `${API_ENDPOINTS.ORDER_BY_ID(orderId)}/send-confirmation`,
        );
        return response.data;
    }
}
