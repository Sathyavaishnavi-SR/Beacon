export const assessmentQuestions = [
  // Logical Reasoning
  { id: 1, category: 'logical', question: 'If A > B and B > C, then:', options: ['A > C', 'C > A', 'A = C', 'Cannot determine'], answer: 0 },
  { id: 2, category: 'logical', question: 'Complete the series: 2, 4, 8, 16, __', options: ['24', '32', '28', '30'], answer: 1 },
  { id: 3, category: 'logical', question: 'Which shape comes next? ○ □ △ ○ □ __', options: ['○', '□', '△', '◇'], answer: 2 },
  { id: 4, category: 'logical', question: 'If all roses are flowers and all flowers need water, then:', options: ['Roses need water', 'Water makes roses', 'Flowers are roses', 'None'], answer: 0 },
  // Numerical
  { id: 5, category: 'numerical', question: 'What is 15% of 200?', options: ['25', '30', '35', '40'], answer: 1 },
  { id: 6, category: 'numerical', question: 'A train travels 120 km in 2 hours. Speed in km/h?', options: ['50', '60', '70', '80'], answer: 1 },
  { id: 7, category: 'numerical', question: 'Solve: 3x + 6 = 21. Find x:', options: ['3', '4', '5', '6'], answer: 2 },
  { id: 8, category: 'numerical', question: 'Area of a circle with radius 7 (π = 22/7):', options: ['144', '154', '164', '174'], answer: 1 },
  // Verbal
  { id: 9, category: 'verbal', question: 'Choose the synonym for "Eloquent":', options: ['Silent', 'Articulate', 'Confused', 'Lazy'], answer: 1 },
  { id: 10, category: 'verbal', question: 'Fill in: She __ been working here for 5 years.', options: ['have', 'has', 'had', 'having'], answer: 1 },
  { id: 11, category: 'verbal', question: 'Choose the antonym for "Benevolent":', options: ['Kind', 'Generous', 'Malevolent', 'Loving'], answer: 2 },
  { id: 12, category: 'verbal', question: 'Which sentence is grammatically correct?', options: ['She go to school', 'She goes to school', 'She going to school', 'She gone to school'], answer: 1 },
  // Interest Mapping
  { id: 13, category: 'interest', question: 'Which activity do you enjoy most?', options: ['Solving math problems', 'Writing stories', 'Doing science experiments', 'Drawing & painting'], answer: -1 },
  { id: 14, category: 'interest', question: 'Which subject excites you most?', options: ['Physics/Chemistry', 'History/Geography', 'Economics/Business', 'Fine Arts/Music'], answer: -1 },
  { id: 15, category: 'interest', question: 'Your ideal career involves:', options: ['Research & Innovation', 'Teaching & Communication', 'Business & Finance', 'Creativity & Design'], answer: -1 },
  { id: 16, category: 'interest', question: 'What kind of problems do you prefer solving?', options: ['Technical/Logical', 'Social/Humanitarian', 'Financial/Analytical', 'Creative/Expressive'], answer: -1 },
];

export const streamRecommendations = {
  Science: {
    degrees: ['B.Tech / B.E.', 'MBBS / BDS', 'B.Sc (Physics/Chemistry/Biology)', 'B.Pharm', 'BCA / B.Sc CS'],
    careers: ['Software Engineer', 'Doctor', 'Researcher', 'Data Scientist', 'Biomedical Engineer'],
    description: 'Science stream opens doors to engineering, medicine, research, and technology fields.',
  },
  Commerce: {
    degrees: ['B.Com', 'BBA', 'CA (Chartered Accountancy)', 'BMS', 'Economics Hons.'],
    careers: ['Chartered Accountant', 'Business Analyst', 'Investment Banker', 'Entrepreneur', 'Financial Advisor'],
    description: 'Commerce stream leads to finance, business management, accounting, and entrepreneurship.',
  },
  Arts: {
    degrees: ['BA (History/Psychology/Sociology)', 'Mass Communication', 'Fine Arts', 'Law (BA LLB)', 'B.Ed'],
    careers: ['Journalist', 'Lawyer', 'Psychologist', 'Civil Services (IAS/IPS)', 'Teacher/Professor'],
    description: 'Arts stream opens paths in humanities, social sciences, law, civil services, and creative fields.',
  },
};

