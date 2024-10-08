# Image Bird

Empower developers with Image Bird's real-time URL-based API to create a host of transformations
from a single master image for high-quality, performant visual experiences at scale.

## Features

- Blur
- Composite
- Extract
- Format
- Greyscale
- Resize

## Getting Started

Orginal URL: `https://images.unsplash.com/photo-1573225935973-40b81f6e39e6`

Image Bird URL: `https://cdn.imagebird.co/images.unsplash.com/photo-1573225935973-40b81f6e39e6`

**Optional Query Parameters**

- blur: `1 - 1000`
- composite
    - composite\[url\]: `URL of Image`
    - composite\[left\]: `Position from Left`
    - composite\[top\]: `Position from Top`
- extract
    - extract\[height\]: `Height`
    - extract\[width\]: `Width`
    - extract\[x\]: `X`
    - extract\[y\]: `Y`
- format: `jpeg | jpg | png | webp`
- greyscale: `true`
- resize
    - resize\[height\]: `Height`
    - resize\[width\]: `Width`

## Demo

### Orginal Image

- URL: `https://images.unsplash.com/photo-1573225935973-40b81f6e39e6`
- Size: `1.98 MB`
- Dimensions: `4585 x 3057`
- Format: `jpeg`

![](https://cdn.imagebird.co/images.unsplash.com/photo-1573225935973-40b81f6e39e6?resize[height]=600&resize[width]=600)

### Result

- URL: `https://cdn.imagebird.co/images.unsplash.com/photo-1573225935973-40b81f6e39e6?format=webp&greyscale=true&resize[height]=800&resize[width]=800&composite[url]=https://cdn.jsdelivr.net/gh/image-bird/image-bird@master/images/bbc-logo-white.png&composite[left]=20&composite[top]=20`
- Size: `32.7 KB`
- Dimensions: `800 x 533`
- Format: `webp`

![](https://cdn.imagebird.co/images.unsplash.com/photo-1573225935973-40b81f6e39e6?format=webp&greyscale=true&resize[height]=800&resize[width]=800&composite[url]=https://cdn.jsdelivr.net/gh/image-bird/image-bird@master/images/bbc-logo-white.png&composite[left]=20&composite[top]=20)

## Run Locally

```bash
git clone https://github.com/image-bird/image-bird.git

cd image-bird

npm install

npm run dev

# open http://localhost:8080 in your browser
```

## Deploy to Kubernetes

```bash
helm install my-image-bird https://raw.githubusercontent.com/image-bird/image-bird/main/helm-charts/image-bird-0.1.0.tgz
```

## Contributing

We love our contributors! Here's how you can contribute:

- [Open an issue](https://github.com/image-bird/image-bird/issues) if you believe you've encountered a bug.
- Make a [pull request](https://github.com/image-bird/image-bird/pull) to add new features/make quality-of-life improvements/fix bugs.
