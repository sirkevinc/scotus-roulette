export const getFutureDate = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}

export const getRandomJudge = (judges) => {
  const randomNumber = Math.floor(Math.random() * judges.length);
  return judges[randomNumber];
}

export const randomizeParty = () => {
  const randomNumber = Math.random();
  if (randomNumber > 0.5) return "Republican";
  return "Democrat";
}

export const checkJudgeAge = (judge, currentYear) => {
  return Number(judge.date_dob.slice(0, 4));
}
