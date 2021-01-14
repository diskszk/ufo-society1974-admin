export const checkRole = (
  allowedRole: string,
  currentRole: string
): boolean => {
  if (allowedRole === currentRole) {
    return true;
  } else {
    return false;
  }
};
