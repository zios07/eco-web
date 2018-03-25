import { Role } from "./role";
import { Account } from "./account";

export class User {
    
    private id: number;
    private firstName: string;
    private lastName: string;
    private email: string;
    private account: Account;
    private role: Role;
    private bDate: Date;

    constructor(id?: number, firstName?: string, lastName?: string, email?: string,
        account?: Account, role?: Role, bDate?: Date) {

            this.id = id;
            this.firstName = firstName;
            this.lastName = lastName;
            this.email = email;
            this.account = account;
            this.role = role;
            this.bDate = bDate;
    }

    getFirstName() {
        return this.firstName;
    }

    getLastName() {
        return this.lastName;
    }

    getEmail() {
        return this.email;
    }

    getAccount() {
        return this.account;
    }

    getRole() {
        return this.role; 
    }

    getBDate() {
        return this.bDate;
    }

}