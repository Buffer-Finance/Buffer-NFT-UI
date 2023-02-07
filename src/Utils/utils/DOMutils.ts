import axios from "axios";
import { toJpeg, toPixelData, toPng } from "html-to-image";
import { ICloudanaryRes } from "pages/api/upload";
// const config = {
//   quality: 0.97,
//   canvasWidth: 620,
//   canvasHeight: 420,
// };
const config = { quality: 0.95, canvasWidth: 600, canvasHeight: 315 };

export async function uploadImage(image): Promise<ICloudanaryRes> {
  return await fetch("/api/upload", {
    method: "POST",
    body: image,
  }).then((res) => res.json());
}

export async function getNodeSnapshot(node) {
  return await toJpeg(node, config);
}

export const downloadGetLink = (dataUrl, name) => {
  const link = document.createElement("a");
  link.download = `${name}.jpeg`;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
};
