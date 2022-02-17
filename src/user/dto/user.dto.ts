import { IsNotEmpty } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}
// 유효성 체크에 효율적, 안정적으로 데이터 전송을 활용할 수 있어. 유지보수도 쉬워져 => dto를 쓰지 않는다면 프로퍼티를 바꾸는 곳을 다 바꿔줘야해.
// 컨트롤러 핸들러레벨에서 유즈파이프를 넣어줘야 해