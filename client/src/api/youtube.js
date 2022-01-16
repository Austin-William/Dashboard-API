import axios from "axios";

const KEY = "AIzaSyAAxHQzkmu3bdiJ3v_4SsDrp2QqQtC6Ruk";

export default axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: {
    part: "snippet",
    maxResults: 5,
    key: KEY
  },
  headers: {}
});