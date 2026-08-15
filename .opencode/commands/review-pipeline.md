---
name: review-pipeline
description: "Execute multi-pass review pipeline on implementation"
---

# Review Pipeline

Execute multi-pass review pipeline on implementation.

## Usage

```
/review-pipeline <implementation path or description>
```

## What It Does

1. Runs 4-pass review pipeline
2. Pass 1: Spec compliance
3. Pass 2: Code quality
4. Pass 3: Security
5. Pass 4: Integration
6. Generates comprehensive report

## When to Use

- After implementation completion
- Before phase transition
- When validating critical outputs

## Example

```
/review-pipeline src/auth/middleware.ts
```

This will:
1. Run spec compliance review
2. Run code quality review
3. Run security review
4. Run integration review
5. Generate combined report
