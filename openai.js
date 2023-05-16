import {Configuration, OpenAIApi} from 'openai';

const configuration = new Configuration({
    apiKey: "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",
});
export const openai = new OpenAIApi(configuration);