// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('../../db.json');
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;

server.use(middlewares);
server.use(router);

export default (req, res) => {

  res.status(200).json({ name: 'John Doe' });
  console.log(req);
}
