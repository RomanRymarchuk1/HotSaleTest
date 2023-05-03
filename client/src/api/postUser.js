import axios from "axios";
import env from "react-dotenv";

const postUser = async (user) => {
   try {
      const { data } = await axios.post(process.env.REACT_APP_URL, user).then((res) => res);
      return data;
   } catch (err) {
      return err.response.data;
   }
};

export default postUser;
