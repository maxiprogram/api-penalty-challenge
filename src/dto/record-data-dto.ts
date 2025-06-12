import { IsString, IsEmail, IsNotEmpty, IsEnum, IsInt } from 'class-validator';

export enum NameSheet {
    SheetA = 'SheetA',
    SheetB = 'SheetB',
    SheetC = 'SheetC',
    SheetS = 'SheetS',
}

export class RecordDataDto {
    id: number;

    @IsEnum(NameSheet)
    @IsNotEmpty()
    nameSheet: NameSheet

    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    lastName: string;
  
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    sphere: string;
}

export class UpdateRecordDataDto {
    idWin: number;

    @IsEnum(NameSheet)
    @IsNotEmpty()
    nameSheet: NameSheet
    
    @IsInt()
    @IsNotEmpty()
    idUser: number
}