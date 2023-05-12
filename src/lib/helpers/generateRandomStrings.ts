export const generateRandomStrings = (): string => {
  const S = "abcdefghijklmnopqrstuvzxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const N = 16;

  return Array.from(crypto.getRandomValues(new Uint32Array(N)))
    .map((n) => S[n % S.length])
    .join("");
};
