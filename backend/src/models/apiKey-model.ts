import mongoose from "mongoose";

const api_key = new mongoose.Schema(
  {
    api_key: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const API_KEY = mongoose.model("Api_key", api_key);

export default API_KEY;



//  if (api_key) {
//       const randomString = Math.random().toString();
//       const hash = crypto.createHash("sha256");
//       hash.update(randomString);
//       const apiKeyValue = hash.digest("hex");
//       apiKeyData = new apiKey({ api_key: apiKeyValue });
//       await apiKeyData.save();
//       res.status(200).json(apiKeyData._id);
//     }