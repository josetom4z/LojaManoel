# Loja Manoel - API de Empacotamento

API desenvolvida em Node.js com NestJS para automatizar o processo de embalagem dos pedidos da Loja do Manoel.

## 🚀 Funcionalidades

- **Empacotamento Inteligente**: Algoritmo que otimiza o uso de caixas de papelão
- **Autenticação JWT**: Segurança na API com tokens JWT
- **Documentação Swagger**: Interface interativa para testar a API
- **Docker**: Containerização para fácil deploy
- **Testes**: Testes unitários e de integração

## 📦 Caixas Disponíveis

- **Caixa 1**: 30 x 40 x 80 cm
- **Caixa 2**: 50 x 50 x 40 cm  
- **Caixa 3**: 50 x 80 x 60 cm

## 🛠️ Tecnologias

- Node.js
- NestJS
- TypeScript
- JWT Authentication
- Swagger/OpenAPI
- Docker
- Jest (Testes)

## 📋 Pré-requisitos

- Node.js 18+
- Docker (opcional)
- npm ou yarn

## 🚀 Instalação e Execução

### Desenvolvimento Local

```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run start:dev

# Executar testes
npm run test

# Executar testes e2e
npm run test:e2e
```

### Docker

```bash
# Construir e executar com Docker Compose
docker-compose up --build

# Ou apenas construir a imagem
docker build -t loja-manoel-api .
```

## 📚 Documentação da API

Após iniciar a aplicação, acesse:
- **Swagger UI**: http://localhost:3000/api
- **API Base**: http://localhost:3000

## 🔐 Autenticação

A API utiliza autenticação JWT. Para usar os endpoints protegidos:

1. Faça login em `/auth/login` com:
   - **Username**: `admin`
   - **Password**: `admin`

2. Use o token retornado no header `Authorization: Bearer <token>`

## 📝 Exemplo de Uso

### 1. Fazer Login

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin"}'
```

### 2. Processar Empacotamento

```bash
curl -X POST http://localhost:3000/empacotamento \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <seu-token>" \
  -d '{
    "pedidos": [
      {
        "pedido_id": 1,
        "produtos": [
          {
            "produto_id": "PS5",
            "dimensoes": {"altura": 40, "largura": 10, "comprimento": 25}
          },
          {
            "produto_id": "Volante", 
            "dimensoes": {"altura": 40, "largura": 30, "comprimento": 30}
          }
        ]
      }
    ]
  }'
```

## 🧪 Testes

```bash
# Testes unitários
npm run test

# Testes com cobertura
npm run test:cov

# Testes e2e
npm run test:e2e
```

## 📁 Estrutura do Projeto

```
src/
├── auth/                 # Módulo de autenticação
├── controllers/          # Controllers da API
├── dto/                  # Data Transfer Objects
├── guards/               # Guards de autenticação
├── interfaces/           # Interfaces TypeScript
├── services/             # Services de negócio
├── constants/            # Constantes da aplicação
├── app.module.ts         # Módulo principal
└── main.ts              # Arquivo de inicialização
```

## 🔧 Scripts Disponíveis

- `npm run start` - Inicia a aplicação
- `npm run start:dev` - Inicia em modo desenvolvimento
- `npm run start:prod` - Inicia em modo produção
- `npm run build` - Compila o projeto
- `npm run test` - Executa testes unitários
- `npm run test:e2e` - Executa testes e2e
- `npm run lint` - Executa linter

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.