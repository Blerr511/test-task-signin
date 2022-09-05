import { Expose, Transform, TransformFnParams } from 'class-transformer';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignInValidator {
  @Expose()
  @IsEmail()
  email!: string;

  @Expose()
  @IsNotEmpty({ groups: ['submit'] })
  @Transform(({ value }: TransformFnParams) => value?.trim())
  password!: string;
}
