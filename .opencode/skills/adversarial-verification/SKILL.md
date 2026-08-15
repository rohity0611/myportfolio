---
name: adversarial-verification
description: "Use when independently verifying outputs from other agents"
risk: medium
source: factory
date_added: "2026-07-22"
---

# Adversarial Verification Skill

Independently verify outputs from other agents.

## When to Use
- After agent completes task
- Before phase transition
- When validating critical outputs
- When checking for errors

## Verification Protocol

### 1. Receive Output
- Get output from agent
- Get output schema
- Get verification criteria

### 2. Analyze Output
- Check schema compliance
- Check required fields
- Check data types
- Check constraints

### 3. Challenge Output
- Question assumptions
- Look for edge cases
- Check for errors
- Verify completeness

### 4. Validate Output
- Test with sample inputs
- Check boundary conditions
- Verify error handling
- Confirm expected behavior

### 5. Report Results
```json
{
  "verificationId": "unique-verification-id",
  "outputId": "output-being-verified",
  "verifier": "verifier-agent",
  "timestamp": "ISO-8601",
  "status": "passed|failed|partial",
  "findings": [
    {
      "type": "error|warning|info",
      "description": "finding description",
      "location": "location in output",
      "severity": "high|medium|low"
    }
  ],
  "recommendations": [
    {
      "type": "fix|improve|optimize",
      "description": "recommendation description",
      "priority": "high|medium|low"
    }
  ]
}
```

## Verification Criteria

### Schema Compliance
- All required fields present
- All data types correct
- All constraints satisfied

### Completeness
- All expected outputs present
- All edge cases handled
- All error conditions handled

### Correctness
- Logic is correct
- Calculations are accurate
- Assumptions are valid

### Security
- No security vulnerabilities
- No data exposure
- No injection risks

## Usage

After agent completion:
1. Receive output from agent
2. Analyze against verification criteria
3. Challenge assumptions and look for errors
4. Validate with sample inputs
5. Report findings and recommendations
