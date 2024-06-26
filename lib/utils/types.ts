export interface Relation {
  id: string;
}

export interface Property {
  id: string;
  type: string;
  relation: Relation[];
  has_more: boolean;
}

export interface Title {
  href: string;
  plain_text: string;
  text: {
    content: string;
    link: null | string;
  };
}

export interface Properties {
  "Sub-item": Property;
  "Parent item": Property;
  Name: {
    id: string;
    type: string;
    title: Title[];
  };
  Slug: {
    formula: {
      string: string;
    };
  };
  type: {
    select: {
      name: ContentType;
    };
  };
}

export interface CourseItem {
  image: string;
  title: string;
  description: string;
  slug: string;
  available: boolean;
  database_id: string;
}

export interface Parent {
  type: string;
  database_id: string;
}

export interface Page {
  object: string;
  id: string;
  parent: Parent;
  properties: Properties;
  url: string;
  public_url: string | null;
}

export interface BasePage {
  id: string;
  title: string;
  slug: string;
  type: ContentType;
}

export type ContentType =
  | "assignment"
  | "video"
  | "journal"
  | "discussion"
  | "text quiz"
  | "mp quiz"
  | "rich media"
  | "learning plan"
  | "module"
  | "rich text"
  | "course overview";

export interface TreeNode {
  id: string;
  children: TreeNode[];
  title: string;
  slug: string;
  root_slug: string;
  type: ContentType;
}

export interface CoursePaths {
  course: string;
  lesson?: string[];
}

export interface ImageJson {
  [key: string]: string;
}

export interface DataJson {
  images: ImageJson[];
}
