import { CreateUpdataBookletForm } from '@/components/booklets/create-update-form'
import React from 'react'

const Dashboard = () => {
    return (
        <div className='flex-1 flex p-3 justify-center items-center'>
            <div className="h-full w-full bg-white rounded-md p-4">
                <CreateUpdataBookletForm />
            </div>
        </div>
    )
}

export default Dashboard
