import mockedConfigureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import mockedAxios from 'axios';
import { SAVE_COMPANY } from './types';
import { updatePaymentProfile } from './accountActions';
import log from '../logger';

log.info('test pending: requestPaymentProfile action');

const mockedStore = mockedConfigureStore([thunk]);

it('should dispatch the correct action when updating payment profile', async () => {
  const store = mockedStore({});

  const id = 1;
  const formData = {
    company: 'Some company',
    city: 'City',
    address: 'Company address',
    state: 'FM',
    zip: '10000',
    phone: '+5353535353',
    suite: 'Sweet suite'
  };

  const params = {
    name: formData.company,
    billing_city: formData.city,
    billing_country: undefined,
    billing_address1: formData.address,
    billing_state: formData.state,
    billing_zip: formData.zip,
    force_address: true,
    phone: formData.phone,
    billing_address2: formData.suite
  };

  const expectedActions = [
    {
      type: SAVE_COMPANY,
      payload: params
    }
  ];
  mockedAxios.patch.mockImplementationOnce(() =>
    Promise.resolve({
      url: `/accounts/${id}/`,
      data: params
    })
  );

  await store.dispatch(updatePaymentProfile(id, formData));
  expect(store.getActions()).toEqual(expectedActions);
  expect(mockedAxios.patch).toHaveBeenCalledTimes(1);
  expect(mockedAxios.patch).toHaveBeenCalledWith(`/accounts/${id}/`, params);
});
