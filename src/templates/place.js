export default (id, coordinates) => ({
  id,
  votes: 0,
  isPublic: false,
  entity: {
    coordinates,
    features: {},
    photos: [],
  },
});
