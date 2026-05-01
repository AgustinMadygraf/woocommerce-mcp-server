import { WordPressClient } from "../../../infrastructure/api/WordPressClient";
import { GetUsersUseCase } from "../../../application/use-cases/users/GetUsers";
import { GetUserUseCase } from "../../../application/use-cases/users/GetUser";
import { CreateUserUseCase } from "../../../application/use-cases/users/CreateUser";
import { UpdateUserUseCase } from "../../../application/use-cases/users/UpdateUser";
import { DeleteUserUseCase } from "../../../application/use-cases/users/DeleteUser";

export class UserController {
  private getUsersUseCase: GetUsersUseCase;
  private getUserUseCase: GetUserUseCase;
  private createUserUseCase: CreateUserUseCase;
  private updateUserUseCase: UpdateUserUseCase;
  private deleteUserUseCase: DeleteUserUseCase;

  constructor(client: WordPressClient) {
    this.getUsersUseCase = new GetUsersUseCase(client);
    this.getUserUseCase = new GetUserUseCase(client);
    this.createUserUseCase = new CreateUserUseCase(client);
    this.updateUserUseCase = new UpdateUserUseCase(client);
    this.deleteUserUseCase = new DeleteUserUseCase(client);
  }

  async handle(method: string, params: any) {
    switch (method) {
      case "get_users":
        return this.getUsersUseCase.execute(params);
      case "get_user":
        return this.getUserUseCase.execute(params.userId);
      case "create_user":
        return this.createUserUseCase.execute(params.userData);
      case "update_user":
        return this.updateUserUseCase.execute(params.userId, params.userData);
      case "delete_user":
        return this.deleteUserUseCase.execute(params.userId, params.force, params.reassign);
      default:
        throw new Error(`Method ${method} not handled by UserController`);
    }
  }
}
