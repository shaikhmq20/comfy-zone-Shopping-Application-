const axios = require("axios");
const { StatusCodes } = require("http-status-codes");

const sendEmail = require("./utils/mail");

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
  const response = await axios
    .put(`http://localhost:5000/api/product/updateProduct/${id}`, oldProduct)
    .then((res) => res)
    .catch((err) => err);

  if (response.status !== StatusCodes.OK) {
    console.log("Cannot Update Product Price!");
    return;
  }
  console.log(response.data);

  const emails = await getEmailsForNotification(id, newPrice);
  return { product: oldProduct, emails };
};

updateProductPrice(2, 820)
  .then(({ product, emails }) => {
    for (let i = 0; i < emails.length; i++) {
      const message = `
      <div style="font-size: 20px">
        <p>Hello User</p>
        <p>This is to let you know that the price for <strong>${product.title}</strong> is updated to \$${product.price[0]}</p>
      </div>
      `;
      sendEmail(emails[i], message);
    }
  })
  .catch((err) => console.log(err));
