/**
 * API endpoint that accepts image file and uploads it to Cloudinary. 
 * Options: backdrop OR original photo 
 * If the the image is uploaded as a backdrop, the function should upload to CV/Backdrops folder 
 * If the the image is uploaded as an original photo, the function should upload to CV/Photos folder 
 * 
 */

import { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.status(200).json({ message: 'Hello from the API!' });
} 