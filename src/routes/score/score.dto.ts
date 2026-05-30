import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class SearchScoreDto {
  @IsNotEmpty()
  @IsString()
  @Length(8, 12, { message: 'Số báo danh phải từ 8 đến 12 ký tự' })
  @Matches(/^\d+$/, { message: 'Số báo danh chỉ được chứa chữ số' })
  sbd: string;
}
