import path from 'path';
import fs from 'fs/promises';
import Jimp from 'jimp';

const tmpPath = path.resolve('tmp');
const avatarsPath = path.resolve('public/avatars');

const updateAvatar = async (buffer, id) => {
  const image = await Jimp.read(buffer);
  const filePath = path.join(tmpPath, `${id}.jpg`);

  await image
    .resize(250, 250)
    .writeAsync(filePath);

  const fileName = `${id}-${Date.now()}.jpg`;
  await image.writeAsync(path.join(avatarsPath, fileName));

  await fs.unlink(filePath);
  return `/public/avatars/${fileName}`;
};

export default updateAvatar;