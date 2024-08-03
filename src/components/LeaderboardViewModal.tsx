import { useState } from "react";
import { Leaderboard, useStore } from "../store";
import LeaderboardItem from "./LeaderboardItem";
import LeaderboardContent from "./LeaderboardContent";

interface LeaderboardViewModalProps {
  onClose: () => void;
}

const LeaderboardViewModal: React.FC<LeaderboardViewModalProps> = ({
  onClose,
}) => {
  const leaderboards = useStore((store) => store.leaderboards);
  const [indexLeaderboardView, setIndexLeaderboardView] = useState<
    number | null
  >(null);

  return (
    <>
      <h2 className="text-4xl font-bold mb-7">View Leaderboard</h2>
      {indexLeaderboardView === null && (
        <ul className="flex flex-col gap-4">
          {leaderboards.map((leaderboard: Leaderboard) => (
            <LeaderboardItem
              key={leaderboard.id}
              {...leaderboard}
              setIndexLeaderboardView={setIndexLeaderboardView}
            />
          ))}
        </ul>
      )}
      {indexLeaderboardView !== null && (
        <LeaderboardContent indexLeaderboardView={indexLeaderboardView} />
      )}
    </>
  );
};

export default LeaderboardViewModal;
