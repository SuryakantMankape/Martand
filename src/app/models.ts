// export interface MandalRegistration {
//   fullName: string;
//   age: number;
//   gender: 'Female' | 'Male' | 'Other';
//   memberType: 'old' | 'new';
//   amount: number;
//   photoData: string;
//   photoName: string;
// }
export interface Person {
  id: number;
  name: string;
  email: string;
  city: string;
  status: 'Pending' | 'Registered' | string;
  initials: string;
  color: string;
}

export interface MandalRegistration {

  fullName: string;

  mobile: string;

  age: number;

  gender: 'Female' | 'Male' | 'Other';

  memberType: 'old' | 'new';

  amount: number;

  photoData: string;

  photoName: string;

}
