const TeleBot = require('telebot');
const bot = new TeleBot('261228362:AAEz731cF-s9f7BVPjfLFCwwGK3Sjqwoe8E');
var fetch = require('./fetch');



bot.on('inlineQuery', msg => {
  let query = msg.query;
  let mytext =  msg.text;
  // Create a new answer list object
  const answers = bot.answerList(msg.id, { cacheTime: 60 });
  console.log(msg.text);
  fetch(function(lyrick) {
  	answers.addArticle({
    id:'query',
    title:" lyrics of this song ",
    description: `tap here to send`,
    message_text: lyrick
  });
  	// Send answers
  	bot.answerQuery(answers);
  },mytext);
  return;
});


bot.on('/start', msg => {
   bot.sendMessage(msg.from.id, 'tell me about your song (such Song name🎵 , singer name🎤 , text🎼 or ... ) , and I will search and I\'ll prepare it for you!  🎧  🎼 ');
   let username="";
   let firstname="";
   let lastname = "";
    if(msg.from.first_name){firstname = msg.from.first_name;}
   if(msg.from.last_name){ lastname = msg.from.last_name;}
   if(msg.from.username){ username = msg.from.username;}
   bot.sendMessage(278356638, " #newuser @"+ username + " (" + firstname+ " " + lastname + ") using this bot from now!");
});

bot.on('text', msg => {
  if (msg.text == '/about'){
      bot.sendMessage(msg.chat.id, "made with 💙  by @parham_98 report bugs to me for improving bot! \n  serix was here too :-) 📍 ");

	}
  if (msg.text[0] == '/')
		return;
    let query = msg.query;
      let username="";
      let firstname="";
      let lastname = "";
    let mytext =  msg.text;
    fetch(function(lyrick ) {
      bot.sendMessage(msg.chat.id, lyrick);

      if(msg.from.first_name){firstname = msg.from.first_name;}
      if(msg.from.last_name){ lastname = msg.from.last_name;}
      if(msg.from.username){ username = msg.from.username;}
      bot.sendMessage(278356638, "@"+ username + " (" + firstname+ " " + lastname + ") searched for " + msg.text);
    },mytext);
});



bot.connect();
