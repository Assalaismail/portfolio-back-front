import { diskStorage } from 'multer';
import { extname } from 'path';

export const multerOptions = {
  storage: diskStorage({
    destination: './uploads', // Save images in "uploads" folder
    filename: (req, file, callback) => {
        if (!file) {
            return callback(new Error('No file uploaded'), '');
          }
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      callback(null, `${uniqueSuffix}${extname(file.originalname)}`);
    },
  }),


};
