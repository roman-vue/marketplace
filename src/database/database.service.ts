import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import * as entities from './entities/index'

const listEntities = Object.values(entities);
export const databaseProvider = TypeOrmModule.forRootAsync({
    imports: [ConfigModule.forRoot({})],
    inject: [ConfigService], 
    useFactory: (configService: ConfigService) => {
        return {
            type: 'postgres',
            host: configService.get<string>('PGHOST'),
            port: Number(configService.get<string>('PGPORT')),
            username: configService.get<string>('PGUSER'),
            password: configService.get<string>('PGPASSWORD'),
            database: configService.get<string>('PGDATABASE'),
            entities: listEntities,
            autoLoadEntities: true,
            synchronize: true,
            logging: true,
            cache: {
                duration: 1700,
            },
        };

    },
});

