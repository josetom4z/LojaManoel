#!/bin/bash

echo "🚀 Testando API da Loja Manoel"
echo "================================"

# URL base da API
API_URL="http://localhost:3000"

echo "1. Fazendo login..."
LOGIN_RESPONSE=$(curl -s -X POST $API_URL/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin"}')

echo "Resposta do login: $LOGIN_RESPONSE"

# Extrair token
TOKEN=$(echo $LOGIN_RESPONSE | grep -o '"access_token":"[^"]*"' | cut -d'"' -f4)

if [ -z "$TOKEN" ]; then
  echo "❌ Erro: Não foi possível obter o token de autenticação"
  exit 1
fi

echo "✅ Token obtido: ${TOKEN:0:20}..."

echo ""
echo "2. Testando empacotamento..."

curl -X POST $API_URL/empacotamento \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d @exemplo-teste.json \
  | jq '.'

echo ""
echo "✅ Teste concluído!"
echo "📚 Acesse http://localhost:3000/api para ver a documentação Swagger"
