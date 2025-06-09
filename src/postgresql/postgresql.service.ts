import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
const { Client } = require('pg');

@Injectable()
export class PostgresqlService implements OnModuleDestroy {
    private client: any | undefined = undefined;

    constructor() {
        Logger.log('PostgresqlService initialized', 'PostgresqlService');
        this.connectPosgresql();
    }

    onModuleDestroy() {
        if(this.client !== undefined) {
            this.client.end();
        }
    }

    connectPosgresql() {
        this.client = new Client({
            host: process.env.POSTGRESQL_HOST,
            database: process.env.POSTGRESQL_DATABASE,
            user: process.env.POSTGRESQL_USER,
            password: process.env.POSTGRESQL_PASSWORD,
            //port: 5432,
            ssl: true,
        });
        
        this.client.connect().then(() => {
            Logger.log('Connected to PostgreSQL database!', 'PostgresqlService');
            // You can now perform database queries here
            // Example:
            // this.client.query('SELECT NOW()').then(res => {
            //     console.log(res.rows[0])
            // }).catch(err => console.error("Query error:", err));
     }).catch((err) => { Logger.error(`Error connecting to the database: '${err}'`, 'PostgresqlService'); });
    }
}
