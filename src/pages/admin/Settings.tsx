import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Settings as SettingsIcon, 
  Database, 
  Bell, 
  Shield, 
  Users, 
  Save,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Key,
  Mail,
  Server,
  Trash2
} from "lucide-react";

// Mock data - in real app this would come from your configuration
const mockSettings = {
  general: {
    clanName: "RAT",
    clanDescription: "Clã elite de MIR4 focado em conquistas e batalhas épicas",
    timezone: "America/Sao_Paulo",
    language: "pt-BR"
  },
  discord: {
    botToken: "••••••••••••••••••••••••••••••••••••••••",
    guildId: "1234567890123456789",
    syncEnabled: true,
    autoValidation: true,
    channelId: "9876543210987654321"
  },
  database: {
    status: "connected",
    lastSync: "2024-01-08 14:30:00",
    totalEvents: 90,
    totalPlayers: 156,
    autoBackup: true
  },
  notifications: {
    emailNotifications: true,
    discordNotifications: true,
    eventReminders: true,
    reportGeneration: true
  },
  security: {
    twoFactorAuth: true,
    sessionTimeout: 60,
    allowedIPs: ["192.168.1.1", "10.0.0.1"],
    auditLog: true
  }
};

const adminUsers = [
  { id: 1, name: "DragonSlayer", email: "dragon@ratclan.com", role: "Super Admin", lastLogin: "2024-01-08 15:20" },
  { id: 2, name: "ShadowHunter", email: "shadow@ratclan.com", role: "Admin", lastLogin: "2024-01-08 12:45" },
  { id: 3, name: "IceWarrior", email: "ice@ratclan.com", role: "Moderator", lastLogin: "2024-01-07 18:30" },
];

