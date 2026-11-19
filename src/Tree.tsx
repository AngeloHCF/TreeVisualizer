import { hierarchy, tree } from "d3-hierarchy";

import type { TreeNode } from "./treeData";

interface TreeProps {
  root: TreeNode | null;
}

const Tree = ({ root }: TreeProps) => {

  if (!root) return null;

  // Convert into a D3 hierarchy
  const hierarchyRoot = hierarchy(root, (node) =>
    [node.left, node.right].filter(
      (child): child is TreeNode => child !== null
    )
  );

  // Calculate coordinates for each node
  const labelLength = Math.max(...hierarchyRoot.descendants().map((node) => String(node.data.val ?? "null").length));
  const radius = Math.max(24, labelLength * 4.5 + 10);
  const layout = tree<TreeNode>().nodeSize([radius * 2 + 24, radius * 2 + 56]);
  const positionedRoot = layout(hierarchyRoot);
  const nodes = positionedRoot.descendants();
  const minX = Math.min(...nodes.map((node) => node.x));
  const maxX = Math.max(...nodes.map((node) => node.x));
  const padding = radius + 24;
  const width = maxX - minX + padding * 2;
  const height = Math.max(...nodes.map((node) => node.y)) + padding * 2;

  return (
    <div className="tree-canvas" tabIndex={0} aria-label="Scrollable tree visualization">
    <svg viewBox={`${minX - padding} ${-padding} ${width} ${height}`} width={width} height={height} role="img" aria-label="Binary tree with labeled nodes and null children">
      {/* Draw connecting edges */}
      {positionedRoot.links().map((link, i) => (
        <line
          key={i}
          x1={link.source.x}
          y1={link.source.y}
          x2={link.target.x}
          y2={link.target.y}
          stroke="gray"
          strokeWidth={2}
        />
      ))}

      {/* Draw nodes */}
      {positionedRoot.descendants().map((node, i) => (
        <g
          key={i}
          transform={`translate(${node.x}, ${node.y})`}
        >
          <circle r={node.data.val === null ? 24 : radius} fill={node.data.val === null ? "#334155" : "#2563eb"} stroke={node.data.val === null ? "#94a3b8" : "#60a5fa"} />

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
    </div>
  );
};

export default Tree;
