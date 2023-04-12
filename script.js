const axios = require("axios");
const { StatusCodes } = require("http-status-codes");

const getAllUsers = async () => {
  const response = await axios
    .get(`http://localhost:5000/api/user/getAllUsers`)
    .then((res) => res)
    .catch((err) => err);

  if (response.status !== StatusCodes.OK) return undefined;
  return response.data;
};

const getProductById = async (id) => {
  const response = await axios.get(
    `http://localhost:5000/api/product/getProduct/${id}`
  );

  if (response.status !== StatusCodes.OK) return undefined;
  return response.data;
};

const getEmailsForNotification = async (id, newPrice) => {
  const emails = [];
  const users = await getAllUsers();
  for (let i = 0; i < users.length; i++) {
    const found = users[i].productsNotification.find(
      (obj) => obj.id === id && newPrice < obj.price
    );

    if (found) emails.push(found.altEmail);
  }

  return emails;
};

const updateProductPrice = async (id, newPrice) => {
  const oldProduct = await getProductById(id);
  oldProduct.price[0] = newPrice;
  delete oldProduct._id;
  const response = await axios.put(`http://localhost:5000/api/product/updateProduct/${id}`, oldProduct)
    .then((res) => res)
    .catch((err) => err);

  if (response.status !== StatusCodes.OK) {
    console.log("Cannot Update Product Price!");
    return;
  }
  console.log(response.data);

  const emails = getEmailsForNotification(id, newPrice);
  return emails;
};

updateProductPrice(2, 820)
  .then((emails) => console.log(emails))
  .catch((err) => console.log(err));
