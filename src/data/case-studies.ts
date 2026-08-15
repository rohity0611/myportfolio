import { CaseStudy } from "@/types";

export const caseStudies: CaseStudy[] = [
  {
    slug: "finance-data-validation-discrepancy",
    title: "Finance Data Validation Discrepancy",
    project: "Finance Dashboard Platform",
    overview:
      "Discovered a critical data discrepancy in the financial reporting dashboard where monthly revenue figures did not match the source SAP data, potentially impacting business decisions.",
    businessContext:
      "The finance dashboard provided real-time visibility into revenue, expenses, and profitability metrics for executive decision-making. Inaccurate data could lead to misinformed strategic decisions.",
    testingScope:
      "Revenue reporting module, monthly aggregation logic, currency conversion handling, and data synchronization between SAP and the dashboard.",
    problem:
      "Monthly revenue figures displayed on the dashboard were consistently 2-3% higher than the corresponding SAP reports. The discrepancy was not random but systematic, suggesting a logic issue rather than data corruption.",
    investigation:
      "Compared dashboard outputs with SAP source data line by line. Identified that the discrepancy occurred specifically in transactions involving multi-currency conversions. Traced the data flow from SAP extraction through transformation layers to dashboard display.",
    testingApproach:
      "Applied boundary value analysis on currency conversion rates. Tested with single-currency and multi-currency transaction sets. Validated calculation logic at each transformation step. Created test data sets covering edge cases in exchange rate handling.",
    rootCause:
      "The currency conversion function was applying the exchange rate at the transaction level rather than the aggregation level, causing cumulative rounding differences that compounded across monthly totals.",
    bug: {
      severity: "High",
      priority: "P1",
      environment: "Staging",
      module: "Revenue Reporting",
      issue: "Systematic revenue overstatement due to currency conversion timing",
      impact:
        "Executive dashboard showing inflated monthly revenue figures affecting financial decisions",
      expectedResult:
        "Monthly revenue figures matching SAP source data within acceptable rounding tolerance",
      actualResult: "Dashboard showing 2-3% higher revenue than SAP source reports",
      rootCause: "Currency conversion applied at transaction level instead of aggregation level",
      status: "Resolved",
    },
    resolution:
      "Development team modified the currency conversion logic to apply exchange rates at the aggregation level. Updated the transformation pipeline to handle multi-currency transactions consistently with SAP's calculation methodology.",
    validation:
      "Verified fix against 6 months of historical data. Tested with 50+ multi-currency transaction scenarios. Confirmed dashboard figures now match SAP reports within rounding tolerance. Regression tested related financial metrics.",
    outcome:
      "Dashboard accuracy restored. Established ongoing data reconciliation checks between SAP and dashboard. Created automated validation scripts for monthly data integrity verification.",
  },
  {
    slug: "cross-platform-ui-consistency",
    title: "Cross-Platform UI Consistency Issue",
    project: "Ed-Tech Platform Quality Assurance",
    overview:
      "Identified inconsistent UI behavior across different browsers and devices that affected user experience and data presentation on the learning platform.",
    businessContext:
      "The platform served millions of learners across diverse devices and browsers. UI inconsistencies could confuse users and impact learning outcomes, particularly during assessments and content consumption.",
    testingScope:
      "Content rendering across Chrome, Firefox, Safari, and Edge. Responsive behavior on desktop, tablet, and mobile viewports. Interactive elements including forms, navigation, and media players.",
    problem:
      "Certain interactive elements (form submissions, progress indicators, and navigation menus) behaved inconsistently across browsers. On mobile Safari, form validation messages were cut off. On Firefox, progress bar animations were janky.",
    investigation:
      "Systematic cross-browser testing using BrowserStack. Reproduced each issue with specific browser versions. Analyzed CSS rendering differences and JavaScript event handling variations. Documented device-specific quirks.",
    testingApproach:
      "Created a cross-browser test matrix covering 4 browsers × 3 viewport sizes. Used Playwright for automated visual regression testing. Manual testing for interaction-heavy flows. Screenshot comparison for layout validation.",
    rootCause:
      "CSS Grid layout handling differed between browsers. Safari had issues with specific flexbox configurations. Firefox's animation engine handled CSS transitions differently than Chromium-based browsers.",
    bug: {
      severity: "Medium",
      priority: "P2",
      environment: "Production",
      module: "UI Components",
      issue: "Inconsistent form validation and progress indicators across browsers",
      impact: "Users on Safari and Firefox experiencing degraded UI experience",
      expectedResult: "Consistent UI behavior across all supported browsers",
      actualResult: "Form messages cut off on Safari, janky animations on Firefox",
      rootCause: "CSS Grid and flexbox rendering differences between browser engines",
      status: "Resolved",
    },
    resolution:
      "Applied browser-specific CSS fixes using feature queries. Added fallback layouts for older browser engines. Updated animation implementations to use GPU-accelerated properties. Created a cross-browser compatibility guide for the development team.",
    validation:
      "Verified fixes across all target browsers and devices. Ran automated visual regression suite confirming no layout regressions. User testing on affected browsers confirmed improved experience.",
    outcome:
      "Consistent UI experience achieved across all supported platforms. Established automated cross-browser testing in the CI pipeline. Created a browser compatibility documentation for future development.",
  },
];
