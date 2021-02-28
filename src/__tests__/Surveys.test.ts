import request from 'supertest';
import { app } from '../app';

import createConnection from '../database'
import { getConnection } from 'typeorm';

describe("Surveys", () => {
    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();

    });

    afterAll(async () => {
        const connection = getConnection();
        await connection.dropDatabase();
        await connection.close();
    });

    it("Should be able to create a new user", async () => {
        const response = await request(app).post("/surveys").send({
            title: "Title example",
            description: "description example"
        });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
    });
    it("Shouls be able to show all surveys", async () => {
        await request(app).post("/surveys").send({
            title: "Title example 2",
            description: "description example 2"
        });
        const response = await request(app).get("/surveys");

        expect(response.body.lenght).toBe(2);




    });
});