export const getEnvVar = (name: string): string => {
  const value = process.env[name]

  if (!value) {
    throw new Error(`The environment variable ${name} has no value`)
  }

  return value
}
