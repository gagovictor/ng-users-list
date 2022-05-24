export type UsersViewMode = 'table'|'cards';

export type UsersExportFormat = 'json'|'pretty'|'csv'|'yaml'|'xml';

export const UsersDefaultPageIndex = 0;
export const UsersDefaultPageSize = 10;
export const UsersDefaultInfiniteScrollOffset = 100;

export const UserFields = [
    'picture',
    'name',
    'gender',
    'nat',
    'location',
    'login_username',
    'email',
    'dob_date',
    'dob_age',
    'registered_date',
    'registered_age',
    'phone',
    'cell'
];

export const UserFieldsDefault = [
    'picture',
    'name',
    'gender',
    'location',
    'email',
    'dob_age',
    'registered_age',
    'phone',
];

export const UserFieldsDict = {
    'picture': 'Picture',
    'name': 'Name',
    'gender': 'Gender',
    'nat': 'Nationality',
    'location': 'Location',
    'login_username': 'Username',
    'email': 'E-mail',
    'dob_date': 'Birth Date',
    'dob_age': 'Age',
    'registered_date': 'Registered Since',
    'registered_age': 'Registration Seniority',
    'phone': 'Phone',
    'cell': 'Cell'
};

