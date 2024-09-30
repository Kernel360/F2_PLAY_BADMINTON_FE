import React from 'react';
import OneMemberInfo from './OneMemberInfo';

function ClubMemberPage() {
  return (
    <div className="h-[466px]">
      <div className="flex flex-col gap-4 h-full overflow-scroll">
        {Array.from({ length: 30 }).map(() => (
          <OneMemberInfo key="id" />
        ))}
      </div>
    </div>
  );
}

export default ClubMemberPage;
