import { useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  Crown, 
  Shield, 
  Sword, 
  Calendar, 
  TrendingUp, 
  Trophy, 
  Target,
  Clock,
  Star,
  Award,
  Activity,
  Users,
  Zap
} from "lucide-react";

// Mock data - em app real viria do Supabase baseado no playerId
const mockPlayerData = {
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
  lastSeen: "Agora",
  ranking: 3,
  totalPlayers: 87,
  avatar: null,
  bio: "Veterano do clã RAT, especialista em PvP e liderança de guild wars.",
  achievements: [
    { id: 1, name: "Presença Perfeita", description: "100% de presença por 30 dias", icon: Trophy, unlocked: true },
    { id: 2, name: "Líder Nato", description: "Promovido a oficial", icon: Crown, unlocked: true },
    { id: 3, name: "Veterano", description: "6 meses no clã", icon: Shield, unlocked: true },
    { id: 4, name: "Top 5", description: "Entre os 5 melhores do ranking", icon: Star, unlocked: true },
    { id: 5, name: "Evento Master", description: "Participou de 50+ eventos", icon: Award, unlocked: false }
  ],
  recentEvents: [
    { id: 1, name: "Guild War", date: "2024-01-08", status: "present", points: 15 },
    { id: 2, name: "Boss Raid", date: "2024-01-07", status: "present", points: 12 },
    { id: 3, name: "Castle Siege", date: "2024-01-06", status: "present", points: 20 },
    { id: 4, name: "PvP Tournament", date: "2024-01-05", status: "absent", points: 0 },
    { id: 5, name: "Alliance War", date: "2024-01-04", status: "present", points: 18 }
  ],
  monthlyStats: [
    { month: "Jan", events: 8, attendance: 100 },
    { month: "Dez", events: 12, attendance: 92 },
    { month: "Nov", events: 10, attendance: 90 },
    { month: "Out", events: 15, attendance: 87 },
    { month: "Set", events: 11, attendance: 91 },
    { month: "Ago", events: 14, attendance: 93 }
  ]
};

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

