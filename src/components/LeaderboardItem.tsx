import { Metric } from "../store";

interface LeaderboardItemProps {
  id: number;
  name: string;
  metrics: Metric[];
  data: Record<string, any>[];
  setIndexLeaderboardView: any;
}

const LeaderboardItem: React.FC<LeaderboardItemProps> = ({
  id,
  name,
  metrics,
  data,
  setIndexLeaderboardView,
}) => {
  return (
    <li>
      <button
        onClick={() => setIndexLeaderboardView(id)}
        className="w-full text-2xl border text-orange-500 tracking-wider border-orange-500 px-5 py-3 rounded-lg hover:text-orange-700 hover:border-orange-700 active:translate-y-0.5  transition duration-300"
      >
        Leaderboard: {name}
      </button>
    </li>
  );
};
export default LeaderboardItem;
