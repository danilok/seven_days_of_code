/**
 * Você já brincou de tentar adivinhar o número que seu amigo
 * ou amiga estava pensando?
 * Hoje você vai voltar na infância e fazer exatamente isso. Mas agora, o jogo
 * vai ser contra o próprio computador!
 * 
 * Você deve criar um programinha que comece com um valor específico pré-definido
 * entre 0 a 10 para o número que você vai adivinhar (7, por exemplo).
 * 
 * Em seguida, o programa vai perguntar para você qual o valor que você deseja
 * chutar e, caso você acerte, ele irá te parabenizar. Caso erre, ele vai te
 * dar mais 2 tentativas.
 * 
 * No fim, caso você não acerte nenhuma vez, ele vai imprimir qual era o número
 * inicial.
 * 
 * Depois que o programinha estiver funcionando, tente usar um número randômico
 * em vez de um número pré-definido.
 */
async function desafioDia4() {
  const util = require('util');
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.on('close', function () {
    console.log('\nAté a próxima !!!');
    process.exit(0);
  });

  const ui = util.promisify(rl.question).bind(rl);

  await playGame(ui);
  rl.close();
}

(async () => desafioDia4())();

async function playGame(ui) {
  const config = {
    maxTries: 3,
    min: 0,
    max: 10
  }
  printInstructions();
  await configureGame(ui, config);
  await startGame(ui, config);
}

function printInstructions() {
  const instructions =`
Este jogo é de adivinhação. O computador sorteará um número dentro de um intervalo determinado.
Acerte o número secreto antes que suas tentivas acabem!
`
  console.log(instructions);
}

async function configureGame(ui, config) {
  console.log('Antes de começar a jogar, vamos configurar o jogo!')
  if (!await isToConfig(ui)) {
    return;
  }
  console.log('Caso deseje manter o padrão, apenas deixe em branco e aperte ENTER.')
  const max = await askConfig(ui, `\nQual o maior número que deve ser sorteado: Padrão ${config.max}: `);
  const min = await askConfig(ui, `Qual o menor número que deve ser sorteado: Padrão ${config.min}: `);
  const tries = await askConfig(ui, `Quantas tentativas você deseja ter: Padrão ${config.maxTries}: `);
  config.max = max || config.max
  config.min = min || config.min
  config.maxTries = tries || config.maxTries
}

async function isToConfig(ui) {
  const question = 'Deseja configurar o jogo? [S/N]: ';
  const isValidAnswer = answer => ['s', 'n'].includes(answer.toLowerCase())
  let option = await ui(question);
  while (!isValidAnswer(option)) {
    option = await ui(question);
  }
  return option === 's' ? true : false;
}

async function askConfig(ui, text) {
  let value = await ui(text);
  while (!Number.isInteger(parseInt(value)) && value !== '') {
    value = await ui(text);
  }
  return parseInt(value);
}

async function startGame(ui, config) {
  let validAnswer = false;
  let tries = config.maxTries;
  let currentAttempt;
  let attempts = 1;
  const secretNumber = pickSecretNumber(config);
  let inputText = `Digite seu chute no intervalo de ${config.min} e ${config.max}`;

  while (!validAnswer && tries > 0) {
    currentAttempt = await ui(`\n[Tentativa ${attempts}/${config.maxTries}] : ${inputText}: `);
    if (!validateAttempt(currentAttempt, config)) {
      continue;
    }
    if (secretNumber === parseInt(currentAttempt)) {
      validAnswer = true;
    } else {
      tries--;
      attempts++;
      if (secretNumber > currentAttempt) {
        console.log(`O número secreto é maior ${currentAttempt}`)
      } else {
        console.log(`O número secreto é menor ${currentAttempt}`)
      }
    }
  }

  if (validAnswer) {
    console.log(`\nParabéns, você acertou! O número secreto era ${secretNumber}.`);
  } else {
    console.log(`\nSuas tentativas acabaram :(\nNúmero secreto ${secretNumber}.\nBoa sorte na próxima vez!`)
  }
}

function validateAttempt(currentAttempt, config) {
  const value = parseInt(currentAttempt);
  if (Number.isNaN(value)) {
    console.log('Tentativa inválida. Tente novamente');
    return false;
  }

  if (value < config.min || value > config.max) {
    console.log('Tentativa fora do intervalo do jogo!')
    return false;
  }
  return true;
}

function pickSecretNumber(config) {
  return Math.floor(Math.random() * (config.max - config.min + 1) + config.min)
}