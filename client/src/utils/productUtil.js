import axios from "axios";

const ENDPOINT = `${window.location.origin}/api/product`;

export const getProducts = async () => {
  const products = await axios.get(`${ENDPOINT}/getProducts`)
    .then((res) => res.data)
    .catch((err) => console.log(`Err: ${err}`));

  return products;
}