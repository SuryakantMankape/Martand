export interface MandalRegistration {
  fullName: string;
  age: number;
  gender: 'Female' | 'Male' | 'Other';
  memberType: 'old' | 'new';
  amount: number;
  photoData: string;
  photoName: string;
}
