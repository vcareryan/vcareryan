// Mock data for the prototype — CBSE Class 10 Mathematics

export const syllabusOptions = [
  { id: 'cbse', name: 'CBSE', icon: '📚' },
  { id: 'state', name: 'State Board', icon: '📖' },
];

export const classOptions = [
  { id: 5, name: 'Class 5' },
  { id: 6, name: 'Class 6' },
  { id: 7, name: 'Class 7' },
  { id: 8, name: 'Class 8' },
  { id: 9, name: 'Class 9' },
  { id: 10, name: 'Class 10' },
];

// The 8 fixed content titles (used identically inside every lesson)
export const SECTION_TITLES = [
  'Introduction',
  'Important Points',
  'Exercise',
  'Subjective Type Questions',
  'Multiple Choice Questions',
  'Previous Question Paper',
  'Shortcuts',
  'Conclusion',
];

// Subject/Category header
export const subjectCategory = {
  id: 'basic-fundamentals',
  title: 'Basic Fundamentals',
  subject: 'Mathematics',
  board: 'CBSE',
  class: 10,
};

// FREE_LESSON_LIMIT: First 3 lessons are free, rest require purchase
export const FREE_LESSON_LIMIT = 3;

// Helper to generate 8 sections for a lesson
const makeSections = (lessonId, status) => {
  return SECTION_TITLES.map((title, i) => {
    // Determine content type per section
    let contentType;
    if (i === 0) contentType = 'video';            // Introduction — video
    else if (i === 1) contentType = 'video';       // Important Points — video
    else if (i === 2) contentType = 'video_quiz';  // Exercise — video + quiz
    else if (i === 3) contentType = 'text_quiz';   // Subjective Type — text + quiz
    else if (i === 4) contentType = 'quiz';        // MCQ — quiz only
    else if (i === 5) contentType = 'text_quiz';   // Previous Question Paper — text + quiz
    else if (i === 6) contentType = 'video';       // Shortcuts — video
    else contentType = 'video';                     // Conclusion — video

    // Determine section status
    let sectionStatus;
    if (status === 'completed') {
      sectionStatus = 'completed';
    } else if (status === 'in_progress') {
      if (i < 3) sectionStatus = 'completed';
      else if (i === 3) sectionStatus = 'in_progress';
      else sectionStatus = 'locked';
    } else {
      sectionStatus = 'locked';
    }

    return {
      id: `${lessonId}-section-${i + 1}`,
      title,
      type: (i === 3 || i === 4 || i === 5) ? 'quiz' : 'video',
      status: sectionStatus,
      contentType,
    };
  });
};

