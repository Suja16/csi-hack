import { Box, Typography, Container } from "@mui/material";
import CustomizedDialogs from "./ProbLemStatementCards";
import useMediaQuery from "@mui/material/useMediaQuery";
import fintech from "../assets/fintech.png";
import cybersecurity from "../assets/cybersecurity.png";
import genai from "../assets/genai.png";

export default function ProblemStatements() {
  const isMobile = useMediaQuery("(max-width:500px)");

  const data = [
    {
      title:
        "Need for Government Agencies Assistance for takedown of Malicious/Phishing domain:",
      majorArea: "CYBERSECURITY",
      subArea:
        "Advance Fraud Detection Mechanisms - Phishing, Identity Theft and Fraud Prevention",
      description:
        "Develop a centralized platform or API to facilitate collaboration between public and private entities for faster takedown of malicious domains:",
      fullContent: `
        <h2 style='color: #634647;'>Features:</h2>
        <ul>
          <li>Automated detection of phishing domains using AI and threat intelligence.</li>
          <li>Workflow to report malicious activity to the relevant government agency.</li>
          <li>Real-time updates on takedown progress.</li>
          <li>Integration with CERTs and domain registrars for seamless coordination.</li>
        </ul>
        <h2 style='color: #634647;'>Impact:</h2>
        <ul>
          <li>Reduce response times for domain takedowns.</li>
          <li>Enhance public trust by mitigating cybersecurity risks promptly.</li>
          <li>Support law enforcement in prosecuting cybercriminals.</li>
        </ul>
        <p>
          This use case emphasizes the critical role of government agencies in securing the digital ecosystem and provides an actionable roadmap for mitigating phishing and malicious domain threats.
        </p>
      `,
    },
    {
      title:
        "Business Analytics-Based Appointment Management System for Efficient Customer Service",
      majorArea: "FINTECH",
      subArea: "Customer Service and Identity Certification",
      description:
        "Design and implement a facial recognition system to streamline customer service queries.",
      fullContent: `
        <h3 style='color: #634647;'>Objective:</h3>
        <p>The goal is to design and implement a highly accurate facial recognition system that can authenticate and accept customer service queries via video/audio recordings and create appointments for customer support. The system should streamline the process for both new and existing customers, while enhancing security, fraud prevention, and customer experience. The solution needs to provide a service ticket with a detailed analytical snapshot of the customer's profile and direct customers to the right business unit based on their needs.</p>
        <h3 style='color: #634647;'>Core Components of the Solution:</h3>
        <ul>
          <li><p>Facial Recognition Authentication</p></li>
          <li><p>Video/Audio Query Acceptance</p></li>
          <li><p>Service Ticket Creation</p></li>
          <li><p>Customer Redirection for New Customers</p></li>
          <li><p>AI-Powered Risk Mitigation and Data Gathering</p></li>
          <li><p>Feedback Module for Continuous Improvement</p></li>
          <li><p>Cost-Effective and Deployable to Rural Branches</p></li>
        </ul>
        <h3 style='color: #634647; margin-top:2rem;'>Real-Life Use Case: Vatsalya’s Interaction with the System</h3>
        <p><strong>Scenario 1: Existing Customer (Vatsalya)</strong></p>
        <ul>
          <li><p>Vatsalya is an existing customer of the Union Bank Of India and needs assistance with a loan query. He opens the mobile banking app of Union Bank, Vyom and is prompted by the Union Bank’s Chatbot UVA to record a short video explaining his question.</p></li>
          <li><p>The facial recognition system authenticates his identity using the facial model stored in the app, along with his Aadhaar-based authentication.</p></li>
          <li><p>The system creates a service ticket and pulls an analytical snapshot of Vatsalya’s financial profile, highlighting his credit score, previous loan applications, and spending habits. Based on this data, the system suggests a loan option with the relevant details.</p></li>
          <li><p>Vatsalya receives an appointment confirmation for a video call with a customer service representative to discuss the loan options further.</p></li>
        </ul>
        <p><strong>Scenario 2: New Customer</strong></p>
        <ul>
          <li><p>A new customer, Ravi, downloads the Union Bank Of India’s mobile app Vyom and begins the onboarding process. He uploads his Aadhaar and PAN card details.</p></li>
          <li><p>The system fetches information from these records, assesses Ravi’s financial background, and routes him to the loan department because his profile indicates he is interested in a housing loan.</p></li>
          <li><p>Ravi’s service ticket is generated with an analytical snapshot that includes his credit score, income, and potential eligibility for various loan options.</p></li>
          <li><p>Ravi is then directed to the loan officer, who receives the ticket with personalized suggestions for Ravi based on the data.</p></li>
        </ul>
        <h2 style='color: #634647;'>Expected Solution:</h2>
        <ul>
          <li><p>The solution should integrate a face training model within the Union bank of India’s mobile app Vyom for fraud prevention, utilizing AADHAAR-based authentication to verify customer identities and enable edge processing. This will ensure secure transactions and minimize identity fraud risks, even in remote areas.</p></li>
          <li><p>A feedback module should generate AI-driven suggestions for branches and staff, analyzing customer interactions and transaction patterns to enhance service quality and deriving actionable insights for better customer service and resource allocation.</p></li>
        </ul>
      `,
    },
    {
      title:
        "Leveraging GenAI for Customer Analytics and Fraud Detection in Banking",
      majorArea: "GENERATIVE AI",
      subArea: "Customer analytics / Fraud detection using GenAI",
      description:
        "Using GenAI for customer profiling, fraud detection, and insights.",
      fullContent: `
        <p>With the rise of digital banking, financial institutions face an increasing threat of financial crimes like money laundering and fraud. This document explores how Generative AI (GenAI) can help address these challenges through large-scale data analysis to provide real-time, actionable insights. Hypothetical use cases involving individuals like Naman and Arnav illustrate practical applications.</p>
        <div style="padding-left:3px;">
        ${
          isMobile
            ? "<h3 style='color: #634647; letter-spacing: 3px;'>Financial Institutions Struggle With:</h3>"
            : "<h2 style='color: #634647; letter-spacing: 3px;'>Financial Institutions Struggle With:</h2>"
        }
        </div>
        <ul>
          <li><p>Customer profiling and onboarding</p></li>
          <li><p>Complex transaction networks</p></li>
          <li><p>Cross-border transactions</p></li>
          <li><p>Short lifespan fraudulent accounts</p></li>
          <li><p>High false-positive rates in fraud detection</p></li>
          <li><p>Advanced evasion techniques by fraudsters</p></li>
          <li><p>Customer analysis</p></li>
          <li><p>Insider threats / fraud detection</p></li>
        </ul>
        <h2 style='color: #634647;'>Real-Life Example: Naman’s Journey</h2>
        <p><strong>Scenario 1: Fraudulent Activity Detection:</strong> Naman receives a large sum from an unfamiliar account, and subsequent international transactions are flagged as "smurfing" (money laundering), freezing the account for review.</p>
        <p><strong>Scenario 2: Personalized Services:</strong> GenAI notices Naman’s frequent foreign transactions and recommends a travel-friendly credit card.</p>
        <p><strong>Scenario 3: Insider Threat Prevention:</strong> GenAI detects unauthorized access to Naman’s transaction history by an employee and alerts the compliance team.</p>
        <h2 style='color: #634647;'>Expected Solution:</h2>
        <ul>
          <li><h3>Customer Analytics:</h3>
            <ul>
              <li><p>Analyzing Customer Behavior: GenAI identifies unusual spending patterns.</p></li>
              <li><p>Predicting Banking Trends: GenAI forecasts emerging trends by analyzing real-time data.</p></li>
              <li><p>Personalized Services: GenAI tailors services to customers based on financial habits.</p></li>
            </ul>
          </li>
          <li><h3>Insider Threats and Fraud Detection:</h3>
            <ul>
              <li><p>Identifying Anomalies: GenAI flags deviations in user activity.</p></li>
              <li><p>Recognizing Fraud Patterns: GenAI detects sophisticated fraud patterns.</p></li>
              <li><p>Detecting Insider Threats: GenAI monitors employee actions to identify malicious activities.</p></li>
            </ul>
          </li>
          <li><h3>Customer Profiling and Onboarding:</h3>
            <ul>
              <li><p>Implement AI-driven identity verification models for dynamic customer profiling, ensuring accurate risk assessments.</p></li>
              <li><p>Simplify onboarding by utilizing AADHAAR-based authentication and real-time data processing for seamless registration while complying with regulatory requirements.</p></li>
            </ul>
          </li>
          <li><h3>Complex Transaction Networks:</h3>
            <ul>
              <li><p>Use AI-powered transaction monitoring to analyze large-scale transaction networks and detect unusual patterns or fraudulent activities in real time.</p></li>
              <li><p>Implement pattern recognition techniques to identify suspicious cross-network transactions and trigger alerts for further investigation.</p></li>
            </ul>
          </li>
          <li><h3>Cross-border Transactions:</h3>
            <ul>
              <li><p>Apply GenAI models to flag cross-border transactions that deviate from usual patterns or involve high-risk countries.</p></li>
              <li><p>Introduce transaction profiling to better detect money laundering or other illegal activities involving international payments.</p></li>
            </ul>
          </li>
          <li><h3>Short Lifespan Fraudulent Accounts:</h3>
            <ul>
              <li><p>Deploy AI-based algorithms to detect rapid account creation, usage, and closure cycles, which are common in fraudulent activity.</p></li>
              <li><p>Monitor accounts for abnormal behavior to flag and block potential fraud before accounts are deactivated.</p></li>
            </ul>
          </li>
          <li><h3>High False-Positive Rates in Fraud Detection:</h3>
            <ul>
              <li><p>Integrate machine learning models that learn from historical data to refine fraud detection algorithms, reducing false-positive rates.</p></li>
              <li><p>Develop context-aware systems that distinguish legitimate transactions from fraudulent ones based on customer profiles and historical activity.</p></li>
            </ul>
          </li>
          <li><h3>Advanced Evasion Techniques by Fraudsters:</h3>
            <ul>
              <li><p>Use adaptive AI models capable of identifying evolving fraud tactics, including obfuscated transactions and synthetic identities.</p></li>
              <li><p>Continuously update the fraud detection system with new data to counter advanced evasion techniques and fraudster methods.</p></li>
            </ul>
          </li>
        </ul>
      `,
    },
  ];

  const imgList = [cybersecurity, fintech, genai];

  return (
    <Container id="ps" maxWidth="xl">
      <Typography
        variant={isMobile ? "h3" : "h2"}
        align="center"
        sx={{
          fontWeight: 700,
          mb: { xs: 6, md: 8 },
          color: "text.primary",
        }}
      >
        Problem Statements
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          },
          gap: 4,
          justifyItems: "center",
          alignItems: "stretch",
        }}
      >
        {data.map((value, key) => (
          <CustomizedDialogs
            key={key}
            title={value.title}
            majorArea={value.majorArea}
            subArea={value.subArea}
            description={value.description}
            fullContent={value.fullContent}
            imgValue={imgList[key]}
          />
        ))}
      </Box>
    </Container>
  );
}
