import inquirer from "inquirer";
import { Product } from "./product.js";
import { Material } from "./enums.js";

const productCollection = new Product(0, "", "", Material.Acero, 0, 0);

async function mainMenu() {
  const choices = [
    "Agregar producto",
    "Eliminar producto",
    "Modificar producto",
    "Listar productos",
    "Buscar productos por atributo",
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
    case "Salir":
      console.log("¡Hasta luego!");
      return;
  }

  await mainMenu(); // Volver al menú principal
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

}

function listProducts() {
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

  const results = productCollection.getProductsByAttribute(attribute as keyof Product, parseValue(attribute, value));
  console.log("Resultados de la búsqueda:");
  console.table(results);
}

function validateNumber(input: string) {
  return !isNaN(parseFloat(input)) || "Por favor, introduce un número válido.";
}

function parseValue(attribute: string, value: string) {
  if (["id", "weight", "crowns"].includes(attribute)) {
    return parseFloat(value);
  }
  if (attribute === "material") {
    return value as Material;
  }
  return value;
}

mainMenu();