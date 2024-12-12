import sql from "./db.js";

const sql = sql();

const createTables = async () => {
  try {
    // Criação da tabela categories
    await sql`
      CREATE TABLE IF NOT EXISTS categories (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL
      );
    `;

    // Criação da tabela projects
    await sql`
      CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        budget NUMERIC(15, 2) NOT NULL,
        cost NUMERIC(15, 2) DEFAULT 0.00,
        category_id INTEGER NOT NULL,
        CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE CASCADE
      )
    `;

    //Criação da tabela services
    await sql`
      CREATE TABLE IF NOT EXISTS services (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        project_id INTEGER NOT NULL,
        description TEXT NOT NULL,
        cost NUMERIC(15, 2) NOT NULL,
        CONSTRAINT fk_project FOREIGN KEY (project_id) REFERENCES projects (id) ON DELETE CASCADE
      )
    `;

    console.log("tabelas criadas com sucesso");
  } catch (error) {
    console.error("Erro ao criar tabelas", error.message);
  }
};

const seedCategories = async () => {
  try {
    const categories = [
      "Infraestrutura",
      "Desenvolvimento",
      "Design",
      "Planejamento",
    ];

    for (const category of categories) {
      await sql`
        INSERT INTO categories (name) VALUES (${category}) ON CONFLICT (name) DO NOTHING
      `;
    }

    console.log("Categorias inseridas com sucesso!");
  } catch (error) {
    console.error("Erro ao inserir categorias:", error.message);
  }
};

createTables();
seedCategories();
