import RiseLogo from "./assets/rise-logo.png"
import Dashboard from "./dashboard-page"

function App() {
  return (
    <div className="min-h-screen w-full">
      <header className="w-full px-6 md:px-10 py-4 md:py-6 bg-white border-b border-[#EAECF0]">
        <div className="w-full max-w-[80rem] mx-auto">
          <img src={RiseLogo} alt="Risevest Technologies logo" />
        </div>
      </header>
      <main className="w-full px-6 md:px-10 py-8 md:py-10">
        <div className="w-full max-w-[80rem] mx-auto">
          <Dashboard />
        </div>
      </main>
    </div>
  )
}

export default App
