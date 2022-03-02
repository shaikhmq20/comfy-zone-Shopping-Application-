import axios from "axios";

export async function getStockForId(id) {
  const productStock = await axios
    .get("http://localhost:5000/" + id)
    .then((res) => {
      return res.data;
    });
  return productStock;
}

export async function updateStockForId(prod_id, count, increment = true) {
  var productStock = await getStockForId(prod_id);
  console.log(productStock);
  if (increment) productStock.numberInStock += count;
  else {
    if (productStock.numberInStock >= count)
      productStock.numberInStock -= count;
  }
  var { id, numberInStock } = productStock;
  console.log(numberInStock);
  axios
    .post("http://localhost:5000/updateStock/" + prod_id, {
      id,
      numberInStock,
    })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
}
