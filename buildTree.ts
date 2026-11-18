interface TreeNode {
  val: number;
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
    if (values[i] !== null) {
      const left: TreeNode = {
        val: values[i]!,
        left: null,
        right: null,
      };

      current.left = left;
      queue.push(left);
    }

    i++;

    // Right child
    if (i < values.length && values[i] !== null) {
      const right: TreeNode = {
        val: values[i]!,
        left: null,
        right: null,
      };

      current.right = right;
      queue.push(right);
    }

    i++;
  }

  return root;
}

export default buildTree;