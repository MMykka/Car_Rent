'use client';

import React, {useState} from 'react';
import Image from 'next/image';
import { CustomButton } from '.';
import { calculateCarRent, generateCarImageUrl } from '@/utils';
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { fetchCars } from '@/utils';


const CarCard = ({ car } ) => {
    const {
    city_mpg,
    Class,
    combination_mpg,
    cylinders,
    displacement,
    drive,
    fuel_type,
    highway_mpg,
    make,
    model,
    transmission,
    year
    } = car;
    const carRent = calculateCarRent(city_mpg, year);
    const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='car-card group'>
        <div className='car-card__content'>
            <h2 className='car-card_content-title'>
                {make} {model}
            </h2>
        </div>
        <p className='flex mt-6 text-[32px] font-extrabold'>
            <span className='self-start text-[14px] font-semibold'>
                $
            </span>
            {carRent}
            <span className='self-end text-[14px] font-medium'>
                /day
            </span>
        </p>

        <div className='relative w-full h-40 my-3 object-contain'>
            <Image src={generateCarImageUrl(car)} alt='car model' fill priority className='object-contain'/>
        </div>

        <div className='relative flex w-full mt-2 '>
            <div className='flex group-hover:invisible w-full justify-between text-gray'>
                <div className='flex flex-col justify-center items-center gap-2'>
                    <Image src={'/steering-wheel.svg'} width={20} height={20} alt='steering wheel'/>
                    <p className='text-[14px] '>{transmission === 'a' ? 'Automatic' : 'Manual'}</p>
                </div>
                <div className='flex flex-col justify-center items-center gap-2'>
                    <Image src={'/tire.svg'} width={20} height={20} alt='tire'/>
                    {drive.toUpperCase()}
                </div>
                <div className='flex flex-col justify-center items-center gap-2'>
                    <Image src={'/gas.svg'} width={20} height={20} alt='gas'/>
                    {city_mpg} MPG
                </div>
            </div>
            <div className="car-card__btn-container">
                <CustomButton 
                title={'view more'} 
                containerStyles={'w-full py-[16px] rounded-full bg-primary-blue'}
                textStyles="text-white text-[14px] leading-[17px] font-bold"
                rightIcon="/right-arrow.svg"
                handleClick={() => setIsOpen(true)}
                />
            </div>
        </div>
        <div>
        <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className={'relative z-10'} onClose={() => setIsOpen(false)}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-25' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-out duration-300'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel className='relative w-full max-w-lg max-h-[90vh] overflow-y-auto transform rounded-2xl bg-white p-6 text-left shadow-xl transition-all flex flex-col gap-5'>
                <button
                  type='button'
                  className='absolute top-2 right-2 z-10 w-fit p-2 bg-primary-blue-100 rounded-full'
                  onClick={() => setIsOpen(false)}
                >
                  <Image
                    src='/close.svg'
                    alt='close'
                    width={20}
                    height={20}
                    className='object-contain'
                  />
                </button>
                <div className='flex-1 flex flex-col gap-3'>
                    <div className='relative w-full h-40 bg-pattern bg-cover bg-center rounded-lg'>
                    <Image src={generateCarImageUrl(car)} alt='car model' fill priority className='object-contain'/>
                    </div>

                    <div className='flex gap-3'>
                        <div className='flex-1 relative w-full h-24 bg-primary-blue-100 rounded-lg'>
                        <Image src={generateCarImageUrl(car, '29')} alt='car model' fill priority className='object-contain'/>
                        </div>
                        <div className='flex-1 relative w-full h-24 bg-primary-blue-100 rounded-lg'>
                        <Image src={generateCarImageUrl(car, "33")} alt='car model' fill priority className='object-contain'/>
                        </div>
                        <div className='flex-1 relative w-full h-24 bg-primary-blue-100 rounded-lg'>
                        <Image src={generateCarImageUrl(car, "13")} alt='car model' fill priority className='object-contain'/>
                        </div>
                    </div>
                </div>

                <div className='mt-3 flex flex-wrap gap-4'>
                    {Object.entries(car).map(([key, value]) => (
                      <div className='flex justify-between gap-5 w-full text-right' key={key} >
                        <h4 className='text-grey capitalize'>
                          {key.split("_").join(" ")}
                        </h4>
                        <p className='text-black-100 font-semibold'>
                          {value}
                        </p>
                      </div>
                    ))}
                  </div>
                </Dialog.Panel>
             </Transition.Child>
                </div>
            </div>
        </Dialog>
    </Transition>
        </div>
    </div>
  )
}

export default CarCard