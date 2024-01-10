export let test = (req, res) => {
  res.json({ name: "Rohit Kumar", age: 21 });
}
export let fun = (req, res) => {
  res.send(`Hello ${req.query.name}`)
}