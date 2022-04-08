/**
 * Neste último desafio, a minha proposta para você é: crie a sua própria
 * calculadora, porém com um detalhe muito importante: cada operação deverá
 * ser uma função diferente no seu código.
 * 
 * Primeiramente, a pessoa deverá escolher uma opção de operação impressa
 * pelo programa na tela.
 * 
 * Depois, ela deverá inserir os dois valores que deseja utilizar, e o programa
 * imprimirá o resultado da operação em questão.
 * 
 * As opções disponíveis deverão ser: soma, subtração, multiplicação, divisão,
 * e sair. Nessa última, o programa deverá parar de ser executado, mostrando
 * uma mensagem "Até a próxima".
 */
 async function desafioDia7() {
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

  await calculator(ui);
  rl.close();
}
(async () => desafioDia7())()

async function calculator(ui) {
  let operator = await askForOperator(ui)
  while (operator !== 'q') {
    const { operand1, operand2 } = await getOperands(ui)
  
    const result = calculate(operator, operand1, operand2)
    console.log('***********************************')
    console.log(`Resultado: ${operand1} ${operator} ${operand2} = ${result}`)
    console.log('***********************************\n')
    operator = await askForOperator(ui)
  }

}

async function askForOperator(ui) {
  const question = 'Qual operação deseja executar?\n0) [q] Sair\n1) [+] Soma\n2) [-] Subtração\n3) [*] Multiplicação\n4) [/] Divisão\n> ';
  const isValidAnswer = answer => ['0', '1', '2', '3', '4', '+', '-', '/', '*', 'q'].includes(answer.toLowerCase())
  let operation = await ui(question);
  while (!isValidAnswer(operation)) {
    console.log(`> Operação inválida!`)
    operation = await ui(question)
  }

  switch(operation) {
    case '1':
    case '+':
      return '+'
    case '2':
    case '-':
      return '-'
    case '3':
    case '*':
      return '*'
    case '4':
    case '/':
      return '/'
    case '0':
    case 'q':
      return 'q'
  }
}

async function getOperands(ui) {
  const operand1 = await getOperand(ui, 1)
  const operand2 = await getOperand(ui, 2)
  return { operand1, operand2 }
}

async function getOperand(ui, id) {
  const text = `\nInforme o operador ${id}: `
  let value = await ui(text);
  while (Number.isNaN(parseInt(value))) {
    console.log(`Operador ${id} informado é inválido!`)
    value = await ui(text);
  }
  return parseInt(value);
}

function calculate(operation, operand1, operand2) {
  const operations = {
    '+': (op1, op2) => op1 + op2,
    '-': (op1, op2) => op1 - op2,
    '*': (op1, op2) => op1 * op2,
    '/': (op1, op2) => op1 / op2,
  }
  return operations[operation](operand1, operand2)
}