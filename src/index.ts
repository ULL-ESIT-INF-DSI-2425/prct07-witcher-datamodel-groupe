import inquirer from "inquirer";
import { Product } from "./product.js";
import { Merchant } from "./merchant.js";
import { Client } from "./client.js";
import { Material, Type, Race, Ubication } from "./enums.js";
import { Inventory } from "./inventory.js";
import { JsonProductCollection } from "./db/json-productCollection.js";
import { JsonClientCollection } from "./db/json-clientCollection.js";
import { JsonMerchantCollection } from "./db/json-merchantCollection.js";
import { JsonTransactionCollection } from "./db/json-transactionCollection.js";


// Entity collections
const productCollection = new JsonProductCollection("./src/db/data/products.json");
const merchantCollection = new JsonMerchantCollection("./src/db/data/merchants.json");
const clientCollection = new JsonClientCollection("./src/db/data/clients.json");
const transaction = new JsonTransactionCollection("./src/db/data/transactions.json");


const inventory = new Inventory(merchantCollection, productCollection, clientCollection, transaction);

async function mainMenu() {
  const choices = [
    "Gestionar productos",
    "Gestionar mercaderes",
    "Gestionar clientes",
    "Gestionar inventario",
    "Salir",
  ];

  const { action } = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "¿Qué acción deseas realizar?",
      choices,
    },
  ]);

  switch (action) {
    case "Gestionar productos":
      await manageProducts();
      break;
    case "Gestionar mercaderes":
      await manageMerchants();
      break;
    case "Gestionar clientes":
      await manageClients();
      break;
    case "Gestionar inventario":
      await manageInventory();
      break;
    case "Salir":
      console.log("¡Hasta luego!");
      return;
  }

  await mainMenu();
}

// Product management
async function manageProducts() {
  const choices = [
    "Agregar producto",
    "Eliminar producto",
    "Modificar producto",
    "Listar productos",
    "Buscar productos por atributo",
    "Volver al menú principal",
  ];

  const { action } = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "¿Qué acción deseas realizar?",
      choices,
    },
  ]);

  switch (action) {
    case "Agregar producto":
      await addProduct();
      break;
    case "Eliminar producto":
      await removeProduct();
      break;
    case "Modificar producto":
      await modifyProduct();
      break;
    case "Listar productos":
      listProducts();
      break;
    case "Buscar productos por atributo":
      await searchProducts();
      break;
    case "Volver al menú principal":
      return;
  }

  await manageProducts();
}

async function addProduct() {
  const answers = await inquirer.prompt([
    { type: "input", name: "id", message: "ID del producto:", validate: validateNumber },
    { type: "input", name: "name", message: "Nombre del producto:" },
    { type: "input", name: "description", message: "Descripción del producto:" },
    {
      type: "list",
      name: "material",
      message: "Material del producto:",
      choices: Object.values(Material),
    },
    { type: "input", name: "weight", message: "Peso del producto:", validate: validateNumber },
    { type: "input", name: "crowns", message: "Precio en coronas:", validate: validateNumber },
  ]);

  const newProduct = new Product(
    parseInt(answers.id),
    answers.name,
    answers.description,
    answers.material as Material,
    parseFloat(answers.weight),
    parseFloat(answers.crowns)
  );

  if (productCollection.addEntity(newProduct)) {
    console.log("Producto agregado correctamente.");
  } else {
    console.log("Error al agregar el producto.");
  }
}

async function removeProduct() {
  const { id } = await inquirer.prompt([
    { type: "input", name: "id", message: "ID del producto a eliminar:", validate: validateNumber },
  ]);

  const removedProduct = productCollection.dropEntity(new Product(parseInt(id), "", "", Material.Ceniza, 0, 0));
  if (removedProduct) {
    console.log("Producto eliminado:", removedProduct);
  } else {
    console.log("No se encontró un producto con ese ID.");
  }
}

