import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
//import { ResponseMappingInterceptor } from './common/insfractructure/rest/interceptors/response_mapping.interceptors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  const configService = app.get<ConfigService>(ConfigService)
  const globalPrefix = configService.get('GLOBAL_PREFIX')
  app.setGlobalPrefix(globalPrefix)
 app.useGlobalPipes(new ValidationPipe())
  //app.useGlobalFilters(new HttpExceptionFilter())
  //app.useGlobalInterceptors(new ResponseMappingInterceptor(new Reflector()))
  const appName = configService.get('APP_NAME')
  const appDescription = configService.get('APP_DESCRIPTION')
  const apiVersion = configService.get('API_VERSION')
  const config = new DocumentBuilder()
    .setTitle(appName)
    
    .setDescription(appDescription)
    .setVersion(apiVersion)
   .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config)
  //SwaggerModule.setup('/', app, document)
  SwaggerModule.setup(globalPrefix, app, document)
  await app.listen(3001);
}
bootstrap();