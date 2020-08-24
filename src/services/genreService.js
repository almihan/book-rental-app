export const genres = [
  { _id: '123edr4567y8i98975t654h7', name: 'Comedy' },
  { _id: '3er45tr456yu787655gt5678', name: 'Rmance' },
  { _id: '54e3456yh67u787gt56y6787', name: 'Horror' },
];

export function getGenres() {
  return genres.filter((g) => g);
}