async function modifyProduct() {
  const { id } = await inquirer.prompt([
    { type: "input", name: "id", message: "ID del producto a modificar:", validate: validateNumber },
  ]);

  const product = productCollection.collection.find((p) => p.id === parseInt(id));
  if (!product) {
    console.log("No se encontró un producto con ese ID.");
    return;
  }

  const answers = await inquirer.prompt([
    { type: "input", name: "name", message: `Nombre (${product.name}):`, default: String(product.name) },
    { type: "input", name: "description", message: `Descripción (${product.description}):`, default: String(product.description) },
    {
      type: "list",
      name: "material",
      message: `Material (${product.material}):`,
      choices: Object.values(Material),
      default: product.material as Material,
    },
    { type: "input", name: "weight", message: `Peso (${product.weight}):`, default: String(product.weight), validate: validateNumber },
    { type: "input", name: "crowns", message: `Precio en coronas (${product.crowns}):`, default: String(product.crowns), validate: validateNumber },
  ]);

  product.name = answers.name;
  product.description = answers.description;
  product.material = answers.material as Material;
  product.weight = parseFloat(answers.weight);
  product.crowns = parseFloat(answers.crowns);

  console.log("Producto modificado correctamente.");
}

async function listProducts() {
  console.log("Productos en la colección:");
  console.table(productCollection.collection);
}

async function searchProducts() {
  const { attribute, value } = await inquirer.prompt([
    {
      type: "list",
      name: "attribute",
      message: "¿Qué atributo deseas buscar?",
      choices: ["id", "name", "description", "material", "weight", "crowns"],
    },
    { type: "input", name: "value", message: "Valor del atributo:" },
  ]);

  const filteredProducts = productCollection.collection.filter(
    (product) => product[attribute as keyof Product] == parseValue(attribute, value)
  );

  if (filteredProducts.length === 0) {
    console.log("No se encontraron productos con ese criterio.");
    return;
  }

  const { sortOption } = await inquirer.prompt([
    {
      type: "list",
      name: "sortOption",
      message: "¿Cómo deseas ordenar los resultados?",
      choices: [
        "Alfabéticamente (ascendente)",
        "Alfabéticamente (descendente)",
        "Por valor en coronas (ascendente)",
        "Por valor en coronas (descendente)",
        "Sin ordenar",
      ],
    },
  ]);

  switch (sortOption) {
    case "Alfabéticamente (ascendente)":
      filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "Alfabéticamente (descendente)":
      filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case "Por valor en coronas (ascendente)":
      filteredProducts.sort((a, b) => a.crowns - b.crowns);
      break;
    case "Por valor en coronas (descendente)":
      filteredProducts.sort((a, b) => b.crowns - a.crowns);
      break;
    case "Sin ordenar":
      break;
  }

  console.log("Resultados de la búsqueda:");
  console.table(filteredProducts);
}

// Merchant management
async function manageMerchants() {
  const choices = [
    "Agregar mercader",
    "Eliminar mercader",
    "Modificar mercader",
    "Listar mercaderes",
    "Buscar mercaderes por atributo",
    "Volver al menú principal",
  ];

  const { action } = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "¿Qué acción deseas realizar?",
      choices,
    },
  ]);

  switch (action) {
    case "Agregar mercader":
      await addMerchant();
      break;
    case "Eliminar mercader":
      await removeMerchant();
      break;
    case "Modificar mercader":
      await modifyMerchant();
      break;
    case "Listar mercaderes":
      listMerchants();
      break;
    case "Buscar mercaderes por atributo":
      await searchMerchants();
      break;
    case "Volver al menú principal":
      return;
  }

  await manageMerchants();
}

async function addMerchant() {
  const answers = await inquirer.prompt([
    { type: "input", name: "id", message: "ID del mercader:", validate: validateNumber },
    { type: "input", name: "name", message: "Nombre del mercader:" },
    {
      type: "list",
      name: "type",
      message: "Tipo de mercader:",
      choices: Object.values(Type),
    },
    {
      type: "list",
      name: "ubication",
      message: "Ubicación del mercader:",
      choices: Object.values(Ubication),
    },
  ]);

  const newMerchant = new Merchant(
    parseInt(answers.id),
    answers.name,
    answers.type as Type,
    answers.ubication as Ubication
  );

  if (merchantCollection.addEntity(newMerchant)) {
    console.log("Mercader agregado correctamente.");
  } else {
    console.log("Error al agregar el mercader.");
  }
}

