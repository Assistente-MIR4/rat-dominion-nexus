import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  Users, 
  Trophy, 
  Target,
  Clock,
  Flame,
  Shield,
  Sword,
  Download
} from "lucide-react";

// Mock data - in real app this would come from your MySQL database
const monthlyStats = [
  { month: "Nov 2023", events: 8, attendance: 65, newMembers: 5 },
  { month: "Dez 2023", events: 12, attendance: 72, newMembers: 3 },
  { month: "Jan 2024", events: 15, attendance: 78, newMembers: 8 },
];

const eventTypeStats = [
  { type: "Guerra de Clãs", total: 24, avgAttendance: 85, successRate: 92 },
  { type: "Boss Raids", total: 18, avgAttendance: 72, successRate: 78 },
  { type: "Conquista de Castelo", total: 12, avgAttendance: 95, successRate: 65 },
  { type: "Treinos", total: 36, avgAttendance: 45, successRate: 100 },
];

const guildPerformance = [
  { guild: "RAT-ELITE", members: 28, avgLevel: 82, avgAttendance: 88, topPlayer: "DragonSlayer" },
  { guild: "RAT-CORE", members: 32, avgLevel: 79, avgAttendance: 85, topPlayer: "ShadowHunter" },
  { guild: "RAT-ALPHA", members: 25, avgLevel: 77, avgAttendance: 82, topPlayer: "IceWarrior" },
  { guild: "RAT-BETA", members: 21, avgLevel: 75, avgAttendance: 79, topPlayer: "LightningBolt" },
];

const weeklyActivity = [
  { day: "Segunda", events: 2, attendance: 45 },
  { day: "Terça", events: 1, attendance: 32 },
  { day: "Quarta", events: 3, attendance: 67 },
  { day: "Quinta", events: 2, attendance: 58 },
  { day: "Sexta", events: 4, attendance: 89 },
  { day: "Sábado", events: 5, attendance: 125 },
  { day: "Domingo", events: 3, attendance: 78 },
];

