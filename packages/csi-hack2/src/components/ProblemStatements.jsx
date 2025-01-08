import CloseIcon from "@mui/icons-material/Close";
import { Box, Grid, IconButton, Modal, Paper, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import React, { useState } from "react";

const ProblemStatement = ({ title, description, onClick }) => (
  <Paper
    elevation={3}
    sx={{
      width: { xs: "90%", sm: 450 },
      padding: 3,
      backgroundColor: "white",
      border: "2px solid red",
      borderRadius: 3,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 2,
      cursor: "pointer",
    }}
    onClick={onClick}
  >
    <Typography
      variant="h5"
      component="div"
      sx={{
        fontFamily: "'Bai Jamjuree', Helvetica",
        fontWeight: 600,
        color: "blue",
        textAlign: "center",
      }}
    >
      {title}
    </Typography>
    <Typography
      variant="body2"
      component="p"
      sx={{
        fontFamily: "'Bai Jamjuree', Helvetica",
        fontWeight: 400,
        color: "black",
        textAlign: "center",
      }}
    >
      {description}
    </Typography>
  </Paper>
);

const ProblemStatements = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [open, setOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    description: "",
  });

  const handleOpen = (title, description) => {
    setModalContent({ title, description });
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const problemDetails = [
    {
      title:
        "Business Analytics-Based Appointment Management System for Efficient Customer Service",
      description:
        "Design and implement a facial recognition system to streamline customer service queries.",
      fullContent: `<div style="width: 100%; height:auto; text-wrap: wrap;">
    <h2 style="color: red;">Business Analytics-Based Appointment Management System for Efficient Customer Service</h2>
</div>

        <h2 style='color: blue;'>Objective:</h2>
        <p>The goal is to design and implement a highly accurate facial recognition system that can authenticate and accept customer service queries via video/audio recordings and create appointments for customer support. The system should streamline the process for both new and existing customers, while enhancing security, fraud prevention, and customer experience. The solution needs to provide a service ticket with a detailed analytical snapshot of the customer's profile and direct customers to the right business unit based on their needs.</p>
        <h2 style='color: blue;'>Core Components of the Solution:</h2>
        <ul>
          <li>Facial Recognition Authentication</li>
          <li>Video/Audio Query Acceptance</li>
          <li>Service Ticket Creation</li>
          <li>Customer Redirection for New Customers</li>
          <li>AI-Powered Risk Mitigation and Data Gathering</li>
          <li>Feedback Module for Continuous Improvement</li>
          <li>Cost-Effective and Deployable to Rural Branches</li>
        </ul>
        <h2 style='color: blue;'>Real-Life Use Case: Vatsalya’s Interaction with the System</h2>
        <p><strong>Scenario 1: Existing Customer (Vatsalya)</strong></p>
        <ul>
          <li>Vatsalya is an existing customer of the Union Bank Of India and needs assistance with a loan query. He opens the mobile banking app of Union Bank, Vyom and is prompted by the Union Bank’s Chatbot UVA to record a short video explaining his question.</li>
          <li>The facial recognition system authenticates his identity using the facial model stored in the app, along with his Aadhaar-based authentication.</li>
          <li>The system creates a service ticket and pulls an analytical snapshot of Vatsalya’s financial profile, highlighting his credit score, previous loan applications, and spending habits. Based on this data, the system suggests a loan option with the relevant details.</li>
          <li>Vatsalya receives an appointment confirmation for a video call with a customer service representative to discuss the loan options further.</li>
        </ul>
        <p><strong>Scenario 2: New Customer</strong></p>
        <ul>
          <li>A new customer, Ravi, downloads the Union Bank Of India’s mobile app Vyom and begins the onboarding process. He uploads his Aadhaar and PAN card details.</li>
          <li>The system fetches information from these records, assesses Ravi’s financial background, and routes him to the loan department because his profile indicates he is interested in a housing loan.</li>
          <li>Ravi’s service ticket is generated with an analytical snapshot that includes his credit score, income, and potential eligibility for various loan options.</li>
          <li>Ravi is then directed to the loan officer, who receives the ticket with personalized suggestions for Ravi based on the data.</li>
        </ul>
        <h2 style='color: blue;'>Expected Solution:</h2>
        <ul>
          <li>The solution should integrate a face training model within the Union bank of India’s mobile app Vyom for fraud prevention, utilizing AADHAAR-based authentication to verify customer identities and enable edge processing. This will ensure secure transactions and minimize identity fraud risks, even in remote areas.</li>
          <li>A feedback module should generate AI-driven suggestions for branches and staff, analyzing customer interactions and transaction patterns to enhance service quality and deriving actionable insights for better customer service and resource allocation.</li>
        </ul>`,
    },
    {
      title: "Cybersecurity: Advanced Fraud Detection Mechanisms",
      description:
        "Challenges in phishing domain takedowns and expected solutions.",
      fullContent: `<h2 style='color: red;'>Cybersecurity: Advanced Fraud Detection Mechanisms - Phishing, Identity Theft, and Fraud Prevention</h2>
        <p>Many times, it is observed that not all domain registrars or hosting providers are cooperative when it comes to requests for phishing domain takedowns, especially if they operate in jurisdictions where state actors or threat actors benefit from relaxed cybersecurity laws. Public Sector Banks (PSBs) in India face significant challenges in the timely takedown of suspicious, malicious, or phishing domains impersonating their entities.</p>
        <p>In several instances, third-party takedown service providers have been unable to successfully remove such phishing domains or fraudulent applications. Furthermore, there is an absence of a well-defined, centralized mechanism provided by any authority to address these issues. Specifically, difficulties arise in identifying a single point of contact or department responsible for handling such cases, as well as a lack of clear guidelines on how to proceed with these requests.</p>
        <p>This often leads to delays in resolving these threats, potentially compromising the security of customers.</p>
        <h2 style='color: blue;'>Example Scenario: Arnav’s Challenge</h2>
        <p>Arnav, a cybersecurity specialist at a Union Bank Of India, discovers a phishing website impersonating their bank. The fraudulent website is collecting sensitive customer information, posing a significant threat. Despite contacting third-party takedown service providers, the domain remains active due to non-cooperation from the registrar, located in a jurisdiction with lax cybersecurity regulations. This delay risks exposing customer data and eroding trust in the institution.</p>
        <h2 style='color: blue;'>Expected Solution:</h2>
        <ul>
          <li>Streamlined Takedown Processes:
            <ul>
              <li>A clear and efficient mechanism for reporting phishing domains and fraudulent applications to the right stakeholders.</li>
              <li>Templates or guidelines for PSBs to escalate and follow up on takedown requests from the appropriate Government authority.</li>
            </ul>
          </li>
          <li>Centralized Coordination:
            <ul>
              <li>A centralized platform or framework to ensure coordination among banks, government, cybersecurity experts, and service providers.</li>
              <li>Efficient coordination facilitation between the right department and the Bank.</li>
              <li>Mechanisms to overcome jurisdictional challenges and non-cooperative registrars.</li>
            </ul>
          </li>
        </ul>`,
    },
    {
      title:
        "Leveraging GenAI for Customer Analytics and Fraud Detection in Banking",
      description:
        "Using GenAI for customer profiling, fraud detection, and insights.",
      fullContent: `<h2 style='color: red;'>Leveraging GenAI for Customer Analytics and Fraud Detection in Banking</h2>
        <p>With the rise of digital banking, financial institutions face an increasing threat of financial crimes like money laundering and fraud. This document explores how Generative AI (GenAI) can help address these challenges through large-scale data analysis to provide real-time, actionable insights. Hypothetical use cases involving individuals like Naman and Arnav illustrate practical applications.</p>
        <h2 style='color: blue;'>Financial Institutions Struggle With:</h2>
        <ul>
          <li>Customer profiling and onboarding</li>
          <li>Complex transaction networks</li>
          <li>Cross-border transactions</li>
          <li>Short lifespan fraudulent accounts</li>
          <li>High false-positive rates in fraud detection</li>
          <li>Advanced evasion techniques by fraudsters</li>
          <li>Customer analysis</li>
          <li>Insider threats / fraud detection</li>
        </ul>
        <h2 style='color: blue;'>Real-Life Example: Naman’s Journey</h2>
        <p><strong>Scenario 1: Fraudulent Activity Detection:</strong> Naman receives a large sum from an unfamiliar account, and subsequent international transactions are flagged as "smurfing" (money laundering), freezing the account for review.</p>
        <p><strong>Scenario 2: Personalized Services:</strong> GenAI notices Naman’s frequent foreign transactions and recommends a travel-friendly credit card.</p>
        <p><strong>Scenario 3: Insider Threat Prevention:</strong> GenAI detects unauthorized access to Naman’s transaction history by an employee and alerts the compliance team.</p>
        <h2 style='color: blue;'>Expected Solution:</h2>
        <ul>
          <li><strong>Customer Analytics:</strong>
            <ul>
              <li>Analyzing Customer Behavior: GenAI identifies unusual spending patterns.</li>
              <li>Predicting Banking Trends: GenAI forecasts emerging trends by analyzing real-time data.</li>
              <li>Personalized Services: GenAI tailors services to customers based on financial habits.</li>
            </ul>
          </li>
          <li><strong>Insider Threats and Fraud Detection:</strong>
            <ul>
              <li>Identifying Anomalies: GenAI flags deviations in user activity.</li>
              <li>Recognizing Fraud Patterns: GenAI detects sophisticated fraud patterns.</li>
              <li>Detecting Insider Threats: GenAI monitors employee actions to identify malicious activities.</li>
            </ul>
          </li>
          <li><strong>Customer Profiling and Onboarding:</strong>
            <ul>
              <li>Implement AI-driven identity verification models for dynamic customer profiling, ensuring accurate risk assessments.</li>
              <li>Simplify onboarding by utilizing AADHAAR-based authentication and real-time data processing for seamless registration while complying with regulatory requirements.</li>
            </ul>
          </li>
          <li><strong>Complex Transaction Networks:</strong>
            <ul>
              <li>Use AI-powered transaction monitoring to analyze large-scale transaction networks and detect unusual patterns or fraudulent activities in real time.</li>
              <li>Implement pattern recognition techniques to identify suspicious cross-network transactions and trigger alerts for further investigation.</li>
            </ul>
          </li>
          <li><strong>Cross-border Transactions:</strong>
            <ul>
              <li>Apply GenAI models to flag cross-border transactions that deviate from usual patterns or involve high-risk countries.</li>
              <li>Introduce transaction profiling to better detect money laundering or other illegal activities involving international payments.</li>
            </ul>
          </li>
          <li><strong>Short Lifespan Fraudulent Accounts:</strong>
            <ul>
              <li>Deploy AI-based algorithms to detect rapid account creation, usage, and closure cycles, which are common in fraudulent activity.</li>
              <li>Monitor accounts for abnormal behavior to flag and block potential fraud before accounts are deactivated.</li>
            </ul>
          </li>
          <li><strong>High False-Positive Rates in Fraud Detection:</strong>
            <ul>
              <li>Integrate machine learning models that learn from historical data to refine fraud detection algorithms, reducing false-positive rates.</li>
              <li>Develop context-aware systems that distinguish legitimate transactions from fraudulent ones based on customer profiles and historical activity.</li>
            </ul>
          </li>
          <li><strong>Advanced Evasion Techniques by Fraudsters:</strong>
            <ul>
              <li>Use adaptive AI models capable of identifying evolving fraud tactics, including obfuscated transactions and synthetic identities.</li>
              <li>Continuously update the fraud detection system with new data to counter advanced evasion techniques and fraudster methods.</li>
            </ul>
          </li>
        </ul>`,
    },
  ];

  const renderModal = () => (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%",
          maxWidth: 800,
          maxHeight: "80vh",
          bgcolor: "white",
          boxShadow: 24,
          borderRadius: 2,
          p: 4,
          overflow: "auto",
        }}
      >
        <IconButton
          onClick={handleClose}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: "orange",
          }}
        >
          <CloseIcon />
        </IconButton>
        <div dangerouslySetInnerHTML={{ __html: modalContent.description }} />
      </Box>
    </Modal>
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: 2,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontFamily: theme.typography.h4.fontFamily,
          fontWeight: "normal",
          color: "blue",
          marginBottom: 4,
          textAlign: "center",
        }}
      >
        PROBLEM STATEMENTS
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {problemDetails.map((problem, index) => (
          <Grid
            item
            key={index}
            xs={12}
            sm={6}
            md={4}
            display="flex"
            justifyContent="center"
          >
            <ProblemStatement
              title={problem.title}
              description={problem.description}
              onClick={() => handleOpen(problem.title, problem.fullContent)}
            />
          </Grid>
        ))}
      </Grid>
      {renderModal()}
    </Box>
  );
};

export default ProblemStatements;
