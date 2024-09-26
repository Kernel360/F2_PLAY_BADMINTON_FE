import { TabsContent } from '@/components/ui/Tabs';
import React from 'react';
import ClubHomePages from './intro/page';
import ClubLayout from './layout';
import ClubManagePage from './manage/page';

function ClubPages() {
  return (
    <ClubLayout>
      <TabsContent value="intro">
        <ClubHomePages />
      </TabsContent>
      <TabsContent value="manage">
        <ClubManagePage />
      </TabsContent>
    </ClubLayout>
  );
}

export default ClubPages;
