import { useState } from "react";
import { RankingTable } from "@/components/ui/ranking-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trophy, Filter, Download, Crown, Medal, Award } from "lucide-react";

// Mock data - in real app this would come from your MySQL database
const mockPlayers = [
  { id: "1", nickname: "DragonSlayer", guild: "RAT-ELITE", presences: 22, score: 8800, position: 1 },
  { id: "2", nickname: "ShadowHunter", guild: "RAT-CORE", presences: 20, score: 8200, position: 2 },
  { id: "3", nickname: "FireMage", guild: "RAT-ELITE", presences: 19, score: 7950, position: 3 },
  { id: "4", nickname: "IceWarrior", guild: "RAT-ALPHA", presences: 18, score: 7680, position: 4 },
  { id: "5", nickname: "ThunderStrike", guild: "RAT-CORE", presences: 17, score: 7420, position: 5 },
  { id: "6", nickname: "LightningBolt", guild: "RAT-BETA", presences: 16, score: 7200, position: 6 },
  { id: "7", nickname: "DarkAssassin", guild: "RAT-ELITE", presences: 15, score: 6980, position: 7 },
  { id: "8", nickname: "FrostMage", guild: "RAT-ALPHA", presences: 14, score: 6750, position: 8 },
  { id: "9", nickname: "BladeMaster", guild: "RAT-CORE", presences: 13, score: 6520, position: 9 },
  { id: "10", nickname: "StormRider", guild: "RAT-BETA", presences: 12, score: 6300, position: 10 },
];

const guilds = ["Todas", "RAT-ELITE", "RAT-CORE", "RAT-ALPHA", "RAT-BETA"];
const periods = ["Todos os tempos", "Este mês", "Esta semana", "Últimos 7 dias"];
const events = ["Todos os eventos", "Guerra de Clãs", "Boss Raids", "Conquista de Castelo"];

export default function Rankings() {
  const [selectedGuild, setSelectedGuild] = useState("Todas");
  const [selectedPeriod, setSelectedPeriod] = useState("Todos os tempos");
  const [selectedEvent, setSelectedEvent] = useState("Todos os eventos");

  const filteredPlayers = mockPlayers.filter(player => 
    selectedGuild === "Todas" || player.guild === selectedGuild
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="gamer-card p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gamer-gold/10 to-gamer-red/10"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <Trophy className="h-8 w-8 text-gamer-gold" />
            <div>
              <h1 className="text-3xl font-bold text-gamer-gold">Rankings do Clã RAT</h1>
              <p className="text-muted-foreground">
                Classificação dos jogadores baseada em presenças e participação em eventos
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="gamer-card p-6">
        <div className="flex items-center gap-4 mb-6">
          <Filter className="h-5 w-5 text-gamer-gold" />
          <h2 className="text-lg font-semibold text-gamer-gold">Filtros</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Guild</label>
            <Select value={selectedGuild} onValueChange={setSelectedGuild}>
              <SelectTrigger className="bg-gamer-gray border-gamer-red/30">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {guilds.map((guild) => (
                  <SelectItem key={guild} value={guild}>
                    {guild}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Período</label>
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="bg-gamer-gray border-gamer-red/30">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {periods.map((period) => (
                  <SelectItem key={period} value={period}>
                    {period}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Evento</label>
            <Select value={selectedEvent} onValueChange={setSelectedEvent}>
              <SelectTrigger className="bg-gamer-gray border-gamer-red/30">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {events.map((event) => (
                  <SelectItem key={event} value={event}>
                    {event}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-4">
          <Button variant="gamer">
            Aplicar Filtros
          </Button>
          <Button variant="gamer-outline">
            <Download className="h-4 w-4" />
            Exportar Rankings
          </Button>
        </div>
      </div>

      {/* Top 3 Highlight */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredPlayers.slice(0, 3).map((player, index) => (
          <div key={player.id} className="gamer-card p-6 text-center relative overflow-hidden">
            <div className={`absolute inset-0 ${
              index === 0 ? 'bg-gradient-to-b from-gamer-gold/20 to-transparent' :
              index === 1 ? 'bg-gradient-to-b from-gray-400/20 to-transparent' :
              'bg-gradient-to-b from-amber-600/20 to-transparent'
            }`}></div>
            <div className="relative z-10">
              <div className="mb-4">
                {index === 0 && <Crown className="h-12 w-12 text-gamer-gold mx-auto mb-2" />}
                {index === 1 && <Medal className="h-12 w-12 text-gray-400 mx-auto mb-2" />}
                {index === 2 && <Award className="h-12 w-12 text-amber-600 mx-auto mb-2" />}
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">{player.nickname}</h3>
              <Badge variant="outline" className="mb-4 text-gamer-gold border-gamer-gold/50">
                {player.guild}
              </Badge>
              <div className="space-y-2">
                <p className="text-2xl font-bold text-gamer-gold">{player.score.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">{player.presences} presenças</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Full Rankings Table */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gamer-gold">
            Ranking Completo ({filteredPlayers.length} jogadores)
          </h2>
          <div className="flex gap-2">
            <Badge variant="outline" className="text-gamer-gold border-gamer-gold/50">
              {selectedGuild}
            </Badge>
            <Badge variant="outline" className="text-gamer-gold border-gamer-gold/50">
              {selectedPeriod}
            </Badge>
          </div>
        </div>
        <RankingTable players={filteredPlayers} />
      </div>
    </div>
  );
}