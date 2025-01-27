import React from 'react'
import Logo from "../assets/images/Logo.png"
import { Link, NavLink } from 'react-router-dom'
const Header = () => {

    const user = JSON.parse(localStorage.getItem("user"))

    return (
        <header className=' px-10 bg-primary-light flex items-center justify-between'>
            <div className="size-20">
                <Link to={"/"} className='w-full h-full'>
                    <img src={Logo} className='w-full h-full object-contain' alt="Logo" />
                </Link>
            </div>
            <div className=" flex gap-5">
                <ul className='flex items-center justify-between gap-4'>
                    <li>
                        <NavLink className={({ isActive }) =>
                            isActive ? 'text-primary' : 'text-black'
                        }
                            to={"/"}>Home</NavLink>
                    </li>
                    <li>
                        <NavLink className={({ isActive }) =>
                            isActive ? 'text-primary' : 'text-black'
                        }
                            to={"/courses"}>Courses</NavLink>
                    </li>
                    <li>
                        <NavLink className={({ isActive }) =>
                            isActive ? 'text-primary' : 'text-black'
                        }
                            to={"/e-books"}>E-books</NavLink>
                    </li>
                </ul>

                <div className="">
                    <button className=' size-10 bg-white rounded-full font-bold capitalize'>{user?.username?.charAt(0)}</button>
                </div>
            </div>
        </header>
    )
}

export default Header