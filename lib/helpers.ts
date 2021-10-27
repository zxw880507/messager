export const textTransform = (text: string): string => {
  return text
    .split("_")
    .map((el) => (el !== "of" ? el[0].toUpperCase() : el[0]) + el.slice(1))
    .join(" ");
};
