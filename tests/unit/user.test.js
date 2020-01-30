const { User } = require('../../src/app/models');
const bcrypt = require('bcryptjs');
const truncate = require('../utils/truncate');
const factory = require('../factories');

describe('Models > User', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should encrypt password', async () => {
    const user = await factory.create('User', { password: '123' });

    const hashCompare = await bcrypt.compare('123', user.password);

    expect(hashCompare).toBe(true);
  });

  it('should compare password', async () => {
    const user = await factory.create('User', { password: '123456' });

    const hashCompareTrue = await user.checkPassword('123456');
    const hashCompareFalse = await user.checkPassword('667788');

    expect(hashCompareTrue).toBe(true);
    expect(hashCompareFalse).toBe(false);
  });
});
