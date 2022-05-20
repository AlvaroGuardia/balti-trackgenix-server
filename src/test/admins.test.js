// import { request } from 'express';
import request from 'supertest';
import app from '../index';
import Admins from '../models/Admins';
import adminsSeed from '../seed/admins';
import * as jestSetup from '../../jest.setup';

jestSetup.beforeAll(async () => {
  await Admins.collection.insertMany(adminsSeed);
});

describe('/GET /admins', () => {
  test('return status 200 admins', async () => {
    const response = await request(app).get('/admins').send();
    expect(response.error).toBeFalsy();
  });
});
