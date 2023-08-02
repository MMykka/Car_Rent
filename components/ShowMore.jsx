'use client';

import React from 'react'
import { useRouter } from 'next/navigation';
import { CustomButton } from '.';
import { updateSearchParams } from '@/utils';

const ShowMore = ({isNext, pageNumber}) => {

    const router = useRouter();

    const handleNavigation = () => {
        const newLimit = (pageNumber + 1 ) * 10;
        const newPathName = updateSearchParams('limit', `${newLimit}`);

        router.push(newPathName, {scroll:false})
    }
  return (
    <div className='w-full flex-center gap-5 mt-10'>
        {!isNext && (
            <CustomButton
                title='Show more'
                btnType={'button'}
                containerStyles={'bg-primary-blue rounded-full text-white'}
                handleClick={handleNavigation}
            />
        )}
    </div>
  )
}

export default ShowMore