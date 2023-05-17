import {Configuration, OpenAIApi} from "openai";

/**
 * Get openai message for post
 */
class CustomFormData extends FormData {
    getHeaders() {
        return {}
    }
}

/**
 * Openai configuration
 * @type {Configuration}
 */
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
    formDataCtor: CustomFormData
});
delete configuration.baseOptions.headers['User-Agent'];
/**
 * Openai instance
 * @type {OpenAIApi}
 */
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
    const fileForm = new File([file[0]], file.name, {type: file.type});
    try {
        const imageResp = await openai.createImageEdit(
            fileForm,
            `${prompt.toString()}`, null, 2, "512x512"
        )
        urlImage = imageResp?.data.data[0].url;
    } catch (error) {
        urlImage = '';
        console.error(error);
    }

    return urlImage;
}
/**
 * Check if file is greater than 4MB
 * @param file
 * @return {boolean}
 */
export const checkIfIsGreaterThan4MB = (file) => {
    return file[0].size > 4 * 1024 * 1024;
}
/**
 * Edit image
 * @param file
 * @param prompt
 * @param setEdit
 * @return {Promise<void>}
 */
export const editImage = async (file, prompt, setEdit) => {
    const urlImage = await editImageOpenai(file, prompt);
    if (urlImage === '') {
        return null;
    } else {
        setEdit(urlImage);
        return urlImage;
    }
}
/**
 * Show confetti for seconds
 * @param seconds
 * @param setWidth
 * @param setHeight
 */
export const showConfettiForSeconds = (seconds, setWidth, setHeight) => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
    setTimeout(() => {
        setWidth(0);
        setHeight(0);
    }, seconds * 1000);
}
/**
 * Show alert for 5 seconds
 * @param message
 * @param setAlertSetUp
 */
export const showAlert = (message, setAlertSetUp) => {
    setAlertSetUp({show: true, message: message})
    setTimeout(
        () => {
            setAlertSetUp({show: false, message: ''})
        }, 5000);
}