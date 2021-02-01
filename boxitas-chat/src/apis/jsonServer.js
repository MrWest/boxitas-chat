import axios from "axios";

const jsonServer = () => {

  const baseUrl = `http://${process.env.REACT_APP_BOXITAS_API}:${process.env.REACT_APP_PORT}`;
  const post = (path, payload) => {
      return axios.post(`${baseUrl}/${path}`, payload);
  }
  const get = path  => {
        return axios.get(`${baseUrl}/${path}`);
  }
  return { post, get };
};

export default jsonServer;