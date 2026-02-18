const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

// Obter token do arquivo .env
const token = process.env.TELEGRAM_BOT_TOKEN;

if (!token) {
  console.error('❌ Erro: TELEGRAM_BOT_TOKEN não está definido no arquivo .env');
  process.exit(1);
}

// Criar instância do bot
const bot = new TelegramBot(token, { polling: true });

// Comando /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const welcomeMessage = `
🤖 Bem-vindo ao Gerentebot!\n\nSou um bot inteligente pronto para ajudá-lo.\n\nUse /help para ver todos os comandos disponíveis.`;
  bot.sendMessage(chatId, welcomeMessage);
});

// Comando /help
bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;
  const helpMessage = `
📋 Comandos Disponíveis:\n\n/start - Iniciar o bot\n/help - Ver ajuda`;
  bot.sendMessage(chatId, helpMessage);
});

// Responder a qualquer mensagem
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  // Ignorar comandos (já tratados acima)
  if (!text.startsWith('/')) {
    bot.sendMessage(chatId, `📨 Você disse: ${text}`);
  }
});

// Tratamento de erros
bot.on('polling_error', (error) => {
  console.error('❌ Erro de polling:', error);
});

console.log('✅ Bot iniciado com sucesso!');