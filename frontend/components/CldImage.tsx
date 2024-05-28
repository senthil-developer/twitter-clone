"use client";

import { CldImage as CldImageDefault, CldImageProps } from "next-cloudinary";

export default function CldImage(props: CldImageProps) {
  return <CldImageDefault {...props} />;
}
