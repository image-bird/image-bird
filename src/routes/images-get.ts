import axios from 'axios';
import { RouteOptions } from 'fastify';
import sharp from 'sharp';

// resize **
// extract
// rotate
// blur **
// greyscale **
// format **

// http://localhost:8080/images?resize=680x680&url=https://plus.unsplash.com/premium_photo-1693221705305-6eff5fa8e483

// http://localhost:8080/images?blur=20&resize=680x680&url=https://cdn.24.co.za/files/Cms/General/d/12043/52a9329d98374d908a95a15eb9d2886f.jpg

export const IMAGES_GET: RouteOptions = {
  handler: async (request, reply) => {
    const query: {
      blur: string | undefined;
      format: 'jpeg' | 'jpg' | 'png' | 'webp' | undefined;
      greyscale: string | undefined;
      resize: string | undefined;
      url: string;
    } = request.query as any;

    const response = await axios.get(query.url, {
      responseType: 'arraybuffer',
    });

    let x = sharp(response.data);

    if (query.blur) {
      x = x.blur(parseInt(query.blur));
    }

    if (query.greyscale) {
      x = x.greyscale();
    }

    if (query.resize) {
      x = x.resize({
        height: parseInt(query.resize.split('x')[1]),
        width: parseInt(query.resize.split('x')[0]),
      });
    }

    x = x.toFormat(query.format || 'jpg');

    const buffer: Buffer = await x.toBuffer();

    const contentType: string = 'image/png'; // TODO

    reply.header('content-type', contentType).status(200).send(buffer);
  },
  method: 'GET',
  url: '/images',
};
