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
export const editImageOpenai = async (file, prompt, isJpeg) => {
    let urlImage = '';
    let correctFile;
    if (isJpeg) {
        correctFile = dataURLtoFile(file, 'image/png');
    }
    const fileForm = new File([file[0]], file.name, {type: 'image/png'});

    try {
        const imageResp = await openai.createImageEdit(
            isJpeg ? correctFile : fileForm,
            `${prompt.toString()}`, null, 2, "1024x1024"
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
export const editImage = async (file, prompt, setEdit, isJpeg) => {
    const urlImage = await editImageOpenai(file, prompt, isJpeg);
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
export const convertFileToType = (file, type) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = function (event) {
            const jpegDataUrl = event.target.result;

            const image = new Image();

            image.onload = function () {
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
                    // Transform pixel to grayscale
                    imageData.data[i + 3] = 0;
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

        reader.onerror = function (event) {
            // Reject the promise with the error event
            reject(event);
        };
    });
}
/**
 * Convert data url to file
 * This function do what new File does not do!
 * @param dataUrl
 * @param filename
 * @return {File}
 */
export const dataURLtoFile = (dataUrl, filename) => {
    let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type: mime});
}
/**
 * Handle jpeg
 * @param data
 * @param setValue
 * @param setImageEdited
 * @param setIsLoading
 * @param setWidth
 * @param setHeight
 * @return {Promise<void>}
 */
export const handleJpeg = async (data, setValue, setImageEdited, setIsLoading, setWidth, setHeight) => {
    await convertFileToType(data.file[0], 'image/png').then(
        (file) => {
            data.file = file;
            void editImage(data.file, data.prompt, setImageEdited, true).then(
                () => {
                    showConfettiForSeconds(7, setWidth, setHeight);
                    setValue('file', '');
                    setValue('prompt', '');
                    setIsLoading(false)
                }
            );
        }
    )
}
/**
 * Handle png
 * @param data
 * @param setValue
 * @param setImageEdited
 * @param setIsLoading
 * @param setWidth
 * @param setHeight
 * @return {Promise<void>}
 */
export const handlePng = async (data, setValue, setImageEdited, setIsLoading, setWidth, setHeight) => {
    void editImage(data.file, data.prompt, setImageEdited, false).then(
        () => {
            showConfettiForSeconds(7, setWidth, setHeight);
            setValue('file', '');
            setValue('prompt', '');
            setIsLoading(false)
        }
    );
}
/**
 * Download image
 * @param url
 * @param fileName
 */
export const downloadImage = (url, fileName) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
/**
 * Check if prompt has more than 1000 chars
 * @param prompt
 * @return {boolean}
 */
export const checkIfHasLessThan1000Chars = (prompt) => {
    return prompt.length < 1000;
}