export default function Stats() {
  const [selectedPeriod, setSelectedPeriod] = useState("last-month");
  const [selectedMetric, setSelectedMetric] = useState("attendance");

  const totalEvents = eventTypeStats.reduce((acc, event) => acc + event.total, 0);
  const avgAttendanceOverall = Math.round(
    eventTypeStats.reduce((acc, event) => acc + event.avgAttendance, 0) / eventTypeStats.length
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="gamer-card p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gamer-red/10 to-gamer-gold/10"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <BarChart3 className="h-8 w-8 text-gamer-gold" />
              <div>
                <h1 className="text-3xl font-bold text-gamer-gold">Estatísticas Avançadas</h1>
                <p className="text-muted-foreground">
                  Análises detalhadas do desempenho e atividade do clã RAT
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-48 bg-gamer-gray border-gamer-red/30">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last-week">Última semana</SelectItem>
                  <SelectItem value="last-month">Último mês</SelectItem>
                  <SelectItem value="last-quarter">Último trimestre</SelectItem>
                  <SelectItem value="last-year">Último ano</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="gamer-outline">
                <Download className="h-4 w-4" />
                Exportar
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="gamer-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total de Eventos</CardTitle>
            <Calendar className="h-4 w-4 text-gamer-gold" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gamer-gold mb-1">{totalEvents}</div>
            <div className="flex items-center text-xs">
              <TrendingUp className="h-3 w-3 text-green-400 mr-1" />
              <span className="text-green-400">+23% vs mês anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card className="gamer-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Presença Média</CardTitle>
            <Users className="h-4 w-4 text-gamer-gold" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gamer-gold mb-1">{avgAttendanceOverall}%</div>
            <div className="flex items-center text-xs">
              <TrendingUp className="h-3 w-3 text-green-400 mr-1" />
              <span className="text-green-400">+5% vs mês anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card className="gamer-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Taxa de Sucesso</CardTitle>
            <Trophy className="h-4 w-4 text-gamer-gold" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gamer-gold mb-1">78%</div>
            <div className="flex items-center text-xs">
              <TrendingDown className="h-3 w-3 text-red-400 mr-1" />
              <span className="text-red-400">-2% vs mês anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card className="gamer-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Engajamento</CardTitle>
            <Flame className="h-4 w-4 text-gamer-red" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gamer-red mb-1">94%</div>
            <div className="flex items-center text-xs">
              <TrendingUp className="h-3 w-3 text-green-400 mr-1" />
              <span className="text-green-400">+8% vs mês anterior</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Event Type Performance */}
        <div className="gamer-card p-6">
          <div className="flex items-center gap-3 mb-6">
            <Target className="h-6 w-6 text-gamer-gold" />
            <h2 className="text-xl font-bold text-gamer-gold">Performance por Tipo de Evento</h2>
          </div>
          
          <div className="space-y-6">
            {eventTypeStats.map((event, index) => (
              <div key={index} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sword className="h-4 w-4 text-gamer-red" />
                    <span className="font-semibold text-foreground">{event.type}</span>
                  </div>
                  <Badge variant="outline" className="text-gamer-gold border-gamer-gold/50">
                    {event.total} eventos
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Presença</span>
                      <span className="text-gamer-gold font-medium">{event.avgAttendance}%</span>
                    </div>
                    <Progress value={event.avgAttendance} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Sucesso</span>
                      <span className="text-gamer-gold font-medium">{event.successRate}%</span>
                    </div>
                    <Progress value={event.successRate} className="h-2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Guild Performance */}
        <div className="gamer-card p-6">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="h-6 w-6 text-gamer-gold" />
            <h2 className="text-xl font-bold text-gamer-gold">Performance das Guilds</h2>
          </div>
          
          <div className="space-y-4">
            {guildPerformance.map((guild, index) => (
              <div key={index} className="gamer-card p-4 bg-gamer-gray/20">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-foreground">{guild.guild}</h3>
                  <Badge variant="outline" className="text-gamer-red border-gamer-red/50">
                    {guild.members} membros
                  </Badge>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Nível Médio</p>
                    <p className="text-gamer-gold font-bold">{guild.avgLevel}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Presença</p>
                    <p className="text-gamer-gold font-bold">{guild.avgAttendance}%</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Top Player</p>
                    <p className="text-foreground font-medium">{guild.topPlayer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Weekly Activity */}
      <div className="gamer-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <Clock className="h-6 w-6 text-gamer-gold" />
          <h2 className="text-xl font-bold text-gamer-gold">Atividade Semanal</h2>
        </div>
        
        <div className="grid grid-cols-7 gap-4">
          {weeklyActivity.map((day, index) => (
            <div key={index} className="text-center">
              <div className="gamer-card p-4 mb-2">
                <div className="text-lg font-bold text-gamer-gold mb-1">{day.events}</div>
                <div className="text-xs text-muted-foreground mb-2">eventos</div>
                <div className="text-sm font-semibold text-foreground">{day.attendance}</div>
                <div className="text-xs text-muted-foreground">presentes</div>
              </div>
              <p className="text-sm font-medium text-foreground">{day.day}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Monthly Trends */}
      <div className="gamer-card p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-6 w-6 text-gamer-gold" />
            <h2 className="text-xl font-bold text-gamer-gold">Tendências Mensais</h2>
          </div>
          <Select value={selectedMetric} onValueChange={setSelectedMetric}>
            <SelectTrigger className="w-48 bg-gamer-gray border-gamer-red/30">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="attendance">Presença</SelectItem>
              <SelectItem value="events">Eventos</SelectItem>
              <SelectItem value="members">Novos Membros</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid grid-cols-3 gap-6">
          {monthlyStats.map((month, index) => (
            <div key={index} className="gamer-card p-4 bg-gamer-gray/20">
              <h3 className="font-bold text-foreground mb-4">{month.month}</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Eventos:</span>
                  <span className="text-gamer-gold font-bold">{month.events}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Presença:</span>
                  <span className="text-gamer-gold font-bold">{month.attendance}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Novos:</span>
                  <span className="text-gamer-gold font-bold">{month.newMembers}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}