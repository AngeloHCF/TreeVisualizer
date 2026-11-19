export interface TreeNode {
  val: number | null;
  left: TreeNode | null;
  right: TreeNode | null;
}

export function buildTree(values: (number | null)[]): TreeNode | null {
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

