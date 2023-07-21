const fs = require('fs');
const path = require('path');
const AppError = require('../utils/AppError');

class DiskStorage {
  async saveFile(file) {
    const filePath = path.resolve(__dirname, '..', '..', 'tmp', 'uploads', file);
    const fileExists = await fs.promises.stat(filePath).catch(() => false);

    if (!fileExists) {
      throw new AppError('File not found.', 404);
    }

    return filePath;
  }

  async deleteFile(file) {
    const filePath = path.resolve(__dirname, '..', '..', 'tmp', 'uploads', file);

    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }
}

module.exports = new DiskStorage();
