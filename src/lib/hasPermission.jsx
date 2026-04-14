export const hasPermission = (permissions, slug, action = "canView") => {
  if (!permissions || !Array.isArray(permissions)) return false;

  const perm = permissions.find((p) => p.page?.slug === slug);

  return perm ? perm[action] : false;
};
