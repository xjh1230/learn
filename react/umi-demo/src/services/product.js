import request from '../utils/request';

export async function getProductData(params) {
  // console.log('params', params);
  return request('/api/getProductData', {
    data: params,
    method: 'post',
  });
}
