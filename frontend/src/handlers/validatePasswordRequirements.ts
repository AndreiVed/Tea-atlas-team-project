//usage: dispatch(updatePasswordRequirements(this func(value)))

export const validatePasswordRequirements = (value: string) => {
  const letterMatches = value.match(/[A-Za-z]/g);

  return {
    isLettersTyped: letterMatches ? letterMatches.length >= 2 : false,
    isMinLength: value.length >= 8,
    isNumberTyped: /[0-9]/.test(value),
  };
}