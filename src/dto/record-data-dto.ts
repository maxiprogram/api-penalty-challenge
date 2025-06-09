import { IsString, IsEmail, IsNotEmpty, IsEnum } from 'class-validator';

enum NameSheet {
    SheetA = 'SheetA',
    SheetB = 'SheetB',
    SheetC = 'SheetC',
    SheetS = 'SheetS',
}

export class RecordDataDto {
    id: string

    @IsEnum(NameSheet)
    @IsNotEmpty()
    nameSheet: NameSheet

    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;
  
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    sphere: string;
}