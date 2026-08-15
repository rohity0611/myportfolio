// Validate the small JSON Schema subset used by the framework metrics.

const TYPE_CHECKS = {
  array: (value) => Array.isArray(value),
  boolean: (value) => typeof value === "boolean",
  integer: (value) => Number.isInteger(value),
  null: (value) => value === null,
  number: (value) => typeof value === "number" && Number.isFinite(value),
  object: (value) => value !== null && typeof value === "object" && !Array.isArray(value),
  string: (value) => typeof value === "string"
};

// Validate one value against the schema and return human-readable errors.
export function validateSchemaValue(value, schema, path = "$") {
  const errors = [];

  if (schema.enum && !schema.enum.includes(value)) {
    errors.push(`${path} must be one of: ${schema.enum.join(", ")}`);
  }

  if (schema.type) {
    const types = Array.isArray(schema.type) ? schema.type : [schema.type];
    const matchesType = types.some((type) => TYPE_CHECKS[type]?.(value));

    if (!matchesType) {
      errors.push(`${path} must be of type: ${types.join(" | ")}`);
      return errors;
    }
  }

  if (TYPE_CHECKS.object(value)) {
    validateObject(value, schema, path, errors);
  }

  if (TYPE_CHECKS.array(value)) {
    validateArray(value, schema, path, errors);
  }

  if (TYPE_CHECKS.string(value)) {
    validateString(value, schema, path, errors);
  }

  if (TYPE_CHECKS.number(value) || TYPE_CHECKS.integer(value)) {
    validateNumber(value, schema, path, errors);
  }

  return errors;
}

// Validate required keys, named properties, and extra-property rules.
function validateObject(value, schema, path, errors) {
  const properties = schema.properties ?? {};
  const required = schema.required ?? [];

  for (const key of required) {
    if (!(key in value)) {
      errors.push(`${path}.${key} is required`);
    }
  }

  for (const [key, propertySchema] of Object.entries(properties)) {
    if (key in value) {
      errors.push(...validateSchemaValue(value[key], propertySchema, `${path}.${key}`));
    }
  }

  if (schema.additionalProperties === false) {
    for (const key of Object.keys(value)) {
      if (!(key in properties)) {
        errors.push(`${path}.${key} is not allowed`);
      }
    }
  }
}

// Validate list lengths and recursively validate items.
function validateArray(value, schema, path, errors) {
  if (typeof schema.minItems === "number" && value.length < schema.minItems) {
    errors.push(`${path} must contain at least ${schema.minItems} item(s)`);
  }

  if (schema.items) {
    value.forEach((item, index) => {
      errors.push(...validateSchemaValue(item, schema.items, `${path}[${index}]`));
    });
  }
}

// Validate string length and optional regex rules.
function validateString(value, schema, path, errors) {
  if (typeof schema.minLength === "number" && value.length < schema.minLength) {
    errors.push(`${path} must be at least ${schema.minLength} character(s)`);
  }

  if (schema.pattern && !(new RegExp(schema.pattern).test(value))) {
    errors.push(`${path} must match pattern ${schema.pattern}`);
  }
}

// Validate numeric ranges.
function validateNumber(value, schema, path, errors) {
  if (typeof schema.minimum === "number" && value < schema.minimum) {
    errors.push(`${path} must be >= ${schema.minimum}`);
  }

  if (typeof schema.maximum === "number" && value > schema.maximum) {
    errors.push(`${path} must be <= ${schema.maximum}`);
  }
}
