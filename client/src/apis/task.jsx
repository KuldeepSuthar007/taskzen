import axios from "axios";
const backendUrl = process.env.REACT_APP_BACKEND_URL;

//post -- taskpost api

export const taskpost = async (title, description, status) => {
  try {
    const token = localStorage.getItem("token");
    const uniqueId = await localStorage.getItem("user_id");
    const reqUrl = `${backendUrl}task/task-post`;
    const reqpayLoad = {
      uniqueId,
      title,
      description,
      status,
    };
    const response = await axios.post(reqUrl, reqpayLoad, {
      headers: { token: token },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

//patch - taskedit api

export const taskedit = async (id, title, description, status) => {
  try {
    const reqUrl = `${backendUrl}task/edit-post/${id}`;
    const reqpayLoad = {
      title,
      description,
      status,
    };

    const response = await axios.patch(reqUrl, reqpayLoad);
    return response;
  } catch (error) {
    console.log(error);
  }
};

//patch - taskdelete api

export const taskdelete = async (taskId) => {
  try {
    const reqUrl = `${backendUrl}task/${taskId}`;
    const response = await axios.delete(reqUrl);
    return response;
  } catch (error) {
    console.log(error);
  }
};
