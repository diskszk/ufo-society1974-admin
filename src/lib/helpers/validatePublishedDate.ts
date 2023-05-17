// only: yyyy-mm-dd
export const validatePublishedDate = (publishedDate: string): boolean => {
  const yyyy = publishedDate.split("-")[0];
  const mm = publishedDate.split("-")[1];
  const dd = publishedDate.split("-")[2];

  if (!Number(yyyy) || yyyy.length !== 4) {
    return false;
  }
  if (mm.length !== 2) {
    return false;
  }
  if (!Number(mm)) {
    return false;
  }
  if (Number(mm) > 12) {
    return false;
  }
  if (dd.length !== 2) {
    return false;
  }
  if (!Number(dd)) {
    return false;
  }
  if (Number(dd) > 31) {
    return false;
  }

  return true;
};
