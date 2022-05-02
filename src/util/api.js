import axios from "axios";

export const getImages = ({ successCallback }) => {
  axios
    .get(`https://res.cloudinary.com/ifeomaimoh/image/list/image_optimization_demo.json`)
    .then((response) => successCallback(response.data.resources));
};

export const uploadFiles = ({ selectedFiles, successCallback }) => {
  const uploadResults = [];
  selectedFiles.forEach((file) => {
    uploadImage({
      file,
      successCallback: (response) => {
        uploadResults.push(response);
        if (uploadResults.length === selectedFiles.length) {
          successCallback(uploadResults);
        }
      },
    });
  });
};

const uploadImage = ({ file, successCallback }) => {
  const url = `https://api.cloudinary.com/v1_1/ifeomaimoh/image/upload`;
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "image_optimization");
  data.append("tags", "image_optimization_demo");

  axios
    .post(url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => successCallback(response.data));
};
