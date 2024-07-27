import axios from 'axios';
import { RouteOptions } from 'fastify';
import sharp from 'sharp';

// http://localhost:8080/images.unsplash.com/photo-1573225935973-40b81f6e39e6?composite=http%3A%2F%2Flocalhost%3A8080%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2F4%2F49%2FBBC_logo_white.svg%3Fformat%3Dpng%26resize%3D100x100&compositeLeft=20&compositeTop=20&greyscale=true&resize=800x800

export const IMAGES_GET: RouteOptions = {
  handler: async (request, reply) => {
    const params: { fqdn: string; '*': string } = request.params as any;

    const query: {
      blur: string | undefined;
      composite: string | undefined;
      compositeLeft: string | undefined;
      compositeTop: string | undefined;
      extract: string | undefined;
      format: 'jpeg' | 'jpg' | 'png' | 'webp' | undefined;
      greyscale: string | undefined;
      resize: string | undefined;
    } = request.query as any;

    if (
      !params.fqdn.match(
        /(?=^.{4,253}$)(^((?!-)[a-zA-Z0-9-]{1,63}(?<!-)\.)+[a-zA-Z]{2,63}$)/,
      )
    ) {
      reply.status(400).send();

      return;
    }

    const response = await axios.get(`https://${params.fqdn}/${params['*']}`, {
      responseType: 'arraybuffer',
    });

    let x = sharp(response.data);

    if (query.blur) {
      x = x.blur(parseInt(query.blur));
    }

    if (query.extract) {
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
        fit: 'inside',
        height: parseInt(query.resize.split('x')[1]),
        width: parseInt(query.resize.split('x')[0]),
      });
    }

    if (query.composite) {
      const responseComposite = await axios.get(query.composite, {
        responseType: 'arraybuffer',
      });

      x = x.composite([
        {
          input: responseComposite.data,
          left: query.compositeLeft ? parseInt(query.compositeLeft) : undefined,
          top: query.compositeTop ? parseInt(query.compositeTop) : undefined,
        },
      ]);
    }

    x = x.toFormat(query.format || 'jpg');

    const buffer: Buffer = await x.toBuffer();

    const contentType: string = `image/${query.format || 'jpg'}`;

    reply.header('content-type', contentType).status(200).send(buffer);
  },
  method: 'GET',
  url: '/:fqdn/*',
  schema: {
    querystring: {
      type: 'object',
      properties: {
        blur: {
          type: 'number',
          description: '1 - 1000',
          nullable: true,
        },
        composite: {
          type: 'string',
          description: 'URL',
          nullable: true,
        },
        compositeLeft: {
          type: 'number',
          description: '',
          nullable: true,
        },
        compositeTop: {
          type: 'number',
          description: '',
          nullable: true,
        },
        extract: {
          type: 'string',
          description: '?x?x?x?',
          nullable: true,
        },
        format: {
          type: 'string',
          description: 'jpeg | jpg | png | webp',
          nullable: true,
        },
        greyscale: {
          type: 'boolean',
          description: '',
          nullable: true,
        },
        resize: {
          type: 'string',
          description: '?x?',
          nullable: true,
        },
      },
    },
  },
};
