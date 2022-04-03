/**
 * Então hoje, para facilitar a sua ida ao supermercado, você deve criar um
 * programa em Javascript que perguntará se você deseja adicionar uma comida
 * na sua lista de compras, e você deve poder responder com sim ou não.
 * 
 * Em seguida, ele perguntará qual comida você deseja inserir, e você digitará
 * o nome dela, como por exemplo batata.
 * 
 * Depois, ele deverá perguntar em qual categoria essa comida se encaixa, com
 * algumas opções já pré-definidas, como frutas, laticínios, congelados, doces
 * e o que mais você achar interessante. Assim, você poderá separar tudo no
 * seu devido grupo.
 * 
 * Por fim, caso você não queira mais adicionar nada na lista de compras e
 * responder não na primeira pergunta, ele irá exibir uma lista com todos os
 * itens agrupados, da seguinte forma:
 * 
 * Caso você adicione na sua lista: banana, leite em pó, tomate, leite
 * vegetal, chiclete, bala de ursinho, maçã, uva, abacate e leite de vaca
 * 
 * O programa deverá imprimir, por exemplo:
 * ```
 * Lista de compras:
 *  Frutas: banana, tomate, maçã, uva, abacate
 *  Laticínios: leite vegetal, leite de vaca, leite em pó
 *  Congelados:
 *  Doces: chiclete e bala de ursinho
 * ```
 */
async function desafioDia5() {
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

  await fillShopList(ui);
  rl.close();
}
(async () => desafioDia5())()

const categories = [
  {
    key: 'hortifruti',
    desc: 'Hortifruti',
    items: []
  },
  {
    key: 'laticinios',
    desc: 'Laticínios',
    items: []
  },
  {
    key: 'congelados',
    desc: 'Congelados',
    items: []
  },
  {
    key: 'doces',
    desc: 'Doces',
    items: []
  }
]

async function fillShopList(ui) {
  // perguntar se quer comida
  while (await isToAddFood(ui)) {
    const food = await askFood(ui, 'Qual comida você deseja inserir? ')
    // em qual categoria?
    const category = await askCategory(ui, food)
    // Adiciona comida na categoria escolhida
    categories[category].items.push(food)
  }
  // ao digitar nao, imprimir lista separados por categoria
  printShopList();
}

async function isToAddFood(ui) {
  const question = '\nDeseja adicionar uma comida na sua lista de compras? [S/N]: ';
  const isValidAnswer = answer => ['s', 'n'].includes(answer.toLowerCase())
  let option = await ui(question);
  while (!isValidAnswer(option)) {
    option = await ui(question);
  }
  return option === 's' ? true : false;
}

async function askFood(ui, text) {
  let value = await ui(text);
  while (!value) {
    value = await ui(text);
  }
  return value;
}

async function askCategory(ui, food) {
  const verifyAnswer = (answer) => {
    if (!Number.isInteger(parseInt(value))) {
      console.log(`Valor ${answer} não é um número`)
      return false;
    }
    
    const int = parseInt(value);
    if (int < 0 || int >= categories.length) {
      console.log(`Valor ${answer} não é um número válido`)
      return false;
    }
    
    return true
  }
  const categoriesOpts = categories.map((category, index) => `[${index}] ${category.key}`).join (', ')
  const question = `\nCategorias ${categoriesOpts}\nEm qual categoria vc deseja inserir ${food}? Informe o número: `
  let value = await ui(question);
  while (!verifyAnswer(value)) {
    value = await ui(question);
  }
  return parseInt(value);
}

function printShopList() {
  console.log('\nLista de compras:')
  for (let i = 0; i < categories.length; i++) {
    console.log(`  ${categories[i].desc}: ${categories[i].items.join(', ')}`)
  }
}

// banana, leite em pó, tomate, leite vegetal, chiclete, bala de ursinho, maçã, uva, abacate e leite de vaca
/**
 * TODO:
 * - não adicionar repetido
 * - verificar lista vazia 
 */