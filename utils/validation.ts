export interface ValidationResult {
  isValid: boolean
  errors: string[]
}

export function validateName(name: string): ValidationResult {
  const errors: string[] = []
  const trimmedName = name.trim()

  if (!trimmedName) {
    errors.push("Name is required")
  } else if (trimmedName.length < 2) {
    errors.push("Name must be at least 2 characters long")
  } else if (trimmedName.length > 50) {
    errors.push("Name must be less than 50 characters")
  } else if (!/^[a-zA-Z\s'-]+$/.test(trimmedName)) {
    errors.push("Name can only contain letters, spaces, hyphens, and apostrophes")
  } else if (/^\s|\s$/.test(name)) {
    errors.push("Name cannot start or end with spaces")
  } else if (/\s{2,}/.test(trimmedName)) {
    errors.push("Name cannot contain multiple consecutive spaces")
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

export function validateEmail(email: string): ValidationResult {
  const errors: string[] = []
  const trimmedEmail = email.trim().toLowerCase()

  if (!trimmedEmail) {
    errors.push("Email address is required")
  } else {
    // Comprehensive email validation
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

    if (!emailRegex.test(trimmedEmail)) {
      if (!trimmedEmail.includes("@")) {
        errors.push("Email must contain an @ symbol")
      } else if (trimmedEmail.indexOf("@") !== trimmedEmail.lastIndexOf("@")) {
        errors.push("Email cannot contain multiple @ symbols")
      } else if (trimmedEmail.startsWith("@") || trimmedEmail.endsWith("@")) {
        errors.push("Email cannot start or end with @")
      } else if (!trimmedEmail.includes(".") || trimmedEmail.split("@")[1]?.indexOf(".") === -1) {
        errors.push("Email must contain a valid domain (e.g., example.com)")
      } else if (trimmedEmail.includes("..")) {
        errors.push("Email cannot contain consecutive dots")
      } else if (/[<>()[\]\\,;:\s@"]/.test(trimmedEmail.replace(/[.@]/g, ""))) {
        errors.push("Email contains invalid characters")
      } else {
        errors.push("Please enter a valid email address")
      }
    } else if (trimmedEmail.length > 254) {
      errors.push("Email address is too long (maximum 254 characters)")
    } else if (trimmedEmail.split("@")[0].length > 64) {
      errors.push("Email username part is too long (maximum 64 characters)")
    } else if (trimmedEmail.split("@")[1]?.length > 253) {
      errors.push("Email domain part is too long (maximum 253 characters)")
    }

    // Check for common typos in popular domains
    const domain = trimmedEmail.split("@")[1]
    const commonDomains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "icloud.com"]
    const typoSuggestions: { [key: string]: string } = {
      "gmial.com": "gmail.com",
      "gmai.com": "gmail.com",
      "yahooo.com": "yahoo.com",
      "yaho.com": "yahoo.com",
      "hotmial.com": "hotmail.com",
      "outlok.com": "outlook.com",
    }

    if (domain && typoSuggestions[domain]) {
      errors.push(`Did you mean ${trimmedEmail.replace(domain, typoSuggestions[domain])}?`)
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

export function validateMessage(message: string): ValidationResult {
  const errors: string[] = []
  const trimmedMessage = message.trim()

  if (!trimmedMessage) {
    errors.push("Message is required")
  } else if (trimmedMessage.length < 10) {
    errors.push("Message must be at least 10 characters long")
  } else if (trimmedMessage.length > 1000) {
    errors.push("Message must be less than 1000 characters")
  } else if (trimmedMessage.length < 20) {
    errors.push("Please provide more details about your project or inquiry")
  } else if (!/[a-zA-Z]/.test(trimmedMessage)) {
    errors.push("Message must contain at least some letters")
  } else if (/(.)\1{4,}/.test(trimmedMessage)) {
    errors.push("Message contains too many repeated characters")
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

export function validateForm(name: string, email: string, message: string) {
  const nameValidation = validateName(name)
  const emailValidation = validateEmail(email)
  const messageValidation = validateMessage(message)

  const allErrors = [...nameValidation.errors, ...emailValidation.errors, ...messageValidation.errors]

  return {
    isValid: nameValidation.isValid && emailValidation.isValid && messageValidation.isValid,
    errors: {
      name: nameValidation.errors,
      email: emailValidation.errors,
      message: messageValidation.errors,
    },
    firstError: allErrors[0] || null,
  }
}
