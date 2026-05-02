export const TAG_CONFIG = {
  featured: {
    emoji: "🔥",
    text: "Destacado",
    class: "tag-featured",
    absolute: true,
  },
  vegetarian: { emoji: "🌱", text: "Vegetariano", class: "tag-vegetarian" },
  spicy: { emoji: "🌶️", text: "Picante", class: "tag-spicy" },
  new: { emoji: "✨", text: "Nuevo", class: "tag-new" },
  popular: { emoji: "⭐", text: "Popular", class: "tag-popular" },
};

export function renderAbsoluteTags(tags) {
  return tags
    .filter((t) => TAG_CONFIG[t]?.absolute)
    .map(
      (t) =>
        `<span class="tag ${TAG_CONFIG[t].class} tag-absolute">${TAG_CONFIG[t].emoji} ${TAG_CONFIG[t].text}</span>`
    )
    .join("");
}

export function renderNormalTags(tags) {
  const filteredTags = tags.filter((t) => !TAG_CONFIG[t]?.absolute);
  if (filteredTags.length === 0) return "";
  return `<div class="menu-item-tags">${filteredTags
    .map(
      (t) =>
        `<span class="tag ${TAG_CONFIG[t].class}">${TAG_CONFIG[t].emoji} ${TAG_CONFIG[t].text}</span>`
    )
    .join("")}</div>`;
}
