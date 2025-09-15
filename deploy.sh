#!/bin/bash

# Script de Deploy Automático - RAT Clan Dashboard
# Este script automatiza completamente o processo de deploy na VPS

set -e  # Para o script se houver erro

echo "🚀 Iniciando deploy do RAT Clan Dashboard..."

# Cores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Função para imprimir mensagens coloridas
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[AVISO]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERRO]${NC} $1"
}

# Verificar se o Docker está instalado
if ! command -v docker &> /dev/null; then
    print_error "Docker não está instalado!"
    echo "Instale o Docker primeiro:"
    echo "curl -fsSL https://get.docker.com -o get-docker.sh && sh get-docker.sh"
    exit 1
fi

# Verificar se o Docker Compose está instalado
if ! command -v docker-compose &> /dev/null; then
    print_error "Docker Compose não está instalado!"
    echo "Instale o Docker Compose primeiro:"
    echo "sudo curl -L \"https://github.com/docker/compose/releases/download/v2.24.0/docker-compose-\$(uname -s)-\$(uname -m)\" -o /usr/local/bin/docker-compose"
    echo "sudo chmod +x /usr/local/bin/docker-compose"
    exit 1
fi

# Verificar se o arquivo .env existe
if [ ! -f ".env" ]; then
    print_error "Arquivo .env não encontrado!"
    echo "Crie o arquivo .env com as seguintes variáveis:"
    echo "VITE_SUPABASE_PROJECT_ID=\"seu_project_id\""
    echo "VITE_SUPABASE_PUBLISHABLE_KEY=\"sua_chave_publica\""
    echo "VITE_SUPABASE_URL=\"https://seu_project.supabase.co\""
    exit 1
fi

print_status "Verificando arquivos necessários..."

# Lista de arquivos obrigatórios
required_files=("docker-compose.yml" "Dockerfile" "nginx.conf" ".env")

for file in "${required_files[@]}"; do
    if [ ! -f "$file" ]; then
        print_error "Arquivo obrigatório não encontrado: $file"
        exit 1
    fi
done

print_status "Todos os arquivos necessários estão presentes ✓"

# Parar containers existentes (se houver)
print_status "Parando containers existentes..."
docker-compose down 2>/dev/null || true

# Limpar imagens antigas (opcional, descomente se necessário)
# print_status "Limpando imagens antigas..."
# docker system prune -f

print_status "Construindo e iniciando a aplicação..."

# Construir e iniciar os containers
docker-compose up -d --build

# Aguardar o container ficar saudável
print_status "Aguardando a aplicação ficar disponível..."
sleep 10

# Verificar se o container está rodando
if docker-compose ps | grep -q "Up"; then
    print_status "✅ Deploy realizado com sucesso!"
    echo ""
    echo "🌐 Acesse sua aplicação em:"
    echo "   http://$(hostname -I | awk '{print $1}'):80"
    echo "   ou"
    echo "   http://localhost:80 (se rodando localmente)"
    echo ""
    echo "📋 Comandos úteis:"
    echo "   Ver logs: docker-compose logs -f"
    echo "   Parar: docker-compose down"
    echo "   Reiniciar: docker-compose restart"
    echo ""
    echo "🔐 Login padrão:"
    echo "   Email: admin@ratclan.com"
    echo "   Senha: RatClan2024!"
else
    print_error "❌ Falha no deploy!"
    echo ""
    echo "🔍 Para diagnosticar o problema:"
    echo "   docker-compose logs"
    echo "   docker-compose ps"
    exit 1
fi