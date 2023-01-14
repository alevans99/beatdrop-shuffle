import axios from 'axios'

const dbApi = axios.create({
  baseURL: 'http://localhost:3000',
})

export const getRecordScores = async () => {
  console.log('Fetching high scores')
  const {
    data: { scores },
  } = await dbApi.get('/scores')
  console.log('got scores ', scores)
  return scores
}

export const postNewRecordScore = async (newScore, level) => {
  const {
    data: { updatedScores },
  } = await dbApi.post(`/scores/${level}`, {newScore})
  return updatedScores
}