import { useAutoAnimate } from "@formkit/auto-animate/react";
import React, { useState } from "react";
import LeaderboardCreationModal from "./LeaderboardCreationModal";
import LeaderboardViewModal from "./LeaderboardViewModal";
import Modal from "./Modal";

type ModalToOpen = "create" | "view";

const LeaderboardManagement: React.FC = () => {
  const [parent] = useAutoAnimate();

  const [isOpen, setIsOpen] = useState(false);
  const [modalToOpen, setModalToOpen] = useState<ModalToOpen>();

  return (
    <>
      <div className="h-screen flex gap-6 items-center justify-center overflow-hidden px-7">
        <button
          onClick={() => {
            setIsOpen(true);
            setModalToOpen("create");
          }}
          className="bg-orange-500 px-5 py-3 rounded-xl text-2xl text-white hover:brightness-100 active:translate-y-1 transition duration-300 shadow-md font-medium tracking-widest font-coluna"
        >
          Create Leaderboard
        </button>
        <button
          onClick={() => {
            setIsOpen(true);
            setModalToOpen("view");
          }}
          className="bg-blue-500 px-5 py-3 rounded-xl text-2xl text-white hover:brightness-100 active:translate-y-1 transition duration-300 shadow-md font-medium tracking-widest font-coluna"
        >
          View Leaderboard
        </button>
      </div>
      <div ref={parent}>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          {modalToOpen === "create" && (
            <LeaderboardCreationModal onClose={() => setIsOpen(false)} />
          )}
          {modalToOpen === "view" && (
            <LeaderboardViewModal onClose={() => setIsOpen(false)} />
          )}
        </Modal>
      </div>
    </>
  );
};

export default LeaderboardManagement;
