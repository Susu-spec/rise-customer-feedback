import RiseLogo from "./assets/rise-logo.png"
import Dashboard from "./dashboard-page"

function App() {
  return (
    <div className="min-h-screen w-full">
      <header className="w-full px-10 py-6 bg-white border-b border-[#EAECF0]">
        <img src={RiseLogo} alt="Risevest Technologies logo" />
      </header>
      <main className="w-full px-10 py-10 !mx-auto">
        <Dashboard />
      </main>
    </div>
  )
}

export default App
