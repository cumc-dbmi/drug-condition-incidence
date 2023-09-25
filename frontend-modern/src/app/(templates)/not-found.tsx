import React from 'react';
import { PageWrapper } from '@/app/_components/page.wrapper';
import { Card } from '@nextui-org/card';

export default function Custom404() {
  return (
    <PageWrapper>
      <main className='w-90 h-90 flex flex-col items-center gap-8 pt-8'>
        <Card className=' h-max w-full max-w-screen-xl p-16 text-center'>
          <div className='text-9xl'>404</div>
          <div className='text-3xl'>Page Not Found</div>
        </Card>
      </main>
    </PageWrapper>
  );
}
