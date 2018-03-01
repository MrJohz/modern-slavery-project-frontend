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

    private static fromJSON(json: any): Session {
        json.expires_at = new Date(json.expires_at);
        json.user = User.fromJSON(json.user);
        return new Session(json);
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
