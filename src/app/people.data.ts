import { Person } from './models';

const first = ['Aarav','Aditi','Akash','Ananya','Arjun','Avni','Dev','Diya','Ishaan','Kavya','Krish','Meera','Neel','Nisha','Pranav','Priya','Rahul','Riya','Rohan','Saanvi','Siddharth','Tanvi','Varun','Vikram'];
const last = ['Agarwal','Bansal','Chauhan','Desai','Gupta','Iyer','Jain','Kapoor','Kulkarni','Mehta','Mishra','Nair','Patel','Rao','Reddy','Shah','Sharma','Singh','Verma','Yadav'];
const cities = ['Mumbai','Delhi','Bengaluru','Pune','Hyderabad','Chennai','Ahmedabad','Kolkata'];
const colors = ['#644ef6','#f97357','#16a394','#e45d92','#3d79de','#d88d1a'];

export const PEOPLE: Person[] = Array.from({ length: 360 }, (_, index) => {
  const name = `${first[index % first.length]} ${last[(index * 7) % last.length]}`;
  return { id: index + 1, name, email: `${name.toLowerCase().replace(' ', '.')}@example.com`, city: cities[index % cities.length], status: index % 5 === 0 ? 'Pending' : 'Registered', initials: name.split(' ').map(x => x[0]).join(''), color: colors[index % colors.length] };
});
