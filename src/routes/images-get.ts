import axios from 'axios';
import { RouteOptions } from 'fastify';
import sharp from 'sharp';

// resize **
// extract **
// rotate
// blur **
// greyscale **
// format **

// http://localhost:8080/images?resize=680x680&url=https://plus.unsplash.com/premium_photo-1693221705305-6eff5fa8e483

// http://localhost:8080/images?blur=20&resize=680x680&url=https://cdn.24.co.za/files/Cms/General/d/12043/52a9329d98374d908a95a15eb9d2886f.jpg

// http://localhost:8080/cdn.24.co.za/files/Cms/General/d/12043/52a9329d98374d908a95a15eb9d2886f.jpg?blur=20&resize=680x680

export const IMAGES_GET: RouteOptions = {
  handler: async (request, reply) => {
    const params: { fqdn: string; '*': string } = request.params as any;

    const query: {
      blur: string | undefined;
      extract: string | undefined;
      format: 'jpeg' | 'jpg' | 'png' | 'webp' | undefined;
      greyscale: string | undefined;
      resize: string | undefined;
      url: string;
    } = request.query as any;

    // TODO: validate FQDN

    const response = await axios.get(`https://${params.fqdn}/${params['*']}`, {
      responseType: 'arraybuffer',
    });

    let x = sharp(response.data);

    if (query.blur) {
      x = x.blur(parseInt(query.blur));
    }

    if (query.extract) {
      // TODO
      x = x.extract({
        height: parseInt(query.extract.split('x')[3]),
        left: parseInt(query.extract.split('x')[0]),
        width: parseInt(query.extract.split('x')[2]),
        top: parseInt(query.extract.split('x')[1]),
      });
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
  url: '/:fqdn/*',
};
