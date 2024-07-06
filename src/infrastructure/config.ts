export const getEnvVar = (name: string): string => {
  const value = process.env[name]

  if (value === undefined) {
    throw new Error(`The environment variable ${name} has no value`)
  }

  return value
}
