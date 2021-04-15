// STRETCH
const cars = [
  {
    VIN: "11111111111111111",
  make: "ford",
  model: "mustang",
  mileage: 1110,
  title: "clean",
  transmission: "automatic"
},
{
  VIN: "22222222222222222",
  make: "toyota",
  model: "prius",
  mileage: 100000,
  title: "salvaged",
  transmission: "manual"
},
{
  VIN: "33333333333333333",
  make: "honda",
  model: "civic",
  mileage: 12340,
}
]

exports.seed = async function (knex) {
  await knex("cars").truncate();
  await knex("cars").insert(cars)
}