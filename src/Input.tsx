import { useState } from 'react';
import Tree from './Tree';
import { parseTree } from './parseTree';

const Input = () => {
  const [input, setInput] = useState('');
  let root = null;
  let error = '';
  try {
    root = parseTree(input);
  } catch (cause) {
    error = cause instanceof Error ? cause.message : 'Unable to parse the tree.';
  }

  return (
    <div>
      <section className="input-panel">
        <label htmlFor="tree-input">Tree data</label>
        <p id="input-help">Paste nested JSON with value, left, and right, or a level-order array like [3, 2, 1, null, null].</p>
        <textarea
          id="tree-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={'{ "value": 3, "left": { "value": 2, "left": null, "right": null }, "right": null }'}
          rows={6}
          spellCheck={false}
          aria-describedby={error ? 'input-help input-error' : 'input-help'}
          aria-invalid={Boolean(error)}
        />
        {error && <p id="input-error" role="status" className="input-error">{error}</p>}
      </section>
      {root ? <Tree root={root} /> : !error && <p className="empty-state">Paste tree data above to visualize it.</p>}
    </div>
  );
};

export default Input;
