import supertest from 'supertest';
import app from '../../initializers/app';

const request = supertest(app);

export default request;
