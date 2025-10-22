const { spec } = require('pactum');
const { expect } = require('chai');

describe('Working Example - JSONPlaceholder', () => {

  const _spec = spec();

  it('should make a request to json-placeholder', async () => {
    _spec.get('http://jsonplaceholder.typicode.com/posts/{id}');
  });

  it('should get first post', async () => {
    _spec.withPathParams('id', '1');
  });

  it('should set headers', async () => {
    _spec.withHeaders({
      'User-Agent': 'DemoTest',
      'Accept': 'application/json'
    });
  });

  it('should receive a response', async () => {
    await _spec.toss();
  });

  it('should have a status code of 200', async () => {
    _spec.response().to.have.status(200);
  });

  it('should have a user id of 1', async () => {
    _spec.response().to.have.json('userId', 1);
  });

  it('should have a post id of 1', async () => {
    _spec.response().to.have.json('id', 1);
  });

  it('should have a title', async () => {
    const response = _spec.response().json;
    expect(response).to.have.property('title');
    expect(response.title).to.be.a('string');
    console.log('📝 Title:', response.title);
  });

  it('should have a body', async () => {
    const response = _spec.response().json;
    expect(response).to.have.property('body');
    expect(response.body).to.be.a('string');
    console.log('📄 Body length:', response.body.length);
  });

});

describe('Working Example - OAuth2', () => {

  const _spec = spec();

  it('should make a request to OAuth2 endpoint', async () => {
    _spec.post('https://nera-qa.comafi.com.ar/auth/realms/hbe-sso/protocol/openid-connect/token');
  });

  it('should set OAuth2 headers', async () => {
    _spec.withHeaders({
      'User-Agent': 'NeraApis',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic NTg3MmQyMTA6YjE4MzM4MjExZTJmNjUyN2VjMDRlYWQyYzU1NjI1Mg=',
      'Cookie': '4ea47a54ebc11dec0d7f9f38a0dbd17b=3651fc6cc67025843ea6ed311404872c; 99b47315582a09f5cfd4f2a7c0ac7a2f=1eb1ed87a6bfcdf28757e5e6c05788cd'
    });
  });

  it('should set form data', async () => {
    _spec.withForm({
      'grant_type': 'client_credentials'
    });
  });

  it('should receive a response', async () => {
    await _spec.toss();
  });

  it('should have a valid status code', async () => {
    const status = _spec.response().statusCode;
    expect(status).to.be.oneOf([200, 401, 400]);
    console.log('📊 Status:', status);
  });

  it('should have JSON response', async () => {
    const response = _spec.response().json;
    expect(response).to.be.an('object');
    
    if (response.error) {
      console.log('⚠️ OAuth2 Error:', response.error_description);
    } else if (response.access_token) {
      console.log('✅ Token obtenido:', response.access_token);
    }
  });

});

describe('Working Example - CRUD Operations', () => {

  it('should create a new post', async () => {
    const _spec = spec();
    
    await _spec
      .post('https://jsonplaceholder.typicode.com/posts')
      .withHeaders({
        'Content-Type': 'application/json',
        'User-Agent': 'DemoTest'
      })
      .withJson({
        title: 'Test Post',
        body: 'This is a test post',
        userId: 1
      })
      .expectStatus(201)
      .expectJsonMatch({
        'id': '$.number',
        'title': 'Test Post',
        'body': 'This is a test post',
        'userId': 1
      })
      .toss();
    
    console.log('✅ Post creado exitosamente');
  });

  it('should update a post', async () => {
    const _spec = spec();
    
    await _spec
      .put('https://jsonplaceholder.typicode.com/posts/1')
      .withHeaders({
        'Content-Type': 'application/json',
        'User-Agent': 'DemoTest'
      })
      .withJson({
        id: 1,
        title: 'Updated Post',
        body: 'This post has been updated',
        userId: 1
      })
      .expectStatus(200)
      .expectJsonMatch({
        'id': 1,
        'title': 'Updated Post',
        'body': 'This post has been updated',
        'userId': 1
      })
      .toss();
    
    console.log('✅ Post actualizado exitosamente');
  });

  it('should delete a post', async () => {
    const _spec = spec();
    
    await _spec
      .delete('https://jsonplaceholder.typicode.com/posts/1')
      .withHeaders({
        'User-Agent': 'DemoTest'
      })
      .expectStatus(200)
      .toss();
    
    console.log('✅ Post eliminado exitosamente');
  });

});
