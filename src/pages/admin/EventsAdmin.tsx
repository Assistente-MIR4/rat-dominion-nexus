import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Shield, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Calendar, 
  Clock, 
  MapPin, 
  Users,
  CheckCircle,
  XCircle,
  AlertCircle,
  Download,
  Upload
} from "lucide-react";

// Mock data - in real app this would come from your MySQL database
const mockEvents = [
  {
    id: "1",
    name: "Guerra de Clãs Semanal",
    date: "2024-01-15",
    time: "20:00",
    location: "Campo de Batalha Norte",
    maxAttendees: 50,
    currentAttendees: 45,
    status: "confirmed",
    type: "pvp",
    description: "Guerra semanal contra clãs rivais. Participação obrigatória para membros elite.",
    createdBy: "DragonSlayer",
    validatedPresences: 42,
    pendingValidation: 3
  },
  {
    id: "2",
    name: "Boss Raid - Dragão Ancião",
    date: "2024-01-13",
    time: "19:30",
    location: "Cavernas Sombrias",
    maxAttendees: 40,
    currentAttendees: 38,
    status: "completed",
    type: "pve",
    description: "Raid contra o boss mais poderoso da região. Recompensas valiosas garantidas.",
    createdBy: "ShadowHunter",
    validatedPresences: 35,
    pendingValidation: 0
  },
  {
    id: "3",
    name: "Treino de Formação",
    date: "2024-01-18",
    time: "18:00",
    location: "Arena do Clã",
    maxAttendees: 30,
    currentAttendees: 0,
    status: "scheduled",
    type: "training",
    description: "Sessão de treino para melhorar coordenação em batalhas.",
    createdBy: "IceWarrior",
    validatedPresences: 0,
    pendingValidation: 0
  }
];

const eventStatuses = {
  scheduled: { label: "Agendado", color: "bg-blue-500/20 text-blue-400", icon: Calendar },
  confirmed: { label: "Confirmado", color: "bg-gamer-gold/20 text-gamer-gold", icon: CheckCircle },
  completed: { label: "Concluído", color: "bg-green-500/20 text-green-400", icon: CheckCircle },
  cancelled: { label: "Cancelado", color: "bg-red-500/20 text-red-400", icon: XCircle },
};

const eventTypes = {
  pvp: { label: "PvP", color: "text-red-400 border-red-400" },
  pve: { label: "PvE", color: "text-blue-400 border-blue-400" },
  siege: { label: "Cerco", color: "text-gamer-gold border-gamer-gold" },
  training: { label: "Treino", color: "text-green-400 border-green-400" },
};

