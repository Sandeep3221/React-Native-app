import multer from 'multer';

// Use memory storage to handle the file buffer directly before uploading to Cloudinary
const storage = multer.memoryStorage();

const upload = multer({ storage });

export default upload;
