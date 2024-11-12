import pool from "./db";

interface CRUD<T> {
  create(data: Partial<T>): Promise<T>;
  read(id: string): Promise<T | null>;
  update(id: string, data: Partial<T>): Promise<T | null>;
  delete(id: string): Promise<string | null>;
  findAll(): Promise<T[]>;
  // bulkCreate(dataArray: Partial<T>[]): Promise<T[]>;
}
class Crud<T> implements CRUD<T> {
  private table: string;
  private key: string;

  constructor(table: string, key: string) {
    this.table = table;
    this.key = key;
  }

  async read(id: string | number): Promise<T | null> {
    const query = `SELECT * FROM ${this.table} WHERE ${this.key} = $1`;
    const { rows } = await pool.query(query, [id]);
    return rows[0] || null;
  }

  async readEmail(email: string): Promise<T | null> {
    const query = `SELECT * FROM ${this.table} WHERE email = $1`;
    const { rows } = await pool.query(query, [email]);
    return rows[0] || null;
  }

  async readId(id: string, campo: string): Promise<T[] | null> {
    const query = `SELECT * FROM ${this.table} WHERE ${campo} = $1`;
    const { rows } = await pool.query(query, [id]);
    return rows || null;
  }

  async findQuery(q: string): Promise<T[]> {
    const query = `SELECT * FROM ${this.table} WHERE ${q} AND ${this.key} = $1`;
    // console.log(query);
    const { rows } = await pool.query(query);
    // console.log(rows);
    return rows;
  }

  async findAll(): Promise<T[]> {
    const query = `SELECT * FROM ${this.table}`;
    const { rows } = await pool.query(query);
    return rows;
  }

  async create(data: Partial<T>): Promise<T> {
    const keys = Object.keys(data).filter(
      (key) => data[key] !== undefined && data[key] !== null
    );
    const values = keys.map((key) => data[key]);
    const placeholders = values.map((_, i) => `$${i + 1}`).join(", ");

    const query = `INSERT INTO ${this.table} (${keys.join(
      ", "
    )}) VALUES (${placeholders}) RETURNING *`;

    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  async update(
    id: string,
    data: Partial<T>,
    column?: string
  ): Promise<T | null> {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const setClause = keys.map((key, i) => `${key} = $${i + 1}`).join(", ");

    const query = `UPDATE ${this.table} SET ${setClause} WHERE ${
      column || this.key
    } = $${keys.length + 1} RETURNING *`;
    console.log(query, keys, values, id);
    const { rows } = await pool.query(query, [...values, id]);
    return rows[0] || null;
  }

  async delete(id: string, column?: string): Promise<string | null> {
    const query = `DELETE FROM ${this.table} WHERE ${column || this.key} = $1`;

    const response = await pool.query(query, [id]);

    if (response.rowCount === 1) {
      return "Registro deletado com sucesso";
    }

    if (response.rowCount === 0) {
      return "Nenhum registro encontrado";
    }
    return null;
  }

  async findSpecialQuery(q: string): Promise<T[]> {
    const query = q;
    const { rows } = await pool.query(query);
    // console.log(rows);
    return rows;
  }

  // async findIdFk(id: string, additionalCondition?: string): Promise<T[]> {
  //   let query = `SELECT * FROM ${this.table} WHERE ${this.key} = $1`;
  //   if (additionalCondition) {
  //     query += ` AND ${additionalCondition}`;
  //   }
  //   const { rows } = await pool.query(query, [id]);
  //   return rows;
  // }

  // async bulkCreate(dataArray: Partial<T>[]): Promise<T[]> {
  //   const keys = Object.keys(dataArray[0]).filter(
  //     (key) => dataArray[0][key] !== undefined && dataArray[0][key] !== null
  //   );
  //   const placeholders = keys.map((_, i) => `$${i + 1}`).join(", ");
  //   const query = `INSERT INTO ${this.table} (${keys.join(", ")}) VALUES `;
  //   const valuesArray: any[] = [];
  //   const rowsArray: string[] = [];
  //   dataArray.forEach((data, index) => {
  //     const values = keys.map((key) => data[key]);
  //     valuesArray.push(...values);
  //     const rowPlaceholders = values
  //       .map((_, i) => `$${index * keys.length + i + 1}`)
  //       .join(", ");
  //     rowsArray.push(`(${rowPlaceholders})`);
  //   });
  //   const finalQuery = query + rowsArray.join(", ") + " RETURNING *";
  //   const { rows } = await pool.query(finalQuery, valuesArray);
  //   return rows;
  // }

  // async readMany(id: string): Promise<T[] | null> {
  //   const query = `SELECT * FROM ${this.table} WHERE ${this.key} = $1`;
  //   const { rows } = await pool.query(query, [id]);
  //   return rows || null;
  // }

  // async deleteQuery(id: string, q: string): Promise<T | null> {
  //   const query = `DELETE FROM ${this.table} WHERE ${q} AND ${this.key} = $1`;
  //   console.log(query);
  //   const { rows } = await pool.query(query, [id]);
  //   console.log(rows);
  //   return rows[0] || null;
  // }
}

export default Crud;
