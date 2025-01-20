import { useState } from 'react'
import { Routes, Route, createSearchParams, useSearchParams, useNavigate } from "react-router-dom"
import 'reactjs-popup/dist/index.css'
import { ENDPOINT, API_KEY } from './constants'
import Header from './components/Header'
import Movies from './components/Movies'
import Starred from './components/Starred'
import WatchLater from './components/WatchLater'
import MovieModal from './components/MovieModal'
import './app.scss'

const App = () => {
  
  const [searchParams, setSearchParams] = useSearchParams() 
  const searchQuery = searchParams.get('search')

  const [videoKey, setVideoKey] = useState()
  const [isOpen, setOpen] = useState(false)
  const navigate = useNavigate()

  const closeModal = () => setOpen(false)
  
  const closeCard = () => {

  }
  
  const searchMovies = (query) => {
    navigate('/')
    if (query !== '') {
      setSearchParams(createSearchParams({ search: query }))
    } else {
      setSearchParams()
    }
  }

  const viewTrailer = (movie) => {
    getMovie(movie.id)
    if (!videoKey) setOpen(true)
    setOpen(true)
  }

  const getMovie = async (id) => {
    const URL = `${ENDPOINT}/movie/${id}?api_key=${API_KEY}&append_to_response=videos`

    setVideoKey(null)
    const videoData = await fetch(URL)
      .then((response) => response.json())

    if (videoData.videos && videoData.videos.results.length) {
      const trailer = videoData.videos.results.find(vid => vid.type === 'Trailer')
      setVideoKey(trailer ? trailer.key : videoData.videos.results[0].key)
    }
  }

  return (
    <div className="App">

      <Header searchMovies={searchMovies} searchParams={searchParams} setSearchParams={setSearchParams} />

      <div className="container">
     
        <Routes>
          <Route path="/" element={<Movies searchQuery={searchQuery}viewTrailer={viewTrailer} closeCard={closeCard} />} />
          <Route path="/starred" element={<Starred viewTrailer={viewTrailer} />} />
          <Route path="/watch-later" element={<WatchLater viewTrailer={viewTrailer} />} />
          <Route path="*" element={<h1 className="not-found">Page Not Found</h1>} />
        </Routes>
      </div>

      <MovieModal  isOpen={isOpen} onClose={closeModal} videoKey={videoKey} />
    </div>
  )
}

export default App
