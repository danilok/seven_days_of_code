/*
- Qual o seu nome?
- Quantos anos você tem?
- Qual linguagem de programação você está estudando?

À medida que as perguntas forem sendo feitas, a pessoa que estiver usando o programa deve responder cada uma delas.

No final, o sistema vai exibir a mensagem:

"Olá [nome], você tem [idade] anos e já está aprendendo [linguagem]!"

EXERCÍCIO OPCIONAL
Se você quiser se aprofundar no assunto de hoje, eu tenho mais um exercício para você.

Mas ele é 100% opcional.

Você vai complementar o código para que, depois de exibir a mensagem anterior, o programa pergunte:

Você gosta de estudar [linguagem]? Responda com o número 1 para SIM ou 2 para NÃO.

E aí, dependendo da resposta, ele deve mostrar uma das seguintes mensagens:

1 > Muito bom! Continue estudando e você terá muito sucesso.
2 > Ahh que pena... Já tentou aprender outras linguagens?
*/
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('What is your name ? ', function (name) {
  rl.question('How old are you ? ', function (yearsOld) {
    rl.question('Which programming language are you studying ? ', function (programmingLanguage) {
      rl.question(`Do you like study ${programmingLanguage}? Anwser with number 1 for YES and 2 for NO ? `, function (answer) {
        console.log(`\nHello ${name}, you are ${yearsOld} years old and is already learning ${programmingLanguage}!`);
        if (answer === '1') {
          console.log('Very good! Keep studying and you\'ll have great success!');
        } else if (answer === '2') {
          console.log('How bad... Have you tried to learn other languages?');
        } else {
          console.log('Invalid answer! :(.')
        }
        rl.close();
      });
    });
  });
});

rl.on('close', function () {
  console.log('\nSee you next time !!!');
  process.exit(0);
});