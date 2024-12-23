
const request = require('supertest');
const app = require('../app');
const db = require('../database');

beforeAll((done) => {
  db.serialize(() => {
    db.run("DELETE FROM users");
    db.run("DELETE FROM availability");
    db.run("DELETE FROM appointments");
    done();
  });
});

describe('E2E Test for College Appointment System', () => {
  let studentA1, studentA2, professorP1;

  it('Student A1 authenticates to access the system', async () => {
    const res = await request(app).post('/auth/login').send({ name: 'Student A1', role: 'student' });
    expect(res.statusCode).toEqual(201);
    studentA1 = res.body.id;
  });

  it('Professor P1 authenticates to access the system', async () => {
    const res = await request(app).post('/auth/login').send({ name: 'Professor P1', role: 'professor' });
    expect(res.statusCode).toEqual(201);
    professorP1 = res.body.id;
  });


  it('Professor P1 specifies which time slots he is free for appointments', async () => {
    const res = await request(app).post('/availability').send({ professor_id: professorP1, time_slot: 'T1' });
    expect(res.statusCode).toEqual(201);
  });


  it('Student A1 views available time slots for Professor P1', async () => {
    const res = await request(app).get(`/availability/${professorP1}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(1);
  });

  it('Student A1 books an appointment with Professor P1 for time T1', async () => {
    const res = await request(app).post('/appointments').send({ student_id: studentA1, professor_id: professorP1, time_slot: 'T1' });
    expect(res.statusCode).toEqual(201);
  });

  it('Student A2 authenticates to access the system', async () => {
    const res = await request(app).post('/auth/login').send({ name: 'Student A2', role: 'student' });
    expect(res.statusCode).toEqual(201);
    studentA2 = res.body.id;
  });

  it('Student A2 books an appointment with Professor P1 for time T2', async () => {
    const res = await request(app).post('/appointments').send({ student_id: studentA2, professor_id: professorP1, time_slot: 'T2' });
    expect(res.statusCode).toEqual(201);
  });

  it('Professor P1 cancels the appointment with Student A1', async () => {
    const res = await request(app).get(`/appointments/student/${studentA1}`);
    const appointmentId = res.body[0].id;
    const deleteRes = await request(app).delete(`/appointments/${appointmentId}`);
    expect(deleteRes.statusCode).toEqual(200);
  });

  it('Student A1 checks their appointments and realizes they do not have any pending appointments', async () => {
    const res = await request(app).get(`/appointments/student/${studentA1}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(0);
  });
});
