import { useState } from 'react'
import Tree from './Tree'

const Input = () => {
  const [input, setInput] = useState('');

  const parseTree = (value: string): (number | null)[] => {
    return value
      .replace(/^\[|\]$/g, '')
      .split(',')
      .map((s) => {
        const trimmed = s.trim();

        if (trimmed === '' || trimmed === 'null') return null;

        const num = Number(trimmed);
        return Number.isFinite(num) ? num : null;
      });
  };

  const treeString = input.trim()
    ? parseTree(input)
    : [];

  return (
    <div>
      <section>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Example: [3, 2, 1, null, null]"
        />
      </section>

      <Tree treeString={treeString} />
    </div>
  );
};

export default Input;