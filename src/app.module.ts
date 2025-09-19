import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EmpacotamentoModule } from './empacotamento/empacotamento.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    EmpacotamentoModule,
    AuthModule,
  ],
})
export class AppModule {}
