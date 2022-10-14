import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import { join } from 'path';

type Data = {
  titles: string[];
};

const getPostTitles = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const titles = fs
    .readdirSync(POSTS_PATH)
    .map((path) => path.replace(/\.md$/, ''));

  res.status(200).json({ titles });
};

const POSTS_PATH = join(process.cwd(), '__posts');

export default getPostTitles;