export const colleges = [
  { id: 1, name: 'IIT Delhi', location: 'New Delhi', stream: 'Science', degrees: ['B.Tech', 'M.Tech', 'PhD'], type: 'Government', established: 1961, facilities: ['Library', 'Labs', 'Hostel', 'Sports'], contact: '+91-11-26591999', eligibility: 'JEE Advanced', rating: 4.9 },
  { id: 2, name: 'Delhi University', location: 'New Delhi', stream: 'Arts', degrees: ['BA', 'B.Com', 'B.Sc', 'MA'], type: 'Government', established: 1922, facilities: ['Library', 'Hostel', 'Sports', 'Cultural'], contact: '+91-11-27667011', eligibility: 'Class 12 Merit', rating: 4.7 },
  { id: 3, name: 'IIM Ahmedabad', location: 'Ahmedabad', stream: 'Commerce', degrees: ['MBA', 'PGP', 'PhD'], type: 'Government', established: 1961, facilities: ['Library', 'Labs', 'Hostel', 'Research Center'], contact: '+91-79-66324141', eligibility: 'CAT', rating: 4.9 },
  { id: 4, name: 'AIIMS New Delhi', location: 'New Delhi', stream: 'Science', degrees: ['MBBS', 'MD', 'MS', 'PhD'], type: 'Government', established: 1956, facilities: ['Hospital', 'Library', 'Hostel', 'Labs'], contact: '+91-11-26588500', eligibility: 'NEET', rating: 4.8 },
  { id: 5, name: 'National Law School, Bangalore', location: 'Bangalore', stream: 'Arts', degrees: ['BA LLB', 'LLM', 'PhD'], type: 'Government', established: 1987, facilities: ['Library', 'Moot Court', 'Hostel'], contact: '+91-80-23010000', eligibility: 'CLAT', rating: 4.8 },
  { id: 6, name: 'Shri Ram College of Commerce', location: 'New Delhi', stream: 'Commerce', degrees: ['B.Com', 'B.Com Hons', 'Economics'], type: 'Government', established: 1926, facilities: ['Library', 'Labs', 'Sports', 'Cultural'], contact: '+91-11-27667905', eligibility: 'Class 12 Merit', rating: 4.7 },
  { id: 7, name: 'IIT Bombay', location: 'Mumbai', stream: 'Science', degrees: ['B.Tech', 'M.Tech', 'MBA', 'PhD'], type: 'Government', established: 1958, facilities: ['Library', 'Labs', 'Hostel', 'Sports', 'Innovation Hub'], contact: '+91-22-25722545', eligibility: 'JEE Advanced', rating: 4.9 },
  { id: 8, name: 'Jawaharlal Nehru University', location: 'New Delhi', stream: 'Arts', degrees: ['BA', 'MA', 'MPhil', 'PhD'], type: 'Government', established: 1969, facilities: ['Library', 'Research Center', 'Hostel', 'Cultural'], contact: '+91-11-26741557', eligibility: 'JNUEE', rating: 4.6 },
];

export const interestTags = [
  'Technology', 'Medicine', 'Business', 'Arts', 'Research', 'Teaching', 'Law', 'Finance',
  'Engineering', 'Psychology', 'Social Work', 'Design', 'Music', 'Sports', 'Writing',
  'Environment', 'Politics', 'Economics', 'Literature', 'Mathematics',
];

export const careerGoalTags = [
  'Doctor', 'Engineer', 'Lawyer', 'Teacher', 'Entrepreneur', 'Civil Servant (IAS/IPS)',
  'Scientist', 'Writer', 'Banker', 'Designer', 'Psychologist', 'Journalist',
  'Data Scientist', 'Architect', 'Chartered Accountant',
];
