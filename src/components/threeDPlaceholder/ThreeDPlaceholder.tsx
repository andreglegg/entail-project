import './ThreeDPlaceholder.css';

type Props = {
  src: string;
  alt: string;
  caption?: string;
};

export default function ThreeDPlaceholder({ src, alt, caption }: Props) {
  return (
    <figure className="placeholder__3d">
      <img
        src={src}
        alt={alt}
        className="placeholder__3d-img"
        loading="lazy"
        decoding="async"
        sizes="(min-width: 900px) 50vw, 100vw"
      />
      {caption !== undefined && caption !== '' ? (
        <figcaption className="placeholder__3d-caption">{caption}</figcaption>
      ) : undefined}
    </figure>
  );
}
