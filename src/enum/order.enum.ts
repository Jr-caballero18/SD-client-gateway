export enum OrderStatus{
PENDING = 'PENDING',
PROCESSING = 'PROCESSING',
DELIVERED = 'DELIVERED',
CANCELLED = 'CANCELLED'

}
export const OrderStatusList = [
  OrderStatus.PENDING,
  OrderStatus.PROCESSING,
  OrderStatus.DELIVERED,
  OrderStatus.CANCELLED,
]