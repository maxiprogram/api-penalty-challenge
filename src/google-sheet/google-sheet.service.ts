import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import { google, sheets_v4 } from 'googleapis';
import { firstValueFrom, map } from 'rxjs';
import { RecordDataDto } from 'src/dto/record-data-dto';
const fs = require('fs');

@Injectable()
export class GoogleSheetService {
    private authClient;
    private sheets;

    constructor(private readonly httpService: HttpService) {
        Logger.log('GoogleSheetService initialized', 'GoogleSheetService');
        this.authorize();
    }

    private async loadCredentials() {
        if (fs.existsSync(process.env.CREDENTIALS_PATH)) {
            const content = fs.readFileSync(process.env.CREDENTIALS_PATH);
            return JSON.parse(content);
        }
        throw new Error('Файл учетных данных не найден');
    }

    private loadCredentialsUrl() {
        const config: AxiosRequestConfig = {
            headers: {
                'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
            },
        };
        return this.httpService.get(
            process.env.CREDENTIALS_PATH ? process.env.CREDENTIALS_PATH : "",
            config
        );
    }

    public getAuthClient() {
        return this.authClient;
    }

    async authorize() {
        const credentials = await this.loadCredentials();

        //Begin GET-request
        //const response = await firstValueFrom(this.loadCredentialsUrl());
        //console.log('Response:', response.data);
        //const credentials = response.data;
        //End GET-request

        const auth = new google.auth.GoogleAuth({
            credentials: credentials,
            scopes: process.env.URL_AUTH,
        });
        this.authClient = await auth.getClient();
        google.options({ auth: this.authClient });
        this.sheets = google.sheets({ version: 'v4' });

        return this.authClient;
    }

    async appenRecord(recordData: RecordDataDto) {
        await this.sheets.spreadsheets.values.append({
            spreadsheetId: process.env.SPREADSHEET_ID,
            range: `${recordData.nameSheet}!A2`,
            valueInputOption: 'RAW',
            requestBody: {
                values: [[recordData.id, recordData.firstName, recordData.lastName, recordData.email, recordData.sphere]],
            },
        });
        console.log('Данные записаны');
    }

    async testRead() {
        //const sheets = google.sheets({ version: 'v4' });
        const res = await this.sheets.spreadsheets.values.get({
            spreadsheetId: process.env.SPREADSHEET_ID,
            range: 'Sheet1!A1:D1',
        });
        console.log('Данные:', res.data.values);
    }

    async testWrite() {
        //const sheets = google.sheets({ version: 'v4' });
        //await sheets.spreadsheets.values.update({
        await this.sheets.spreadsheets.values.append({
            spreadsheetId: process.env.PREADSHEET_ID,
            range: 'Sheet1!A2',
            valueInputOption: 'RAW',
            requestBody: {
                values: [['Hello', 'World', 'TestName', 'TestEmail']],
            },
        });
        console.log('Данные записаны');
    }

}
