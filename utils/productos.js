export const TAG_CONFIG = {
  featured: {
    emoji: "🔥",
    text: "Destacado",
    class: "tag-featured",
    absolute: true,
  },
  vegetarian: { emoji: "🌱", text: "Vegetariano", class: "tag-vegetarian" },
  vegan: { emoji: "🥬", text: "Vegano", class: "tag-vegan" },
  "gluten-free": { emoji: "🌾", text: "Sin Gluten", class: "tag-gluten-free" },
  spicy: { emoji: "🌶️", text: "Picante", class: "tag-spicy" },
  "sugar-free": { emoji: "🚫", text: "Sin Azúcar", class: "tag-sugar-free" },
  light: { emoji: "🥗", text: "Light", class: "tag-light" },
  "with-alcohol": { emoji: "🍷", text: "Con Alcohol", class: "tag-with-alcohol" },
  new: { emoji: "✨", text: "Nuevo", class: "tag-new" },
  popular: { emoji: "⭐", text: "Popular", class: "tag-popular" },
};

export const FILTERABLE_TAGS = [
  "vegetarian",
  "vegan",
  "gluten-free",
  "spicy",
  "sugar-free",
  "light",
  "with-alcohol",
];

export function renderAbsoluteTags(tags) {
  return tags
    .filter((t) => TAG_CONFIG[t]?.absolute)
    .map(
      (t) =>
        `<span class="tag ${TAG_CONFIG[t].class} tag-absolute">${TAG_CONFIG[t].emoji} <span class="tag-label">${TAG_CONFIG[t].text}</span></span>`
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
