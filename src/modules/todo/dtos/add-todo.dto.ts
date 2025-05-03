import { IsString } from 'class-validator';

export class AddTodoDTO {
  @IsString()
  title: string;

  @IsString()
  content: string;
}
