import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dtos';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(newUserDto: CreateUserDto): Promise<User> {
    const user = this.repo.create(newUserDto);
    return this.repo.save(user);
  }

  async findOneById(
    id: number,
    activityState: boolean[] = [true],
  ): Promise<User> {
    if (!id) return;
    const user = await this.repo.findOneBy({ id, isActive: In(activityState) });
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return await this.repo.findOneBy({ email });
  }

  find(activityState: boolean[] = [true]): Promise<User[]> {
    return this.repo.find({ where: { isActive: In(activityState) } });
  }

  async update(id: number, attrs: Partial<User>): Promise<User> {
    const user = await this.repo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('user not found');
    }
    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  async remove(id: number): Promise<void> {
    const user = await this.repo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('user not found');
    }
    await this.repo.remove(user);
  }

  async softDelete(id: number): Promise<void> {
    const user = await this.repo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('user not found');
    }
    user.deletedAt = new Date();
    await this.repo.save(user);
  }
}
