export const normalizeNameToURI = name => {
  const newName = name
    .toLowerCase()
    .split(" ")
    .join("-");
  return newName;
};
