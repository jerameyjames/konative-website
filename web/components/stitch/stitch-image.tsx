import Image from "next/image";

type StitchImageProps = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  /** Use inside a `relative` container with explicit height for hero / bleed layouts */
  fill?: boolean;
};

/** Remote assets — `next.config.ts` remotePatterns */
export function StitchImage({
  src,
  alt,
  className = "",
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
  fill = false,
}: StitchImageProps) {
  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-cover ${className}`.trim()}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={2400}
      height={1350}
      sizes={sizes}
      priority={priority}
      className={`h-full w-full object-cover ${className}`.trim()}
    />
  );
}
