import genai from "@assets/ps/genai.png";
import cybersecurity from "@assets/ps/cybersecurity.png";
import fintech from "@assets/ps/fintech.png";

const problemStatementsData = [
  {
    id: 1,
    category: "Fintech",
    title: "Business Analytics-Based Appointment Management System for Efficient Customer Service",
    objective: "The goal is to design and implement an advanced facial recognition system that securely authenticates customers and facilitates seamless handling of service queries via video or audio recordings. The system should enable efficient appointment scheduling for customer support, enhancing security, fraud prevention, and the overall customer experience. Additionally, the solution must generate service tickets containing a detailed analytical snapshot of the customer's profile and direct them to the appropriate business unit based on their requirements.",
    coreComponents: [
      "Facial Recognition Authentication",
      "Video/Audio Query Acceptance",
      "Service Ticket Creation",
      "Customer Redirection (Existing and New Customers)",
      "AI-Powered Risk Mitigation and Data Analytics",
      "Feedback Module for Continuous Improvement",
      "Cost-Effectiveness and Scalability to Rural Branches"
    ],
    realLifeUseCases: [
      {
        scenario: "Existing Customer (Vatsalya)",
        description: [
          "Vatsalya is an existing customer of Union Bank of India. He requires assistance with a loan query.",
          "Vatsalya logs into the Union Bank’s mobile app, Vyom, and is prompted by the bank’s chatbot, UVA, to record a short video explaining his question.",
          "The facial recognition system authenticates his identity using his stored facial model and Aadhaar-based verification.",
          "A service ticket is created, including an analytical snapshot of Vatsalya’s profile, such as his credit score, past loan applications, and spending patterns.",
          "Based on this data, the system recommends a suitable loan product and its details.",
          "Vatsalya receives an appointment confirmation for a video call with a customer service representative to discuss the loan options further."
        ]
      },
      {
        scenario: "New Customer (Ravi)",
        description: [
          "Ravi, a new customer, downloads the Union Bank of India’s app, Vyom, and begins the onboarding process.",
          "He uploads his Aadhaar and PAN card details, which the system uses to fetch and verify his financial background.",
          "The system identifies Ravi’s interest in a housing loan based on the data provided.",
          "A service ticket is generated, including Ravi’s credit score, income, and loan eligibility details.",
          "Ravi is routed to the loan department, where a loan officer receives the service ticket along with personalized suggestions based on Ravi’s profile."
        ]
      },
      {
        scenario: "Customer Prioritization Based on Holdings/Assets",
        description: [
          "Union Bank implements a priority system to enhance customer satisfaction by considering the holdings or assets of customers.",
          "Example Scenario: Two customers, A and B, approach the bank with service queries. Customer A has holdings valued at ₹X, while Customer B has holdings of ₹Y, where X > Y.",
          "The system analyzes their respective financial profiles and prioritizes Customer A for faster service, as his holdings indicate higher contribution or engagement with the bank.",
          "This preference system ensures a balanced allocation of resources while maintaining fairness and transparency."
        ]
      }
    ],
    expectedSolution: [
      "The proposed solution should integrate a robust face training model within Union Bank of India’s mobile app, Vyom, for fraud prevention, leveraging Aadhaar-based authentication to verify customer identities and enable edge processing. This will ensure secure transactions and minimize identity fraud risks, even in remote areas.",
      "Additionally, the solution must include:",
      "Customer Prioritization Logic: Algorithms to dynamically adjust service priorities based on holdings or asset value, ensuring high-value customers receive timely assistance.",
      "AI-Driven Feedback Mechanism: A feedback module generating actionable insights for branches and staff by analyzing customer interactions and transaction patterns. This will help improve service quality, optimize resource allocation, and identify areas for operational enhancement.",
      "By providing personalized and data-driven experiences, the solution will improve customer engagement, strengthen security, and enable scalable deployment, even in rural regions."
    ],
    image: fintech
  },
  {
    id: 2,
    category: "Cybersecurity",
    title: "Need for Government Agencies Assistance for takedown of Malicious/Phishing domain",
    objective: "Public Sector Banks (PSBs) in India often face significant hurdles in the swift takedown of phishing domains or fraudulent applications impersonating their entities. These challenges are amplified by non-cooperative domain registrars and hosting providers, particularly those in jurisdictions with lax cybersecurity laws or where threat actors benefit from state protection.",
    coreComponents: [
      "Streamlined Takedown Processes",
      "Clear Reporting Mechanisms",
      "Standardized Templates and Guidelines",
      "Centralized Coordination",
      "Unified Platform",
      "Enhanced Collaboration",
      "Jurisdictional Workarounds"
    ],
    realLifeUseCases: [
      {
        scenario: "Arnav’s Challenge",
        description: [
          "Arnav, a cybersecurity specialist at Union Bank of India, identifies a phishing website impersonating the bank. This website is actively collecting sensitive customer information, posing a severe threat. Despite engaging third-party takedown service providers, the domain remains active due to registrar non-cooperation, as it operates in a region with minimal enforcement of cybersecurity regulations. The prolonged delay exposes customer data, risking financial loss and eroding the bank’s credibility."
        ]
      }
    ],
    expectedSolution: [
      "Building a Unified Cybersecurity Framework for Phishing Takedowns",
      "Solution Design: Centralized Takedown Platform",
      "Automated Detection: Integrate AI-powered tools and threat intelligence for real-time identification of phishing domains.",
      "Streamlined Reporting: Provide an API or interface for reporting malicious activities directly to government agencies, Computer Emergency Response Teams (CERTs), or other regulatory bodies.",
      "Progress Tracking: Offer real-time updates on the status of takedown requests for all stakeholders.",
      "Global Registrar Integration: Build partnerships with international registrars and hosting providers for expedited takedowns.",
      "Potential Impact",
      "Reduced Response Time: Accelerate the takedown process to minimize customer exposure to threats.",
      "Enhanced Trust: Strengthen customer confidence by demonstrating proactive cybersecurity measures.",
      "Support Law Enforcement: Facilitate evidence collection and collaboration for prosecuting cybercriminals.",
      "Secured Digital Ecosystem: Protect critical financial infrastructure by mitigating phishing and malicious domain risks efficiently."
    ],
    image: cybersecurity
  },
  {
    id: 3,
    category: "Generative AI",
    title: "Leveraging GenAI for Customer Analytics and Fraud Detection in Banking",
    objective: "Combating Financial Crimes in the Age of Digital Banking with Generative AI",
    coreComponents: [
      "Customer Profiling and Onboarding",
      "Complex Transaction Networks",
      "Cross-Border Transactions",
      "Short Lifespan Fraudulent Accounts",
      "High False-Positive Rates",
      "Advanced Evasion Techniques",
      "Insider Threats"
    ],
    realLifeUseCases: [
      {
        scenario: "Naman’s Journey in a Digital Banking World",
        description: [
          "Scenario 1: Fraud Detection",
          "Naman receives a large sum from an unfamiliar account, followed by flagged international transactions suspected of 'smurfing' (a money laundering technique). His account is frozen for investigation.",
          "Scenario 2: Personalized Services",
          "GenAI recognizes Naman’s frequent international transactions and suggests a travel-friendly credit card tailored to his needs.",
          "Scenario 3: Insider Threat Detection",
          "GenAI flags unauthorized access to Naman’s transaction data by an internal employee, immediately alerting the compliance team to investigate."
        ]
      }
    ],
    expectedSolution: [
      "The proposed solution should integrate a robust face training model within Union Bank of India’s mobile app, Vyom, for fraud prevention, leveraging Aadhaar-based authentication to verify customer identities and enable edge processing. This will ensure secure transactions and minimize identity fraud risks, even in remote areas.",
      "Additionally, the solution must include:",
      "Customer Prioritization Logic: Algorithms to dynamically adjust service priorities based on holdings or asset value, ensuring high-value customers receive timely assistance.",
      "AI-Driven Feedback Mechanism: A feedback module generating actionable insights for branches and staff by analyzing customer interactions and transaction patterns. This will help improve service quality, optimize resource allocation, and identify areas for operational enhancement.",
      "By providing personalized and data-driven experiences, the solution will improve customer engagement, strengthen security, and enable scalable deployment, even in rural regions."
    ],
    image: genai
  }
];

export default problemStatementsData;
