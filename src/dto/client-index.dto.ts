import { Client } from "src/entities/client";

export class clientIndexDTO {
    id: number;
    reference: string;
    firstname: string;
    lastname: string;
    fullname: string;
    email: string;
    tel: number;
    createdAt: Date;
    updatedAt: Date;

    constructor(client: Client) {
        this.id = client.id;
        this.reference = client.reference
        this.firstname = client.firstname;
        this.lastname = client.lastname;
        this.fullname = `${client.firstname} ${client.lastname} (${client.reference})`
        this.email = client.email;
        this.tel = client.tel;
        this.createdAt = client.createdAt;
        this.updatedAt = client.updatedAt;
    }
}