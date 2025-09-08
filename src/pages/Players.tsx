import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Users, Search, Filter, UserPlus, Shield, Crown, Sword, Star, Eye, Edit } from "lucide-react";

// Mock data - in real app this would come from your MySQL database
const mockPlayers = [
  {
    id: "1",
    nickname: "DragonSlayer",
    guild: "RAT-ELITE",
    level: 85,
    class: "Warrior",
    joinDate: "2023-08-15",
    totalEvents: 22,
    attendance: 95,
    status: "online",
    role: "leader",
    lastSeen: "Agora"
  },
  {
    id: "2",
    nickname: "ShadowHunter",
    guild: "RAT-CORE",
    level: 82,
    class: "Assassin",
    joinDate: "2023-09-02",
    totalEvents: 20,
    attendance: 88,
    status: "online",
    role: "officer",
    lastSeen: "5 min atrás"
  },
  {
    id: "3",
    nickname: "FireMage",
    guild: "RAT-ELITE",
    level: 78,
    class: "Mage",
    joinDate: "2023-10-10",
    totalEvents: 19,
    attendance: 92,
    status: "offline",
    role: "member",
    lastSeen: "2 horas atrás"
  },
  {
    id: "4",
    nickname: "IceWarrior",
    guild: "RAT-ALPHA",
    level: 80,
    class: "Warrior",
    joinDate: "2023-07-20",
    totalEvents: 18,
    attendance: 85,
    status: "away",
    role: "member",
    lastSeen: "30 min atrás"
  },
  {
    id: "5",
    nickname: "ThunderStrike",
    guild: "RAT-CORE",
    level: 83,
    class: "Lancer",
    joinDate: "2023-11-15",
    totalEvents: 17,
    attendance: 89,
    status: "online",
    role: "officer",
    lastSeen: "Agora"
  },
  {
    id: "6",
    nickname: "LightningBolt",
    guild: "RAT-BETA",
    level: 76,
    class: "Archer",
    joinDate: "2023-12-01",
    totalEvents: 16,
    attendance: 80,
    status: "offline",
    role: "member",
    lastSeen: "1 dia atrás"
  }
];

const guilds = ["Todas", "RAT-ELITE", "RAT-CORE", "RAT-ALPHA", "RAT-BETA"];
const classes = ["Todas", "Warrior", "Assassin", "Mage", "Lancer", "Archer"];
const statuses = ["Todos", "online", "offline", "away"];

const statusConfig = {
  online: { label: "Online", color: "bg-green-500", textColor: "text-green-400" },
  offline: { label: "Offline", color: "bg-gray-500", textColor: "text-gray-400" },
  away: { label: "Ausente", color: "bg-yellow-500", textColor: "text-yellow-400" },
};

const roleIcons = {
  leader: Crown,
  officer: Shield,
  member: Sword,
};

