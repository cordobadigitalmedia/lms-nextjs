import type { BasePage, Page, TreeNode } from "./types";

export const buildTree = (
  pages: Page[],
): { tree: TreeNode[]; pages: BasePage[] } => {
  const nodeMap: Record<string, TreeNode> = {};
  const rootNodes: TreeNode[] = [];

  // Create all nodes and store them in a map
  pages.forEach((page) => {
    nodeMap[page.id] = {
      id: page.id,
      title: page.properties.Name.title[0].plain_text,
      slug: page.properties.Slug.formula.string,
      children: [],
    };
  });

  // Build the tree structure
  pages.forEach((page) => {
    const currentNode = nodeMap[page.id];
    if (page.properties["Parent item"].relation.length > 0) {
      const parentId = page.properties["Parent item"].relation[0].id;
      if (nodeMap[parentId]) {
        currentNode.slug = nodeMap[parentId].slug + "/" + currentNode.slug;
        nodeMap[parentId].children.push(currentNode);
      }
    } else {
      rootNodes.push(currentNode);
    }
  });

  const flatpages: BasePage[] = [];

  for (const value of Object.values(nodeMap)) {
    flatpages.push({ id: value.id, title: value.title, slug: value.slug });
  }

  return { tree: rootNodes, pages: flatpages };
};