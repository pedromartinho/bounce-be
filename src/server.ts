import { env } from './configs/env.config';
import App from './initializers/app';

App.listen(env.app.port, () => {
  console.log(`Server listening at ${env.app.host}:${env.app.port}`);
});