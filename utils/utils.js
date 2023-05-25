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
                n: 1,
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
 * @param mask
 * @param prompt
 * @param isJpeg
 */
export const editImageOpenai = async (file, mask, prompt, isJpeg) => {
    let urlImage;
    let correctFile;
    if (isJpeg) {
        correctFile = dataURLtoFile(file, 'image/png');
    }
    const fileForm = new File([file[0]], file.name, {type: 'image/png'});
    const fileMask = new File([mask[0]], mask.name, {type: 'image/png'});
    try {
        const imageResp = await openai.createImageEdit(
            isJpeg ? correctFile : fileForm,
            `${prompt.toString()}`, fileMask, 1, "1024x1024"
        )
        urlImage = imageResp?.data.data[0].url;
    } catch (error) {
        urlImage = '';
        console.error(error);
    }

    return urlImage;
}
/**
 * Edit image
 * @param file
 * @param mask
 * @param prompt
 * @param isJpeg
 * @return Promise<string|null>
 */
export const editImage = async (file, mask, prompt, isJpeg) => {
    const urlImage = await editImageOpenai(file, mask, prompt, isJpeg);
    if (urlImage === '') {
        return null;
    } else {
        return urlImage;
    }
}
/**
 * Produce image variations with openai
 * @param image
 * @param userId
 * @return Promise<string|null>
 */
export const produceImageVariations = async (image, userId) => {
    const fileForm = new File([image.file[0]], image.file[0].name, {type: 'image/png'});
    try {
        const returnUrl = await openai.createImageVariation(
            fileForm,
            1,
            '1024x1024',
            'url',
            userId,
        );
        return returnUrl.data.data[0].url;
    } catch (error) {
        console.error(error);
        return null;
    }

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
 * Show confetti for seconds and set width and height
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
 * Convert data url to file
 * This function do what new File does not do!
 * @param dataUrl
 * @param filename
 * @return {File}
 */
export const dataURLtoFile = (dataUrl, filename) => {
    let arr = dataUrl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type: mime});
}
/**
 * Handle png
 * @param data
 * @return {Promise<string>}
 */
export const handlePng = async (data) => {
    /**
     * Edit image
     * @type {string}
     * @private
     * @return {Promise<string>}
     */
   return await editImage(data.file, data.mask, data.prompt, false).then(
        (respUrl) => {
            return respUrl;
        }
    );
}

/**
 * Check if prompt has more than 1000 chars
 * @param prompt
 * @return {boolean}
 */
export const checkIfHasLessThan1000Chars = (prompt) => {
    return prompt.length < 1000;
}
/**
 * Handle timestamp
 * @param date
 * @return {string}
 */
export const handleTimeStamp = (date) => {
    const dateformat = new Date(date);
    return dateformat.toLocaleDateString("it-IT", {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    });
}

export const orderDateBy = (data, by) => {
    //order by alphabet
      return data.sort((a, b) => {
        if (a[by] < b[by]) {
            return -1;
        }
        return 1;
    })
}
/**
 * Scroll to top
 */
export const scrollToTop = () =>{
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

export const scrollToElement = (id) =>{
    const element = document.getElementById(id);
    element.scrollIntoView({
        behavior: 'smooth'
    });
}
/**
 * Close daisy dialog
 */
export const handleClick = () => {
    const elem = document.activeElement;
    if (elem) {
        elem?.blur();
    }
};