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
    console.log('\nAté a próxima !!!');
    process.exit(0);
  });

  const question = util.promisify(rl.question).bind(rl);
  const validAnswers = {
    q1: ['frontend', 'front-end', 'back-end', 'backend', 'front', 'back'],
    q2: {
      F: ['react', 'vue'],
      B:  ['c#', 'java']
    },
    q3: ['especializando', 'fullstack'],
    q4: {
      neg: ['nao', 'nenhuma', 'n'],
      pos: ['sim', 'ok', 's'],
      techs: ['c', 'c++', 'python', 'go', 'golang', 'node', 'docker', 'devops', 'html', 'css', 'angular']
    },
  }
  const techComments = {
    c: 'Essa linguagem é raiz!', 
    'c++': 'Isso me lembra muito OO',
    python: 'Uma linguagem muito interessante!',
    go: 'Parece uma boa linguagem',
    golang: 'Parece uma boa linguagem',
    node: 'Uma tecnologia bem útil!', 
    docker: 'Container é vida',
    devops: 'Necessário!',
    html: 'Conhecimento básico para todo front-end', 
    css: 'Muitos experimentos pela frente',
    angular: 'Bora aprender mais esse framework front-end'
  }

  /**
   * Você quer seguir para área de Front-End ou seguir para a área de Back-End?
   * @returns F|B
   */
  async function firstQuestion() {
    const q1 = '1) Você quer seguir para área de Front-End ou seguir para a área de Back-End? ';
    const verifyAnswer = (answer) => {
      const lower = answer.toLowerCase();
      const res = validAnswers.q1.includes(lower);
      validateAnswer(res);
      return res;
    }
    let answer = await handleQuery(question, q1, verifyAnswer);
    return answer.startsWith('back') ? 'B' : 'F';
  }
  const answer1 = await firstQuestion();

  /**
   * Caso esteja na área de Front-End, se quer aprender React ou aprender Vue.
   * Caso esteja na área de Back-End, poderá aprender C# ou aprender Java.
   * @returns F|B
   */
  async function secondQuestion(answer1) {
    const q2 = getQuestion2(answer1)
    const verifyAnswer = (answer, ...args) => {
      const [area] = [...args];
      const lower = answer.toLowerCase();
      let res = validAnswers.q2[area].includes(lower);
      validateAnswer(res);
      return res;
    }
    let answer = await handleQuery(question, q2, verifyAnswer, answer1);
    return answer;
  }
  const answer2 = await secondQuestion(answer1);

  /**
   * Depois, independente das escolhas anteriores, o usuário poderá escolher 
   * entre seguir se especializando na área escolhida ou seguir se desenvolvendo 
   * para se tornar Fullstack. Você deve exibir na tela uma mensagem específica para cada escolha.
   * @returns string
   */
  async function thirdQuestion(answer1, answer2) {
    const q3 = getQuestion3(answer1, answer2)
    const verifyAnswer = (answer) => {
      const lower = answer.toLowerCase();
      const res = validAnswers.q3.includes(lower);
      validateAnswer(res);
      return res;
    }
    let answer = await handleQuery(question, q3, verifyAnswer);
    return answer;
  }
  const answer3 = await thirdQuestion(answer1, answer2);

  async function fourthQuestion() {
    const q4 = getQuestion4()
    const verifyAnswer = (answer) => {
      const lower = answer.toLowerCase();
      const acceptedRange = validAnswers.q4.neg.concat(validAnswers.q4.techs);
      const res = acceptedRange.includes(lower);
      validateAnswer(res);
      return res;
    }
    let answers = [];
    let answer = await handleQuery(question, q4, verifyAnswer);
    const abort = validAnswers.q4.neg.includes(answer);
    if (abort) {
      return [];
    }
    printTechComment(answer, techComments);
    answers.push(answer);
    
    await handleMultipleQueries(question, validAnswers, techComments, answers);
    return answers;
  }
  const answer4 = await fourthQuestion();

  showSummary(answer1, answer2, answer3, answer4);

  rl.close();
}

(async () => await desafioDia3())();

function getQuestion2(answer1) {
  switch (answer1) {
    case 'F':
      return '2) Na área de front-end, você quer aprender React ou aprender Vue? ';
      case 'B':
      return '2) Na área de back-end, você quer aprender C# ou aprender Java? ';
  }
}

function getQuestion3(answer1, answer2) {
  const area = answer1 === 'F' ? 'Front-end' : 'Back-end';
  return `3) Após aprender ${answer2}, você deseja continuar se especializando na área de ${area}`
    + ` ou seguir se desenvolvendo para ser tornar um Fullstack? `;
}

function getQuestion4() {
  return '4) Quais são as tecnologias nas quais você gostaria de se especializar ou de conhecer? ';
}

function getQuestion4More() {
  return '4.1) Tem mais alguma tecnologia que você gostaria de aprender? ';
}

async function handleQuery(question, questionText, verifyAnswer, ...v) {
  let answer = await question(questionText);
  let acceptedAnswer = verifyAnswer(answer, ...v)
  while (!acceptedAnswer) {
    answer = await question(questionText);
    acceptedAnswer = verifyAnswer(answer, ...v);
  }
  return answer;
}

async function handleKeepAsking(question, more, validAnswers) {
  const verifyAnswer = (answer) => {
    const lower = answer.toLowerCase();
    const acceptedRange = validAnswers.q4.neg.concat(validAnswers.q4.pos);
    const res = acceptedRange.includes(lower);
    validateAnswer(res);
    return res;
  }
  let answer = await handleQuery(question, more, verifyAnswer);
  return validAnswers.q4.pos.includes(answer.toLowerCase());
}

async function handleMultipleQueries(question, validAnswers, techComments, answers) {
  const verifyAnswer = (answer) => {
    const lower = answer.toLowerCase();
    const acceptedRange = validAnswers.q4.techs;
    const res = acceptedRange.includes(lower);
    validateAnswer(res);
    return res;
  }
  
  const q4 = getQuestion4()
  const more = getQuestion4More();
  while (await handleKeepAsking(question, more, validAnswers)) {
    const answer = await handleQuery(question, q4, verifyAnswer);
    printTechComment(answer, techComments);
    answers.push(answer);
  }
}

function showSummary(answer1, answer2, answer3, answer4) {
  console.log('\nObrigado pelas respostas!! Vamos ao resumo:')
  const area = answer1 === 'F' ? 'Front-end' : 'Back-end';
  const future = answer3 === 'fullstack' ? answer3 : 'especialista';
  console.log(`Você deseja seguir pela área de ${area} e aprender ${answer2}. No futuro, quer se tornar um ${future}.`);
  if (answer4.length > 0) {
    console.log(`Além disso, pretende estudar as seguintes tecnologias: ${answer4.join(',')}`)
  } else {
    console.log(`Por enquanto não pretende aprender nenhuma outra tecnologia.`)
  }
}

function validateAnswer(res) {
  if (!res) {
    console.log('> Desculpe, mas esta resposta é inválida! :(');
  }
}

function printTechComment(tech, techComments) {
  console.log(techComments[tech]);
}