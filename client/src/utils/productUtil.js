import axios from "axios";

const ENDPOINT = `${window.location.origin}/api/product`;

export const getProducts = async () => {
  const products = await axios.get(`${ENDPOINT}/getProducts`)
    .then((res) => res.data)
    .catch((err) => console.log(err));

  return products;
}

export const getProductById = async (id) => {
  const product = await axios.get(`${ENDPOINT}/getProduct/${id}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
  return product;
}

export const updateProductById = async (product) => {
  delete product._id;
  await axios.put(`${ENDPOINT}/updateProduct/${product.id}`, product)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
}