import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // console.log("response");

    // Make a request to Product Service to get products
    const response = await axios.get(process.env.PRODUCTS_SERVICE_URL!);
    console.log("response");

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
}
