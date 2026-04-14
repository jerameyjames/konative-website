import Image from "next/image";

type StitchImageProps = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
};

/** Remote Unsplash assets — configured in `next.config.ts` */
export function StitchImage({
  src,
  alt,
  className = "",
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
}: StitchImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={1600}
      height={1000}
      sizes={sizes}
      priority={priority}
      className={`h-full w-full object-cover ${className}`.trim()}
    />
  );
}
