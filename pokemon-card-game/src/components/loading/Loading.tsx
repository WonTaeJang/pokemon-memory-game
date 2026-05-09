import loadingGif from '@/assets/loading.gif'
import './Loading.css'

const Loading = () => {
  return (
    <>
      {/* screen */}
      <section className="loading-screen">
        <img src={loadingGif} alt="loading" className="loading-gif" />
        <p className="loading-text">로딩중...</p>
      </section>
    </>
  )
}

export default Loading
