/**
 * Functions that accepts a specific backdrop color and returns the URL of the transformed image.
 * The function integrates with Cloudinary Image Transformation API using the Node.JS SDK.
 * Docs of Cloudinary Image Transformation API: https://cloudinary.com/documentation/image_transformations
 * @example http://localhost:3000/api/images/transform?publicId=demo&backdrop=vann
 */

import { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.status(200).json({ message: 'Hello from the API!' });
} 