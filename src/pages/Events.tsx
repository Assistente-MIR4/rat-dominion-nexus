import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Calendar, Users, Clock, MapPin, Sword, Filter, Plus, Eye } from "lucide-react";

// Mock data - in real app this would come from your MySQL database
const mockEvents = [
  {
    id: "1",
    name: "Guerra de Clãs Semanal",
    date: "2024-01-15",
    time: "20:00",
    location: "Campo de Batalha Norte",
    attendees: 45,
    maxAttendees: 50,
    status: "confirmed",
    type: "pvp"
  },
  {
    id: "2",
    name: "Boss Raid - Dragão Ancião",
    date: "2024-01-13",
    time: "19:30",
    location: "Cavernas Sombrias",
    attendees: 38,
    maxAttendees: 40,
    status: "completed",
    type: "pve"
  },
  {
    id: "3",
    name: "Conquista de Castelo",
    date: "2024-01-12",
    time: "21:00",
    location: "Castelo Vermelho",
    attendees: 52,
    maxAttendees: 60,
    status: "completed",
    type: "siege"
  },
  {
    id: "4",
    name: "Treino de Formação",
    date: "2024-01-18",
    time: "18:00",
    location: "Arena do Clã",
    attendees: 0,
    maxAttendees: 30,
    status: "scheduled",
    type: "training"
  },
];

const eventTypes = {
  pvp: { label: "PvP", color: "text-red-400 border-red-400" },
  pve: { label: "PvE", color: "text-blue-400 border-blue-400" },
  siege: { label: "Cerco", color: "text-gamer-gold border-gamer-gold" },
  training: { label: "Treino", color: "text-green-400 border-green-400" },
};

const eventStatuses = {
  scheduled: { label: "Agendado", color: "bg-blue-500/20 text-blue-400" },
  confirmed: { label: "Confirmado", color: "bg-gamer-gold/20 text-gamer-gold" },
  completed: { label: "Concluído", color: "bg-green-500/20 text-green-400" },
  cancelled: { label: "Cancelado", color: "bg-red-500/20 text-red-400" },
};

export default function Events() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");

  const filteredEvents = mockEvents.filter(event => {
    const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "all" || event.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="gamer-card p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gamer-red/10 to-gamer-gold/10"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Calendar className="h-8 w-8 text-gamer-gold" />
              <div>
                <h1 className="text-3xl font-bold text-gamer-gold">Eventos do Clã</h1>
                <p className="text-muted-foreground">
                  Gerencie e acompanhe todos os eventos e atividades do RAT
                </p>
              </div>
            </div>
            <Button variant="gamer" size="lg">
              <Plus className="h-4 w-4" />
              Criar Evento
            </Button>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="gamer-card p-6">
        <div className="flex items-center gap-4 mb-6">
          <Filter className="h-5 w-5 text-gamer-gold" />
          <h2 className="text-lg font-semibold text-gamer-gold">Filtros e Busca</h2>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Buscar eventos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gamer-gray border-gamer-red/30"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={selectedType === "all" ? "gamer" : "gamer-ghost"}
              onClick={() => setSelectedType("all")}
              size="sm"
            >
              Todos
            </Button>
            {Object.entries(eventTypes).map(([type, config]) => (
              <Button
                key={type}
                variant={selectedType === type ? "gamer" : "gamer-ghost"}
                onClick={() => setSelectedType(type)}
                size="sm"
              >
                {config.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <div key={event.id} className="gamer-card p-6 hover:shadow-glow-red transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground mb-2">{event.name}</h3>
                <div className="flex gap-2 mb-3">
                  <Badge 
                    variant="outline" 
                    className={eventTypes[event.type as keyof typeof eventTypes].color}
                  >
                    {eventTypes[event.type as keyof typeof eventTypes].label}
                  </Badge>
                  <Badge 
                    className={eventStatuses[event.status as keyof typeof eventStatuses].color}
                  >
                    {eventStatuses[event.status as keyof typeof eventStatuses].label}
                  </Badge>
                </div>
              </div>
              <Sword className="h-5 w-5 text-gamer-red" />
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Users className="h-4 w-4 text-gamer-gold" />
                <span className="text-gamer-gold font-semibold">
                  {event.attendees}/{event.maxAttendees}
                </span>
                <span className="text-muted-foreground">participantes</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Participação</span>
                <span>{Math.round((event.attendees / event.maxAttendees) * 100)}%</span>
              </div>
              <div className="w-full bg-gamer-gray rounded-full h-2">
                <div
                  className="bg-gradient-demonic h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="gamer-outline" size="sm" className="flex-1">
                <Eye className="h-4 w-4" />
                Ver Detalhes
              </Button>
              {event.status === "scheduled" || event.status === "confirmed" ? (
                <Button variant="gamer" size="sm">
                  Participar
                </Button>
              ) : null}
            </div>
          </div>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="gamer-card p-12 text-center">
          <Calendar className="h-12 w-12 text-gamer-gold mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Nenhum evento encontrado
          </h3>
          <p className="text-muted-foreground mb-6">
            Não há eventos que correspondam aos filtros selecionados.
          </p>
          <Button variant="gamer">
            <Plus className="h-4 w-4" />
            Criar Primeiro Evento
          </Button>
        </div>
      )}
    </div>
  );
}