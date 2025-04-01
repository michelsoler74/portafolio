import { CldImage } from "next-cloudinary";
import Image from "next/image";

const CloudinaryImage = ({ src, alt, width, height, className }) => {
  // Si la URL es un public_id de Cloudinary
  const isCloudinaryId = src && !src.startsWith("http") && !src.startsWith("/");

  if (isCloudinaryId) {
    return (
      <CldImage
        src={src}
        width={width}
        height={height}
        alt={alt}
        className={className}
        cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
      />
    );
  }

  // Si no es un ID de Cloudinary, usar Image normal
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
};

export default CloudinaryImage;
