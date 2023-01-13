import axios from 'axios'
import { useEffect, useState } from 'react'


export const useFetch = async (url) => {

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    setLoading(true)
    setData(null)
    setError(false)
  
    const cancelToken = axios.CancelToken.source()
    const fetchData = async () => {
      try {
        const result = await axios.get(url, {cancelToken})
        setData(result.data)
        setLoading(false)
      } catch (error) {
        setError('Error fetching data')
        setLoading(false)
      }
    }
    fetchData()

    return(() => {
      cancelToken.cancel()
    })

  }, [url])



  return {data, loading, error}

}





