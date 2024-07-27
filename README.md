# Image Bird

Empower developers with Image Bird's real-time URL-based API to create a host of transformations
from a single master image for high-quality, performant visual experiences at scale.

## Demo

### Orginal Image

* URL: `https://images.unsplash.com/photo-1573225935973-40b81f6e39e6`
* Size: `1.98 MB`
* Dimensions: `4585 x 3057`
* Format: `jpeg`

![](https://imagebird.co/images.unsplash.com/photo-1573225935973-40b81f6e39e6?resize[height]=600&resize[width]=600)

### Result

* URL: `https://imagebird.co/images.unsplash.com/photo-1573225935973-40b81f6e39e6?greyscale=true&resize[height]=800&resize[width]=800`
* Size: `32.7 KB`
* Dimensions: `800 x 533`
* Format: `webp`

![](https://imagebird.co/images.unsplash.com/photo-1573225935973-40b81f6e39e6?format=webp&greyscale=true&resize[height]=800&resize[width]=800)

## Deployment

```bash
kubectl apply -f https://raw.githubusercontent.com/image-bird/image-bird/main/image-bird.yaml

kubectl apply -f https://raw.githubusercontent.com/image-bird/image-bird/main/image-bird-ingress.yaml
```

## Contributing

We love our contributors! Here's how you can contribute:

- [Open an issue](https://github.com/image-bird/image-bird/issues) if you believe you've encountered a bug.
- Make a [pull request](https://github.com/image-bird/image-bird/pull) to add new features/make quality-of-life improvements/fix bugs.
