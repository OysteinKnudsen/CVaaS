/**
 * API endpoint that accepts image file and uploads it to Cloudinary. 
 * Options: backdrop OR original photo 
 * If the the image is uploaded as a backdrop, the function should upload to CV/Backdrops folder 
 * If the the image is uploaded as an original photo, the function should upload to CV/Photos folder 
 */
import { VercelRequest, VercelResponse } from '@vercel/node';
import { v2 as cloudinary, UploadApiOptions } from 'cloudinary';
import formidable, {
    IncomingForm,
  } from 'formidable'
import { ApiUploadResponse } from '../types/api/ApiUpload';

// Helper to parse the incoming request via formidable
const parseForm = (req): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
    const form = formidable({ keepExtensions: true });
    return new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) return reject(err);
        else resolve({ fields, files });
      });
    });
  };


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const BACKDROPS_FOLDER = 'MediaFlowsTest/CV/Backdrops';
const ORIGINAL_PHOTOS_FOLDER = 'MediaFlowsTest/CV/Photos';

export default async function handler(req: VercelRequest, res: VercelResponse & ApiUploadResponse) {
    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
      }

      const type = req.query.type;
      if (type !== "backdrop" && type !== "original") {
        return res.status(400).json({ error: "Specify type as backdrop or original" });
      }

      const { files } = await parseForm(req);
      
      const imageFile = files.image[0]
      if (!imageFile) {
        return res.status(400).json({ error: 'No image file provided' });
      }

      const uploadOptions: UploadApiOptions = {
        folder: type === "backdrop" ? BACKDROPS_FOLDER : ORIGINAL_PHOTOS_FOLDER,
        public_id: imageFile.originalFilename,
      };
      
      try {
        const uploadResult = await cloudinary.uploader.upload(imageFile.filepath, uploadOptions);
        res.status(200).json({ public_id: uploadResult.public_id });
      } catch (uploadErr: any) {
        res.status(500).json({ error: 'Cloudinary upload failed', details: uploadErr.message });
      }
} 