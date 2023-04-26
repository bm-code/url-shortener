import { useRef, useState } from "react";
function App() {

  const API_URL = 'https://api.shrtco.de/v2/shorten?url=';

  const [shortedUrls, setShortedUrls] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState('');
  const inputRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    fetch(`${API_URL}${url}`)
      .then(res => {
        return res.json()
      })
      .then(data => {
        if (data.ok) {
          setLoading(false);
          setError(false);
          return setShortedUrls(data.result)
        } else {
          setError(true);
          setLoading(false);
          setShortedUrls([])
        }
      })
  }

  return (
    <>
      <h1>Introduce la url que quieres cortar</h1>
      <form onSubmit={handleSubmit}>
        <input required ref={inputRef} onChange={(event) => setUrl(event.target.value)} type="text" name="url" id="url" placeholder="Ejemplo: https://benimorales.com" />
        <button aria-busy={loading}>Acortar URL</button>
      </form>

      {error && <p>Introduce una URL válida</p>}

      {shortedUrls.length !== 0 &&

        <div className="shorted-urls">
          <ul>
            <li className="original-link">Original: <a href={shortedUrls.original_link} target="_blank">{shortedUrls.original_link}</a></li>
            <li className="shorted-link">Url acortada: <a href={`http://${shortedUrls.short_link}`} target="_blank">{shortedUrls.short_link}</a></li>
          </ul>
        </div>

      }

    </>
  )
}

export default App
