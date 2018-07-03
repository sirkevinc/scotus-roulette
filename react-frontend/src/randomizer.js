export const getFutureDate = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}

export const getRandomJudge = (judges) => {
  const randomNumber = Math.floor(Math.random() * judges.length);
  return judges[randomNumber];
}

export const randomizeParty = () => {
  const randomNumber = Math.random();
  if (randomNumber > 0.5) {
    return "Democratic";
  }
  else {
    return "Republican";
  }
}

export const checkJudgeAge = (judge, currentYear) => {
  return currentYear - Number(judge.date_dob.slice(0, 4));
}

export const getRandomMessage = (messages, party) => {
  const i = Math.floor(Math.random() * 3)
  return messages[party][i];
}

export const getRandomIndex = (max) => {
  const randomNumber = Math.floor(Math.random() * (max - 1));
  return randomNumber;
}