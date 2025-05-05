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

  getTodos(): Todo[] {
    return [
      {
        id: 1,
        title: 'one',
        content: 'todo one',
      },
      {
        id: 2,
        title: 'two',
        content: 'todo two',
      },
      {
        id: 3,
        title: 'three',
        content: 'todo three',
      },
      {
        id: 4,
        title: 'four',
        content: 'todo four',
      },
      {
        id: 5,
        title: 'five',
        content: 'todo five',
      },
      {
        id: 6,
        title: 'six',
        content: 'todo six',
      },
      {
        id: 7,
        title: 'seven',
        content: 'todo seven',
      },
      {
        id: 8,
        title: 'eight',
        content: 'todo eight',
      },
      {
        id: 9,
        title: 'nine',
        content: 'todo nine',
      },
      {
        id: 10,
        title: 'ten',
        content: 'todo ten',
      },
    ];
  }
}
