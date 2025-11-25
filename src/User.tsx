
export interface User {
  id: Number;
  username: String;
  email: String;
  password: String;
}

class UserService {
  // Ключ для localStorage - где будем хранить наших пользователей
  private readonly STORAGE_KEY = 'todoAppUser';

  //  ПОЛУЧИТЬ ВСЕХ ПОЛЬЗОВАТЕЛЕЙ
  getUsers(): User[] {
    // Достаем данные из localStorage по ключу
    const userJson = localStorage.getItem(this.STORAGE_KEY)
    // преобразуем JSON строку в массив объектов
    return userJson ? JSON.parse(userJson) : [];
  }

  //СОХРАНИТЬ ПОЛЬЗОВАТЕЛЕЙ (приватный метод)
  private saveUser(users: User[]): void {
    // Преобразуем массив пользователей в JSON строку и сохраняем
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users))
  }

    // НАЙТИ ПОЛЬЗОВАТЕЛЯ ПО EMAIL
  findUserByEmail(email: string): User | undefined {
    const users = this.getUsers();
    return users.find(user => user.email === email)
  }

    // РЕГИСТРАЦИЯ НОВОГО ПОЛЬЗОВАТЕЛЯ
  registerUser(username: string, email: string, password: string): User {
    const users = this.getUsers(); 
    if (this.findUserByEmail(email)) {
      throw new Error('Пользователь с таким email уже существует')
    }

    // создаем новых пользователей 
    const newUser = {
      id: Date.now(),
      username,
      email,
      password
    }

    users.push(newUser)
    this.saveUser(users)
    return newUser
  }

   // ВХОД ПОЛЬЗОВАТЕЛЯ
  loginUser(email: string, password: string): User {
    const user = this.findUserByEmail(email);

    if (!user) {
      throw new Error('Пользователь с таким email не найден')
    }
    if (user.password !== password) {
      throw new Error('Неверный пароль')
    }
    return user
  }
}

export const userService = new UserService