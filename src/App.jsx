import { useState } from 'react'
import OpenAI from 'openai';
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import './index.css'

function App() {
  const [api, setAPI] = useState("");
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("I'll choose my own!");
  const [custom, setCustom] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageURL, setImageURL] = useState("/RICK_AND_MORTY_PLACEHOLDER.png");

  const openai = new OpenAI({
    apiKey: `${api}`,
    dangerouslyAllowBrowser: true
  });

  const generateImage = async () => {
    setLoading((currentLoading) => !currentLoading);
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: `${prompt}. In the style of ${style === "I'll choose my own!" ? custom.toLowerCase() : style.toLowerCase()}`,
      n: 1,
      size: "1024x1024",
    });
    setImageURL(response.data[0].url);
    setLoading((currentLoading) => !currentLoading);
  }

  return (
    <div>
      <Navbar />
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Where to find your DALL·E 3 API key</h3>
          <div className="py-4">
            <ol className="list-decimal list-inside">
              <li>Create an account on OpenAI</li>
              <li>Navigate to "API Keys"</li>
              <li>Create new secret key (Keep this somewhere safe and secret!)</li>
              <li>Copy/paste your API key</li>
            </ol>
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
      <div className="grid grid-rows-2 md:grid-cols-12 md:grid-rows-1 place-items-center">
        <div className="form-control row-span-1 md:col-span-7">
          <div className="flex flex-col gap-1 my-2">
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text text-xs">Enter API key</span>
                <span className="alt-label">
                  <button className="link link-primary" onClick={() => document.getElementById('my_modal_1').showModal()}>
                    <svg width={12} xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                      <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                    </svg>
                  </button>
                </span>
              </div>
              <input type="password" placeholder="Use your imagination!" className="input input-bordered w-screen max-w-xs text-xs" onChange={(e) => setAPI(e.target.value)} />
            </label>
          </div>
          <div className="flex flex-col gap-1 my-2">
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text text-xs">Enter prompt</span>
                {loading ? <span className="loading loading-ball loading-sm text-accent"></span> : <span className="label-text text-xs alt-label"></span>}
              </div>
              <input type="text" placeholder="Use your imagination!" className="input input-bordered w-screen max-w-xs text-xs" onChange={(e) => setPrompt(e.target.value)} required />
            </label>
          </div>
          <div className="flex flex-col gap-1 my-2">
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text text-xs">Pick an illustration style</span>
              </div>
              <select className="select select-bordered select-primary text-xs" value={style} onChange={(e) => setStyle(e.target.value)} required>
                <option>I'll choose my own!</option>
                <option>3D render</option>
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
          <div className={`flex flex-col gap-1 my-2 ${style === "I'll choose my own!" ? "" : "hidden"}`}>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text text-xs">Enter illustration style</span>
              </div>
              <input type="text" placeholder="Anime, Medieval, Warol, etc" className="input input-bordered w-screen max-w-xs text-xs" onChange={(e) => setCustom(e.target.value)} />
            </label>
          </div>
          <div className="flex place-content-center my-2">
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
    </div >
  )
}

export default App