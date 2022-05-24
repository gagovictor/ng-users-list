import { formatDate } from "@angular/common";

export interface IUserData {
    gender?: string;
    name: IUserName;
    location?: IUserLocation;
    email?: string;
    login?: IUserLogin;
    dob?: IUserDob;
    registered?: IUserRegistered;
    phone?: string;
    cell?: string;
    id?: IUserId;
    picture?: IUserPicture;
    nat?: string;
}

export interface IUserPicture {
    large: string;
    medium: string;
    thumbnail: string;
}

export type UserPictureSize = 'thumbnail'|'medium'|'large';

export interface IUserName {
    title: string;
    first: string;
    last: string;
}

export interface IUserLocation {
    street: {
        name: string;
        number: number;
    };
    city: string;
    state: string;
    country: string;
    postcode: string|number;
    coordinates: {
        latitude: string;
        longitude: string;
    };
    timezone: {
        offset: string;
        description: string;
    };
};


export interface IUserId {
    name: string;
    value: string;
};

export interface IUserRegistered {
    date: string;
    age: number;
}

export interface IUserDob {
    date: string;
    age: number;
};

export interface IUserLogin {
    uuid: string;
    username: string;
    password: string;
    salt: string;
    md5: string;
    sha1: string;
    sha256: string;
};

export class User {

    public picture?: IUserPicture;
    public name: string;
    public gender?: string;
    public nat?: string;
    public location?: string;
    public login_username?: string;
    public email?: string;
    public dob_date?: string;
    public dob_age?: string;
    public registered_date?: string;
    public registered_age?: string;
    public phone?: string;
    public cell?: string;

    constructor(props: IUserData) {
        this.picture = props.picture;
        this.name = props.name ? (props.name.first + ' ' + props.name.last) : '';
        this.gender = props.gender ? (props.gender.charAt(0).toUpperCase() + props.gender.substr(1, )) : '';
        this.nat = props.nat;
        let loc: IUserLocation|undefined = props.location;
        this.location = loc ? (loc.street.name + ', ' + loc.street.number + '. ' + loc.city + ' - ' + loc.state + '. ' + loc.country) : '';
        this.login_username = props.login?.username || '';
        this.email = props.email;
        this.dob_date = props.dob?.date ? formatDate(props.dob.date, 'MM/dd/yyyy', 'en-US') : '';
        this.dob_age = props.dob?.age ? props.dob.age.toString() : '';
        this.registered_date = props.registered?.date ? formatDate(props.registered.date, 'MM/dd/yyyy', 'en-US') : '';
        this.registered_age = props.registered?.age + ' years';
        this.phone = props.phone;
        this.cell = props.cell;
    }

    public getAttribute(attr: string): string | IUserPicture | ((attr: string) => void) | undefined {
        return this[attr as keyof User];
    }

}
