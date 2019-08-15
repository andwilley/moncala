const icons = {
  plus: 'M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z',
  delete: 'M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z'
};

export default icons;

export type IconName = keyof typeof icons;
