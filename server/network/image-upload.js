import { v2 as cloudinary } from "cloudinary";
import { config as dotenvConfig } from 'dotenv';

dotenvConfig({path:'../.env'})

const cloud_name = process.env.CLOUDINARY_CLOUD_NAME;
const api_key = process.env.CLOUDINARY_API_KEY;
const api_secret = process.env.CLOUDINARY_API_SECRET;

cloudinary.config({
    cloud_name: cloud_name,
    api_key: api_key,
    api_secret: api_secret
});

const opts = {
    overwrite: true,
    invalidate: true,
    resource_type: "auto",
};
// Source: https://github.com/ksekwamote/upload_image_react/blob/main/server/uploadImage.js
// image should be in base64 format
function uploadImage (image){
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(image, opts, (error, result) => {
            if (result && result.secure_url) {
                console.log(result.secure_url);
                return resolve(result.secure_url);
            }
            console.log(error.message);
            return reject({ message: error.message });
        });
    });
};

function uploadMultipleImages (images) {
    return new Promise((resolve, reject) => {
      const uploads = images.map((base) => uploadImage(base));
      Promise.all(uploads)
        .then((values) => resolve(values))
        .catch((err) => reject(err));
    });
  };

export {uploadImage, uploadMultipleImages}

