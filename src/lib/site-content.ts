// Standalone editorial imagery unrelated to products/categories — not part of the database.

function unsplash(photoId: string, width: number) {
  return `https://images.unsplash.com/${photoId}?q=80&w=${width}&auto=format&fit=crop`;
}

export const heroImage = unsplash("photo-1483985988355-763728e1935b", 2000);
export const editorialImage = unsplash("photo-1445205170230-053b83016050", 1600);
