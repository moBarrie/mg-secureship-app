import Image from "next/image";

interface CustomImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

export function CustomImage({
  src,
  alt,
  width,
  height,
  className,
}: CustomImageProps) {
  return (
    <div className={`relative ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width || 500}
        height={height || 300}
        className="object-cover"
        priority={true}
      />
    </div>
  );
}
