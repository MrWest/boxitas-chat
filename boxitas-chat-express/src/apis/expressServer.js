import axios from "axios";

const expressServer = () => {

  const baseUrl = `http${process.env.REACT_APP_HTTPS? 's' : ''}://${process.env.REACT_APP_BOXITAS_API}:${process.env. REACT_APP_EXPRESS_PORT}`;

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
  const get = path  => {
        return axios.get(`${baseUrl}/${path}`);
  }
  return { post, patch, put, del, get };
};

export default expressServer;