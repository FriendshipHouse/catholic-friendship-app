'use server';

import connectMongo from '@/lib/connectMongo';

function MongoDBProvider({ children }: RootProvider) {
  connectMongo();
  return children;
}

export default MongoDBProvider;
