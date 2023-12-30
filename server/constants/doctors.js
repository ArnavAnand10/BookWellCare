const locations = [
  { label: 'Pune' },
  { label: 'Mumbai' },
  { label: 'Jammu' },
  { label: 'Delhi' },
  { label: 'Hyderabad' },
  { label: 'Bangalore' },
  { label: 'Rajasthan' },
  { label: 'Kashmir' },
  { label: 'Leh' },
];

const categories = [
  'Physicians',
  'Surgeons',
  'Dentists',
  'Pediatricians',
  'Cardiologists',
  'Orthopedic Surgeons',
  'Gynecologists',
  'Ophthalmologists',
  'Dermatologists',
  'Neurologists',
  'Psychiatrists',
  'Oncologists',
  'Radiologists',
  'Urologists',
  'Endocrinologists',
  'Gastroenterologists',
  // Add more categories as needed
];

const indianNames = [
  'Arjun', 'Aryan', 'Aditya', 'Akshay', 'Ananya', 'Anjali', 'Aisha', 'Aditi', 'Amit', 'Alia', 'Ashok', 'Bhavya', 'Chetan',
  'Divya', 'Deepak', 'Esha', 'Gaurav', 'Gita', 'Harsh', 'Hina', 'Ishaan', 'Ishita', 'Jatin', 'Juhi', 'Kartik', 'Kavita', 'Lalit',
  'Lavanya', 'Mohan', 'Megha', 'Neha', 'Nitin', 'Nidhi', 'Om', 'Pooja', 'Pranav', 'Priya', 'Rahul', 'Ritu', 'Rohit', 'Riya', 'Sachin',
  'Sakshi', 'Sanjay', 'Shreya', 'Suresh', 'Shivani', 'Tanvi', 'Tarun', 'Urvashi', 'Varun', 'Vidya', 'Vivek', 'Yash', 'Yamini', 'Zoya'
];

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const combinedData = [];

for (const location of locations) {
  for (const category of categories) {
    for (let i = 1; i <= 10; i++) {
      const name = `Dr. ${indianNames[getRandomInt(0, indianNames.length - 1)]} ${i} - ${location.label}`;
      const email = `dummy${combinedData.length + 1}@example.com`;
      const phoneNumber = `+91 ${getRandomInt(7000000000, 9999999999)}`;

      const startTime = getRandomInt(9, 12);
      const endTime = getRandomInt(15, 18);
      const timePerPatient = getRandomInt(10, 30);
      const timingForPatient = getRandomInt(10, 30); // Added timingForPatient property

      const availableSlots = calculateAvailableSlots(startTime, endTime, timingForPatient);

      combinedData.push({
        name,
        email,
        password: 'DummyPassword123',
        age: (getRandomInt(30, 40)).toString(),
        hospitalAddress: `Dummy Hospital ${i} - ${location.label}`,
        category,
        location: location.label,
        education: `Dummy Medical College ${i} - ${location.label}`,
        experience: ((getRandomInt(5, 10)) * 2).toString(),
        phoneNumber,
        fees: (getRandomInt(500, 1000)).toString(),
        startTime,
        endTime,
        timePerPatient,
        timingForPatient, // Added timingForPatient property
        availableSlots,
      });
    }
  }
}

function calculateAvailableSlots(startTime, endTime, timingForPatient) {
  const slots = [];
  let currentTime = new Date(`2023-01-01T${startTime}:00:00`);

  while (currentTime < new Date(`2023-01-01T${endTime}:00:00`)) {
    const formattedTime = currentTime.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    slots.push(formattedTime);
    currentTime = new Date(currentTime.getTime() + timingForPatient * 60000);
  }

  return slots;
}

module.exports = combinedData;
