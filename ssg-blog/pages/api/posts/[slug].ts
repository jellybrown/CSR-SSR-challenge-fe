import { FrontMatter } from 'lib/markdown';
import { getParsedFileContentBySlug, markdownToHtml } from 'lib';
import { NextApiRequest, NextApiResponse } from 'next';
import { join } from 'path';

type Data = {
  frontMatter: FrontMatter;
  html: string;
};

type Error = {
  error: string;
};

export const getPost = async (
  req: NextApiRequest,
  res: NextApiResponse<Data | Error>
) => {
  const slug = req.query.slug;

  if (!req.query || !slug) {
    res.status(500).json({ error: 'failed to load data' });
  }

  const markdonwContent = getParsedFileContentBySlug(
    slug as string,
    POSTS_PATH
  );
  const renderedHTML = await markdownToHtml(markdonwContent.content);

  res
    .status(200)
    .json({ frontMatter: markdonwContent.frontMatter, html: renderedHTML });
};

const POSTS_PATH = join(process.cwd(), '__posts');

export default getPost;
