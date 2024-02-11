import { images } from "./table.js";

function getAll() {
  //
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(images);
    }, 1000);
  });
}

export const imagesModel = {
  getAll,
};
