import { instance } from '../util/instance';

async function makeRequest(method, url, data) {
  try {
    let res;

    switch (method) {
      case 'GET':
        res = await instance.get(url);
        break;
      case 'POST':
        res = await instance.post(url, data);
        break;
      case 'PATCH':
        res = await instance.patch(url, data);
        break;
      case 'DELETE':
        res = await instance.delete(url);
        break;
      default:
        throw new Error('Unsupported HTTP method');
    }

    if (res.data.access_token) {
      localStorage.setItem('access_token', res.data.access_token);
    }

    return res;
  } catch (err) {
    console.log(err);
  }
}

export async function getData(url) {
  return makeRequest('GET', url);
}

export async function postData(url, data) {
  return makeRequest('POST', url, data);
}

export async function patchData(url, data) {
  return makeRequest('PATCH', url, data);
}

export async function deleteData(url) {
  return makeRequest('DELETE', url);
}
