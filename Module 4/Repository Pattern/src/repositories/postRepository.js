
const postStore = require('../data/postStore');

// Prisma can replace this Map-backed implementation without changing
// the service interface or its business rules.
const posts = new Map(postStore.posts.map((post) => [post.id, post]));
let nextId = Math.max(0, ...posts.keys()) + 1;

function findAll() {
  return Array.from(posts.values());
}

function findById(id) {
  return posts.get(Number(id)) || null;
}

function create(fields) {
  const post = { id: nextId++, ...fields };
  posts.set(post.id, post);
  return post;
}

function update(id, patch) {
  const post = findById(id);
  if (!post) return null;

  const updated = { ...post, ...patch };
  posts.set(updated.id, updated);
  return updated;
}

function remove(id) {
  return posts.delete(Number(id));
}

module.exports = { findAll, findById, create, update, remove };
