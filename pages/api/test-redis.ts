import type { NextApiRequest, NextApiResponse } from 'next';
import redis from '../../utils/redis';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await redis.set('test_key', 'Hello, Redis!');
    const value = await redis.get('test_key');
    res.status(200).json({ value });
  } catch (error: any) {
    res.status(500).json({
      error: error.message || 'Internal server error'
    });
  }
};

export default handler;
export {}; // Ensures this file is treated as a module