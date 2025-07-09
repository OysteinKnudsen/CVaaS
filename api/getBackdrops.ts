/**
 * Endpoint responsible for fetching all backdrops from the cloudinary account
 */

import { VercelRequest, VercelResponse } from "@vercel/node";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const ListBackgroundImages = async (): Promise<string[]> => {
  const resources: any[] = [];
  let nextCursor = undefined;

  do {
    const result = await cloudinary.api.resources({
      type: "upload",
      prefix: "MediaFlowsTest/CV/Backdrops",
      max_results: 100,
      next_cursor: nextCursor,
    });
    resources.push(...result.resources);
    nextCursor = result.next_cursor;
  } while (nextCursor);

  return resources.map((r) => r.public_id);
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const backdrops = await ListBackgroundImages();
  return res.status(200).json({ backdrops });
}
