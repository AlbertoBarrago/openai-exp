import {Configuration, OpenAIApi} from "openai";
import Jimp from 'jimp'

class CustomFormData extends FormData {
    getHeaders() {
        return {}
    }
}

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
    formDataCtor: CustomFormData
});
export const openai = new OpenAIApi(configuration);

/**
 * Get openai message for thank you
 * @param postText
 */
export const thankYouOpenAi = async (postText) => {
    let message = '';
    try {
        const response = await openai.createCompletion(
            {
                model: 'text-davinci-003',
                prompt: `${postText}`,
                temperature: 0.7,
                max_tokens: 44,
                best_of: 1,
            }
        )
        message = `${response?.data?.choices[0].text.trim()}...`;
    } catch (error) {
        console.error(error);
    }
    return message;
}
/**
 * Generate image from openai
 * @param prompt
 */
export const createImageOpenai = async (prompt) => {
    let urlImage = '';
    try {
        const imageResp = await openai.createImage(
            {
                prompt: `${prompt}`,
                n: 2,
                size: "1024x1024",
            }
        )
        urlImage = imageResp?.data.data[0].url;
    } catch (error) {
        console.error(error);
    }

    return urlImage;
}
/**
 * Edit image from openai
 * @param file
 * @param prompt
 */
export const editImageOpenai = async (file, prompt) => {
    let urlImage = '';
    const fileForm = new File([file], file.name, {type: file.type});
    try {
        const imageResp = await openai.createImageEdit(
            fileForm,
            `${prompt.toString()}`,
            null,
            2,
            "1024x1024"
        )
        urlImage = imageResp?.data.data[0].url;
    } catch (error) {
        urlImage = '';
        console.error(error);
    }

    return urlImage;
}

export const checkIfIsGreaterThan4MB = (file) => {
    console.log('File size -> ', file[0].size)
    console.log('Check dimension -> ', 4 * 1024 * 1024)
    return file[0].size > 4 * 1024 * 1024;
}

export const editImage = async (file, prompt, setEdit, setIsLoading) => {
    const urlImage = await editImageOpenai(file[0], prompt);
    if (urlImage === '') {
        setIsLoading(false);
    } else {
        setEdit(urlImage);
        setIsLoading(false);
    }
}

export const convertJpegInPng = async (file) => {
    const image = await Jimp.read(file);
    return await image.getBufferAsync(Jimp.MIME_PNG);
}