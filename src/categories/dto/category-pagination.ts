import { IsEnum, IsOptional } from 'class-validator';
import { PaginationDto } from '../../common/dto/pagination.dto.js';
import { OrderStatus, OrderStatusList } from '../../enum/order.enum.js';
import { CategoryStatus, CategoryStatusList } from '../../enum/category.enum.js';

export class CategoryPaginationDto extends PaginationDto {
  @IsOptional()
  @IsEnum(CategoryStatusList, {
    message: `Valid status are ${CategoryStatusList.join(', ')}`,
  })
  status!: CategoryStatus;
}