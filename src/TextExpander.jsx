import { useState } from "react"
import './TextExpander.css'
export default function TextExpander({children, showColor = 'blueviolet', sliceIndex = 60, className = '', expandText = 'Show more', collapseText = 'Show less'}) {
    const [ isOpen, setIsOpen ] = useState(false)
    return <div className={className}>
        {isOpen ? children : children.slice(0, sliceIndex) + '...'}
        <a  style={{color: showColor, cursor: 'pointer'}} onClick={() => setIsOpen(open => !open)}> {isOpen ? collapseText : expandText}</a>
    </div>
}