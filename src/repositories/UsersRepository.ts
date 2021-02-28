import { User } from "../models/User";
import { Repository, EntityRepository } from "typeorm";

@EntityRepository(User)

class UsersRepository extends Repository<User> { }

export { UsersRepository };

