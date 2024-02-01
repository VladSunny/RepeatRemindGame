import { TOKEN } from '$env/static/private';
import type { RequestHandler } from './$types';
import type { UpdateScoreArgs } from './types';
import TelegramBot from 'node-telegram-bot-api';

export const POST: RequestHandler = async ({request}) => {
    const {chatId, userId, gameMessageId, score} = await request.json() as UpdateScoreArgs;
    console.log(chatId, userId, gameMessageId, score)
    const bot = new TelegramBot(TOKEN);

    bot.setGameScore(parseInt(userId), score, {
        chat_id: parseInt(chatId),
        message_id: parseInt(gameMessageId),
        force: true
    })

    return new Response();
};