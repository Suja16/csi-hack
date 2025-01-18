import { Box, Typography, Container } from "@mui/material";
import CustomizedDialogs from "./ProbLemStatementCards";
import useMediaQuery from "@mui/material/useMediaQuery";

import fintech from "../assets/ps/fintech.png";
import cybersecurity from "../assets/ps/cybersecurity.png";
import genai from "../assets/ps/genai.png";

const ProblemStatement1 = () => (
  <div>
    <Typography variant="h3" style={{ color: "#634647" }}>Objective:</Typography>
    <Typography>
      The goal is to design and implement a highly accurate facial recognition system that can authenticate and accept customer service queries via video/audio recordings and create appointments for customer support. The system should streamline the process for both new and existing customers, while enhancing security, fraud prevention, and customer experience. The solution needs to provide a service ticket with a detailed analytical snapshot of the customer's profile and direct customers to the right business unit based on their needs.
    </Typography>
    <div style={{ width: "100%" }}>
      <Typography variant="h3" style={{ color: "#634647" }}>Core Components of the Solution:</Typography>
      <ul>
        <li><Typography variant="h4">Facial Recognition Authentication</Typography></li>
        <li><Typography variant="h4">Video/Audio Query Acceptance</Typography></li>
        <li><Typography variant="h4">Service Ticket Creation</Typography></li>
        <li><Typography variant="h4">Customer Redirection for New Customers</Typography></li>
        <li><Typography variant="h4">AI-Powered Risk Mitigation and Data Gathering</Typography></li>
        <li><Typography variant="h4">Feedback Module for Continuous Improvement</Typography></li>
        <li><Typography variant="h4">Cost-Effective and Deployable to Rural Branches</Typography></li>
      </ul>
    </div>
    <Typography variant="h3" style={{ color: "#634647", marginTop: "2rem" }}>Real-Life Use Case: Vatsalya’s Interaction with the System</Typography>
    <div style={{ width: "100%" }}>
      <Typography><strong>Scenario 1: Existing Customer (Vatsalya)</strong></Typography>
      <ul>
        <li><Typography variant="h4">Vatsalya is an existing customer of the Union Bank Of India and needs assistance with a loan query. He opens the mobile banking app of Union Bank, Vyom and is prompted by the Union Bank’s Chatbot UVA to record a short video explaining his question.</Typography></li>
        <li><Typography variant="h4">The facial recognition system authenticates his identity using the facial model stored in the app, along with his Aadhaar-based authentication.</Typography></li>
        <li><Typography variant="h4">The system creates a service ticket and pulls an analytical snapshot of Vatsalya’s financial profile, highlighting his credit score, previous loan applications, and spending habits. Based on this data, the system suggests a loan option with the relevant details.</Typography></li>
        <li><Typography variant="h4">Vatsalya receives an appointment confirmation for a video call with a customer service representative to discuss the loan options further.</Typography></li>
      </ul>
    </div>
    <div style={{ width: "100%" }}>
      <Typography><strong>Scenario 2: New Customer</strong></Typography>
      <ul>
        <li><Typography variant="h4">A new customer, Ravi, downloads the Union Bank Of India’s mobile app Vyom and begins the onboarding process. He uploads his Aadhaar and PAN card details.</Typography></li>
        <li><Typography variant="h4">The system fetches information from these records, assesses Ravi’s financial background, and routes him to the loan department because his profile indicates he is interested in a housing loan.</Typography></li>
        <li><Typography variant="h4">Ravi’s service ticket is generated with an analytical snapshot that includes his credit score, income, and potential eligibility for various loan options.</Typography></li>
        <li><Typography variant="h4">Ravi is then directed to the loan officer, who receives the ticket with personalized suggestions for Ravi based on the data.</Typography></li>
      </ul>
    </div>
    <Typography variant="h2" style={{ color: "#634647" }}>Expected Solution:</Typography>
    <ul>
      <li><Typography variant="h4">The solution should integrate a face training model within the Union bank of India’s mobile app Vyom for fraud prevention, utilizing AADHAAR-based authentication to verify customer identities and enable edge processing. This will ensure secure transactions and minimize identity fraud risks, even in remote areas.</Typography></li>
      <li><Typography variant="h4">A feedback module should generate AI-driven suggestions for branches and staff, analyzing customer interactions and transaction patterns to enhance service quality and deriving actionable insights for better customer service and resource allocation.</Typography></li>
    </ul>
  </div>
);

