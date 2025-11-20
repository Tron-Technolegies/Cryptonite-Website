import { useEffect, useState } from "react";
import axios from "axios";

export default function useGetMiningStats() {
  const [difficulty, setDifficulty] = useState(null);
  const [blockReward, setBlockReward] = useState(3.125);
  const [diffLoading, setDiffLoading] = useState(true);
  const [diffError, setDiffError] = useState(null);

  useEffect(() => {
    async function fetchDifficulty() {
      try {
        setDiffLoading(true);

        const res = await axios.get("https://mempool.space/api/v1/difficulty-adjustment");

        console.log("Difficulty API response:", res.data);

        // REAL difficulty stored here:
        const liveDifficulty = res.data.previousRetarget?.difficulty;

        if (liveDifficulty) {
          setDifficulty(liveDifficulty);
        } else {
          // fallback if structure changes
          setDifficulty(85_000_000_000_000);
        }

      } catch (err) {
        console.log("Difficulty fetch error:", err);
        setDiffError(err);
        setDifficulty(85_000_000_000_000); // fallback
      } finally {
        setDiffLoading(false);
      }
    }

    fetchDifficulty();
  }, []);

  return { difficulty, blockReward, diffLoading, diffError };
}
