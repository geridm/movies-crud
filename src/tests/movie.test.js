const request = require('supertest');
const app = require('../app');
const Actor = require('../models/Actor');
const Director = require('../models/Director');
const Genre = require('../models/Genre');
require('../models');

let id

test('GET /movies', async () => {
    const res = await request(app).get('/movies');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /movies', async () => {
    const movie = {
        name: "Django unchained",
        image: "https://image.com",
        synopsis: "With the help of a German bounty-hunter, a freed slave sets out to rescue his wife from a brutal plantation owner in Mississippi.",
        releaseYear: 2012
    }
    const res = await request(app).post('/movies').send(movie);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.name).toBe(movie.name);
    expect(res.body.id).toBeDefined();
});

test('PUT /movies/:id', async () => {
    const movie = {
        name: "Django unchained actualizado"
    }
    const res = await request(app).put(`/movies/${id}`).send(movie);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(movie.name);
});

test('POST /movies/:id/actors', async () => {
    const actor = await Actor.create
    ({ 
        firstName: "Jamie",
        lastName: "Fox", 
        nationality: "American", 
        image: "https://image.com", 
        birthday: "12-13-1967"
    });
    const res = await request(app)
        .post(`/movies/${id}/actors`)
        .send([actor.id]);
    console.log(res.body)
    await actor.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test('POST /movies/:id/directors', async () => {
    const director = await Director.create
    ({ 
        firstName: "Quentin",
        lastName: "Tarantino", 
        nationality: "American", 
        image: "https://image.com", 
        birthday: "03-27-1963"
    });
    const res = await request(app)
        .post(`/movies/${id}/directors`)
        .send([director.id]);
    console.log(res.body)
    await director.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test('POST /movies/:id/genres', async () => {
    const genre = await Genre.create
    ({
        name: "Action"
    })
    const res = await request(app)
        .post(`/movies/${id}/genres`)
        .send([genre.id]);
    console.log(res.body)
    await genre.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test('DELETE /movies/:id', async () => {
    const res = await request(app).delete(`/movies/${id}`);
    expect(res.status).toBe(204);
});