import { useStore } from "../store";

interface IndexLeaderboardViewProps {
  indexLeaderboardView: number;
}

const LeaderboardContent: React.FC<IndexLeaderboardViewProps> = ({
  indexLeaderboardView,
}) => {
  const leaderboards = useStore((store) => store.leaderboards);
  const leaderboard = leaderboards.find(
    (leaderboard) => leaderboard.id === indexLeaderboardView
  );

  if (!leaderboard) {
    return <div>No leaderboard found</div>;
  }

  return (
    <>
      <h2 className="text-2xl font-semibold mb-5">{leaderboard.name}</h2>
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${leaderboard.metrics.length}, minmax(100px, 1fr))`,
        }}
      >
        {leaderboard.metrics.map((metric) => (
          <div
            key={metric.name}
            className="font-semibold bg-orange-500 text-center text-lg py-1 border border-gray-300"
          >
            {metric.name}
          </div>
        ))}
        {leaderboard.data.flatMap((user, userIndex) =>
          leaderboard.metrics.map((metric, index) => (
            <div
              key={index}
              className={`text-center text-lg py-1 border border-gray-300 ${
                userIndex % 2 !== 0 && "bg-gray-200"
              }`}
            >
              {user[metric.name]}
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default LeaderboardContent;
