import { app } from '../app.js'
import { db } from '../connection.js'
import request from 'supertest'

test('should get all the posts',async()=>{
    await request(app)
    .get('/api/posts')
    .expect(200)
})

test('should get single post using post Id',async()=>{
    await request(app)
    .post('/api/posts/1')
    .expect(200)
})