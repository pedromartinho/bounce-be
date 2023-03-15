import request from '../jest.setup';

describe('StoreController', () => {
  describe('getStore', () => {
    it('should return a store object', async () => {
      const storeId = '1';

      const res = await request.get(`/api/stores/${storeId}`);
      const resultStore = res.body;

      expect(resultStore.id).toEqual(storeId);
      expect(typeof resultStore.name).toEqual('string');
      expect(typeof resultStore.unitPrice).toEqual('number');
    });
  });
});