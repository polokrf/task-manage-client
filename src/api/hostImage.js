import axios from "axios";

export const hostImag = async(image) => {
  const imageHostApi = import.meta.env.VITE_IMAGE_API;
    
  let data = new FormData();
  data.append('image', image);
  const getImage = await axios.post(imageHostApi, data)
  const img = getImage?.data?.data?.url
  return img
}