import { useAuth } from '../../auth/hooks/useAuth'
import Loading from '../../auth/components/Loading'

const SideBar = () => {
    const {user} = useAuth()
    return (
        <aside className='h-full flex flex-col justify-between p-2 bg-stone-50 w-1/5'>
            <div className='flex flex-col gap-7'>
                <div>
                    <div className='flex items-center gap-2'>
                        <svg className='w-9' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M15 4.58152V12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C12.3506 9 12.6872 9.06016 13 9.17071V2.04938C18.0533 2.5511 22 6.81465 22 12C22 17.5229 17.5228 22 12 22C6.47715 22 2 17.5229 2 12C2 6.81465 5.94668 2.5511 11 2.04938V4.0619C7.05369 4.55399 4 7.92038 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 8.64262 17.9318 5.76829 15 4.58152Z"></path>
                        </svg>
                        <h2 className='font-extrabold text-2xl'>Moodify</h2>
                    </div>
                </div>
                <div className='flex items-center gap-3 p-2 pl-2' >
                    <div className='flex items-center justify-center border-3 border-orange-400 rounded-full'>
                        <svg className='w-10 text-orange-400' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11.9999 17C15.6623 17 18.8649 18.5751 20.607 20.9247L18.765 21.796C17.3473 20.1157 14.8473 19 11.9999 19C9.15248 19 6.65252 20.1157 5.23479 21.796L3.39355 20.9238C5.13576 18.5747 8.33796 17 11.9999 17ZM11.9999 2C14.7613 2 16.9999 4.23858 16.9999 7V10C16.9999 12.7614 14.7613 15 11.9999 15C9.23847 15 6.9999 12.7614 6.9999 10V7C6.9999 4.23858 9.23847 2 11.9999 2Z"></path></svg>
                    </div>
                    <div>
                        <h4 className='font-bold text-xl capitalize'>
                            {user ? (
                                <p>{user.username}</p>
                                ) : (
                                <p className="opacity-50">Loading user...</p>
                            )}
                        </h4>
                        <p className='text-black/50 text-sm'>PRO MEMBER</p>
                    </div>
                </div>
                <div className='flex flex-col gap-2 text-black/60 font-semibold pl-2'>
                    <div className='flex items-center gap-2 hover:bg-gray-300/20 p-2 rounded cursor-pointer'>
                        <svg className='w-7' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M3 12C3 12.5523 3.44772 13 4 13H10C10.5523 13 11 12.5523 11 12V4C11 3.44772 10.5523 3 10 3H4C3.44772 3 3 3.44772 3 4V12ZM3 20C3 20.5523 3.44772 21 4 21H10C10.5523 21 11 20.5523 11 20V16C11 15.4477 10.5523 15 10 15H4C3.44772 15 3 15.4477 3 16V20ZM13 20C13 20.5523 13.4477 21 14 21H20C20.5523 21 21 20.5523 21 20V12C21 11.4477 20.5523 11 20 11H14C13.4477 11 13 11.4477 13 12V20ZM14 3C13.4477 3 13 3.44772 13 4V8C13 8.55228 13.4477 9 14 9H20C20.5523 9 21 8.55228 21 8V4C21 3.44772 20.5523 3 20 3H14Z"></path></svg>
                        <p>Dashboard</p>
                    </div>
                    <div className='flex items-center gap-2 hover:bg-gray-300/20 p-2 rounded cursor-pointer'>
                        <svg className='w-7' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12.4142 5H21C21.5523 5 22 5.44772 22 6V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H10.4142L12.4142 5ZM11 13.05C10.8384 13.0172 10.6712 13 10.5 13C9.11929 13 8 14.1193 8 15.5C8 16.8807 9.11929 18 10.5 18C11.8807 18 13 16.8807 13 15.5V11H16V9H11V13.05Z"></path></svg>
                        <p>Music Library</p>
                    </div>
                </div>
            </div>
            <div className='flex flex-col gap-2 text-black/60 font-semibold pl-2'>
                <div className='flex items-center gap-2 hover:bg-gray-300/20 p-2 rounded cursor-pointer'>
                    <svg className='w-7' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11 15V17H13V15H11ZM13 13.3551C14.4457 12.9248 15.5 11.5855 15.5 10C15.5 8.067 13.933 6.5 12 6.5C10.302 6.5 8.88637 7.70919 8.56731 9.31346L10.5288 9.70577C10.6656 9.01823 11.2723 8.5 12 8.5C12.8284 8.5 13.5 9.17157 13.5 10C13.5 10.8284 12.8284 11.5 12 11.5C11.4477 11.5 11 11.9477 11 12.5V14H13V13.3551Z"></path></svg>
                    <p>Support</p>
                </div>
                <div className='flex items-center gap-2 hover:bg-gray-300/20 p-2 rounded cursor-pointer'>
                    <svg className='w-7' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M5 22C4.44772 22 4 21.5523 4 21V3C4 2.44772 4.44772 2 5 2H19C19.5523 2 20 2.44772 20 3V6H18V4H6V20H18V18H20V21C20 21.5523 19.5523 22 19 22H5ZM18 16V13H11V11H18V8L23 12L18 16Z"></path></svg>
                    <p>Logout</p>
                </div>
            </div>
        </aside>
    )
}

export default SideBar
