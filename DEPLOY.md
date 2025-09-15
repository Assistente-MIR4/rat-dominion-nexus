# Deploy do RAT Clan Dashboard

Este documento fornece instruções para fazer o deploy do RAT Clan Dashboard em uma VPS usando Docker e Docker Compose.

## 🚀 Deploy Automático (Recomendado)

### Método Simples - Um Comando Apenas

1. **Faça upload dos arquivos** para sua VPS
2. **Execute o script de deploy**:

```bash
chmod +x deploy.sh
./deploy.sh
```

O script automaticamente:
- ✅ Verifica se Docker e Docker Compose estão instalados  
- ✅ Valida se todos os arquivos necessários estão presentes
- ✅ Para containers existentes
- ✅ Constrói e inicia a aplicação
- ✅ Verifica se tudo está funcionando

Após o deploy, acesse: `http://SEU_IP:80`

---

## 📋 Deploy Manual (Passo a Passo)

### Pré-requisitos

- VPS com Docker e Docker Compose instalados
- Domínio (opcional, para SSL)

### 1. Instalar Docker na VPS

```bash
# Instalar Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Instalar Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.24.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Adicionar usuário ao grupo docker (opcional)
sudo usermod -aG docker $USER
# Relogar após este comando
```

### 2. Fazer Upload dos Arquivos

Faça upload de todos os arquivos do projeto para sua VPS:

```bash
# Exemplo usando scp (rode no seu computador local)
scp -r . user@seu-servidor:/home/user/rat-clan-dashboard/

# Ou usando rsync
rsync -avz --exclude 'node_modules' . user@seu-servidor:/home/user/rat-clan-dashboard/
```

### 3. Configurar Variáveis de Ambiente

O arquivo `.env` já está configurado. Verifique se as URLs estão corretas:

```bash
cd /home/user/rat-clan-dashboard
cat .env

# Se precisar editar:
nano .env
```

### 4. Executar a Aplicação

```bash
# Método básico (HTTP na porta 80)
docker-compose up -d --build

# OU com SSL usando Nginx Proxy Manager (HTTPS)
docker-compose --profile ssl up -d --build
```

## Acessos

### Aplicação Principal
- **HTTP**: `http://SEU_IP_VPS` (porta 80)
- **HTTPS**: `https://SEU_DOMINIO` (se configurou SSL)

### Painel SSL (se executou com --profile ssl)
- **Admin**: `http://SEU_IP_VPS:8080`
  - Email: `admin@example.com`
  - Senha: `changeme`

### Login na Aplicação
1. Acesse a aplicação no navegador
2. Clique em "Cadastrar"
3. Use: 
   - Email: `admin@ratclan.com`
   - Senha: `RatClan2024!`

## Configuração do Supabase

**IMPORTANTE**: Configure as URLs no Supabase Dashboard:

1. **Authentication > Settings**:
   - Site URL: `http://SEU_IP_VPS` ou `https://SEU_DOMINIO`
   - Desabilite "Confirm email" para testes

2. **Authentication > URL Configuration**:
   - Redirect URLs: Adicione sua URL completa

3. **Authentication > Providers**:
   - **Email**: Habilite "Login" e "Signup"
   - **Google**: Configure se desejar login social

## Comandos Úteis

```bash
# Ver logs da aplicação
docker-compose logs -f rat-clan-dashboard

# Ver status dos serviços
docker-compose ps

# Reiniciar aplicação
docker-compose restart rat-clan-dashboard

# Parar tudo
docker-compose down

# Parar e remover volumes
docker-compose down -v

# Atualizar aplicação
docker-compose up -d --build rat-clan-dashboard
```

## SSL com Domínio (Opcional)

Se executou com `--profile ssl`:

1. Acesse `http://SEU_IP:8080`
2. Login: `admin@example.com` / `changeme`
3. Vá em "Proxy Hosts" > "Add Proxy Host"
4. Configure:
   - **Domain Names**: `seudominio.com`
   - **Forward Hostname/IP**: `rat-clan-dashboard`
   - **Forward Port**: `80`
   - **SSL**: Marque "Request a new SSL Certificate"

## Troubleshooting

1. **Aplicação não carrega**: 
   ```bash
   docker-compose logs rat-clan-dashboard
   curl http://localhost # dentro do servidor
   ```

2. **Erro de autenticação**: Verifique URLs no Supabase

3. **Porta 80 ocupada**: 
   ```bash
   sudo netstat -tlnp | grep :80
   sudo systemctl stop apache2  # se Apache estiver rodando
   ```

4. **Problemas de build**:
   ```bash
   docker-compose down
   docker system prune -f
   docker-compose up -d --build
   ```

## Arquivos Importantes

- **docker-compose.yml**: Configuração principal
- **.env**: Variáveis do Supabase (já incluídas automaticamente)
- **nginx.conf**: Configuração do servidor web
- **Dockerfile**: Build da aplicação

## Backup Recomendado

```bash
# Backup dos dados (se necessário)
docker-compose exec rat-clan-dashboard tar -czf /tmp/backup.tar.gz /usr/share/nginx/html

# Backup das configurações
tar -czf backup-config.tar.gz docker-compose.yml nginx.conf .env
```