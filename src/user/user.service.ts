import { Injectable } from '@nestjs/common';
import { Client } from 'pg';
import { InjectClient } from 'nest-postgres';

export type User = {
  id: number;
  name: string;
};

@Injectable()
export class UserService {
  constructor(@InjectClient() private readonly postgres: Client) {}

  public async getAllUsers(): Promise<User[]> {
    const users = await this.postgres.query('SELECT * FROM public."User"');
    const res: User[] = users.rows.map((el) => {
      const t: User = {
        id: el.id,
        name: el.name,
      };
      return t;
    });
    return res;
  }

  public async getOne(id: number): Promise<User> {
    const users = await this.postgres.query(
      `SELECT * FROM public."User" where id = '${id}'`,
    );
    const [user] = users.rows;
    if (user) {
      const { id: userId, name } = user;
      return { id: userId, name };
    }
    throw new Error('Не найден пользователь');
  }

  public async create(name: string): Promise<User | Error> {
    const temp = await this.postgres.query(`INSERT INTO public."User"(
      name)
      VALUES ('${name}') RETURNING id, name`);
    const [user] = temp.rows;
    if (user) {
      const { id: userId, name } = user;
      return { id: userId, name };
    }
    return new Error('Не найден пользователь');
  }

  public async update(data: User): Promise<User | Error> {
    const temp = await this.postgres.query(
      `update public."User" set name = '${data.name}' where id = ${data.id} RETURNING id, name`,
    );
    const [user] = temp.rows;
    if (user) {
      const { id: userId, name } = user;
      return { id: userId, name };
    }
    return new Error('Не найден пользователь');
  }

  public async delete(id: number): Promise<boolean> {
    const temp = await this.postgres.query(
      `delete from public."User" where id = ${id}`,
    );
    return Boolean(temp.rowCount);
  }
}
