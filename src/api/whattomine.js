// import axios from "axios";

// // const API_URL = "https://whattomine.com/asic.json";

// // TEMP: If CORS blocks, use:
// const API_URL = "https://api.allorigins.win/raw?url=https://whattomine.com/asic.json";

// export const fetchAsicMiners = async () => {
//   const res = await axios.get(API_URL);
//   return res.data.miners;
// };
import axios from "axios";

const API_URL = "https://api.allorigins.win/raw?url=https://whattomine.com/asic.json";

export const fetchAsicMiners = async () => {
  const res = await axios.get(API_URL);

  // Convert object → array
  return Object.values(res.data.miners);
};
