import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface Player {
  id: string;
  nickname: string;
  guild: string;
  presences: number;
  score: number;
  position: number;
}

interface RankingTableProps {
  players: Player[];
  className?: string;
}

export function RankingTable({ players, className }: RankingTableProps) {
  const getRankBadge = (position: number) => {
    if (position === 1) return "🥇";
    if (position === 2) return "🥈";
    if (position === 3) return "🥉";
    return position;
  };

  const getRankStyle = (position: number) => {
    if (position <= 3) return "text-gamer-gold font-bold";
    if (position <= 10) return "text-accent font-semibold";
    return "text-foreground";
  };

  return (
    <div className={cn("gamer-card overflow-hidden", className)}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-gamer-gray/30">
              <th className="px-6 py-3 text-left text-xs font-medium text-gamer-gold uppercase tracking-wider">
                Rank
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gamer-gold uppercase tracking-wider">
                Jogador
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gamer-gold uppercase tracking-wider">
                Guild
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gamer-gold uppercase tracking-wider">
                Presenças
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gamer-gold uppercase tracking-wider">
                Score
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {players.map((player) => (
              <tr
                key={player.id}
                className="hover:bg-gamer-gray/20 transition-colors duration-200"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={cn("text-sm", getRankStyle(player.position))}>
                    {getRankBadge(player.position)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-gradient-demonic flex items-center justify-center text-xs font-bold text-white mr-3">
                      {player.nickname.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm font-medium text-foreground">
                      {player.nickname}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge variant="outline" className="text-gamer-gold border-gamer-gold/50">
                    {player.guild}
                  </Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                  {player.presences}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-bold text-gamer-gold">
                    {player.score.toLocaleString()}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}