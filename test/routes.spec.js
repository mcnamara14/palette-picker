const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);

describe('Client Routes', () => {
    it('should return an ok status', done => {
        chai.request(server)
        .get('/')
        .end((err, response) => {
          response.should.have.status(200);
          response.should.be.html;
          done();
        });
    });

    it('should return a 404 for a route that does not exist', done => {
        chai.request(server)
        .get('/sad')
        .end((err, response) => {
        response.should.have.status(404);
        done();
        });
    })
});

describe('API Routes', () => {
    describe('GET /api/v1/projects', () => {
        it('should return all of the projects', done => {
          chai.request(server)
          .get('/api/v1/projects')
          .end((err, response) => {
            response.should.have.status(200);
            response.should.be.json;
            response.body.should.be.a('array');
            response.body.length.should.equal(2);
            response.body[0].should.have.property('name');
            response.body[0].name.should.equal('Project 1');
            done();
          });
        });
    });

    describe('GET /api/v1/palettes', () => {
        it('should return all of the palettes', done => {
          chai.request(server)
          .get('/api/v1/palettes')
          .end((err, response) => {
            response.should.have.status(200);
            response.should.be.json;
            response.body.should.be.a('array');
            response.body.length.should.equal(2);
            response.body[0].should.have.property('id');
            response.body[0].id.should.equal(71);
            response.body[0].should.have.property('name');
            response.body[0].name.should.equal('Palette 1');
            response.body[0].should.have.property('color1');
            response.body[0].color1.should.equal('#4f27d8');
            response.body[0].should.have.property('color2');
            response.body[0].color2.should.equal('#33a535');
            response.body[0].should.have.property('color3');
            response.body[0].color3.should.equal('#9ca882');
            response.body[0].should.have.property('color4');
            response.body[0].color4.should.equal('#132309');
            response.body[0].should.have.property('color5');
            response.body[0].color5.should.equal('#24259');
            response.body[0].should.have.property('project_id');
            response.body[0].project_id.should.equal(94);
            response.body[0].should.have.property('created_at');
            response.body[0].created_at.should.equal('2018-06-29T03:53:25.912Z');
            response.body[0].should.have.property('updated_at');
            response.body[0].updated_at.should.equal('2018-06-29T03:53:25.912Z');
            done();
          });
        });
    });

    describe('GET /api/v1/palettes/:id', () => {  
        it('should return a single palette', done => {
          chai.request(server)
          .get('/api/v1/palettes/71')
          .end((err, response) => {
            response.should.have.status(200);
            response.should.be.json;
            response.body.should.be.a('array');
            response.body.length.should.equal(1);
            response.body[0].should.have.property('name');
            response.body[0].name.should.equal('Palette 1');
            response.body[0].should.have.property('color1');
            response.body[0].color1.should.equal('#4f27d8');
            response.body[0].should.have.property('color2');
            response.body[0].color2.should.equal('#33a535');
            response.body[0].should.have.property('color3');
            response.body[0].color3.should.equal('#9ca882');
            response.body[0].should.have.property('color4');
            response.body[0].color4.should.equal('#132309');
            response.body[0].should.have.property('color5');
            response.body[0].color5.should.equal('#24259');
            response.body[0].should.have.property('project_id');
            response.body[0].project_id.should.equal(94);
            response.body[0].should.have.property('created_at');
            response.body[0].created_at.should.equal('2018-06-29T03:53:25.912Z');
            response.body[0].should.have.property('updated_at');
            response.body[0].updated_at.should.equal('2018-06-29T03:53:25.912Z');
            done();
          });
        });

        it('should return a 404 for a route that does not exist', done => {
            chai.request(server)
            .get('/api/v1/palettes/80')
            .end((err, response) => {
            response.should.have.status(404);
            done();
            });
        })
    });

    describe('GET /api/v1/projects/:id', () => {  
        it('should return a single project', done => {
          chai.request(server)
          .get('/api/v1/projects/94')
          .end((err, response) => {
            response.should.have.status(200);
            response.should.be.json;
            response.body.should.be.a('array');
            response.body.length.should.equal(1);
            response.body[0].should.have.property('id');
            response.body[0].id.should.equal(94);
            response.body[0].should.have.property('name');
            response.body[0].name.should.equal('Project 1');  
            done();
          });
        });

        it('should return a 500 for a route that does not exist', done => {
            chai.request(server)
            .get('/api/v1/projects/1000000')
            .end((err, response) => {
            response.should.have.status(404);
            done();
            });
        });
    });

});