import cloudinary from '../configs/cloudinary';

export default class cloudinaryUploader {
  static async imageUploader(fileStr) {
    const uploadedImage = await cloudinary.uploader.upload(fileStr, {
      upload_preset: 'preset.edit.gospel-centre'
    });

    return uploadedImage;
  }
}
