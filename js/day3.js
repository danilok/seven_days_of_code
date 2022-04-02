/**
 * Seu desafio de hoje é criar os destinos possíveis de um jogo,
 * em que o usuário consiga escolher:
 *
 * 1. Se quer seguir para área de Front-End ou seguir para a área de Back-End.
 *
 * 2. Caso esteja na área de Front-End, se quer aprender React ou aprender Vue.
 *  Caso esteja na área de Back-End, poderá aprender C# ou aprender Java.
 *
 * 3. Depois, independente das escolhas anteriores, o usuário poderá escolher
 *  entre seguir se especializando na área escolhida ou seguir se desenvolvendo
 *  para se tornar Fullstack. Você deve exibir na tela uma mensagem específica 
 *  para cada escolha.
 *
 * 4. Por fim, pergunte quais são as tecnologias nas quais a pessoa gostaria
 *  de se especializar ou de conhecer. Aqui, a pessoa pode responder N
 *  tecnologias, uma de cada vez. Então, enquanto ela continuar respondendo 
 *  ok para a pergunta: “Tem mais alguma tecnologia que você gostaria de aprender?”,
 *  continue apresentando para ela o Prompt, para que ela complete o nome da tecnologia
 *  em questão. E, logo depois, apresente uma mensagem comentando algo sobre a
 *  linguagem inserida.
 *
 * O importante é que a pessoa que estiver jogando possa sempre escolher qual decisão
 *  tomar para conseguir aprender e se desenvolver na área de programação.
 *
 * Além disso, também é essencial que, ao final do jogo, ela possa inserir
 *  quantas tecnologias quiser na lista de aprendizado.
 */
async function desafioDia3() {
  const util = require('util');
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.on('close', function () {
    console.log('\nSee you next time !!!');
    process.exit(0);
  });

  const question = util.promisify(rl.question).bind(rl);

  async function firstQuestion() {
    const q1 = 'Se quer seguir para área de Front-End ou seguir para a área de Back-End? ';
    const verifyAnswer = (answer) => {
      const lower = answer.toLowerCase()
      return ['frontend', 'front-end', 'back-end', 'backend', 'front', 'back'].includes(lower)
    }
    let answer = await question(q1);
    let acceptedAnwser = verifyAnswer(answer)
    while (!acceptedAnwser) {
      answer = await question(q1);
      acceptedAnwser = verifyAnswer(answer);
    }
    return answer.startsWith('back') ? 'B' : 'F';
  }
  const answer1 = await firstQuestion();
  console.log(answer1);

  // async function questionExample() {
  //   try {
  //     const answer = await question('What is you favorite food? ');
  //     console.log(`Oh, so your favorite food is ${answer}`);
  //   } catch (err) {
  //     console.error(err);
  //     console.error('Question rejected', err);
  //   }
  // }

  // (async () => await questionExample())();
  rl.close();
}

(async () => await desafioDia3())();

// import * as readline from 'node:readline/promises';
// import { stdin as input, stdout as output } from 'process';

// const rl = readline.createInterface({ input, output });

// const answer = await rl.question('What do you think of Node.js? ');

// console.log(`Thank you for your valuable feedback: ${answer}`);

// rl.close();

//  rl.question('What is your name ? ', function (name) {
//    rl.question('How old are you ? ', function (yearsOld) {
//      rl.question('Which programming language are you studying ? ', function (programmingLanguage) {
//        rl.question(`Do you like study ${programmingLanguage}? Anwser with number 1 for YES and 2 for NO ? `, function (answer) {
//          console.log(`\nHello ${name}, you are ${yearsOld} years old and is already learning ${programmingLanguage}!`);
//          if (answer === '1') {
//            console.log('Very good! Keep studying and you\'ll have great success!');
//          } else if (answer === '2') {
//            console.log('How bad... Have you tried to learn other languages?');
//          } else {
//            console.log('Invalid answer! :(.')
//          }
//          rl.close();
//        });
//      });
//    });
//  });
 


// const util = require('util');
// const fs = require('fs');

// const stat = util.promisify(fs.stat);

// async function callStat() {
//   const stats = await stat('.');
//   console.log(`This directory is owned by ${stats.uid}`);
// }

// callStat()

// const util = require('util');
// const question = util.promisify(rl.question).bind(rl);

// async function questionExample() {
//   try {
//     const answer = await question('What is you favorite food? ');
//     console.log(`Oh, so your favorite food is ${answer}`);
//     rl.close();
//   } catch (err) {
//     console.error(err);
//     console.error('Question rejected', err);
//   }
// }

// (async () => await questionExample())();

// function Ask(query) {
//   const readline = require("readline").createInterface({
//     input: process.stdin,
//     output: process.stdout
//   })

//   return  new Promise(resolve => readline.question(query, ans => {
//   readline.close();
//   resolve(ans);
// }))
// }

 
// // example useage
// async function main() {

//  var name = await Ask("whats you name")
//  console.log(`nice to meet you ${name}`)

//  var age = await Ask("How old are you?")
//  console.log(`Wow what a fantastic age, imagine just being ${age}`)
// }

// main()