import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(404);
  });

  it('/auth/login (POST)', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'admin', password: 'admin' })
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('access_token');
      });
  });

  it('/empacotamento (POST) - sem autenticação', () => {
    return request(app.getHttpServer())
      .post('/empacotamento')
      .send({
        pedidos: [
          {
            pedido_id: 1,
            produtos: [
              {
                produto_id: 'Joystick',
                dimensoes: { altura: 15, largura: 20, comprimento: 10 }
              }
            ]
          }
        ]
      })
      .expect(401);
  });
});