const ProblemStatement2 = () => (
  <div>
    <Typography>
      Many times, it is observed that not all domain registrars or hosting providers are cooperative when it comes to requests for phishing domain takedowns, especially if they operate in jurisdictions where state actors or threat actors benefit from relaxed cybersecurity laws. Public Sector Banks (PSBs) in India face significant challenges in the timely takedown of suspicious, malicious, or phishing domains impersonating their entities.
    </Typography>
    <Typography>
      In several instances, third-party takedown service providers have been unable to successfully remove such phishing domains or fraudulent applications. Furthermore, there is an absence of a well-defined, centralized mechanism provided by any authority to address these issues. Specifically, difficulties arise in identifying a single point of contact or department responsible for handling such cases, as well as a lack of clear guidelines on how to proceed with these requests.
    </Typography>
    <Typography>
      This often leads to delays in resolving these threats, potentially compromising the security of customers.
    </Typography>
    <Typography variant="h2" style={{ color: "#634647" }}>Example Scenario: Arnav’s Challenge</Typography>
    <Typography>
      Arnav, a cybersecurity specialist at a Union Bank Of India, discovers a phishing website impersonating their bank. The fraudulent website is collecting sensitive customer information, posing a significant threat. Despite contacting third-party takedown service providers, the domain remains active due to non-cooperation from the registrar, located in a jurisdiction with lax cybersecurity regulations. This delay risks exposing customer data and eroding trust in the institution.
    </Typography>
    <Typography variant="h2" style={{ color: "#634647" }}>Expected Solution:</Typography>
    <ul>
      <li>
        <Typography variant="h3">Streamlined Takedown Processes:</Typography>
        <ul>
          <li>A clear and efficient mechanism for reporting phishing domains and fraudulent applications to the right stakeholders.</li>
          <li>Templates or guidelines for PSBs to escalate and follow up on takedown requests from the appropriate Government authority.</li>
        </ul>
      </li>
      <li>
        <Typography variant="h3">Centralized Coordination:</Typography>
        <ul>
          <li>A centralized platform or framework to ensure coordination among banks, government, cybersecurity experts, and service providers.</li>
          <li>Efficient coordination facilitation between the right department and the Bank.</li>
          <li>Mechanisms to overcome jurisdictional challenges and non-cooperative registrars.</li>
        </ul>
      </li>
    </ul>
  </div>
);

const ProblemStatement3 = ({ isMobile }) => (
  <div>
    <Typography>
      With the rise of digital banking, financial institutions face an increasing threat of financial crimes like money laundering and fraud. This document explores how Generative AI (GenAI) can help address these challenges through large-scale data analysis to provide real-time, actionable insights. Hypothetical use cases involving individuals like Naman and Arnav illustrate practical applications.
    </Typography>
    <div style={{ width: "100%" }}>
      <div style={{ paddingLeft: "3px" }}>
        <Typography variant={isMobile ? "h3" : "h2"} style={{ color: "#634647", letterSpacing: "3px" }}>
          Financial Institutions Struggle With:
        </Typography>
      </div>
      <ul>
        <li><Typography variant="h3">Customer profiling and onboarding</Typography></li>
        <li><Typography variant="h3">Complex transaction networks</Typography></li>
        <li><Typography variant="h3">Cross-border transactions</Typography></li>
        <li><Typography variant="h3">Short lifespan fraudulent accounts</Typography></li>
        <li><Typography variant="h3">High false-positive rates in fraud detection</Typography></li>
        <li><Typography variant="h3">Advanced evasion techniques by fraudsters</Typography></li>
        <li><Typography variant="h3">Customer analysis</Typography></li>
        <li><Typography variant="h3">Insider threats / fraud detection</Typography></li>
      </ul>
    </div>
    <Typography variant="h2" style={{ color: "#634647" }}>Real-Life Example: Naman’s Journey</Typography>
    <Typography><strong>Scenario 1: Fraudulent Activity Detection:</strong> Naman receives a large sum from an unfamiliar account, and subsequent international transactions are flagged as "smurfing" (money laundering), freezing the account for review.</Typography>
    <Typography><strong>Scenario 2: Personalized Services:</strong> GenAI notices Naman’s frequent foreign transactions and recommends a travel-friendly credit card.</Typography>
    <Typography><strong>Scenario 3: Insider Threat Prevention:</strong> GenAI detects unauthorized access to Naman’s transaction history by an employee and alerts the compliance team.</Typography>
    <Typography variant="h2" style={{ color: "#634647" }}>Expected Solution:</Typography>
    <ul>
      <li>
        <Typography variant="h3">Customer Analytics:</Typography>
        <ul>
          <li><Typography>Analyzing Customer Behavior: GenAI identifies unusual spending patterns.</Typography></li>
          <li><Typography>Predicting Banking Trends: GenAI forecasts emerging trends by analyzing real-time data.</Typography></li>
          <li><Typography>Personalized Services: GenAI tailors services to customers based on financial habits.</Typography></li>
        </ul>
      </li>
      <li>
        <Typography variant="h3">Insider Threats and Fraud Detection:</Typography>
        <ul>
          <li><Typography>Identifying Anomalies: GenAI flags deviations in user activity.</Typography></li>
          <li><Typography>Recognizing Fraud Patterns: GenAI detects sophisticated fraud patterns.</Typography></li>
          <li><Typography>Detecting Insider Threats: GenAI monitors employee actions to identify malicious activities.</Typography></li>
        </ul>
      </li>
      <li>
        <Typography variant="h3">Customer Profiling and Onboarding:</Typography>
        <ul>
          <li><Typography>Implement AI-driven identity verification models for dynamic customer profiling, ensuring accurate risk assessments.</Typography></li>
          <li><Typography>Simplify onboarding by utilizing AADHAAR-based authentication and real-time data processing for seamless registration while complying with regulatory requirements.</Typography></li>
        </ul>
      </li>
      <li>
        <Typography variant="h3">Complex Transaction Networks:</Typography>
        <ul>
          <li><Typography>Use AI-powered transaction monitoring to analyze large-scale transaction networks and detect unusual patterns or fraudulent activities in real time.</Typography></li>
          <li><Typography>Implement pattern recognition techniques to identify suspicious cross-network transactions and trigger alerts for further investigation.</Typography></li>
        </ul>
      </li>
      <li>
        <Typography variant="h3">Cross-border Transactions:</Typography>
        <ul>
          <li><Typography>Apply GenAI models to flag cross-border transactions that deviate from usual patterns or involve high-risk countries.</Typography></li>
          <li><Typography>Introduce transaction profiling to better detect money laundering or other illegal activities involving international payments.</Typography></li>
        </ul>
      </li>
      <li>
        <Typography variant="h3">Short Lifespan Fraudulent Accounts:</Typography>
        <ul>
          <li><Typography>Deploy AI-based algorithms to detect rapid account creation, usage, and closure cycles, which are common in fraudulent activity.</Typography></li>
          <li><Typography>Monitor accounts for abnormal behavior to flag and block potential fraud before accounts are deactivated.</Typography></li>
        </ul>
      </li>
      <li>
        <Typography variant="h3">High False-Positive Rates in Fraud Detection:</Typography>
        <ul>
          <li><Typography>Integrate machine learning models that learn from historical data to refine fraud detection algorithms, reducing false-positive rates.</Typography></li>
          <li><Typography>Develop context-aware systems that distinguish legitimate transactions from fraudulent ones based on customer profiles and historical activity.</Typography></li>
        </ul>
      </li>
      <li>
        <Typography variant="h3">Advanced Evasion Techniques by Fraudsters:</Typography>
        <ul>
          <li><Typography>Use adaptive AI models capable of identifying evolving fraud tactics, including obfuscated transactions and synthetic identities.</Typography></li>
          <li><Typography>Continuously update the fraud detection system with new data to counter advanced evasion techniques and fraudster methods.</Typography></li>
        </ul>
      </li>
    </ul>
  </div>
);

