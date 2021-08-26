const sayHello = (req, res) => {
  return res.status(200).send({
    body: 'Hello Man!'
  });
};

module.exports =  {
  sayHello
};
