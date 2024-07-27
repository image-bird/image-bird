# Image Bird

## Example

### Orginal Image

![](https://imagebird.co/images.unsplash.com/photo-1573225935973-40b81f6e39e6)

### Composite Image

![](https://upload.wikimedia.org/wikipedia/commons/4/49/BBC_logo_white.svg)

### Result

![](https://imagebird.co/images.unsplash.com/photo-1573225935973-40b81f6e39e6?composite=http%3A%2F%2Fimage-bird-service%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2F4%2F49%2FBBC_logo_white.svg%3Fformat%3Dpng%26resize%3D100x100&compositeLeft=20&compositeTop=20&greyscale=true&resize=800x800)

## Deployment

```bash
kubectl apply -f https://raw.githubusercontent.com/image-bird/image-bird/main/image-bird.yaml

kubectl apply -f https://raw.githubusercontent.com/image-bird/image-bird/main/image-bird-ingress.yaml
```

## Contributing

We love our contributors! Here's how you can contribute:

- [Open an issue](https://github.com/image-bird/image-bird/issues) if you believe you've encountered a bug.
- Make a [pull request](https://github.com/image-bird/image-bird/pull) to add new features/make quality-of-life improvements/fix bugs.
