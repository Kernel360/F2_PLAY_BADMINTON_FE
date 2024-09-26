import { TabsContent } from '@/components/ui/Tabs';
import React from 'react';
import ClubIntro from './intro/page';
import ClubLayout from './layout';

function ClubPages() {
  return (
    <ClubLayout>
      <TabsContent value="intro">
        <ClubIntro />
      </TabsContent>
    </ClubLayout>
  );
}

export default ClubPages;
