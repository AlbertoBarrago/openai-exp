import { Configuration, OpenAIApi } from "openai";
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
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
  formDataCtor: CustomFormData,
});
delete configuration.baseOptions.headers["User-Agent"];
/**
 * Openai instance
 * @type {OpenAIApi}
 */
export const openai = new OpenAIApi(configuration);

/**
 * Get openai message for thank you
 * @param postText
 */
export const getText = async (postText) => {
  let message = "";
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${postText}`,
      temperature: 0.6,
      max_tokens: 4000,
      top_p: 1,
      best_of: 1,
      frequency_penalty: 1,
      presence_penalty: 1,
    });
    message = `${response?.data?.choices[0].text.trim()}...`;
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
    const imageResp = await openai.createImage({
      prompt: `${prompt}`,
      n: 1,
      size: "1024x1024",
    });
    urlImage = imageResp?.data.data[0].url;
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
  try {
    const imageResp = await openai.createImageEdit(
      fileForm,
      `${prompt.toString()}`,
      fileMask,
      1,
      "1024x1024"
    );
    urlImage = imageResp?.data.data[0].url;
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
  try {
    const returnUrl = await openai.createImageVariation(
      fileForm,
      1,
      "1024x1024",
      "url",
      userId
    );
    return returnUrl.data.data[0].url;
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
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: role, content: message }],
    });
    chatMsg = response?.data?.choices[0].message;
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
