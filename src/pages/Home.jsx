import { useNavigate } from "react-router-dom"

const Home = () => {

  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="font-bold text-3xl">Ini Home</h1>
      <div className="mt-4">
        <button className="p-2 bg-blue-500 rounded" onClick={() => navigate("/prodi")}>Prodi</button>
      </div>
    </div>
  )
}

export default Home