export default function EventsAdmin() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    time: "",
    location: "",
    maxAttendees: "",
    type: "pvp",
    description: ""
  });

  const handleCreateEvent = () => {
    // Here you would normally send data to your backend
    console.log("Creating event:", formData);
    setShowCreateForm(false);
    setFormData({
      name: "",
      date: "",
      time: "",
      location: "",
      maxAttendees: "",
      type: "pvp",
      description: ""
    });
  };

  const handleValidatePresence = (eventId: string, action: 'approve' | 'reject') => {
    console.log(`${action} presence for event ${eventId}`);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="gamer-card p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gamer-red/10 to-gamer-gold/10"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Shield className="h-8 w-8 text-gamer-red" />
              <div>
                <h1 className="text-3xl font-bold text-gamer-gold">Gerenciar Eventos</h1>
                <p className="text-muted-foreground">
                  Administração completa de eventos do clã RAT
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Button variant="gamer-outline">
                <Download className="h-4 w-4" />
                Exportar Dados
              </Button>
              <Button variant="gamer" onClick={() => setShowCreateForm(!showCreateForm)}>
                <Plus className="h-4 w-4" />
                Criar Evento
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="gamer-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Eventos Ativos</CardTitle>
            <Calendar className="h-4 w-4 text-gamer-gold" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gamer-gold">
              {mockEvents.filter(e => e.status === 'confirmed' || e.status === 'scheduled').length}
            </div>
          </CardContent>
        </Card>
        
        <Card className="gamer-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Validações Pendentes</CardTitle>
            <AlertCircle className="h-4 w-4 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-400">
              {mockEvents.reduce((acc, e) => acc + e.pendingValidation, 0)}
            </div>
          </CardContent>
        </Card>

        <Card className="gamer-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Taxa de Participação</CardTitle>
            <Users className="h-4 w-4 text-gamer-gold" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gamer-gold">85%</div>
          </CardContent>
        </Card>

        <Card className="gamer-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Eventos Concluídos</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-400">
              {mockEvents.filter(e => e.status === 'completed').length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Create Event Form */}
      {showCreateForm && (
        <div className="gamer-card p-6">
          <h2 className="text-xl font-bold text-gamer-gold mb-6">Criar Novo Evento</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-foreground">Nome do Evento</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="bg-gamer-gray border-gamer-red/30"
                  placeholder="Ex: Guerra de Clãs"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date" className="text-foreground">Data</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="bg-gamer-gray border-gamer-red/30"
                  />
                </div>
                <div>
                  <Label htmlFor="time" className="text-foreground">Horário</Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({...formData, time: e.target.value})}
                    className="bg-gamer-gray border-gamer-red/30"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="location" className="text-foreground">Local</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="bg-gamer-gray border-gamer-red/30"
                  placeholder="Ex: Arena do Clã"
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="maxAttendees" className="text-foreground">Máx. Participantes</Label>
                  <Input
                    id="maxAttendees"
                    type="number"
                    value={formData.maxAttendees}
                    onChange={(e) => setFormData({...formData, maxAttendees: e.target.value})}
                    className="bg-gamer-gray border-gamer-red/30"
                  />
                </div>
                <div>
                  <Label htmlFor="type" className="text-foreground">Tipo</Label>
                  <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
                    <SelectTrigger className="bg-gamer-gray border-gamer-red/30">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(eventTypes).map(([type, config]) => (
                        <SelectItem key={type} value={type}>{config.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="description" className="text-foreground">Descrição</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="bg-gamer-gray border-gamer-red/30"
                  placeholder="Descreva o evento..."
                  rows={4}
                />
              </div>
            </div>
          </div>
          
          <div className="flex gap-4 mt-6">
            <Button variant="gamer" onClick={handleCreateEvent}>
              Criar Evento
            </Button>
            <Button variant="gamer-outline" onClick={() => setShowCreateForm(false)}>
              Cancelar
            </Button>
          </div>
        </div>
      )}

      {/* Events List */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gamer-gold">Eventos Existentes</h2>
        
        {mockEvents.map((event) => {
          const statusInfo = eventStatuses[event.status as keyof typeof eventStatuses];
          const typeInfo = eventTypes[event.type as keyof typeof eventTypes];
          const StatusIcon = statusInfo.icon;
          
          return (
            <div key={event.id} className="gamer-card p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <h3 className="text-xl font-bold text-foreground">{event.name}</h3>
                    <Badge className={statusInfo.color}>
                      <StatusIcon className="h-3 w-3 mr-1" />
                      {statusInfo.label}
                    </Badge>
                    <Badge variant="outline" className={typeInfo.color}>
                      {typeInfo.label}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {event.date} às {event.time}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {event.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      {event.currentAttendees}/{event.maxAttendees} participantes
                    </div>
                  </div>
                  
                  <p className="text-foreground mb-4">{event.description}</p>
                  
                  <div className="flex items-center gap-6 text-sm">
                    <span className="text-muted-foreground">
                      Criado por: <span className="text-gamer-gold font-medium">{event.createdBy}</span>
                    </span>
                    <span className="text-muted-foreground">
                      Validadas: <span className="text-green-400 font-medium">{event.validatedPresences}</span>
                    </span>
                    {event.pendingValidation > 0 && (
                      <span className="text-muted-foreground">
                        Pendentes: <span className="text-yellow-400 font-medium">{event.pendingValidation}</span>
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex gap-2 ml-4">
                  <Button variant="gamer-ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="gamer-ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  {event.pendingValidation > 0 && (
                    <>
                      <Button 
                        variant="gamer-outline" 
                        size="sm"
                        onClick={() => handleValidatePresence(event.id, 'approve')}
                      >
                        <CheckCircle className="h-4 w-4" />
                        Validar
                      </Button>
                    </>
                  )}
                  <Button variant="destructive" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {/* Progress bar for attendance */}
              <div className="mt-4">
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>Participação</span>
                  <span>{Math.round((event.currentAttendees / event.maxAttendees) * 100)}%</span>
                </div>
                <div className="w-full bg-gamer-gray rounded-full h-2">
                  <div
                    className="bg-gradient-demonic h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(event.currentAttendees / event.maxAttendees) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}