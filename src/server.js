//Modulo p/ fazer chamadas http com node puro
import http from 'node:http'
import { json } from './middlewares/json.js';
import { routes } from './routes.js';
import { extractQueryParams } from './utils/extract-query-params.js'

// URL <-  Query Parameters; -> URL Stateful -> Filtros, paginação, não-obrigatórios 
// URL <- Route Parameters; -> Identificação de recurso
// Request body -> Envio de informações de um formulário 


// http://localhost:3333/users?userId=2 -> ?userId=2&name=Alexandre => QueryParameter;

// GET http://localhost:3333/users/1 
// DELETE http://localhost:3333/users/1 -> Deletar usuário com id 1

// POST http://localhost:3333/users -> É enviado por JSON

const server = http.createServer( async (req, res) => {
  const { method, url } = req;
  
  await json(req, res)

  const route = routes.find(route =>{
      return route.method === method && route.path.test(url)
  })

  if (route){
    const routeParams = req.url.match(route.path)


    const { query, ...params } = routeParams.groups;

    req.params = params
    req.query = query ? extractQueryParams(query) : {}
    
    return route.handler(req, res)
  }

  return res.writeHead(404).end()
})

server.listen(3333)
//localhost:3333

