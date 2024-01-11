require('dotenv').config();
const axios = require('axios');

const sendMessage = async () => {
  try {
    const response = await axios.post('https://www.chatbase.co/api/v1/chat', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.CHATBOT_API_KEY}`
      },
      data: {
        messages: [
          { content: 'How can i help you?', role: 'assistant' },
          { content: 'I ', role: 'user' }
        ],
        chatbotId: 'sjCMMJm8_-yrjiZoOUoYw',
        stream: false,
        model: 'gpt-3.5-turbo',
        temperature: 0
      }
    });

    if (response.status !== 200) {
      const errorData = response.data;
      throw Error(errorData.message);
    }

    const data = response.data;
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

sendMessage();