export default function Profile() {
  const { playerId } = useParams();
  const player = mockPlayerData; // Em app real: buscar por playerId
  
  const RoleIcon = roleIcons[player.role as keyof typeof roleIcons] || Sword;
  const statusInfo = statusConfig[player.status as keyof typeof statusConfig];
  
  const attendanceColor = player.attendance >= 90 ? "text-gamer-gold" : 
                         player.attendance >= 70 ? "text-yellow-400" : "text-gamer-red";

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <div className="gamer-card p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gamer-gold/10 to-gamer-red/10"></div>
        <div className="relative z-10">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-6">
              <Avatar className="h-20 w-20 border-4 border-gamer-gold">
                <AvatarFallback className="bg-gradient-demonic text-white font-bold text-2xl">
                  {player.nickname.charAt(0)}
                </AvatarFallback>
              </Avatar>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-bold text-gamer-gold flex items-center gap-2">
                    {player.nickname}
                    <RoleIcon className="h-6 w-6 text-gamer-gold" />
                  </h1>
                  <div className="flex items-center gap-2">
                    <div className={`h-3 w-3 ${statusInfo.color} rounded-full`}></div>
                    <span className={`text-sm font-medium ${statusInfo.textColor}`}>
                      {statusInfo.label}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>Guild: <Badge variant="outline" className="text-gamer-red border-gamer-red/50 ml-1">{player.guild}</Badge></span>
                  <span>Classe: <span className="text-foreground font-medium">{player.class}</span></span>
                  <span>Level: <Badge variant="outline" className="text-gamer-gold border-gamer-gold/50 ml-1">{player.level}</Badge></span>
                </div>
                
                <p className="text-muted-foreground max-w-2xl">{player.bio}</p>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-2xl font-bold text-gamer-gold">#{player.ranking}</div>
              <div className="text-sm text-muted-foreground">de {player.totalPlayers} jogadores</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="gamer-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total de Eventos</CardTitle>
            <Calendar className="h-4 w-4 text-gamer-gold" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gamer-gold">{player.totalEvents}</div>
            <p className="text-xs text-muted-foreground">Desde {new Date(player.joinDate).toLocaleDateString('pt-BR')}</p>
          </CardContent>
        </Card>
        
        <Card className="gamer-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Taxa de Presença</CardTitle>
            <TrendingUp className="h-4 w-4 text-gamer-gold" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${attendanceColor}`}>{player.attendance}%</div>
            <Progress value={player.attendance} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="gamer-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Ranking Atual</CardTitle>
            <Trophy className="h-4 w-4 text-gamer-red" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gamer-red">#{player.ranking}</div>
            <p className="text-xs text-muted-foreground">Top {Math.round((player.ranking / player.totalPlayers) * 100)}%</p>
          </CardContent>
        </Card>

        <Card className="gamer-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Último Acesso</CardTitle>
            <Clock className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-400">{player.lastSeen}</div>
            <p className="text-xs text-muted-foreground">Ativo no servidor</p>
          </CardContent>
        </Card>
      </div>

      {/* Profile Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-gamer-gray">
          <TabsTrigger value="overview" className="data-[state=active]:bg-gamer-red data-[state=active]:text-white">
            <Activity className="h-4 w-4 mr-2" />
            Visão Geral
          </TabsTrigger>
          <TabsTrigger value="events" className="data-[state=active]:bg-gamer-red data-[state=active]:text-white">
            <Calendar className="h-4 w-4 mr-2" />
            Histórico de Eventos
          </TabsTrigger>
          <TabsTrigger value="achievements" className="data-[state=active]:bg-gamer-red data-[state=active]:text-white">
            <Award className="h-4 w-4 mr-2" />
            Conquistas
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Performance Chart */}
            <Card className="gamer-card">
              <CardHeader>
                <CardTitle className="text-gamer-gold flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Performance dos Últimos 6 Meses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {player.monthlyStats.map((stat, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground w-12">{stat.month}</span>
                      <div className="flex-1 mx-4">
                        <Progress value={stat.attendance} className="h-2" />
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <span className="text-gamer-gold font-medium">{stat.events} eventos</span>
                        <span className={stat.attendance >= 90 ? "text-green-400" : stat.attendance >= 70 ? "text-yellow-400" : "text-gamer-red"}>
                          {stat.attendance}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="gamer-card">
              <CardHeader>
                <CardTitle className="text-gamer-gold flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Ações Rápidas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="gamer" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Ver Membros da Guild
                </Button>
                <Button variant="gamer-outline" className="w-full justify-start">
                  <Trophy className="h-4 w-4 mr-2" />
                  Comparar com Ranking
                </Button>
                <Button variant="gamer-ghost" className="w-full justify-start">
                  <Target className="h-4 w-4 mr-2" />
                  Definir Metas
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="events" className="space-y-6">
          <Card className="gamer-card">
            <CardHeader>
              <CardTitle className="text-gamer-gold flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Histórico de Eventos Recentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {player.recentEvents.map((event) => (
                  <div key={event.id} className="flex items-center justify-between p-4 rounded-lg bg-gamer-gray/30 border border-gamer-red/20">
                    <div className="flex items-center gap-4">
                      <div className={`h-3 w-3 rounded-full ${event.status === 'present' ? 'bg-green-500' : 'bg-gamer-red'}`}></div>
                      <div>
                        <h4 className="font-medium text-foreground">{event.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {new Date(event.date).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={event.status === 'present' ? 'default' : 'destructive'}>
                        {event.status === 'present' ? 'Presente' : 'Ausente'}
                      </Badge>
                      {event.points > 0 && (
                        <p className="text-sm text-gamer-gold font-medium mt-1">
                          +{event.points} pts
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {player.achievements.map((achievement) => {
              const Icon = achievement.icon;
              return (
                <Card key={achievement.id} className={`gamer-card ${achievement.unlocked ? 'border-gamer-gold/50' : 'opacity-60'}`}>
                  <CardContent className="p-6 text-center">
                    <div className={`mx-auto mb-4 p-3 rounded-full w-fit ${achievement.unlocked ? 'bg-gamer-gold/20' : 'bg-gray-500/20'}`}>
                      <Icon className={`h-8 w-8 ${achievement.unlocked ? 'text-gamer-gold' : 'text-gray-500'}`} />
                    </div>
                    <h3 className={`font-bold mb-2 ${achievement.unlocked ? 'text-gamer-gold' : 'text-gray-500'}`}>
                      {achievement.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {achievement.description}
                    </p>
                    {achievement.unlocked && (
                      <Badge variant="outline" className="mt-3 text-gamer-gold border-gamer-gold/50">
                        Desbloqueado
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}