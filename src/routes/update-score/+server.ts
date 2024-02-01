import { TOKEN } from '$env/static/private';
import type { RequestHandler } from './$types';
import type { UpdateScoreArgs } from './types';
import TelegramBot from 'node-telegram-bot-api';

export const POST: RequestHandler = async ({request}) => {
    const {chatId, userId, gameMessageId, score} = await request.json() as UpdateScoreArgs;
    console.log(chatId, userId, gameMessageId, score)
    const bot = new TelegramBot(TOKEN);

    // bot.setGameScore(parseInt(userId), score, {
    //     chat_id: parseInt(chatId),
    //     message_id: parseInt(gameMessageId),
    //     force: true
    // })

    let formData = new FormData();
    formData.append('user_id', userId);
    formData.append('chat_id', chatId);
    formData.append('message_id', gameMessageId);
    formData.append('force', 'true');
    formData.append('score', score.toString());

    const result = await fetch(`https://api.telegram.org/bot${TOKEN}/setGameScore`, {
        method: 'POST',
        body: formData
    })

    console.log(result);

    return new Response();
};