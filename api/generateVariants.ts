/**
 * API endpoint responsible for generating variants of an image.
 * Input: public id of the original image
 * Output: list of URLs of the variants hosted in cloudinary
 *
 * Implementation description:
 * - There exists a folder in cloudinary which contains the background images to be used.
 * For each background image, we will generate a variant of the original image.
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

const GenerateVariants = async (originalPhotoPublicId: string): Promise<string[]> => {
  const backgroundImages = await (await ListBackgroundImages()).slice(0,5);
  if (backgroundImages.length > 100) throw new Error("Too many background images");
  console.log(backgroundImages);
  
  const eagerTransforms = backgroundImages.map(bgId => ({
    transformation: [
      // 1. Remove original background
      { effect: 'background_removal' },
      // 2. Composite the chosen background
      { underlay: bgId, flags: 'layer_apply', crop: 'fill' },
    ],
    format: 'png',
    folder: 'MediaFlowsTest/CV/Variants',
    timeout:60000,
    eagerAsync: true
  }));

  console.log(eagerTransforms);
  
  try {
    const explicitResult = cloudinary.uploader.explicit('MediaFlowsTest/CV/Photos/1337', {
      type:       'upload',
      eager:      eagerTransforms,
    });
  } catch (error) {
    console.log(error);
  }

  return [];
}


const ValidateRequest = (req: VercelRequest, res: VercelResponse): void => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { originalPhotoPublicId } = req.query;
  ValidateRequest(req, res);
  const variants = await GenerateVariants(originalPhotoPublicId as string);
  return res.status(200).json({ variants });
}
