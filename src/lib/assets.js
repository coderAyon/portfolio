export const appBasePath = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");
export const appAssetBase = import.meta.env.BASE_URL || "/";

export function assetHref(path) {
  return `${appAssetBase}${path.replace(/^\/+/, "")}`;
}
