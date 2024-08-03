import { useEffect, useRef, useState } from "react";
import { useStore } from "../store";
import { generateDummyData } from "../utilities/generateDummyData";

interface LeaderboardCreationModalProps {
  onClose: () => void;
}

const LeaderboardCreationModal: React.FC<LeaderboardCreationModalProps> = ({
  onClose,
}) => {
  const addLeaderboard = useStore((state) => state.addLeaderboard);
  const [name, setName] = useState("");
  const [metrics, setMetrics] = useState<{ name: string; type: string }[]>([]);
  const [metricName, setMetricName] = useState("");
  const [metricType, setMetricType] = useState("text");
  const [nameError, setNameError] = useState("");
  const [metricError, setMetricError] = useState("");
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleEditMetric = (index: number) => {
    setEditIndex(index);
    setMetricName(metrics[index].name);
    setMetricType(metrics[index].type);
  };

  const handleDeleteMetric = (index: number) => {
    const updatedMetrics = metrics.filter((_, i) => i !== index);
    setMetrics(updatedMetrics);
  };

  const handleAddMetric = () => {
    if (metricName.trim() === "") {
      setMetricError("Metric Name cannot be blank");
      return;
    }

    if (editIndex !== null) {
      const updatedMetrics = [...metrics];
      updatedMetrics[editIndex] = { name: metricName, type: metricType };
      setMetrics(updatedMetrics);
      setEditIndex(null);
    } else {
      setMetrics([...metrics, { name: metricName, type: metricType }]);
    }
    setMetricName("");
    setMetricType("text");
    setMetricError("");
  };

  const handleCreateLeaderboard = () => {
    if (name.trim() === "") {
      setNameError("Leaderboard Name cannot be blank");
      return;
    }

    if (metrics.length === 0) {
      setNameError("Leaderboard has to have at least one metric");
      return;
    }

    const dummyData = generateDummyData(metrics);

    const newLeaderboard = {
      id: Date.now(),
      name,
      metrics,
      data: dummyData,
    };
    addLeaderboard(newLeaderboard);
    setName("");
    setMetrics([]);
    setNameError("");
    onClose();
  };

  const handleBlur = (inputType: "name" | "metric") => {
    if (
      inputType === "name" &&
      name.trim().length !== 0 &&
      metrics.length > 0
    ) {
      setNameError("");
    } else if (inputType === "metric" && metricName.trim().length !== 0) {
      setMetricError("");
    }
  };

  useEffect(() => {
    if (name.trim().length > 0 && metrics.length > 0) setNameError("");
    if (metricName.trim().length > 0) setMetricError("");
  }, [metricName, name, metrics.length]);

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (editIndex !== null && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editIndex]);

  return (
    <>
      <h2 className="text-4xl font-bold mb-7">Create Leaderboard</h2>
      <div className="relative mb-8">
        {nameError && (
          <p className="text-red-500 text-sm absolute -top-6 left-0">
            {nameError}
          </p>
        )}
        <input
          className="border rounded p-3  w-full"
          type="text"
          placeholder="Leaderboard Name"
          value={name}
          onChange={(e: any) => setName(e.target.value)}
          onBlur={handleBlur.bind(this, "name")}
        />
      </div>

      <div className="mb-3 flex flex-col md:gap-2 md:flex-row ">
        <div className="relative flex-grow">
          {metricError && (
            <p className="text-red-500 text-sm absolute -top-6 left-0">
              {metricError}
            </p>
          )}
          <input
            className="border rounded p-3 w-full"
            type="text"
            placeholder="Metric Name"
            value={metricName}
            ref={inputRef}
            onChange={(e: any) => setMetricName(e.target.value)}
            onBlur={handleBlur.bind(this, "metric")}
          />
        </div>

        <select
          className="border rounded p-3"
          value={metricType}
          onChange={(e) => setMetricType(e.target.value)}
        >
          <option value="text">Text</option>
          <option value="number">Number</option>
        </select>
        {editIndex === null ? (
          <button
            onClick={handleAddMetric}
            className="bg-orange-500 px-4 py-3 text-white rounded shadow-sm hover:brightness-110 transition duration-300 active:translate-y-0.5"
          >
            Add Metric
          </button>
        ) : (
          <button
            onClick={handleAddMetric}
            className="bg-blue-500 px-4 text-white rounded shadow-sm hover:brightness-110 transition duration-300 active:translate-y-0.5"
          >
            Update Metric
          </button>
        )}
      </div>

      <ul className="mb-4">
        {metrics.map((metric, index) => (
          <li
            key={index}
            className="p-4 mb-2 border rounded-lg flex items-center justify-between bg-white shadow-xs"
          >
            <div className="flex-1">
              <input
                className="border-none bg-transparent text-lg font-medium"
                type="text"
                value={metric.name}
                readOnly
              />
              <span className="text-gray-600"> ({metric.type})</span>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEditMetric(index)}
                className="text-blue-500 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteMetric(index)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      <button
        onClick={handleCreateLeaderboard}
        className="p-3 text-xl bg-orange-500 hover:brightness-110 transition duration-300 text-white rounded w-full active:translate-y-0.5"
      >
        Create Leaderboard
      </button>
    </>
  );
};

export default LeaderboardCreationModal;
