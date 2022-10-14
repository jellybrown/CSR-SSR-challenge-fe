import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import { VFileCompatible } from 'vfile';

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

  //let resultTag = String(result);
  //let converted = '';

  // if (imgTagRegex.test(resultTag)) {
  //   while (!imgTagRegex.test(resultTag)) {
  //     resultTag = convetImgTag(resultTag);
  //   }
  // }

  return String(result); // converted;
};

const srcRegex = /(?:<img src=")(http.*)"/;
const altRegex = /(?:<img[^"]+)" (?:alt=")([^"]+)"/;
const imgTagRegex = /<img src="([^>]+>)/g;

// 실패
const convetImgTag = (html: string) => {
  const srcResult = html.match(srcRegex);
  const altResult = html.match(altRegex);

  if (!srcResult || !altResult) {
    throw new Error('converImgTag error');
  }

  const src = srcResult[1];
  const alt = altResult[1];

  const nextImgTag = getNextImgTag(src, alt, 100);

  return html.replace(imgTagRegex, nextImgTag);
};

const getNextImgTag = (src: string, alt: string, size: number) => {
  return `<Image src="${src}" alt="${alt}" width={${size}} height={${size}} />;`;
};
