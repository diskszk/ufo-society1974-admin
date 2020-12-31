// only: yyyy-mm-dd
export const validatePublished_date = (published_date: string): boolean => {
  const yyyy = published_date.split('-')[0];
  const mm = published_date.split('-')[1];
  const dd = published_date.split('-')[2];

  if (!Number(yyyy) || yyyy.length !== 4) {
    return false;
  }
  if (!Number(mm) || mm.length !== 2) {
    return false;
  }
  if (Number(mm) <= 12) {
    return false;
  }
  if (!Number(dd) || dd.length !== 2) {
    return false;
  }
  if (Number(dd) <= 31) {
    return false;
  }

  return true;
};
