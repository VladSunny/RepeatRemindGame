import { TOKEN } from '$env/static/private';
import type { RequestHandler } from './$types';
import type { UpdateScoreArgs } from './types';

export const POST: RequestHandler = async ({request}) => {
    const {chatId, userId, gameMessageId, inlineMessageId, score} = await request.json() as UpdateScoreArgs;
    console.log(chatId, userId, gameMessageId, inlineMessageId, score);

    let formData = new FormData();
    formData.append('user_id', userId);
    formData.append('score', score.toString());
    formData.append('force', 'true'); // Убедитесь, что знаете последствия использования этого параметра

    // Эти поля взаимоисключающие, добавляем соответствующее
    if (inlineMessageId) {
        formData.append('inline_message_id', inlineMessageId);
    } else {
        formData.append('chat_id', chatId);
        formData.append('message_id', gameMessageId);
    }

    try {
        const response = await fetch(`https://api.telegram.org/bot${TOKEN}/setGameScore`, {
            method: 'POST',
            body: formData
        });

        const result = await response.json();
        console.log(result);

        // Возвращаем ответ клиенту
        return new Response(JSON.stringify(result), {
            status: response.ok ? 200 : 400, // 200 OK при успехе, иначе 400 Bad Request
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        // Обработка ошибок при запросе к API Telegram
        console.error(error);
        return new Response(JSON.stringify({error: 'Failed to set game score'}), {
            status: 500, // 500 Internal Server Error
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
};
