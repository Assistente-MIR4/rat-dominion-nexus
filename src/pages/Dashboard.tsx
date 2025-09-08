import { StatCard } from "@/components/ui/stat-card";
import { RankingTable } from "@/components/ui/ranking-table";
import { Button } from "@/components/ui/button";
import { Calendar, Users, Trophy, TrendingUp, Sword, Crown, Shield } from "lucide-react";
import heroImage from "@/assets/rat-clan-hero.jpg";

// Mock data - in real app this would come from your MySQL database
const mockStats = {
  totalPlayers: 156,
  activeThisWeek: 89,
  totalEvents: 24,
  avgAttendance: 68,
};

const mockTopPlayers = [
  { id: "1", nickname: "DragonSlayer", guild: "RAT-ELITE", presences: 22, score: 8800, position: 1 },
  { id: "2", nickname: "ShadowHunter", guild: "RAT-CORE", presences: 20, score: 8200, position: 2 },
  { id: "3", nickname: "FireMage", guild: "RAT-ELITE", presences: 19, score: 7950, position: 3 },
  { id: "4", nickname: "IceWarrior", guild: "RAT-ALPHA", presences: 18, score: 7680, position: 4 },
  { id: "5", nickname: "ThunderStrike", guild: "RAT-CORE", presences: 17, score: 7420, position: 5 },
];

const recentEvents = [
  { name: "Conquista de Castelo", date: "2024-01-08", attendance: 45 },
  { name: "Guerra de Clãs", date: "2024-01-07", attendance: 38 },
  { name: "Boss Raid Semanal", date: "2024-01-06", attendance: 52 },
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="gamer-card p-8 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-gamer-red/20 to-gamer-gold/20"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <Crown className="h-8 w-8 text-gamer-gold" />
            <div>
              <h1 className="text-3xl font-bold text-gamer-gold">Bem-vindo ao Dashboard RAT</h1>
              <p className="text-muted-foreground">
                Central de comando do clã Ratness - Acompanhe estatísticas e gerencie eventos
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <Button variant="gamer" size="lg">
              <Calendar className="h-4 w-4" />
              Próximo Evento
            </Button>
            <Button variant="gamer-gold" size="lg">
              <Trophy className="h-4 w-4" />
              Ver Rankings
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total de Jogadores"
          value={mockStats.totalPlayers}
          change="+12 este mês"
          changeType="positive"
          icon={Users}
        />
        <StatCard
          title="Ativos esta Semana"
          value={mockStats.activeThisWeek}
          change="89% do total"
          changeType="positive"
          icon={TrendingUp}
        />
        <StatCard
          title="Eventos Realizados"
          value={mockStats.totalEvents}
          change="+3 esta semana"
          changeType="positive"
          icon={Calendar}
        />
        <StatCard
          title="Média de Presença"
          value={`${mockStats.avgAttendance}%`}
          change="+5% vs mês anterior"
          changeType="positive"
          icon={Trophy}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Top Players */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gamer-gold flex items-center gap-2">
              <Trophy className="h-6 w-6" />
              Top 5 Jogadores
            </h2>
            <Button variant="gamer-ghost" size="sm">
              Ver Ranking Completo
            </Button>
          </div>
          <RankingTable players={mockTopPlayers} />
        </div>

        {/* Recent Events */}
        <div>
          <h2 className="text-2xl font-bold text-gamer-gold flex items-center gap-2 mb-6">
            <Sword className="h-6 w-6" />
            Eventos Recentes
          </h2>
          <div className="space-y-4">
            {recentEvents.map((event, index) => (
              <div key={index} className="gamer-card p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground">{event.name}</h3>
                    <p className="text-sm text-muted-foreground">{event.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gamer-gold">
                      {event.attendance} jogadores
                    </p>
                    <Shield className="h-4 w-4 text-gamer-red ml-auto" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <Button variant="gamer-outline" className="w-full mt-4">
            Ver Todos os Eventos
          </Button>
        </div>
      </div>
    </div>
  );
}