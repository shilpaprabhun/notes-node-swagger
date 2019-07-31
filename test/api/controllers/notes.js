
var should = require('should');
var request = require('supertest');
var server = require('../../../app');

describe('controllers', function () {

  describe('notes', function () {

    describe('GET /notes', function () {

      it('should return an array of notes', function (done) {

        request(server)
          .get('/notes')
          .set('Accept', 'application/json')
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect(200)
          .end(function (err, res) {
            should.not.exist(err);

            res.body.should.eql([]);

            done();
          });
      });

      it('should post a note', function (done) {

        request(server)
          .post('/notes')
          .send({ title: 'Scott', desc: 'Desc' })
          .set('Accept', 'application/json')
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect(201)
          .end(function (err, res) {
            should.not.exist(err);

            res.body.should.eql({ title: 'Scott', desc: 'Desc', id: 1 });

            done();
          });
      });

      it('should not post a note with invalid input', function (done) {

        request(server)
          .post('/notes')
          .send({ title: 'Scott' })
          .set('Accept', 'application/json')
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect(400)
          .end(function (err, res) {
            should.not.exist(err);

            res.body.should.eql({ message: 'Saving note failed' });

            done();
          });
      });

      it('should return a note with id', function (done) {

        request(server)
          .get('/notes/1')
          .set('Accept', 'application/json')
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect(200)
          .end(function (err, res) {
            should.not.exist(err);

            res.body.should.eql({ title: 'Scott', desc: 'Desc', id: 1 });

            done();
          });
      });

      it('should return an error when note with id does not exist', function (done) {

        request(server)
          .get('/notes/100')
          .set('Accept', 'application/json')
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect(400)
          .end(function (err, res) {
            should.not.exist(err);

            res.body.should.eql({ message: 'There is no note with the id: 100' });

            done();
          });
      });


      it('should Update a note', function (done) {

        request(server)
          .put('/notes')
          .send({ title: 'Scott Updated', desc: 'New Desc', id: 1 })
          .set('Accept', 'application/json')
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect(202)
          .end(function (err, res) {
            should.not.exist(err);

            res.body.should.eql({ message: 'Note updated successfully' });

            done();
          });
      });

      it('should not Update a note if it does not exist', function (done) {

        request(server)
          .put('/notes')
          .send({ title: 'Scott Updated', desc: 'New Desc', id: 100 })
          .set('Accept', 'application/json')
          .expect(204)
          .end(function (err, res) {
            should.not.exist(err);

            res.body.should.eql({});

            done();
          });
      });

      it('should not Update a note if invalid input', function (done) {

        request(server)
          .put('/notes')
          .send({ title: 'Scott Updated', desc: 'New Desc' })
          .set('Accept', 'application/json')
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect(400)
          .end(function (err, res) {
            should.not.exist(err);

            res.body.should.eql({ message: 'Invalid input' });

            done();
          });
      });

    });

  });

});
