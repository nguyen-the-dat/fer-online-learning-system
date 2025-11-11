export const getSlug = (title) => {
  if (!title) return null;

  const slug = title
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-_]/g, "");

  return slug;
};
