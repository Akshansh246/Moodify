import React from 'react'
import FaceExpression from '../../Expression/components/FaceExpression'
import SideBar from '../components/SideBar'

const Home = () => {
    return (
        <main className='w-full h-full flex'>
            <SideBar/>
            <div className="w-150 h-130 bg-yellow-200">
                Video will play here
            </div>
        </main>
    )
}

export default Home