export const lessons = [
  {
    id: 'lesson-1',
    lessonNumber: 1,
    title: 'Real Numbers',
    description: "Euclid's division lemma, Fundamental Theorem of Arithmetic, irrational & rational numbers",
    totalSections: 8,
    completedSections: 8,
    status: 'completed',
    isFree: true,
    sections: makeSections('lesson-1', 'completed'),
  },
  {
    id: 'lesson-2',
    lessonNumber: 2,
    title: 'Polynomials',
    description: 'Zeros of a polynomial, relationship between zeros and coefficients, division algorithm',
    totalSections: 8,
    completedSections: 3,
    status: 'in_progress',
    isFree: true,
    sections: makeSections('lesson-2', 'in_progress'),
  },
  {
    id: 'lesson-3',
    lessonNumber: 3,
    title: 'Pair of Linear Equations in Two Variables',
    description: 'Graphical and algebraic methods, substitution, elimination, cross-multiplication',
    totalSections: 8,
    completedSections: 0,
    status: 'in_progress',
    isFree: true,
    sections: makeSections('lesson-3', 'locked').map((s, i) => ({
      ...s,
      status: i === 0 ? 'in_progress' : 'locked',
    })),
  },
  {
    id: 'lesson-4',
    lessonNumber: 4,
    title: 'Quadratic Equations',
    description: 'Standard form, factorisation, completing the square, quadratic formula, nature of roots',
    totalSections: 8,
    completedSections: 0,
    status: 'premium',
    isFree: false,
    sections: makeSections('lesson-4', 'locked'),
  },
  {
    id: 'lesson-5',
    lessonNumber: 5,
    title: 'Arithmetic Progressions',
    description: 'nth term, sum of first n terms, real-life applications of AP',
    totalSections: 8,
    completedSections: 0,
    status: 'premium',
    isFree: false,
    sections: makeSections('lesson-5', 'locked'),
  },
  {
    id: 'lesson-6',
    lessonNumber: 6,
    title: 'Triangles',
    description: 'Similar triangles, criteria for similarity, areas, Pythagoras theorem',
    totalSections: 8,
    completedSections: 0,
    status: 'premium',
    isFree: false,
    sections: makeSections('lesson-6', 'locked'),
  },
  {
    id: 'lesson-7',
    lessonNumber: 7,
    title: 'Coordinate Geometry',
    description: 'Distance formula, section formula, area of triangle using coordinates',
    totalSections: 8,
    completedSections: 0,
    status: 'premium',
    isFree: false,
    sections: makeSections('lesson-7', 'locked'),
  },
  {
    id: 'lesson-8',
    lessonNumber: 8,
    title: 'Introduction to Trigonometry',
    description: 'Trigonometric ratios, complementary angles, trigonometric identities',
    totalSections: 8,
    completedSections: 0,
    status: 'premium',
    isFree: false,
    sections: makeSections('lesson-8', 'locked'),
  },
  {
    id: 'lesson-9',
    lessonNumber: 9,
    title: 'Some Applications of Trigonometry',
    description: 'Heights and distances, angle of elevation and depression',
    totalSections: 8,
    completedSections: 0,
    status: 'premium',
    isFree: false,
    sections: makeSections('lesson-9', 'locked'),
  },
  {
    id: 'lesson-10',
    lessonNumber: 10,
    title: 'Circles',
    description: 'Tangent to a circle, number of tangents from a point, properties of tangents',
    totalSections: 8,
    completedSections: 0,
    status: 'premium',
    isFree: false,
    sections: makeSections('lesson-10', 'locked'),
  },
  {
    id: 'lesson-11',
    lessonNumber: 11,
    title: 'Areas Related to Circles',
    description: 'Perimeter & area of a circle, sector, segment, combination of figures',
    totalSections: 8,
    completedSections: 0,
    status: 'premium',
    isFree: false,
    sections: makeSections('lesson-11', 'locked'),
  },
  {
    id: 'lesson-12',
    lessonNumber: 12,
    title: 'Surface Areas and Volumes',
    description: 'Combination of solids, conversion of shapes, frustum of a cone',
    totalSections: 8,
    completedSections: 0,
    status: 'premium',
    isFree: false,
    sections: makeSections('lesson-12', 'locked'),
  },
  {
    id: 'lesson-13',
    lessonNumber: 13,
    title: 'Statistics',
    description: 'Mean, median, mode of grouped data, cumulative frequency graph (ogive)',
    totalSections: 8,
    completedSections: 0,
    status: 'premium',
    isFree: false,
    sections: makeSections('lesson-13', 'locked'),
  },
  {
    id: 'lesson-14',
    lessonNumber: 14,
    title: 'Probability',
    description: 'Classical definition of probability, simple problems on single events',
    totalSections: 8,
    completedSections: 0,
    status: 'premium',
    isFree: false,
    sections: makeSections('lesson-14', 'locked'),
  },
];

