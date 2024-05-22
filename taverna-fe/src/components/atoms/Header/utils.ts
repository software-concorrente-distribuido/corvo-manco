const pagePathMap: { [key: string]: string } = {
  home: '/',
  reservas: '/booking',
};

export const getPagePath = (page: string) => {
  return pagePathMap[(page.toString() || '').toLowerCase()];
};
