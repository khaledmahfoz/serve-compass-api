import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from 'src/entities/todo.entity';
import { Repository } from 'typeorm';

import { AddTodoDTO } from './dtos/add-todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  async addTodo(addTodoDTO: AddTodoDTO): Promise<Todo> {
    const todo = this.todoRepository.create(addTodoDTO);
    return this.todoRepository.save(todo);
  }

  getTodos(): Promise<Todo[]> {
    return this.todoRepository.find();
  }
}
