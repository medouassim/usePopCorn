import { useState } from "react";
import ToggleButton from "./ToggleButton";

export default function Box({children}) {
    const [ isOpen, setIsOpen ] = useState(true)
    const toggle = () => {
        setIsOpen(open => !open)
    }   
    return <div className="box">
    <ToggleButton isOpen={isOpen} onClick={toggle}/>
    {isOpen && children}
    </div>
}