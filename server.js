import express from 'express';
import path from 'path';
import routes from './routes';

const app = express();

const PORT = process.env.PORT || '3000';

app.use(routes);
app.use(express.static(path.join(__dirname, '../views')));

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
