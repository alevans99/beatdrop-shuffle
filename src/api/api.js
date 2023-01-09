import axios from 'axios'

const dbApi = axios.create({
  baseURL: 'http://localhost:3000',
})

export const getHighScores = async () => {
  console.log('Fetching high scores')
  const {
    data: { scores },
  } = await dbApi.get('/scores')
  console.log('got scores ', scores)
  return scores
}