Write-Host "🚀 Testando API da Loja Manoel" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Green

# URL base da API
$API_URL = "http://localhost:3000"

Write-Host "1. Fazendo login..." -ForegroundColor Yellow
$loginBody = @{
    username = "admin"
    password = "admin"
} | ConvertTo-Json

try {
    $loginResponse = Invoke-RestMethod -Uri "$API_URL/auth/login" -Method Post -Body $loginBody -ContentType "application/json"
    Write-Host "✅ Login realizado com sucesso!" -ForegroundColor Green
    
    $token = $loginResponse.access_token
    Write-Host "Token obtido: $($token.Substring(0, 20))..." -ForegroundColor Cyan
    
    Write-Host ""
    Write-Host "2. Testando empacotamento..." -ForegroundColor Yellow
    
    $empacotamentoBody = Get-Content -Path "exemplo-teste.json" -Raw
    
    $headers = @{
        "Authorization" = "Bearer $token"
        "Content-Type" = "application/json"
    }
    
    $empacotamentoResponse = Invoke-RestMethod -Uri "$API_URL/empacotamento" -Method Post -Body $empacotamentoBody -Headers $headers
    
    Write-Host "✅ Empacotamento processado com sucesso!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Resultado:" -ForegroundColor Cyan
    $empacotamentoResponse | ConvertTo-Json -Depth 10
    
} catch {
    Write-Host "❌ Erro: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Certifique-se de que a API está rodando em http://localhost:3000" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "📚 Acesse http://localhost:3000/api para ver a documentação Swagger" -ForegroundColor Magenta
