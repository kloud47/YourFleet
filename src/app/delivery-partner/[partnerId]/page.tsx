import Dashboard from '@/components/dashboard/dashboard';
import React from 'react'

type Props = {}

const Page = (props: Props) => {
    return (
        <div className='w-screen lg:pl-[300px]'>
            <Dashboard />
        </div>
    )
}
export default Page;