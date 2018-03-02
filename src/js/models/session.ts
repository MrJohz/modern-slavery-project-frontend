export class User {
    id: number;
    name: string;
    email: string;
    site_admin: boolean;
    administrates: number[];
    memberOf: number[];

    constructor(user: User) {
        this.id = user.id;
        this.name = user.name;
        this.email = user.email;
        this.site_admin = user.site_admin;
        this.administrates = user.administrates;
        this.memberOf = user.memberOf;
    }

    static fromJSON(json: any) {
        return new User(json);
    }

    clone(): User {
        return new User({
            id: this.id,
            name: this.name,
            email: this.email,
            site_admin: this.site_admin,
            administrates: [...this.administrates],
            memberOf: [...this.memberOf],
        } as User);
    }

    async save(): Promise<void> {
        fetch(`http://127.0.0.1:3000/users/${this.id}`, {
            method: 'PATCH',
            body: JSON.stringify({ name: this.name }),
        });
    }
}

export type JsonLump = {
    [key: string]: any;
}

export class Session {
    expires_at: Date;
    id: string;
    needs_revalidation: boolean;
    user: User;

    constructor(session: Session) {
        this.expires_at = session.expires_at;
        this.id = session.id;
        this.needs_revalidation = session.needs_revalidation;
        this.user = session.user;
    }

    static fromJSON(json: JsonLump | string): Session {
        let parseable = typeof json === 'string'
            ? JSON.parse(json)
            : json;

        parseable.expires_at = new Date(parseable.expires_at);
        parseable.user = User.fromJSON(parseable.user);
        return new Session(parseable as Session);
    }

    static async create(email: string, password: string): Promise<Session | string[]> {
        const response = await fetch(`http://127.0.0.1:3000/sessions`, {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'content-type': 'application/json' },
        });

        return response.status === 200
            ? Session.fromJSON(await response.json())
            : (await response.json()).validationErrors;
    }

    async clear() {
        const response = await fetch(`http://127.0.0.1:3000/sessions/${this.id}`, {
            method: 'DELETE',
            headers: { 'content-type': 'application/json' },
        });

        if (response.status !== 204) {
            console.error(response);
            throw new Error(`invalid response code when deleting session ${this.id}: ${response.status}`);
        }
    }

}
