import { hierarchy, tree } from "d3-hierarchy";

interface TreeNode {
  val: number | null;
  left: TreeNode | null;
  right: TreeNode | null;
}

function buildTree(values: (number | null)[]): TreeNode | null {
  if (values.length === 0 || values[0] === null) {
    return null;
  }

  const root: TreeNode = {
    val: values[0],
    left: null,
    right: null,
  };

  const queue: TreeNode[] = [root];
  let i = 1;

  for (let head = 0; head < queue.length && i < values.length; head++) {
    const current = queue[head];

    // Left child
    if (i < values.length) {
      const left: TreeNode = {
        val: values[i]!,
        left: null,
        right: null,
      };

      current.left = left;
      if (left.val !== null) queue.push(left);
    }

    i++;

    // Right child
    if (i < values.length) {
      const right: TreeNode = {
        val: values[i]!,
        left: null,
        right: null,
      };

      current.right = right;
      if (right.val !== null) queue.push(right);
    }

    i++;
  }

  return root;
}

interface TreeProps {
  treeString: (number | null)[];
}

const Tree = ({ treeString }: TreeProps) => {
  const root = buildTree(treeString);

  if (!root) return null;

  // Convert into a D3 hierarchy
  const hierarchyRoot = hierarchy(root, (node) =>
    [node.left, node.right].filter(
      (child): child is TreeNode => child !== null
    )
  );

  // Calculate coordinates for each node
  const layout = tree<TreeNode>().size([600, 280]);
  const positionedRoot = layout(hierarchyRoot);

  return (
    <svg viewBox="0 0 680 360" width="100%">
      {/* Draw connecting edges */}
      {positionedRoot.links().map((link, i) => (
        <line
          key={i}
          x1={link.source.x + 40}
          y1={link.source.y + 40}
          x2={link.target.x + 40}
          y2={link.target.y + 40}
          stroke="gray"
          strokeWidth={2}
        />
      ))}

      {/* Draw nodes */}
      {positionedRoot.descendants().map((node, i) => (
        <g
          key={i}
          transform={`translate(${node.x + 40}, ${node.y + 40})`}
        >
          <circle r={20} fill={node.data.val === null ? "#64748b" : "#2563eb"} />

          <text
            textAnchor="middle"
            dominantBaseline="middle"
            fill="white"
            fontSize={14}
          >
            {node.data.val ?? "null"}
          </text>
        </g>
      ))}
    </svg>
  );
};

export default Tree;
