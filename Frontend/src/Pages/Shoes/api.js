export default async function fetchTest() {
  let response = await fetch(
    "https://res.cloudinary.com/shopmodels/raw/upload/v1627356501/products/shoe-draco_pg8nde.js"
  );
  let responseText = await response.text();
  return responseText;

  console.log(responseText);
  // document.getElementById("result").innerHTML = responseText;
}

(async () => {
  await fetchTest();
})();