export default function ProblemStatements() {
  const isMobile = useMediaQuery("(max-width:500px)");

  const data = [
    {
      title: "Business Analytics-Based Appointment Management System for Efficient Customer Service",
      description: "Design and implement a facial recognition system to streamline customer service queries.",
      fullContent: <ProblemStatement1 />,
    },
    {
      title: "Need for Government Agencies Assistance for takedown of Malicious/Phishing domain",
      description: "Challenges in phishing domain takedowns and expected solutions.",
      fullContent: <ProblemStatement2 />,
    },
    {
      title: "Leveraging GenAI for Customer Analytics and Fraud Detection in Banking",
      description: "Using GenAI for customer profiling, fraud detection, and insights.",
      fullContent: <ProblemStatement3 isMobile={isMobile} />,
    },
  ];

  const imgList = [fintech, cybersecurity, genai];

  return (
    <Container id="ps" maxWidth="xl">
      <Typography
        variant={isMobile ? "h3" : "h3"}
        align="left"
        sx={{
          fontWeight: 500,
          mt: { xs: 6, md: 8 },
          mb: { xs: 2, md: 3 },
          color: "text.primary",
        }}
      >
        Problem Statements
      </Typography>
      <Box
        display="flex"
        justifyContent="space-between"
        gap="2rem"
        marginX="-1.5rem"
        padding="1rem"
        paddingX="2.5rem"
      >
        <img
          src={fintech}
          alt="Fintech"
          width="20%"
          style={{ borderRadius: 60 }}
        />
        <Box>
          <Typography
            variant="h4"
            align="right"
            color="secondary"
            sx={{ fontWeight: 500 }}
          >
            Customer Service and Identity Certification
          </Typography>
          <Typography variant="h5" align="right" sx={{ fontWeight: 500 }}>
            Business Analytics-Based Appointment Management System for Efficient
            Customer Service
          </Typography>
          <Typography variant="h6" align="right" marginTop="2rem">
            Design and implement a facial recognition system to streamline
            customer service queries.
          </Typography>
        </Box>
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        flexDirection="row-reverse"
        gap="2rem"
        marginX="-1.5rem"
        padding="1rem"
        paddingX="2.5rem"
        sx={{
          backgroundColor: "background.main",
        }}
      >
        <img
          src={cybersecurity}
          alt="Fintech"
          width="20%"
          style={{ borderRadius: 60 }}
        />
        <Typography variant="h4" align="left" sx={{ fontWeight: 500 }}>
          Cybersecurity
        </Typography>
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        gap="2rem"
        marginX="-1.5rem"
        padding="1rem"
        paddingX="2.5rem"
      >
        <img
          src={genai}
          alt="Fintech"
          width="20%"
          style={{ borderRadius: 60 }}
        />
        <Typography variant="h4" align="left" sx={{ fontWeight: 500 }}>
          GenAI
        </Typography>
      </Box>
    </Container>
  );
}
