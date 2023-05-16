import {Configuration, OpenAIApi} from "openai";
import {Jimp} from 'jimp'

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

export const editImage = async (file, prompt, setEdit, setIsLoading, isJpeg) => {
    console.log('File -> ', file)
    let fileToSend;
    if(isJpeg) fileToSend = file;
    const urlImage = await editImageOpenai(fileToSend, prompt);
    if (urlImage === '') {
        setIsLoading(false);
    } else {
        setEdit(urlImage);
        setIsLoading(false);
    }
}


// Function to convert JPEG to PNG
export const convertJpegToPng = (file) =>  {
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
                const pngDataUrl = rgbaCanvas.toDataURL('image/png');

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

export const dataURLtoFile = (dataurl, filename) => {
    let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
}
