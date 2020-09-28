describe('Users functional tests', () => {
  describe('when creating a new user', () => {
    it('should successfuly create a new user', async () => {
      const newUser = {
        name: 'John Doe',
        email: 'john@email.com',
        password: '1234',
      };

      const response = await global.testRequest.post('/users').send(newUser);
      expect(response.status).toBe(201);
      expect(response.body).toEqual(expect.objectContaining(newUser));
    });
  });
});
