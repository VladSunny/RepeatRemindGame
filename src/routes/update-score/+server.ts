import { TOKEN } from '$env/static/private';
import type { RequestHandler } from './$types';
import type { UpdateScoreArgs } from './types';

export const POST: RequestHandler = async ({request}) => {
    const {chatId, userId, gameMessageId, inlineMessageId, score} = await request.json() as UpdateScoreArgs;
    console.log(chatId, userId, gameMessageId, score)

    let formData = new FormData();
    // formData.append('user_id', userId);
    // formData.append('chat_id', chatId);
    // formData.append('message_id', gameMessageId);
    formData.append('inline_message_id', inlineMessageId)
    formData.append('force', 'true');
    formData.append('score', score.toString());

    const result = await fetch(`https://api.telegram.org/bot${TOKEN}/setGameScore`, {
        method: 'POST',
        body: formData
    })

    console.log(result);

    return new Response();
};