const blankScoreObject = {}
for (let i = 0; i < 5; i++) {
  const levelScores = {}
  for (let i = 0; i < 5; i++) {
    levelScores[`${i + 1}`] = { score: 0, user: null, userId: null, timestamp: null }
  }
  blankScoreObject[`level${i + 1}`] = levelScores
}


export default blankScoreObject