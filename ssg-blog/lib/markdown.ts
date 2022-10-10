import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import { VFileCompatible } from 'vfile'; // 이게뭐람

export interface FrontMatter {
  [prop: string]: string;
}

export interface MarkdownDocument {
  frontMatter: FrontMatter;
  content: string;
}

export interface MarkdonwRenderingResult {
  frontMatter: FrontMatter;
  html: string;
}

export const getParsedFileContentBySlug = (
  slug: string,
  postsPath: string
): MarkdownDocument => {
  const postFilePath = join(postsPath, `${slug}.md`);
  const fileContents = fs.readFileSync(postFilePath);

  const { data, content } = matter(fileContents);

  return {
    frontMatter: data,
    content,
  };
};

export const markdownToHtml = async (markdown: VFileCompatible) => {
  const result = await remark().use(remarkHtml).process(markdown);
  return String(result);
};