async function removeMerchant() {
  const { id } = await inquirer.prompt([
    { type: "input", name: "id", message: "ID del mercader a eliminar:", validate: validateNumber },
  ]);

  const removedMerchant = merchantCollection.dropEntity(new Merchant(parseInt(id), "", Type.Mercader_g, Ubication.Novigrado));
  if (removedMerchant) {
    console.log("Mercader eliminado:", removedMerchant);
  } else {
    console.log("No se encontró un mercader con ese ID.");
  }
}


async function modifyMerchant() {
  const { id } = await inquirer.prompt([
    { type: "input", name: "id", message: "ID del mercader a modificar:", validate: validateNumber },
  ]);

  const merchant = merchantCollection.collection.find((m) => m.id === parseInt(id));
  if (!merchant) {
    console.log("No se encontró un mercader con ese ID.");
    return;
  }

  const answers = await inquirer.prompt([
    { type: "input", name: "name", message: `Nombre (${merchant.name}):`, default: merchant.name },
    {
      type: "list",
      name: "type",
      message: `Tipo (${merchant.type}):`,
      choices: Object.values(Type),
      default: merchant.type,
    },
    {
      type: "list",
      name: "ubication",
      message: `Ubicación (${merchant.ubication}):`,
      choices: Object.values(Ubication),
      default: merchant.ubication,
    },
  ]);

  merchant.name = answers.name;
  merchant.type = answers.type as Type;
  merchant.ubication = answers.ubication as Ubication;

  console.log("Mercader modificado correctamente.");
}


function listMerchants() {
  console.log("Mercaderes en la colección:");
  console.table(merchantCollection.collection);
}


async function searchMerchants() {
  const { attribute, value } = await inquirer.prompt([
    {
      type: "list",
      name: "attribute",
      message: "¿Qué atributo deseas buscar?",
      choices: ["id", "name", "type", "ubication"],
    },
    { type: "input", name: "value", message: "Valor del atributo:" },
  ]);

  const results = merchantCollection.getMerchantsByAttribute(attribute as keyof Merchant, parseValue(attribute, value));
  console.log("Resultados de la búsqueda:");
  console.table(results);
}

// Client management
async function manageClients() {
  const choices = [
    "Agregar cliente",
    "Eliminar cliente",
    "Modificar cliente",
    "Listar clientes",
    "Buscar clientes por atributo",
    "Volver al menú principal",
  ];

  const { action } = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "¿Qué acción deseas realizar?",
      choices,
    },
  ]);

  switch (action) {
    case "Agregar cliente":
      await addClient();
      break;
    case "Eliminar cliente":
      await removeClient();
      break;
    case "Modificar cliente":
      await modifyClient();
      break;
    case "Listar clientes":
      listClients();
      break;
    case "Buscar clientes por atributo":
      await searchClients();
      break;
    case "Volver al menú principal":
      return;
  }

  await manageClients();
}

async function addClient() {
  const answers = await inquirer.prompt([
    { type: "input", name: "id", message: "ID del cliente:", validate: validateNumber },
    { type: "input", name: "name", message: "Nombre del cliente:" },
    {
      type: "list",
      name: "race",
      message: "Raza del cliente:",
      choices: Object.values(Race),
    },
    {
      type: "list",
      name: "ubication",
      message: "Ubicación del cliente:",
      choices: Object.values(Ubication),
    },
  ]);

  const newClient = new Client(
    parseInt(answers.id),
    answers.name,
    answers.race as Race,
    answers.ubication as Ubication
  );

  if (clientCollection.addEntity(newClient)) {
    console.log("Cliente agregado correctamente.");
  } else {
    console.log("Error al agregar el cliente.");
  }
}

async function removeClient() {
  const { id } = await inquirer.prompt([
    { type: "input", name: "id", message: "ID del cliente a eliminar:", validate: validateNumber },
  ]);

  const removedClient = clientCollection.dropEntity(new Client(parseInt(id), "", Race.Humano, Ubication.Cintra));
  if (removedClient) {
    console.log("Cliente eliminado:", removedClient);
  } else {
    console.log("No se encontró un cliente con ese ID.");
  }
}


