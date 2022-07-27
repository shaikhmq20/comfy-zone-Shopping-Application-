import axios from "axios";

const endpoint = "http://localhost:5000/api/cart/";

export const getCartItems = async () => {
  const cartItems = await axios
    .get(endpoint + "getCartItems")
    .then((res) => res.data)
    .catch((err) => console.log(`Error: ${err}`));

  return cartItems;
};

export const getOldItem = async (id) => {
  const oldItem = await axios
    .get(endpoint + id)
    .then((res) => res.data)
    .catch((err) => console.log(`Error: ${err}`));

  return oldItem;
};

export const updateItem = async (newItem) => {
  await axios
    .post(endpoint + "updateItem/" + newItem.id, newItem)
    .then((res) => console.log(res))
    .catch((err) => console.log(`Error: ${err}`));
};

export const deleteItem = async (id) => {
  await axios
    .delete(endpoint + "deleteItem/" + id)
    .then((res) => console.log(res))
    .catch((err) => console.log(`Error: ${err}`));
};

export const addItem = async (item) => {
  const oldItem = await getOldItem(item.id);
  if (oldItem != null) {
    window.alert("The Product is already in the cart! 🙂");
    return;
  }

  console.log("Util Function ", item);
  item.count = 1;
  await axios
    .post(endpoint + "addToCart/", item)
    .then((res) => console.log(res))
    .catch((err) => console.log(`Error: ${err}`));
};

export const getCartSize = async () => {
  const cart = await axios
    .get(endpoint + "getCartItems")
    .then((res) => res.data)
    .catch((err) => console.log(`Error: ${err}`));

  return cart.length;
};

export const deleteAllItem = async () => {
  await axios
    .delete(endpoint + "deleteAllItem/")
    .then((res) => console.log(res))
    .catch((err) => console.log(`Error: ${err}`));
};
