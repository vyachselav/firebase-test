import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { User } from './user';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  private basePath: string = '/users-list';

  public usersCount: FirebaseObjectObservable<any> = new FirebaseObjectObservable();

  constructor(
    public db: AngularFireDatabase
  ) {}

  // возвращает таблицу users
  getUsersList(options: any) {
    return this.db.list(this.basePath, options);
  }

  // возвращает первую запись из таблицы при
  // сортировке по полю value
  getFirst(value: string): any {
    return this.db.list(this.basePath, {
      query: {
        orderByChild: value,
        limitToFirst: 1
      }
    })
      .map((dataList) => {
        if (dataList != null && dataList.length > 0) {
          return dataList[0];
        }
        return null;
      });
  }

  // возвращает последнюю запись из таблицы при
  // сортировке по полю value
  getLast(value: string): any {
    return this.db.list(this.basePath, {
      query: {
        orderByChild: value,
        limitToLast: 1
      }
    })
      .map((dataList) => {
      if (dataList != null && dataList.length > 0) {
        return dataList[0];
      }
      return null;
    });
  }

  // возврат записи по ключу
  getUser(key: string): FirebaseObjectObservable<User> {
    const userPath = `${this.basePath}/${key}`;
    return this.db.object(userPath);
  }

  // создание записи
  createUser(user: User, query={}): void  {
    this.db.list(this.basePath, {
      query: query
    })
      .push(user)
      .catch(error => this.handleError(error));
  }

  // обновление записи
  updateUser(user: User, query={}): void {
    this.db.list(this.basePath, {
      query: query
    })
      .update(user.$key, {
        name: user.name,
        email: user.email,
        phone: user.phone,
        password: user.password
    }).catch(error => this.handleError(error));
  }

  // удаление записи
  deleteUser(key: string) {
    this.db.list(this.basePath, {})
      .remove(key)
      .catch(error => this.handleError(error));
  }

  // очищение таблицы
  deleteAll(): void {
    this.db.list(this.basePath, {})
      .remove()
      .catch(error => this.handleError(error));
  }

  searchUsers(start, end) {
    return this.db.list(this.basePath, {
      query: {
        orderByChild: 'name',
        limitToFirst: 10,
        startAt: start,
        endAt: end
      }
    });
  }

  private handleError(error) {
    console.log(error);
  }

}
