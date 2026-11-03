
import 'dotenv/config';
import joi from 'joi';


interface EnvVars {
    PORT: number;
    PRODUCTS_MICROSERVICES_HOST: string;
    PRODUCTS_MICROSERVICES_PORT: number;
    ORDERS_MICROSERVICES_HOST:string;
   ORDERS_MICROSERVICES_PORT:number;
}

const envsSchema = joi.object<EnvVars>({
    PORT: joi.number().integer().min(1).max(6535).required(),
    PRODUCTS_MICROSERVICES_HOST: joi.string().required(),
    PRODUCTS_MICROSERVICES_PORT: joi.number().integer().min(1).max(6535).required(),
    
    ORDERS_MICROSERVICES_HOST:joi.string().required(),
    ORDERS_MICROSERVICES_PORT: joi.number().integer().min(1).max(6535).required(),

}).unknown(true);

const result = envsSchema.validate(process.env, { abortEarly: false });

if (result.error) {
    throw new Error(`Config validation error: ${result.error.message}`)
}

const envVars = result.value

export const envs = {
    port: envVars.PORT,

    productsMicroserviceHost: envVars.
    PRODUCTS_MICROSERVICES_HOST,

    productsMicroservicePort: envVars.
    PRODUCTS_MICROSERVICES_PORT,

    ordersMicroserviceHost: envVars.ORDERS_MICROSERVICES_HOST,
    ordersMicroservicePort: envVars.ORDERS_MICROSERVICES_PORT,

} as const;