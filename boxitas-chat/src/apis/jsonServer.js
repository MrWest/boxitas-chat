import axios from "axios";

const jsonServer = () => {

  const baseUrl = process.env.REACT_APP_BOXITAS_REST_API;

  const post = (path, payload) => {
      return axios.post(`${baseUrl}/${path}`, payload);
  }
  const patch = (path, payload) => {
    return axios.patch(`${baseUrl}/${path}`, payload);
  }
  const put = (path, payload) => {
    return axios.put(`${baseUrl}/${path}`, payload);
  }
  const del = (path, payload) => {
    return axios.delete(`${baseUrl}/${path}`, payload);
  }
  const get = (path, payload)  => {
        return axios.get(`${baseUrl}/${path}${payload ? `/${payload}` : ''}`);
  }
  const filter = (path, query, sort = { order: 'desc' })  => {
    return axios.get(`${baseUrl}/${path}?${query}${sort.sort? `&_sort=${sort.sort}&_order=${sort.order || 'desc'}`: ''}`);
  }
  return { post, patch, put, del, get, filter };
};

export default jsonServer;