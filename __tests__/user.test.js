import { app } from '../app.js'
import { db } from '../connection.js'
import request from 'supertest'

test('should get all the users',async()=>{
    await request(app)
    .get('/api/users')
    .expect(200)
})

test('should fail because the email already exists',async()=>{
    await request(app)
    .post('/api/signup')
    .expect(400)
})

test('Invalid email password combination',async()=>{
    await request(app)
    .post('/api/login')
    .expect(400)
})