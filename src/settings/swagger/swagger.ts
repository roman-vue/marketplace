import { INestApplication, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class SwaggerConfig {
  public static ConfigSwaggerModule(app: INestApplication): void {
    const config = new DocumentBuilder()
      .addBearerAuth()
      .setTitle('MARKETPLACE')
      .setVersion(`v0.0.1`)
      .setDescription('backend plataforma MARKERPLACE')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(`api/v1/market/docs`, app, document, {
      swaggerOptions: {
        filter: true,
        showRequestDuration: true,
      },
    });
  }
}
