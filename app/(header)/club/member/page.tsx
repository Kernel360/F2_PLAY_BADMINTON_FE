'use client';

import React, { useState } from 'react';
import OneMemberInfo from './OneMemberInfo';

function ClubMemberPage() {
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(
    null,
  );

  const toggleDropdown = (index: number) => {
    setOpenDropdownIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="h-[466px]">
      <div className="flex flex-col gap-4 h-full overflow-scroll">
        {/* TODO(iamgyu): key 값으로 mock data id 값 주기 */}
        {/* {Array.from({ length: 30 }, (_, index) => (
          <OneMemberInfo
            key={index}
            isOpen={openDropdownIndex === index}
            onToggle={() => toggleDropdown(index)}
          />
        ))} */}
      </div>
    </div>
  );
}

export default ClubMemberPage;
