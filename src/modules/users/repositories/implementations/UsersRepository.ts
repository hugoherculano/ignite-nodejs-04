import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const user = new User();

    Object.assign(user, {
      name,
      email,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.users.push(user);

    return user;
  }

  findById(id: string): User {
    const userById = this.users.find((user) => {
      return user.id === id;
    });

    return userById;
  }

  findByEmail(email: string): User {
    const userByEmail = this.users.find((user) => {
      return user.email === email;
    });

    return userByEmail;
  }

  turnAdmin(receivedUser: User): User {
    if (receivedUser.admin) {
      return receivedUser;
    }
    const userById = this.users.findIndex((indexUser) => {
      return indexUser.id === receivedUser.id;
    });

    const { email, name, id, created_at } = receivedUser;

    const adminUser = {
      id,
      email,
      name,
      admin: true,
      created_at,
      updated_at: new Date(),
    };

    this.users.splice(userById, 1, adminUser);

    return adminUser;
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };
