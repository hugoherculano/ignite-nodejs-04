import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    const isAdminUser = this.usersRepository.findById(user_id);

    if (!isAdminUser) {
      throw new Error("Mensagem do erro");
    }

    if (!isAdminUser.admin) {
      throw new Error("Mensagem do erro");
    }

    const lista = this.usersRepository.list();

    return lista;
  }
}

export { ListAllUsersUseCase, IRequest };
