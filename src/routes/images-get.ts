import axios from 'axios';
import { FastifyReply, FastifyRequest, RouteOptions } from 'fastify';
import sharp from 'sharp';

sharp.cache(false);

export const IMAGES_GET: RouteOptions<any, any, any, any> = {
  handler: async (
    request: FastifyRequest<{
      Params: { fqdn: string; '*': string };
      Querystring: {
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
      };
    }>,
    reply: FastifyReply,
  ) => {
    if (
      !request.params.fqdn.match(
        /(?=^.{4,253}$)(^((?!-)[a-zA-Z0-9-]{1,63}(?<!-)\.)+[a-zA-Z]{2,63}$)/,
      )
    ) {
      reply.status(400).send();

      return;
    }

    const response = await axios.get(
      `https://${request.params.fqdn}/${request.params['*']}`,
      {
        responseType: 'arraybuffer',
      },
    );

    let x = sharp(response.data);

    if (request.query.blur) {
      x = x.blur(parseInt(request.query.blur));
    }

    if (request.query.extract) {
      x = x.extract({
        height: parseInt(request.query.extract.height),
        left: request.query.extract.x ? parseInt(request.query.extract.x) : 0,
        width: parseInt(request.query.extract.width),
        top: request.query.extract.y ? parseInt(request.query.extract.y) : 0,
      });
    }

    if (request.query.greyscale) {
      x = x.greyscale();
    }

    if (request.query.resize) {
      x = x.resize({
        fit: 'inside',
        height: parseInt(request.query.resize.height),
        width: parseInt(request.query.resize.width),
      });
    }

    if (request.query.composite) {
      const responseComposite = await axios.get(request.query.composite.url, {
        responseType: 'arraybuffer',
      });

      x = x.composite([
        {
          input: responseComposite.data,
          left: request.query.composite.left
            ? parseInt(request.query.composite.left)
            : undefined,
          top: request.query.composite.top
            ? parseInt(request.query.composite.top)
            : undefined,
        },
      ]);
    }

    x = x.toFormat(request.query.format || 'jpg');

    const buffer: Buffer = await x.toBuffer();

    const contentType: string = `image/${request.query.format || 'jpg'}`;

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
        'extract[height]': {
          type: 'number',
          description: '',
          nullable: true,
        },
        'extract[width]': {
          type: 'number',
          description: '',
          nullable: true,
        },
        'extract[x]': {
          type: 'number',
          description: '',
          nullable: true,
        },
        'extract[y]': {
          type: 'number',
          description: '',
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
