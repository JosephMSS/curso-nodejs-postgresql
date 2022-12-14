const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
const { checkApiKey } = require('./middlewares/auth.handler');
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
  ormHandler,
} = require('./middlewares/error.handler');
const { registerStrategies } = require('./utils/auth');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
/**
 * Lista de prueba de whitelist
 */
const whitelist = ['http://localhost:8080', 'https://myapp.co'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  },
};
app.use(cors(options));
registerStrategies();
app.get('/', (req, res) => {
  res.send('Hola mi server en express');
});

app.get('/nueva-ruta', checkApiKey, (req, res) => {
  res.send('Hola, soy una nueva ruta');
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(ormHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('Mi port' + port);
});
