import { buildTree, type TreeNode } from './treeData';

function parseNode(data: unknown): TreeNode {
  if (data === null) return { val: null, left: null, right: null };
  if (typeof data !== 'object' || Array.isArray(data)) {
    throw new Error('Each child must be a node object or null.');
  }
  const node = data as Record<string, unknown>;
  const value = 'value' in node ? node.value : node.val;
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    throw new Error('Each node needs a finite numeric value.');
  }
  return {
    val: value,
    left: parseNode(node.left === undefined ? null : node.left),
    right: parseNode(node.right === undefined ? null : node.right),
  };
}

export function parseTree(input: string): TreeNode | null {
  const text = input.trim();
  if (!text) return null;
  let data: unknown;
  try {
    data = JSON.parse(text.startsWith('{') || text.startsWith('[') || text === 'null' ? text : `[${text}]`);
  } catch {
    throw new Error('Enter valid JSON or a comma-separated list of numbers and null.');
  }
  if (data === null) return null;
  if (Array.isArray(data)) {
    if (!data.every((value) => value === null || (typeof value === 'number' && Number.isFinite(value)))) {
      throw new Error('Arrays may contain only numbers and null.');
    }
    return buildTree(data);
  }
  return parseNode(data);
}