export default function Players() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGuild, setSelectedGuild] = useState("Todas");
  const [selectedClass, setSelectedClass] = useState("Todas");
  const [selectedStatus, setSelectedStatus] = useState("Todos");

  const filteredPlayers = mockPlayers.filter(player => {
    const matchesSearch = player.nickname.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGuild = selectedGuild === "Todas" || player.guild === selectedGuild;
    const matchesClass = selectedClass === "Todas" || player.class === selectedClass;
    const matchesStatus = selectedStatus === "Todos" || player.status === selectedStatus;
    return matchesSearch && matchesGuild && matchesClass && matchesStatus;
  });

  const getRoleIcon = (role: string) => {
    const Icon = roleIcons[role as keyof typeof roleIcons];
    return Icon || Sword;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="gamer-card p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gamer-gold/10 to-gamer-red/10"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Users className="h-8 w-8 text-gamer-gold" />
              <div>
                <h1 className="text-3xl font-bold text-gamer-gold">Jogadores do Clã</h1>
                <p className="text-muted-foreground">
                  Gerencie todos os membros do clã RAT e suas informações
                </p>
              </div>
            </div>
            <Button variant="gamer" size="lg">
              <UserPlus className="h-4 w-4" />
              Adicionar Jogador
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="gamer-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total de Jogadores</CardTitle>
            <Users className="h-4 w-4 text-gamer-gold" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gamer-gold">{mockPlayers.length}</div>
            <p className="text-xs text-muted-foreground">+3 este mês</p>
          </CardContent>
        </Card>
        
        <Card className="gamer-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Online Agora</CardTitle>
            <div className="h-2 w-2 bg-green-500 rounded-full"></div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-400">
              {mockPlayers.filter(p => p.status === "online").length}
            </div>
            <p className="text-xs text-muted-foreground">
              {Math.round((mockPlayers.filter(p => p.status === "online").length / mockPlayers.length) * 100)}% do total
            </p>
          </CardContent>
        </Card>

        <Card className="gamer-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Média de Presença</CardTitle>
            <Star className="h-4 w-4 text-gamer-gold" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gamer-gold">
              {Math.round(mockPlayers.reduce((acc, p) => acc + p.attendance, 0) / mockPlayers.length)}%
            </div>
            <p className="text-xs text-muted-foreground">+2% vs mês anterior</p>
          </CardContent>
        </Card>

        <Card className="gamer-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Nível Médio</CardTitle>
            <Sword className="h-4 w-4 text-gamer-red" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gamer-red">
              {Math.round(mockPlayers.reduce((acc, p) => acc + p.level, 0) / mockPlayers.length)}
            </div>
            <p className="text-xs text-muted-foreground">Crescimento constante</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="gamer-card p-6">
        <div className="flex items-center gap-4 mb-6">
          <Filter className="h-5 w-5 text-gamer-gold" />
          <h2 className="text-lg font-semibold text-gamer-gold">Filtros e Busca</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div>
            <Input
              placeholder="Buscar por nickname..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gamer-gray border-gamer-red/30"
            />
          </div>
          <Select value={selectedGuild} onValueChange={setSelectedGuild}>
            <SelectTrigger className="bg-gamer-gray border-gamer-red/30">
              <SelectValue placeholder="Guild" />
            </SelectTrigger>
            <SelectContent>
              {guilds.map((guild) => (
                <SelectItem key={guild} value={guild}>{guild}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedClass} onValueChange={setSelectedClass}>
            <SelectTrigger className="bg-gamer-gray border-gamer-red/30">
              <SelectValue placeholder="Classe" />
            </SelectTrigger>
            <SelectContent>
              {classes.map((cls) => (
                <SelectItem key={cls} value={cls}>{cls}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="bg-gamer-gray border-gamer-red/30">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              {statuses.map((status) => (
                <SelectItem key={status} value={status}>{status}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Players Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlayers.map((player) => {
          const RoleIcon = getRoleIcon(player.role);
          const statusInfo = statusConfig[player.status as keyof typeof statusConfig];
          
          return (
            <div key={player.id} className="gamer-card p-6 hover:shadow-glow-gold transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12 border-2 border-gamer-gold">
                    <AvatarFallback className="bg-gradient-demonic text-white font-bold">
                      {player.nickname.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                      {player.nickname}
                      <RoleIcon className="h-4 w-4 text-gamer-gold" />
                    </h3>
                    <div className="flex items-center gap-2">
                      <div className={`h-2 w-2 ${statusInfo.color} rounded-full`}></div>
                      <span className={`text-sm ${statusInfo.textColor}`}>
                        {statusInfo.label}
                      </span>
                    </div>
                  </div>
                </div>
                <Badge variant="outline" className="text-gamer-gold border-gamer-gold/50">
                  Lv. {player.level}
                </Badge>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Guild:</span>
                  <Badge variant="outline" className="text-gamer-red border-gamer-red/50">
                    {player.guild}
                  </Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Classe:</span>
                  <span className="text-foreground font-medium">{player.class}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Eventos:</span>
                  <span className="text-gamer-gold font-bold">{player.totalEvents}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Presença:</span>
                  <span className="text-gamer-gold font-bold">{player.attendance}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Último acesso:</span>
                  <span className="text-foreground">{player.lastSeen}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="gamer-outline" size="sm" className="flex-1">
                  <Eye className="h-4 w-4" />
                  Ver Perfil
                </Button>
                <Button variant="gamer-ghost" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredPlayers.length === 0 && (
        <div className="gamer-card p-12 text-center">
          <Users className="h-12 w-12 text-gamer-gold mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Nenhum jogador encontrado
          </h3>
          <p className="text-muted-foreground">
            Não há jogadores que correspondam aos filtros selecionados.
          </p>
        </div>
      )}
    </div>
  );
}