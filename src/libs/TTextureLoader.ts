import { Texture, TextureLoader } from "three";

const tTextureLoader: TextureLoader = new TextureLoader();

export { tTextureLoader };
export function pictureTexture(path: string): Texture {
  return tTextureLoader.load(path);
}
