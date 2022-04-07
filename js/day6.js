/**
 * Você deverá criar a opção de remover algum item da lista, que será exibida
 * junto à pergunta de “você deseja adicionar uma comida na lista de compras”?
 * 
 * A partir daí, caso a pessoa escolha essa opção, o programa irá imprimir os
 * elementos presentes na lista atual, e a pessoa deverá escrever qual deles
 * deseja remover.
 * 
 * Depois disso, o programa irá remover o elemento da lista e imprimir a
 * confirmação de que o item realmente não está mais lá.
 * 
 * Por fim, ele voltará para o ciclo inicial de perguntas.
 * 
 * Se, na hora de deletar o item, o mesmo não for encontrado na lista, você
 * deverá exibir uma mensagem avisando isso.
 * 
 * Por exemplo: “Não foi possível encontrar o item dentro da lista!”
 * 
 * Lembre-se que a opção de remover um item só deverá estar disponível a
 * partir do momento que existir ao menos um elemento dentro da lista de
 * compras.
 */
async function desafioDia6() {
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

  const shopList = initList();
  await fillShopList(ui, shopList);
  rl.close();
}
(async () => desafioDia6())()

function initList() {
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
  
  const shopList = {
    itemsLength: 0,
    categories
  }
  return shopList
}

async function fillShopList(ui, shopList) {
  let option = await askForValidAction(ui, shopList)
  const isValidAnswer = answer => ['s', '1', '2', '3'].includes(answer.toLowerCase())
  while (isValidAnswer(option)) {
    await handleOption(option, ui, shopList)
    option = await askForValidAction(ui, shopList)
  }
  printShopList(shopList);
}

async function handleOption(option, ui, shopList) {
  switch (option) {
    case 's':
    case '1':
      const food = await askFood(ui, 'Qual comida você deseja inserir? ')
      // em qual categoria?
      const category = await askCategory(ui, shopList, food)
      // Adiciona comida na categoria escolhida
      shopList.categories[category].items.push(food)
      shopList.itemsLength++
      break
    case '2':
      await removeItem(ui, shopList)
      break
    case '3':
      printShopList(shopList);
      break
    default:
      console.log('Opção inválida!')
  }
}

async function askForValidAction(ui, shopList) {
  const hasItems = !!shopList.itemsLength;
  if (!hasItems) {
    const question = '\nDeseja adicionar uma comida na sua lista de compras? [S/N]: ';
    const isValidAnswer = answer => ['s', 'n'].includes(answer.toLowerCase())
    let option = await ui(question);
    while (!isValidAnswer(option)) {
      option = await ui(question);
    }
    // return option === 's' ? true : false;
    return option;
  }
  const question = '\nQual ação deseja executar?\n0) Sair\n1) Adicionar item\n2) Remover item\n3) Imprimir a lista\n> ';
  const isValidAnswer = answer => ['0', '1', '2', '3'].includes(answer.toLowerCase())
  let option = await ui(question);
  while (!isValidAnswer(option)) {
    console.log(`> Opção [${option}] inválida!`)
    option = await ui(question);
  }
  return option;
}

async function askFood(ui, text) {
  let value = await ui(text);
  while (!value) {
    value = await ui(text);
  }
  return value;
}

async function askCategory(ui, shopList, food) {
  const verifyAnswer = (answer) => {
    if (!Number.isInteger(parseInt(value))) {
      console.log(`Valor ${answer} não é um número`)
      return false;
    }
    
    const int = parseInt(value);
    if (int < 0 || int >= shopList.categories.length) {
      console.log(`Valor ${answer} não é um número válido`)
      return false;
    }
    
    return true
  }
  const categoriesOpts = shopList.categories.map((category, index) => `[${index}] ${category.key}`).join (', ')
  const question = `\nCategorias ${categoriesOpts}\nEm qual categoria vc deseja inserir ${food}? Informe o número: `
  let value = await ui(question);
  while (!verifyAnswer(value)) {
    value = await ui(question);
  }
  return parseInt(value);
}

async function removeItem(ui, shopList) {
  const availableItems = shopList.categories.reduce((list, category) => {
    return category.items.length
      ? [ ...list, ...category.items ]
      : list
  }, [])
  const question = `\nItens disponíveis: ${availableItems.join(', ')}\nInforme o item a ser removido: `

  const verifyAnswer = (answer) => {
    const isValidAnswer = availableItems.includes(answer)
    return isValidAnswer
  }
  let value = await ui(question);
  const validItem = verifyAnswer(value)
  if (!validItem) {
    console.log(`Não foi possível encontrar o item ${value} na lista de compras!`)
    return
  }

  shopList.categories.forEach(category => {
    if (!category.items.length) {
      return
    }
    const pos = category.items.indexOf(value);
    if (pos !== -1) {
      category.items.splice(pos, 1)
      shopList.itemsLength--
      console.log(`${value} removido da categoria ${category.desc}: ${pos + 1}`)
    }
  })
}

function printShopList(shopList) {
  if (!shopList.itemsLength) {
    console.log('Lista de compras vazia!')
    return
  }

  console.log(`\nSua lista de compras tem ${shopList.itemsLength} item(s)`)
  console.log('Lista de compras:')
  for (let i = 0; i < shopList.categories.length; i++) {
    if (shopList.categories[i].items.length > 0) {
      console.log(`  ${shopList.categories[i].desc}: ${shopList.categories[i].items.join(', ')}`)
    }
  }
}

// banana, leite em pó, tomate, leite vegetal, chiclete, bala de ursinho, maçã, uva, abacate e leite de vaca
/**
 * TODO:
 * - não adicionar repetido
 * - verificar lista vazia 
 */