# Deploy RAT Clan Dashboard na VPS

## Pré-requisitos
- VPS com Docker e Docker Compose instalados
- Domínio apontado para seu VPS (opcional, mas recomendado para SSL)

## Deploy Simples (Uma Execução)

### 1. Preparar o servidor
```bash
# Instalar Docker (Ubuntu/Debian)
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Instalar Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.24.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

### 2. Fazer upload do projeto
```bash
# No seu computador local, compactar o projeto
tar -czf rat-clan-dashboard.tar.gz .

# Enviar para VPS via scp
scp rat-clan-dashboard.tar.gz user@seu-vps:/home/user/

# No VPS, extrair
cd /home/user/
tar -xzf rat-clan-dashboard.tar.gz
cd rat-clan-dashboard/
```

### 3. Executar aplicação (COMANDO ÚNICO)
```bash
# Para executar apenas a aplicação (HTTP na porta 80)
docker-compose up -d --build

# OU para executar com SSL (HTTPS + painel admin na porta 8080)
docker-compose --profile ssl up -d --build
```

**Pronto! Sua aplicação estará rodando.**

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