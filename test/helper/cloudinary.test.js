import {uploadImage} from "../../src/helper/cloudinary.js";
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: "fhalcom-claudinary",
    api_secret: "ZTHkL4SOnmLxg_gmikXDcHWKFqg",
    api_key: "378649437182147",
    secure: true
});


//set CLOUDINARY_URL=cloudinary://378649437182147:ZTHkL4SOnmLxg_gmikXDcHWKFqg@fhalcom-claudinary
const url = "https://images.unsplash.com/photo-1614583224978-f05ce51ef5fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1272&q=80";
let public_id = null;
const getImage = async (url) => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], "image.jpg", {type: "image/jpeg"});
}

const deleteImage = async (public_id) => {
    return await cloudinary.uploader.destroy(public_id);
}



describe('Testing cloudinary helper', () => {
    test("Test cloudinary upload helper when file exist", async () => {
        const file = await getImage(url);
        const result = await uploadImage(file);
        public_id = result.public_id;
        expect(result).not.toBeNull();
    });

    test("Test cloudinary upload delete", async () =>
    {
        const {result} = await deleteImage(public_id);
        expect(result).toEqual("ok");
    });
});


