import axios from 'axios';
import { RouteOptions } from 'fastify';
import sharp from 'sharp';

export const IMAGES_GET: RouteOptions = {
  handler: async (request, reply) => {
    const params: { fqdn: string; '*': string } = request.params as any;

    const query: {
      blur: string | undefined;
      composite: {
        left: string | undefined;
        url: string;
        top: string | undefined;
      };
      extract: {
        height: string;
        width: string;
        x: string | undefined;
        y: string | undefined;
      };
      format: 'jpeg' | 'jpg' | 'png' | 'webp' | undefined;
      greyscale: string | undefined;
      resize: {
        height: string;
        width: string;
      };
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
        height: parseInt(query.extract.height),
        left: query.extract.x ? parseInt(query.extract.x) : 0,
        width: parseInt(query.extract.width),
        top: query.extract.y ? parseInt(query.extract.y) : 0,
      });
    }

    if (query.greyscale) {
      x = x.greyscale();
    }

    if (query.resize) {
      x = x.resize({
        fit: 'inside',
        height: parseInt(query.resize.height),
        width: parseInt(query.resize.width),
      });
    }

    if (query.composite) {
      const responseComposite = await axios.get(query.composite.url, {
        responseType: 'arraybuffer',
      });

      x = x.composite([
        {
          input: responseComposite.data,
          left: query.composite.left
            ? parseInt(query.composite.left)
            : undefined,
          top: query.composite.top ? parseInt(query.composite.top) : undefined,
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
        'composite[url]': {
          type: 'string',
          description: '',
          nullable: true,
        },
        'composite[left]': {
          type: 'number',
          description: '',
          nullable: true,
        },
        'composite[top]': {
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
        'resize[height]': {
          type: 'number',
          description: '',
          nullable: true,
        },
        'resize[width]': {
          type: 'number',
          description: '',
          nullable: true,
        },
      },
    },
  },
};
