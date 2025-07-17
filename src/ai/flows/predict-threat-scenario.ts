// predict-threat-scenario.ts
'use server';

/**
 * @fileOverview Predicts potential CBRN threat scenarios based on comprehensive environmental, facility, historical, and intelligence data.
 *
 * - predictThreatScenario - A function that predicts CBRN threat scenarios with detailed insights.
 * - PredictThreatScenarioInput - The input type for the predictThreatScenario function.
 * - PredictThreatScenarioOutput - The return type for the predictThreatScenario function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PredictThreatScenarioInputSchema = z.object({
  environmentalData: z
    .string()
    .describe(
      'Detailed environmental data: temperature (°C), humidity (%), wind speed (km/h) and direction, barometric pressure (hPa), ambient radiation (µSv/h), particulate matter (PM2.5 µg/m³, PM10 µg/m³), solar flare activity (e.g., none, moderate, high), and any other relevant atmospheric conditions.'
    ),
  facilityData: z
    .string()
    .describe(
      'Comprehensive facility data: key sensor readings (e.g., Reactor Core Temp: 315°C (Nominal), Coolant Flow Rate: 95% (Stable)), security system status (e.g., All Green, Sector B Alert), perimeter sensor logs (e.g., P-12B triggered 03:15 AM), network traffic analysis (e.g., Unusual outbound to IP 123.45.67.89), access logs (e.g., Unscheduled access to Control Room by UserX), status of redundant systems (e.g., Backup Generator: Online, Secondary Coolant: Standby), equipment maintenance logs and upcoming schedules.'
    ),
  historicalIncidentData: z
    .string()
    .describe(
      'Historical data on CBRN and other relevant incidents: dates, types of incidents (e.g., coolant leak, security breach, power failure), severity, root causes, resolution times, effectiveness of countermeasures deployed, and lessons learned.'
    ),
  intelligenceFeeds: z
    .string()
    .optional()
    .describe(
      'Unstructured intelligence information: news snippets related to facility type or region, alerts from government agencies, social media sentiment concerning the facility, or any other relevant external information that might indicate a potential threat (e.g., "Chatter on dark web forums mentioned facility XYZ vulnerabilities", "Credible source reports planned protest near facility on 2023-12-10").'
    ),
});
export type PredictThreatScenarioInput = z.infer<typeof PredictThreatScenarioInputSchema>;

const PredictThreatScenarioOutputSchema = z.object({
  threatLevel: z
    .enum(["low", "medium", "high", "critical", "unknown"])
    .describe(
      'The predicted overall threat level (low, medium, high, critical, unknown) based on the comprehensive analysis.'
    ),
  threatVector: z
    .string()
    .describe(
      'The primary nature or origin of the most probable threat (e.g., "Cyber-Physical Attack", "Insider Sabotage Attempt", "Cascading Equipment Failure", "Sophisticated External Intrusion", "Severe Environmental Hazard Impact", "Supply Chain Compromise").'
    ),
  potentialThreats: z
    .array(z.string())
    .describe('An array of specific potential CBRN or related threats identified by the system (e.g., "Radioactive material release due to coolant system failure", "Unauthorized access to critical control systems", "Chemical spill from compromised storage unit").'),
  impactAssessment: z
    .string()
    .describe(
      'A concise assessment of the potential consequences if the primary threat materializes (e.g., "Localized contamination in Sector Gamma, moderate risk to on-site personnel", "Facility-wide power disruption leading to operational halt", "Compromise of sensitive operational data and control systems").'
    ),
  earlyWarningIndicators: z
    .array(z.string())
    .describe('A list of specific data points from the input that are key indicators for the current threat prediction (e.g., "Correlation of rising coolant temperature with historical failure data for Pump XYZ", "Simultaneous perimeter sensor anomaly and network intrusion alert", "Anomalous access log entry for UserA during non-operational hours").'),
  recommendedActions: z
    .array(z.string())
    .describe(
      'A prioritized list of recommended actions to mitigate the identified threats (e.g., "Initiate emergency shutdown procedure for Sector Gamma", "Increase security patrols around West Perimeter", "Isolate affected network segment and begin forensic analysis", "Verify integrity of backup power systems immediately").'
    ),
  suggestedDataPointsToMonitor: z
    .array(z.string())
    .describe(
      'AI-suggested additional data points, sensors, or logs that should be closely monitored given the current prediction and identified indicators (e.g., "Continuously monitor vibration sensors on Pump XYZ", "Increase frequency of network traffic analysis from internal segments", "Review access logs for all critical systems in the last 24 hours").'
    ),
  confidenceScore: z
    .number()
    .min(0)
    .max(1)
    .describe(
      'A numerical score (0.0-1.0) indicating the confidence level of the overall threat prediction and assessment.'
    ),
  confidenceReasoning: z
    .string()
    .describe(
      "A brief explanation for the confidence score, highlighting factors that contribute to or detract from the prediction's certainty (e.g., 'High confidence due to strong correlation between multiple anomalous sensor readings and historical precedent. Intelligence feed data is currently uncorroborated, slightly tempering overall score.')."
    ),
});
export type PredictThreatScenarioOutput = z.infer<typeof PredictThreatScenarioOutputSchema>;

export async function predictThreatScenario(
  input: PredictThreatScenarioInput
): Promise<PredictThreatScenarioOutput> {
  return predictThreatScenarioFlow(input);
}

const prompt = ai.definePrompt({
  name: 'predictThreatScenarioPrompt',
  input: {schema: PredictThreatScenarioInputSchema},
  output: {schema: PredictThreatScenarioOutputSchema},
  prompt: `You are Sentinel Shield, an AI-powered CBRN threat prediction and analysis system for a high-security nuclear facility. Your role is to act as a seasoned security and operations analyst.
  
  Analyze the following comprehensive data streams meticulously:
  1. Environmental Data: {{{environmentalData}}}
  2. Facility & Sensor Data: {{{facilityData}}}
  3. Historical Incident Data: {{{historicalIncidentData}}}
  {{#if intelligenceFeeds}}
  4. Intelligence Feeds: {{{intelligenceFeeds}}}
  {{/if}}

  Based on your deep analysis, correlation of disparate data points, and identification of subtle anomalies, provide a structured threat assessment.
  
  Your output MUST be a valid JSON object adhering to the following structure and considerations:

  - threatLevel: Assess the overall threat to the facility. Categorize as 'low', 'medium', 'high', or 'critical'. Use 'unknown' if data is insufficient for a confident assessment.
  - threatVector: Identify the most probable primary origin or nature of the threat (e.g., "Cyber-Physical Attack", "Insider Sabotage Attempt", "Cascading Equipment Failure", "Sophisticated External Intrusion", "Severe Environmental Hazard Impact", "Supply Chain Compromise"). Be specific.
  - potentialThreats: List specific, plausible CBRN or related threat scenarios that could arise (e.g., "Radioactive material release due to coolant system failure", "Unauthorized access to critical control systems via network breach", "Chemical spill from compromised storage unit due to seismic activity").
  - impactAssessment: Briefly describe the potential primary consequences if the main identified threat materializes.
  - earlyWarningIndicators: Extract and list the specific data points or observations from the provided inputs that are the strongest indicators for your prediction. These should be direct evidence.
  - recommendedActions: Provide a prioritized list of actionable steps to mitigate or respond to the identified threats. Recommendations should be specific and practical for facility personnel.
  - suggestedDataPointsToMonitor: Based on your analysis, suggest additional specific sensors, logs, or data streams that security and operations personnel should now monitor with heightened scrutiny.
  - confidenceScore: Provide a numerical score between 0.0 and 1.0 representing your confidence in this overall assessment. 1.0 is highest confidence.
  - confidenceReasoning: Briefly explain the factors influencing your confidence score. What makes you confident? What are the uncertainties?

  Prioritize safety and security. Be analytical and thorough. Your insights are critical for preventing incidents. Ensure all fields in the output schema are populated.
  Return ONLY the valid JSON object.
  `,
});

const predictThreatScenarioFlow = ai.defineFlow(
  {
    name: 'predictThreatScenarioFlow',
    inputSchema: PredictThreatScenarioInputSchema,
    outputSchema: PredictThreatScenarioOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error("AI failed to generate a prediction.");
    }
    // Attempt to parse if the output is a stringified JSON, which sometimes happens.
    if (typeof output === 'string') {
      try {
        return JSON.parse(output) as PredictThreatScenarioOutput;
      } catch (e) {
        console.error("Failed to parse AI output string as JSON:", output);
        throw new Error("AI returned an invalid JSON string format.");
      }
    }
    return output;
  }
);
