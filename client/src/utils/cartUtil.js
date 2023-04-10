import axios from "axios";

const endpoint = `${window.location.origin}/api/cart/`;



export const getCartItems = async () => {
  const cartItems = await axios
    .get(endpoint+"getCartItems/")
    .then((res) => res.data)
    .catch((err) => console.log(`Error: ${err}`));

  return cartItems;
};

export const getOldCartItem = async (id,user_id) => {
  console.log(endpoint+user_id+"/"+id);
  const oldItem = await axios
    .get(endpoint+user_id+"/"+id)
    .then((res) => res.data)
    .catch((err) => console.log(`Error: ${err}`));
    
  return oldItem;
};

export const updateCartItem = async (newItem) => {
  await axios
    .post(endpoint + "updateItem/" + newItem.id, newItem)
    .then((res) => console.log(res))
    .catch((err) => console.log(`Error: ${err}`));
};

export const deleteCartItem = async (id,user_id) => {
  
  await axios
    .delete(endpoint + "deleteItem/" + id+"/"+user_id)
    .then((res) => console.log(res))
    .catch((err) => console.log(`Error: ${err}`));
};

export const addCartItem = async (item) => {
 
  const oldItem = await getOldCartItem(item.id,item.user_id);
  console.log("old",oldItem);
  if (oldItem != null) {
    window.alert("The Product is already in the cart! 🙂");
    return;
  }

  console.log("Util Function ", item);
  item.count = 1;
  await axios
    .post(endpoint+"addToCart/", item
)
    .then((res) => console.log("data",res.data.headers))
    .catch((err) => console.log(`Error: ${err}`));
};

export const getCartSize = async () => {
  const cart = await axios
    .get(endpoint + "getCartItems")
    .then((res) => res.data)
    .catch((err) => console.log(`Error: ${err}`));
  
  return cart.length;
};

export const deleteAllCartItem = async (user_id) => {
  console.log(endpoint+"deleteAllItem/"+user_id);
  await axios
    .delete(endpoint+"deleteAllItem/"+user_id)
    .then((res) => {console.log(res); })
    .catch((err) => console.log(`Error: ${err}`));
};