async function modifyClient() {
  const { id } = await inquirer.prompt([
    { type: "input", name: "id", message: "ID del cliente a modificar:", validate: validateNumber },
  ]);

  const client = clientCollection.collection.find((c) => c.id === parseInt(id));
  if (!client) {
    console.log("No se encontró un cliente con ese ID.");
    return;
  }

  const answers = await inquirer.prompt([
    { type: "input", name: "name", message: `Nombre (${client.name}):`, default: client.name },
    {
      type: "list",
      name: "race",
      message: `Raza (${client.race}):`,
      choices: Object.values(Race),
      default: client.race,
    },
    {
      type: "list",
      name: "ubication",
      message: `Ubicación (${client.ubication}):`,
      choices: Object.values(Ubication),
      default: client.ubication,
    },
  ]);

  client.name = answers.name;
  client.race = answers.race as Race;
  client.ubication = answers.ubication as Ubication;

  console.log("Cliente modificado correctamente.");
}


function listClients() {
  console.log("Clientes en la colección:");
  console.table(clientCollection.collection);
}


async function searchClients() {
  const { attribute, value } = await inquirer.prompt([
    {
      type: "list",
      name: "attribute",
      message: "¿Qué atributo deseas buscar?",
      choices: ["id", "name", "race", "ubication"],
    },
    { type: "input", name: "value", message: "Valor del atributo:" },
  ]);

  const results = clientCollection.getClientsByAttribute(attribute as keyof Client, parseValue(attribute, value));
  console.log("Resultados de la búsqueda:");
  console.table(results);
}

async function manageInventory() {
  const choices = [
    "Verificar si un producto está en el inventario",
    "Ver los productos más demandados",
    "Consultar el total de ingresos",
    "Consultar el total de gastos",
    "Consultar el historial de transacciones de un cliente o mercader",
    "Volver al menú principal",
  ];

  const { action } = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "¿Qué acción deseas realizar?",
      choices,
    },
  ]);

  switch (action) {
    case "Verificar si un producto está en el inventario":
      await checkProductInStock();
      break;
    case "Ver los productos más demandados":
      viewMostDemandedProducts();
      break;
    case "Consultar el total de ingresos":
      viewTotalEarns();
      break;
    case "Consultar el total de gastos":
      viewTotalSpends();
      break;
    case "Consultar el historial de transacciones de un cliente o mercader":
      await viewTransactionHistory();
      break;
    case "Volver al menú principal":
      return;
  }

  await manageInventory();
}

async function checkProductInStock() {
  const { id } = await inquirer.prompt([
    { type: "input", name: "id", message: "ID del producto a verificar:", validate: validateNumber },
  ]);

  const product = productCollection.collection.find((p) => p.id === parseInt(id));
  if (!product) {
    console.log("No se encontró un producto con ese ID.");
    return;
  }

  const isInStock = inventory.stock(product);
  console.log(isInStock ? "El producto está en el inventario." : "El producto no está en el inventario.");
}

function viewMostDemandedProducts() {
  const result = inventory.MostFamousProducts();
  console.log(result);
}

function viewTotalEarns() {
  const result = inventory.TotalEarns();
  console.log(result);
}

function viewTotalSpends() {
  const result = inventory.TotalSpends();
  console.log(result);
}

async function viewTransactionHistory() {
  const { entityType } = await inquirer.prompt([
    {
      type: "list",
      name: "entityType",
      message: "¿Deseas consultar el historial de un cliente o un mercader?",
      choices: ["Cliente", "Mercader"],
    },
  ]);

  const { id } = await inquirer.prompt([
    { type: "input", name: "id", message: `ID del ${entityType.toLowerCase()} a consultar:`, validate: validateNumber },
  ]);

  let entity;
  if (entityType === "Cliente") {
    entity = clientCollection.collection.find((c) => c.id === parseInt(id));
    if (!entity) {
      console.log("No se encontró un cliente con ese ID.");
      return;
    }
  } else {
    entity = merchantCollection.collection.find((m) => m.id === parseInt(id));
    if (!entity) {
      console.log("No se encontró un mercader con ese ID.");
      return;
    }
  }

  const history = inventory.TotalRecord(entity);
  console.log(history);
}

// Auxiliary functions
function validateNumber(input: string) {
  return !isNaN(parseFloat(input)) || "Por favor, introduce un número válido.";
}

function parseValue(attribute: string, value: string) {
  if (["id", "weight", "crowns"].includes(attribute)) {
    return parseFloat(value);
  }
  if (attribute === "material" || attribute === "type" || attribute === "race" || attribute === "ubication") {
    return value;
  }
  return value;
}

mainMenu();
