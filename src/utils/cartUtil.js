import axios from "axios";

const url = "http://localhost:5000/";

export const getCartItems = async () => {
  const cartItems = await axios
    .get(url + "api/cart/getCartItems")
    .then((res) => res.data)
    .catch((err) => console.log(`Error: ${err}`));

  return cartItems;
};

export const getOldItem = async (id) => {
  const oldItem = await axios
    .get(url + "api/cart/" + id)
    .then((res) => res.data)
    .catch((err) => console.log(`Error: ${err}`));

  return oldItem;
};

export const updateItem = async (newItem) => {
  await axios
    .post(url + "api/cart/updateItem/" + newItem.id, newItem)
    .then((res) => console.log(res))
    .catch((err) => console.log(`Error: ${err}`));
};

export const deleteItem = async (id) => {
  await axios
    .delete(url + "api/cart/deleteItem/" + id)
    .then((res) => console.log(res))
    .catch((err) => console.log(`Error: ${err}`));
};


export const addItem = async (item) => {
  const oldItem = await getOldItem(item.id);
  if (oldItem != null)  {
    window.alert("The Product is already in the cart! 🙂")
    return;
  }

  console.log("Util Function ", item);
  item.count = 1;
  await axios
    .post(url + "api/cart/addToCart/", item)
    .then((res) => console.log(res))
    .catch((err) => console.log(`Error: ${err}`));
}

export const getCartSize = async () => {
  const cart = await axios
    .get(url + "api/cart/getCartItems")
    .then((res) => res.data)
    .catch((err) => console.log(`Error: ${err}`));
  
  return cart.length;
}