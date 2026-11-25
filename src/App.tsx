import { useRef, useState } from "react"
import Input from "./Input"

function App() {
  const [trees, setTrees] = useState([1])
  const nextTreeId = useRef(2)

  function addTree() {
    const id = nextTreeId.current++
    setTrees((current) => [...current, id])
  }

  return (
    <main className="app-shell">
      <header className="app-header">
        <h1>Binary Tree Visualizer</h1>
        <button className="add-tree-button" type="button" onClick={addTree}>
          <span aria-hidden="true">+</span> Add tree
        </button>
      </header>
      <div className="tree-grid">
        {trees.map((id) => (
          <section className="tree-card" key={id} aria-labelledby={`tree-title-${id}`}>
            <h2 id={`tree-title-${id}`}>Tree {id}</h2>
            <Input autoFocus={id !== 1} />
          </section>
        ))}
      </div>
    </main>
  )
}

export default App
