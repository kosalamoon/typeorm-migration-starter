import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  async findAll() {
    await this.usersRepository.delete({ active: true });
    this.logger.debug('users deleted', 'UserService');

    await this.usersRepository.save({
      active: true,
      firstName: 'kosala',
      lastName: 'dhanushka',
    });
    this.logger.debug('user added', 'UserService');

    const users = await this.usersRepository.find();
    this.logger.debug(
      { users, message: 'users list' },
      { className: 'UserService' },
    );
  }
}
