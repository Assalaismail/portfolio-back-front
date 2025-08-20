import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const port = process.env.PORT ?? 8000;
  console.log(`Application is running on: http://localhost:${port}`);

    // Enable CORS (Allows all origins)
    app.enableCors();
   // Serve the uploads folder as static
   app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads', // This makes sure URLs like /uploads/filename.jpg work
  });

  app.useStaticAssets(join(__dirname, '..', 'projects-images'), {
    prefix: '/projects-images',
  });

  await app.listen(port);
}

bootstrap();
