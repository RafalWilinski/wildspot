export default (id, entity) => ({
  id,
  votes: {},
  votesCount: 0,
  isPublic: false,
  entity,
  createdAt: new Date(),
});
