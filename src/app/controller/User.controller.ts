// eslint-disable-next-line no-unused-vars
import User, { IUser } from '../models/User.model';

class UserController {
  getOne(_id: string) {
    return User.find({ _id });
  }

  getAll() {
    return User.find({});
  }

  addOne(user: IUser) {
    return User.create(user);
  }

  addMany(users: IUser[]) {
    return User.create(users);
  }

  update(_id: string, user: IUser) {
    const data = { $set: user };

    return User.update({ _id }, data);
  }

  disable(_id: string) {
    return User.update({ _id }, {
      $set: {
        active: false
      }
    });
  }

  purge(_id: string) {
    return User.deleteOne({ _id });
  }
}

const _userController = new UserController();

export default _userController;
