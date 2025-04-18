require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/user_model');
const Major = require('./models/major_model');
const Opportunity = require('./models/opportunity_model');

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connected to MongoDB successfully!");
}
).catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); // Exit the process if connection fails
});

const majors = [
    {name: 'Computer Science', description: 'Study of computers and computational systems.'},
    {name: 'Mechanical Engineering', description: 'Design and analysis of mechanical systems.'},
    {name: 'Electrical Engineering', description: 'Study of electrical systems and electronics.'},
    {name: 'Civil Engineering', description: 'Design and construction of infrastructure.'},
    {name: 'Biology', description: 'Study of living organisms and life processes.'},
    {name: 'Psychology', description: 'Study of the mind and behavior.'},
    {name: 'Business Administration', description: 'Study of business operations and management.'},
    {name: 'Cybersecurity', description: 'Protection of computer systems and networks from information disclosure, theft, or damage.'},
];

const users = [
    {
      user_name: "jdoe22",
      first_name: "John",
      last_name: "Doe",
      year_graduated: 2022,
      major: "Computer Science",
      company: "TechCorp",
      title: "Software Engineer",
      email: "john.doe@example.com",
      linkedin_link: "https://linkedin.com/in/jdoe22"
    },
    {
      user_name: "asmith22",
      first_name: "Alice",
      last_name: "Smith",
      year_graduated: 2022,
      major: "Information Systems",
      company: "DataTech",
      title: "Data Analyst",
      email: "alice.smith@example.com",
      linkedin_link: "https://linkedin.com/in/asmith22"
    },
    {
      user_name: "bjackson22",
      first_name: "Brandon",
      last_name: "Jackson",
      year_graduated: 2022,
      major: "Cybersecurity",
      company: "SecureWave",
      title: "Security Engineer",
      email: "brandon.jackson@example.com",
      linkedin_link: "https://linkedin.com/in/bjackson22"
    },
    {
      user_name: "nmartinez22",
      first_name: "Natalie",
      last_name: "Martinez",
      year_graduated: 2022,
      major: "Marketing",
      company: "BrightMedia",
      title: "Marketing Specialist",
      email: "natalie.martinez@example.com",
      linkedin_link: "https://linkedin.com/in/nmartinez22"
    },
    {
      user_name: "rpatel22",
      first_name: "Ravi",
      last_name: "Patel",
      year_graduated: 2022,
      major: "Finance",
      company: "FinWorld",
      title: "Financial Analyst",
      email: "ravi.patel@example.com",
      linkedin_link: "https://linkedin.com/in/rpatel22"
    },
    {
      user_name: "lchen22",
      first_name: "Lily",
      last_name: "Chen",
      year_graduated: 2022,
      major: "Biology",
      company: "BioMed Labs",
      title: "Research Assistant",
      email: "lily.chen@example.com",
      linkedin_link: "https://linkedin.com/in/lchen22"
    },
    {
      user_name: "dmiller22",
      first_name: "David",
      last_name: "Miller",
      year_graduated: 2022,
      major: "Mechanical Engineering",
      company: "AutoWorks",
      title: "Mechanical Engineer",
      email: "david.miller@example.com",
      linkedin_link: "https://linkedin.com/in/dmiller22"
    },
    {
      user_name: "khassan22",
      first_name: "Kareem",
      last_name: "Hassan",
      year_graduated: 2022,
      major: "Electrical Engineering",
      company: "ElectroTech",
      title: "Hardware Engineer",
      email: "kareem.hassan@example.com",
      linkedin_link: "https://linkedin.com/in/khassan22"
    },
    {
      user_name: "sjohnson22",
      first_name: "Samantha",
      last_name: "Johnson",
      year_graduated: 2022,
      major: "Psychology",
      company: "MindCare",
      title: "Behavioral Therapist",
      email: "samantha.johnson@example.com",
      linkedin_link: "https://linkedin.com/in/sjohnson22"
    },
    {
      user_name: "mwilliams22",
      first_name: "Marcus",
      last_name: "Williams",
      year_graduated: 2022,
      major: "Political Science",
      company: "CivicAction",
      title: "Policy Analyst",
      email: "marcus.williams@example.com",
      linkedin_link: "https://linkedin.com/in/mwilliams22"
    },
    {
      user_name: "hcortez22",
      first_name: "Helena",
      last_name: "Cortez",
      year_graduated: 2022,
      major: "International Business",
      company: "GlobalTrade Inc.",
      title: "Business Analyst",
      email: "helena.cortez@example.com",
      linkedin_link: "https://linkedin.com/in/hcortez22"
    },
    {
      user_name: "jkim22",
      first_name: "Jason",
      last_name: "Kim",
      year_graduated: 2022,
      major: "Mathematics",
      company: "AlgoTech",
      title: "Quantitative Analyst",
      email: "jason.kim@example.com",
      linkedin_link: "https://linkedin.com/in/jkim22"
    },
    {
      user_name: "ahernandez22",
      first_name: "Ana",
      last_name: "Hernandez",
      year_graduated: 2022,
      major: "Education",
      company: "LearnWell Schools",
      title: "Elementary Teacher",
      email: "ana.hernandez@example.com",
      linkedin_link: "https://linkedin.com/in/ahernandez22"
    },
    {
      user_name: "tsanders22",
      first_name: "Tyler",
      last_name: "Sanders",
      year_graduated: 2022,
      major: "Economics",
      company: "EcoWise",
      title: "Economic Consultant",
      email: "tyler.sanders@example.com",
      linkedin_link: "https://linkedin.com/in/tsanders22"
    },
    {
      user_name: "ebrown22",
      first_name: "Emily",
      last_name: "Brown",
      year_graduated: 2022,
      major: "Art History",
      company: "ModernMuse",
      title: "Curatorial Assistant",
      email: "emily.brown@example.com",
      linkedin_link: "https://linkedin.com/in/ebrown22"
    },
    {
      user_name: "gwhite22",
      first_name: "George",
      last_name: "White",
      year_graduated: 2022,
      major: "Philosophy",
      company: "ThinkTank",
      title: "Ethics Researcher",
      email: "george.white@example.com",
      linkedin_link: "https://linkedin.com/in/gwhite22"
    },
    {
      user_name: "leobzr",
      first_name: "Leo",
      last_name: "Bezerra",
      year_graduated: 2023,
      major: "Computer Science",
      company: "Tech Company",
      title: "Software Developer",
      email: "leo.bezerra@example.com",
      linkedin_link: "https://linkedin.com/in/leobzr"
    }
  ];

  const opportunities = [
    {
      title: 'Web Development Internship',
      description: 'A 3-month internship opportunity to work on web development projects.',
      type: 'Internship',
      posted_by: 'johndoe',
      approved_by: 'admin',
      is_paid: true,
      is_approved: true
    },
    {
      title: 'Marketing Assistant Internship',
      description: 'Assist the marketing team in campaign planning and execution.',
      type: 'Internship',
      posted_by: 'nmartinez22',
      approved_by: 'admin',
      is_paid: false,
      is_approved: true
    },
    {
      title: 'Software Engineering Co-op',
      description: 'Join a tech company and gain hands-on experience in backend development.',
      type: 'Co-op',
      posted_by: 'jdoe22',
      approved_by: 'admin',
      is_paid: true,
      is_approved: true
    },
    {
      title: 'UX Research Volunteer',
      description: 'Support UX researchers in conducting user interviews and usability testing.',
      type: 'Volunteer',
      posted_by: 'asmith22',
      approved_by: 'admin',
      is_paid: false,
      is_approved: true
    },
    {
      title: 'Finance Analyst Internship',
      description: 'Work with a financial team on reports, analysis, and forecasting.',
      type: 'Internship',
      posted_by: 'rpatel22',
      approved_by: 'admin',
      is_paid: true,
      is_approved: true
    },
    {
      title: 'Remote Content Creator',
      description: 'Create blog posts, video scripts, and social media content remotely.',
      type: 'Job',
      posted_by: 'sjohnson22',
      approved_by: 'admin',
      is_paid: true,
      is_approved: true
    },
    {
      title: 'STEM Education Volunteer',
      description: 'Help mentor high school students in STEM fields during weekends.',
      type: 'Volunteer',
      posted_by: 'ahernandez22',
      approved_by: 'admin',
      is_paid: false,
      is_approved: true
    },
    {
      title: 'Junior Data Analyst',
      description: 'Analyze datasets and contribute to building data dashboards.',
      type: 'Job',
      posted_by: 'asmith22',
      approved_by: 'admin',
      is_paid: true,
      is_approved: true
    },
    {
      title: 'Business Operations Intern',
      description: 'Support business operations and learn about internal processes.',
      type: 'Internship',
      posted_by: 'hcortez22',
      approved_by: 'admin',
      is_paid: false,
      is_approved: true
    },
    {
      title: 'Art Gallery Assistant',
      description: 'Assist in curation, installation, and guest tours in a local art gallery.',
      type: 'Job',
      posted_by: 'ebrown22',
      approved_by: 'admin',
      is_paid: false,
      is_approved: true
    },
    {
      title: 'Cybersecurity Assistant',
      description: 'Assist with monitoring systems and responding to low-level security alerts.',
      type: 'Internship',
      posted_by: 'bjackson22',
      approved_by: 'admin',
      is_paid: true,
      is_approved: true
    },
    {
      title: 'Policy Research Assistant',
      description: 'Work with a nonprofit on policy research and writing briefs.',
      type: 'Internship',
      posted_by: 'mwilliams22',
      approved_by: 'admin',
      is_paid: false,
      is_approved: true
    },
    {
      title: 'Economics Research Volunteer',
      description: 'Assist in research and data collection for an economics think tank.',
      type: 'Volunteer',
      posted_by: 'tsanders22',
      approved_by: 'admin',
      is_paid: false,
      is_approved: true
    },
    {
      title: 'Mobile App Testing Intern',
      description: 'Test and give feedback on pre-release mobile apps for a startup.',
      type: 'Internship',
      posted_by: 'lchen22',
      approved_by: 'admin',
      is_paid: true,
      is_approved: true
    },
    {
      title: 'Operations Support Specialist',
      description: 'Full-time opportunity to support logistics and daily operations.',
      type: 'Job',
      posted_by: 'khassan22',
      approved_by: 'admin',
      is_paid: true,
      is_approved: true
    },
    {
      title: 'Ethics & Compliance Intern',
      description: 'Support the ethics committee with documentation and research.',
      type: 'Internship',
      posted_by: 'gwhite22',
      approved_by: 'admin',
      is_paid: true,
      is_approved: true
    }
  ];
  
async function seedDatabase() {
    try {
        await User.deleteMany({});
        await Major.deleteMany({});
        await Opportunity.deleteMany({});

        await Major.insertMany(majors);
        await User.insertMany(users);
        await Opportunity.insertMany(opportunities);

        console.log("Database seeded successfully!");
    } catch (error) {
        
        console.error("Error seeding database:", error);
    } finally {
        mongoose.connection.close(); // Close the connection after seeding
    }
}
seedDatabase();
