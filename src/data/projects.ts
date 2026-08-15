import { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "finance-dashboard-testing",
    name: "Finance Dashboard Platform",
    type: "Enterprise Web Application",
    role: "QA Engineer",
    technologies: ["SAP", "Excel", "Google Sheets", "SQL", "Jira"],
    testingAreas: [
      "Functional Testing",
      "Data Validation",
      "Regression Testing",
      "UAT Support",
      "Cross-browser Testing",
    ],
    shortDescription:
      "Quality assurance for digital finance dashboards providing real-time financial reporting and analytics for enterprise stakeholders.",
    keyContributions: [
      "Designed and executed test cases for financial data visualization dashboards",
      "Validated data accuracy across multiple integrated financial systems",
      "Performed end-to-end testing of reporting workflows from data ingestion to display",
      "Identified and documented data discrepancies in financial metrics",
      "Collaborated with development teams to resolve critical data integrity issues",
      "Created automated validation scripts for recurring data checks",
    ],
    featured: true,
  },
  {
    slug: "edtech-platform-qa",
    name: "Ed-Tech Platform Quality Assurance",
    type: "Consumer Web Application",
    role: "Quality Analyst",
    technologies: ["Web Testing", "API Testing", "Postman", "Jira", "Git"],
    testingAreas: [
      "Functional Testing",
      "API Integration Testing",
      "Regression Testing",
      "Performance Testing",
      "UI/UX Validation",
    ],
    shortDescription:
      "Comprehensive quality assurance for a large-scale ed-tech platform serving millions of learners across India.",
    keyContributions: [
      "Performed functional testing of user-facing features across web and mobile platforms",
      "Validated API integrations between frontend and backend services",
      "Conducted regression testing cycles for platform updates and feature releases",
      "Documented detailed bug reports with reproduction steps and severity classification",
      "Participated in sprint planning and quality review sessions",
      "Contributed to test case optimization reducing redundant test scenarios",
    ],
    featured: true,
  },
  {
    slug: "sap-integration-testing",
    name: "SAP S/4HANA Integration Testing",
    type: "Enterprise System",
    role: "QA Engineer",
    technologies: ["SAP S/4HANA", "SAP GUI", "ABAP", "SQL", "Excel"],
    testingAreas: [
      "Integration Testing",
      "Data Migration Testing",
      "Regression Testing",
      "System Validation",
      "Process Verification",
    ],
    shortDescription:
      "Quality assurance for SAP S/4HANA integration ensuring seamless data flow between enterprise systems.",
    keyContributions: [
      "Validated SAP S/4HANA module integrations and data flows",
      "Performed data migration testing ensuring accuracy during system transitions",
      "Created test scenarios for financial module workflows",
      "Verified data integrity across integrated enterprise systems",
      "Documented test results and defect reports for stakeholder review",
    ],
    featured: false,
  },
];
