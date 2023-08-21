    const CLOUD_NAME = "fhalcom-claudinary";
const RESOURCES_TYPE = "image";
const UPLOAD_PRESET = "react-journal";
const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`;

export const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);
    try
    {
        const response = await fetch(CLOUDINARY_URL, {
            method: "POST",
            body: formData
        });
        const json = await response.json();
        return json;
    } catch (e) {console.log(e);}
    return null;
}

export const uploadImages = async (files) => {
    const fileList = await Promise.all(files.map(async (file) => {return await uploadImage(file);}));
    return fileList.filter(file => file != null);
}