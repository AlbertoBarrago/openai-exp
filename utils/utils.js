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
    const fileMask = new File([await fetch('images/mask.png').then(r => r.blob())], file.name, {type: file.type});
    try {
        const imageResp = await openai.createImageEdit(
            fileForm,
            `${prompt.toString()}`, fileMask, 2, "1024x1024"
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
/**
 * Convert file to type
 * @param file
 * @param type
 * @return {Promise<unknown>}
 */
export const convertFileToType = (file, type) =>  {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = function(event) {
            const jpegDataUrl = event.target.result;

            const image = new Image();

            image.onload = function() {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                // Set canvas dimensions to match the image
                canvas.width = image.width;
                canvas.height = image.height;

                // Draw the image onto the canvas
                ctx.drawImage(image, 0, 0);

                // Get the RGBA pixel data
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

                // Manipulate the pixel data to remove the background
                for (let i = 0; i < imageData.data.length; i += 4) {
                    // Check if the pixel is white (or close to white)
                    if (
                        imageData.data[i] >= 200 &&
                        imageData.data[i + 1] >= 200 &&
                        imageData.data[i + 2] >= 200
                    ) {
                        // Set the alpha channel to 0 to make it transparent
                        imageData.data[i + 3] = 0;
                    }
                }

                // Create a new canvas for RGBA data
                const rgbaCanvas = document.createElement('canvas');
                const rgbaCtx = rgbaCanvas.getContext('2d');

                // Set RGBA canvas dimensions
                rgbaCanvas.width = canvas.width;
                rgbaCanvas.height = canvas.height;

                // Set RGBA data
                rgbaCtx.putImageData(imageData, 0, 0);

                // Convert RGBA canvas to PNG data URL
                const pngDataUrl = rgbaCanvas.toDataURL(type);

                // Resolve the promise with the PNG data URL
                resolve(pngDataUrl);
            };

            // Set the JPEG data URL
            image.src = jpegDataUrl;
        };

        // Read the file as data URL
        reader.readAsDataURL(file);

        reader.onerror = function(event) {
            // Reject the promise with the error event
            reject(event);
        };
    });
}