export const quizQuestions = [
  {
    id: 'q1',
    question: 'The HCF of 135 and 225 is:',
    options: ['15', '25', '45', '75'],
    correctAnswer: 2,
  },
  {
    id: 'q2',
    question: 'If p and q are co-prime numbers, then p² and q² are:',
    options: ['Co-prime', 'Not co-prime', 'Even', 'Odd'],
    correctAnswer: 0,
  },
  {
    id: 'q3',
    question: 'The decimal expansion of 17/8 will terminate after how many decimal places?',
    options: ['1', '2', '3', '4'],
    correctAnswer: 2,
  },
  {
    id: 'q4',
    question: 'If the zeroes of polynomial x² + px + q are double in value to the zeroes of 2x² − 5x − 3, then p and q are:',
    options: ['p = 5, q = -6', 'p = -5, q = -6', 'p = -5, q = 6', 'p = 5, q = 6'],
    correctAnswer: 1,
  },
  {
    id: 'q5',
    question: 'The sum of zeroes of the polynomial 2x² − 8x + 6 is:',
    options: ['2', '3', '4', '6'],
    correctAnswer: 2,
  },
  {
    id: 'q6',
    question: 'A pair of linear equations a₁x + b₁y + c₁ = 0 and a₂x + b₂y + c₂ = 0 is inconsistent if:',
    options: ['a₁/a₂ ≠ b₁/b₂', 'a₁/a₂ = b₁/b₂ = c₁/c₂', 'a₁/a₂ = b₁/b₂ ≠ c₁/c₂', 'None of these'],
    correctAnswer: 2,
  },
  {
    id: 'q7',
    question: 'The discriminant of quadratic equation 3x² − 2x + 1/3 = 0 is:',
    options: ['0', '1', '-1', '2'],
    correctAnswer: 0,
  },
  {
    id: 'q8',
    question: 'The 10th term of the AP: 2, 7, 12, ... is:',
    options: ['45', '47', '49', '50'],
    correctAnswer: 1,
  },
  {
    id: 'q9',
    question: 'In a triangle ABC, DE ∥ BC. If AD = 2 cm, DB = 3 cm and AE = 2.4 cm, then EC equals:',
    options: ['3 cm', '3.2 cm', '3.6 cm', '4 cm'],
    correctAnswer: 2,
  },
  {
    id: 'q10',
    question: 'If sin A = 3/5, then cos A is:',
    options: ['3/5', '4/5', '5/3', '5/4'],
    correctAnswer: 1,
  },
];

export const parentData = {
  children: [
    {
      id: 'student-1',
      name: 'Arjun Kumar',
      class: 10,
      syllabus: 'CBSE',
      currentLesson: 'Polynomials',
      completionRate: 15,
      totalWatchTime: '12h 35m',
      quizzesCompleted: 5,
      quizzesPassed: 4,
      weeklyActivity: [
        { day: 'Mon', minutes: 45 },
        { day: 'Tue', minutes: 30 },
        { day: 'Wed', minutes: 60 },
        { day: 'Thu', minutes: 20 },
        { day: 'Fri', minutes: 55 },
        { day: 'Sat', minutes: 90 },
        { day: 'Sun', minutes: 40 },
      ],
      recentQuizzes: [
        { lesson: 'Real Numbers', section: 'MCQ', score: 100, passed: true, date: '2024-01-15' },
        { lesson: 'Real Numbers', section: 'Exercise', score: 90, passed: true, date: '2024-01-15' },
        { lesson: 'Polynomials', section: 'MCQ', score: 80, passed: false, date: '2024-01-16' },
        { lesson: 'Polynomials', section: 'MCQ', score: 95, passed: true, date: '2024-01-16' },
      ],
    },
  ],
};

export const adminData = {
  totalStudents: 1247,
  activeToday: 342,
  lessonsCreated: 14,
  avgCompletionRate: 67,
  recentActivity: [
    { student: 'Arjun K.', action: 'Completed Real Numbers', time: '2 min ago' },
    { student: 'Sneha R.', action: 'Failed Quiz - Polynomials MCQ (80%)', time: '5 min ago' },
    { student: 'Ravi M.', action: 'Started Quadratic Equations', time: '8 min ago' },
    { student: 'Priya S.', action: 'Passed Quiz - Linear Equations Exercise (95%)', time: '12 min ago' },
    { student: 'Arun T.', action: 'Watched Introduction - Triangles', time: '15 min ago' },
  ],
  topStudents: [
    { name: 'Sneha R.', class: 10, progress: 85, watchTime: '24h' },
    { name: 'Arjun K.', class: 10, progress: 72, watchTime: '18h' },
    { name: 'Priya S.', class: 10, progress: 68, watchTime: '15h' },
    { name: 'Ravi M.', class: 10, progress: 62, watchTime: '12h' },
  ],
};
