import { Body, Controller, Get, Post } from '@nestjs/common';
import { Todo } from 'src/entities/todo.entity';

import { AddTodoDTO } from './dtos/add-todo.dto';
import { TodoService } from './todo.service';

@Controller('todos')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Post()
  addTodo(@Body() addTodoDTO: AddTodoDTO): Promise<Todo> {
    return this.todoService.addTodo(addTodoDTO);
  }

  @Get()
  getTodo(): Todo[] {
    return this.todoService.getTodos();
  }
}
