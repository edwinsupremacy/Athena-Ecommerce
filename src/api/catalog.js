import api from "./client";

const normaliseItem = (item) => ({
  ...item,
  sizes: item.sizes ?? item.itemSizes ?? [],
});

export const getItems = async ({ category, search, shoeType, color, minPrice, maxPrice } = {}) => {
  const params = Object.fromEntries(
    Object.entries({ shoeType, color, minPrice, maxPrice }).filter(([, value]) => value !== "" && value != null),
  );
  const response = search
    ? await api.get("/api/products/search-item", { params: { name: search, ...params } })
    : category
      ? await api.get(`/api/products/category/${category}`, { params })
      : await api.get("/api/products/get-items", { params });

  return response.data.map(normaliseItem);
};

export const getItem = async (id) => {
  const response = await api.get(`/api/products/get-item/${id}`);
  return normaliseItem(response.data);
};

export const checkout = async (payload) => {
  const response = await api.post("/transaction/checkout-items", payload);
  return response.data;
};
