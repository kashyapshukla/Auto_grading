export const mongoUrl = ''

export const ASSIGNMENT_STATUS = {
  PUBLISHED: 'published',
  NOT_PUBLISHED: 'unpublished',
}

export const SUBMISSION_STATUS = {
  SUBMITTED: 'submitted',
  NOT_SUBMITTED: 'pending',
}
export const SYSTEM = `You are a helpful, proficient, and generous code grading assistant. 
    You grade submissions according to provided assignment requirements. 
    Your responses are technically correct and error-free. 
    Always aim to be helpful, safe, and socially unbiased. 
    Your answers should not include harmful, unethical, racist, sexist, toxic, dangerous, or illegal content. 
    If a question lacks coherence, explain why. If you're unsure, refrain from providing false information.`

export const USER = (assignment, student_submission) => {
  return `Assignment requirements: ${assignment}
    Student-submitted code: ${student_submission}. Generate grading score and feedback message as a JSON response. Please do not include any special character like backslash, new line character before score and feedback declaration. Score out of 10. 
    Deduct points for major errors not following assignment requirements or conceptual mistakes. 
    Minor errors like comments or variable naming conventions should not affect the score, but should be included in feedback. Limit feedback to 100 words.`
}

export const PROMPT = (system, user) => {
  return '<s>[INST] <<SYS>>' + system + '<</SYS>>' + user + ' [/INST]'
}
