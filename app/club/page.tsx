import { TabsContent } from '@/components/ui/Tabs';
import React from 'react';
import ClubHomePages from './intro/page';
import ClubLayout from './layout';

function ClubPages() {
  return (
    <ClubLayout>
      <TabsContent value="intro">
        <ClubHomePages />
      </TabsContent>
    </ClubLayout>
  );
}

export default ClubPages;
