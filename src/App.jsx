import { useState } from 'react'
import OpenAI from 'openai';
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import './index.css'

function App() {
  const [prompt, setPrompt] = useState("");
  const [imageURL, setImageURL] = useState("/RICK_AND_MORTY_PLACEHOLDER.png");
  const [style, setStyle] = useState("3D render");
  const [loading, setLoading] = useState(false);

  const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPEN_AI_KEY,
    dangerouslyAllowBrowser: true
  });

  const generateImage = async () => {
    setLoading((currentLoading) => !currentLoading);
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: `${prompt} in the style of ${style.toLowerCase()}`,
      n: 1,
      size: "1024x1024",
    });
    setImageURL(response.data[0].url);
    setLoading((currentLoading) => !currentLoading);
  }

  return (
    <div>
      <Navbar />
      <div className="grid grid-rows-2 md:grid-cols-12 md:gap-4 md:grid-rows-none place-items-center">
        <div className="form-control row-span-1 md:col-span-7">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text text-xs">Enter prompt</span>
              {loading ? <span className="loading loading-dots loading-xs text-accent"></span> : <span className="label-text text-xs alt-label"></span>}
            </div>
            <input type="text" placeholder="Use your imagination!" className="input input-bordered w-screen max-w-xs text-xs" onChange={(e) => setPrompt(e.target.value)} />
          </label>
          <div className="flex flex-col gap-1 my-2">
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text text-xs">Pick an illustration style</span>
              </div>
              <select className="select select-bordered select-primary text-xs" value={style} onChange={(e) => setStyle(e.target.value)}>
                <option>3D render</option>
                <option>Anime</option>
                <option>Ballpoint pen art</option>
                <option>Baroque</option>
                <option>Charcoal sketch</option>
                <option>Corporate Memphis</option>
                <option>Cubism</option>
                <option>Cyberpunk</option>
                <option>Low Poly</option>
                <option>Pixar</option>
                <option>Pixel art</option>
                <option>Watercolor</option>
              </select>
            </label>
          </div>
          <div className="flex place-content-center">
            <button onClick={generateImage} className="btn btn-secondary">Generate</button>
          </div>
        </div>
        <div className="md:col-span-5">
          <a href={imageURL} target="_blank">
            <img className="object-cover" src={imageURL} alt={prompt} />
          </a>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default App
