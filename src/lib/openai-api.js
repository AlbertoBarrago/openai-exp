import { ClientOptions, OpenAI } from "openai";

/**
 * Get openai message for post
 */
class CustomFormData extends FormData {
  getHeaders() {
    return {};
  }
}

/**
 * Openai configuration
 * @type {Configuration}
 */
// const configuration = {
//   apiKey: process.env.OPENAI_API_KEY,
//   formDataCtor: CustomFormData,
// };
const apiKey = process.env.OPENAI_API_KEY;
// delete configuration.baseOptions.headers["User-Agent"];
/**
 * Openai instance
 * @type {OpenAI}
 */

export const openai = new OpenAI({
  apiKey,
  dangerouslyAllowBrowser: true,
});

/**
 * Get openai message for thank you
 * @param postText
 */
export const getText = async (postText) => {
  let message = "";
  try {
    const response = await openai.completions.create({
      model: "text-davinci-003",
      prompt: `${postText}`,
      temperature: 2,
      max_tokens: 4000,
      top_p: 1,
      best_of: 1,
      frequency_penalty: 1,
      presence_penalty: 1,
    });
    message = `${response?.choices[0].text.trim()}...`;
  } catch (error) {
    console.error(error);
  }
  return message;
};

/**
 * Generate image from openai
 * @param prompt
 */
export const createImageOpenai = async (prompt) => {
  let urlImage = "";
  try {
    const imageResp = await openai.images.generate({
      prompt: `${prompt}`,
      n: 1,
      size: "1024x1024",
    });
    urlImage = imageResp?.data[0].url;
  } catch (error) {
    console.error(error);
  }

  return urlImage;
};
/**
 * Edit image from openai
 * @param data
 */
export const editImageOpenai = async (data) => {
  const { file, mask, prompt } = data;
  let urlImage;
  const fileForm = new File([file[0]], file.name, { type: "image/png" });
  const fileMask = new File([mask[0]], mask.name, { type: "image/png" });
  const imageParams = {
    image: fileForm,
    mask: fileMask,
    prompt: `${prompt.toString()}`,
    n: 1,
    response_format: "url",
    size: "1024x1024",
  };
  try {
    const imageResp = await openai.images.edit(imageParams, null);
    urlImage = imageResp?.data[0].url;
  } catch (error) {
    urlImage = "";
    console.error(error);
  }

  return urlImage;
};
/**
 * Produce image variations with openai
 * @param image
 * @param userId
 * @return Promise<string|null>
 */
export const produceImageVariations = async (image, userId) => {
  const fileForm = new File([image.file[0]], image.file[0].name, {
    type: "image/png",
  });
  const imageVariationData = {
    image: fileForm,
    n: 1,
    size: "1024x1024",
    response_format: "url",
    user: userId,
  };
  try {
    const returnUrl = await openai.images.createVariation(
      imageVariationData,
      null
    );
    return returnUrl.data[0].url;
  } catch (error) {
    console.error(error);
    return null;
  }
};

/**
 * Get openai message for chat bot
 * @param role
 * @param message
 * @return {Promise<*>}
 */
export const chatBot = async (role, message) => {
  let chatMsg = "";
  const body = {
    model: "gpt-4",
    messages: [
      {
        content: message.toString(),
        role: role,
      },
    ],
  };
  try {
    const response = await openai.chat.completions.create(body, null);
    chatMsg = response?.choices[0].message;
  } catch (error) {
    console.error(error);
    return {
      error,
      success: false,
    };
  }
  console.log("CHAT MSG ---> ", chatMsg);
  return { chatMsg, success: true };
};
