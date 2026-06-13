const SUPABASE_URL = "https://ggizltqylwkijmrfviom.supabase.co";
const ANON_KEY = "sb_publishable_AbiBQ9QlUtFKeTmrtRtR5Q_ImVEMSHY";

const PRODUCT_COLUMNS =
  "id,name,description,description_long,price,image_url,tags,ingredients,category";

/**
 * @param {Object} row - Producto desde Supabase (columnas en inglés)
 * @param {number} row.id
 * @param {string} row.name
 * @param {string} row.description
 * @param {string} row.description_long
 * @param {number} row.price
 * @param {string} row.image_url
 * @param {string[]} row.tags
 * @param {string[]} row.ingredients
 * @param {string} row.categoria
 * @returns {Object} Producto con propiedades en español
 */
function toSpanish(row) {
  return {
    id: row.id,
    nombre: row.name,
    descripcion: row.description,
    descripcion_larga: row.description_long,
    precio: row.price,
    imagen: row.image_url,
    tags: row.tags || [],
    ingredientes: row.ingredients || [],
    categoria: row.category,
  };
}

// Obtiene los productos desde Supabase
export async function getProducts() {
  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/products?select=${PRODUCT_COLUMNS}&order=id.asc`,
    {
      headers: {
        apikey: ANON_KEY,
        Authorization: `Bearer ${ANON_KEY}`,
      },
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Error ${response.status}: ${error}`);
  }

  const data = await response.json();
  return data.map(toSpanish);
}

// Inserta un producto en Supabase
export async function insertProduct(product) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/products`, {
    method: "POST",
    headers: {
      apikey: ANON_KEY,
      Authorization: `Bearer ${ANON_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Error ${response.status}: ${error}`);
  }

  const data = await response.json();
  return toSpanish(data);
}

// Actualiza un producto en Supabase
export async function updateProduct(id, product) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/products?id=eq.${id}`, {
    method: "PATCH",
    headers: {
      apikey: ANON_KEY,
      Authorization: `Bearer ${ANON_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Error ${response.status}: ${error}`);
  }

  return response.json();
}

// Elimina un producto de Supabase
export async function deleteProduct(id) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/products?id=eq.${id}`, {
    method: "DELETE",
    headers: {
      apikey: ANON_KEY,
      Authorization: `Bearer ${ANON_KEY}`,
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Error ${response.status}: ${error}`);
  }
}