export default function Settings() {
  const [settings, setSettings] = useState(mockSettings);
  const [hasChanges, setHasChanges] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setHasChanges(false);
    setIsLoading(false);
  };

  const handleSettingChange = (section: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [key]: value
      }
    }));
    setHasChanges(true);
  };

  const handleDatabaseSync = () => {
    console.log("Syncing database...");
  };

  const handleTestConnection = () => {
    console.log("Testing Discord connection...");
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="gamer-card p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gamer-red/10 to-gamer-gold/10"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <SettingsIcon className="h-8 w-8 text-gamer-gold" />
              <div>
                <h1 className="text-3xl font-bold text-gamer-gold">Configurações do Sistema</h1>
                <p className="text-muted-foreground">
                  Gerencie todas as configurações do dashboard RAT
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              {hasChanges && (
                <Badge variant="outline" className="text-yellow-400 border-yellow-400">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  Alterações não salvas
                </Badge>
              )}
              <Button 
                variant="gamer" 
                onClick={handleSave} 
                disabled={!hasChanges || isLoading}
              >
                {isLoading ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                Salvar Alterações
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* General Settings */}
        <Card className="gamer-card">
          <CardHeader>
            <CardTitle className="text-gamer-gold flex items-center gap-2">
              <SettingsIcon className="h-5 w-5" />
              Configurações Gerais
            </CardTitle>
            <CardDescription>Configurações básicas do clã e sistema</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="clanName" className="text-foreground">Nome do Clã</Label>
              <Input
                id="clanName"
                value={settings.general.clanName}
                onChange={(e) => handleSettingChange('general', 'clanName', e.target.value)}
                className="bg-gamer-gray border-gamer-red/30"
              />
            </div>
            
            <div>
              <Label htmlFor="clanDescription" className="text-foreground">Descrição</Label>
              <Textarea
                id="clanDescription"
                value={settings.general.clanDescription}
                onChange={(e) => handleSettingChange('general', 'clanDescription', e.target.value)}
                className="bg-gamer-gray border-gamer-red/30"
                rows={3}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="timezone" className="text-foreground">Fuso Horário</Label>
                <Select 
                  value={settings.general.timezone} 
                  onValueChange={(value) => handleSettingChange('general', 'timezone', value)}
                >
                  <SelectTrigger className="bg-gamer-gray border-gamer-red/30">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="America/Sao_Paulo">São Paulo (GMT-3)</SelectItem>
                    <SelectItem value="America/New_York">New York (GMT-5)</SelectItem>
                    <SelectItem value="Europe/London">London (GMT+0)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="language" className="text-foreground">Idioma</Label>
                <Select 
                  value={settings.general.language} 
                  onValueChange={(value) => handleSettingChange('general', 'language', value)}
                >
                  <SelectTrigger className="bg-gamer-gray border-gamer-red/30">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                    <SelectItem value="en-US">English (US)</SelectItem>
                    <SelectItem value="es-ES">Español</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Discord Integration */}
        <Card className="gamer-card">
          <CardHeader>
            <CardTitle className="text-gamer-gold flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Integração Discord
            </CardTitle>
            <CardDescription>Configurações do bot Discord e sincronização</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="botToken" className="text-foreground">Token do Bot</Label>
              <div className="flex gap-2">
                <Input
                  id="botToken"
                  type="password"
                  value={settings.discord.botToken}
                  onChange={(e) => handleSettingChange('discord', 'botToken', e.target.value)}
                  className="bg-gamer-gray border-gamer-red/30"
                />
                <Button variant="gamer-outline" onClick={handleTestConnection}>
                  <Key className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="guildId" className="text-foreground">Guild ID</Label>
                <Input
                  id="guildId"
                  value={settings.discord.guildId}
                  onChange={(e) => handleSettingChange('discord', 'guildId', e.target.value)}
                  className="bg-gamer-gray border-gamer-red/30"
                />
              </div>
              
              <div>
                <Label htmlFor="channelId" className="text-foreground">Canal ID</Label>
                <Input
                  id="channelId"
                  value={settings.discord.channelId}
                  onChange={(e) => handleSettingChange('discord', 'channelId', e.target.value)}
                  className="bg-gamer-gray border-gamer-red/30"
                />
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="syncEnabled" className="text-foreground">Sincronização Automática</Label>
                <Switch
                  id="syncEnabled"
                  checked={settings.discord.syncEnabled}
                  onCheckedChange={(checked) => handleSettingChange('discord', 'syncEnabled', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="autoValidation" className="text-foreground">Validação Automática</Label>
                <Switch
                  id="autoValidation"
                  checked={settings.discord.autoValidation}
                  onCheckedChange={(checked) => handleSettingChange('discord', 'autoValidation', checked)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Database Status */}
        <Card className="gamer-card">
          <CardHeader>
            <CardTitle className="text-gamer-gold flex items-center gap-2">
              <Database className="h-5 w-5" />
              Status do Banco de Dados
            </CardTitle>
            <CardDescription>Informações e controle do banco MySQL</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gamer-gray/20 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                <div>
                  <p className="font-semibold text-foreground">Conectado</p>
                  <p className="text-sm text-muted-foreground">
                    Última sincronização: {settings.database.lastSync}
                  </p>
                </div>
              </div>
              <Button variant="gamer-outline" size="sm" onClick={handleDatabaseSync}>
                <RefreshCw className="h-4 w-4" />
                Sincronizar
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-gamer-gray/20 rounded-lg">
                <div className="text-2xl font-bold text-gamer-gold">{settings.database.totalEvents}</div>
                <p className="text-sm text-muted-foreground">Total de Eventos</p>
              </div>
              <div className="text-center p-4 bg-gamer-gray/20 rounded-lg">
                <div className="text-2xl font-bold text-gamer-gold">{settings.database.totalPlayers}</div>
                <p className="text-sm text-muted-foreground">Total de Jogadores</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="autoBackup" className="text-foreground">Backup Automático</Label>
              <Switch
                id="autoBackup"
                checked={settings.database.autoBackup}
                onCheckedChange={(checked) => handleSettingChange('database', 'autoBackup', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="gamer-card">
          <CardHeader>
            <CardTitle className="text-gamer-gold flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notificações
            </CardTitle>
            <CardDescription>Configure alertas e notificações do sistema</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="emailNotifications" className="text-foreground">Notificações por Email</Label>
                <Switch
                  id="emailNotifications"
                  checked={settings.notifications.emailNotifications}
                  onCheckedChange={(checked) => handleSettingChange('notifications', 'emailNotifications', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="discordNotifications" className="text-foreground">Notificações Discord</Label>
                <Switch
                  id="discordNotifications"
                  checked={settings.notifications.discordNotifications}
                  onCheckedChange={(checked) => handleSettingChange('notifications', 'discordNotifications', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="eventReminders" className="text-foreground">Lembretes de Eventos</Label>
                <Switch
                  id="eventReminders"
                  checked={settings.notifications.eventReminders}
                  onCheckedChange={(checked) => handleSettingChange('notifications', 'eventReminders', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="reportGeneration" className="text-foreground">Relatórios Automáticos</Label>
                <Switch
                  id="reportGeneration"
                  checked={settings.notifications.reportGeneration}
                  onCheckedChange={(checked) => handleSettingChange('notifications', 'reportGeneration', checked)}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Admin Users */}
      <Card className="gamer-card">
        <CardHeader>
          <CardTitle className="text-gamer-gold flex items-center gap-2">
            <Users className="h-5 w-5" />
            Usuários Administrativos
          </CardTitle>
          <CardDescription>Gerencie usuários com acesso administrativo</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {adminUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 bg-gamer-gray/20 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-gradient-demonic flex items-center justify-center text-white font-bold">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant="outline" className="text-gamer-gold border-gamer-gold/50">
                    {user.role}
                  </Badge>
                  <p className="text-sm text-muted-foreground">
                    Último login: {user.lastLogin}
                  </p>
                  <Button variant="gamer-ghost" size="sm">
                    <Trash2 className="h-4 w-4 text-red-400" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <Button variant="gamer-outline" className="w-full mt-4">
            <Users className="h-4 w-4" />
            Adicionar Novo Admin
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}