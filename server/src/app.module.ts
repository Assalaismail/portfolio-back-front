import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database.module';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { BannersModule } from './banners/banners.module';
import { AboutModule } from './about/about.module';
import { SkillsModule } from './skills/skills.module';
import { ExperienceModule } from './experience/experience.module';
// import { AuthModule } from './auth/auth.module';'
import { ChatGateway } from './chat/chat.gateway';


@Module({
  imports: [
    ConfigModule.forRoot(), // Load .env globally
    DatabaseModule,
    UsersModule,
    ProjectsModule,
    // AuthModule,
    BannersModule,
    AboutModule,
    SkillsModule,
    ExperienceModule
  ],
  providers: [ChatGateway],
})
export class AppModule {}
