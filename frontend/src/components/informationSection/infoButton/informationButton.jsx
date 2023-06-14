import { useState } from 'react'
import { t } from 'i18next'
import './informationButton.css'

const InformationButton = (props) => {
  const [isHovering, setIsHovering] = useState(false)

  const handleMouseOver = () => {
    setIsHovering(true)
  }

  const handleMouseOut = () => {
    setIsHovering(false)
  }
  return (
    <div className="informationdiv">
      {isHovering && (
        <div className="modal">
          <div className="speechbubble">{t(props.information)}</div>
          {(() => {
            if (props.direction === 'bottom') {
              return (
                <div>
                </div>
              )
            } else if (props.direction === 'left') {
              return (
                <div>
                </div>
              )
            }
          })()}
        </div>
      )}

    </div>
  )
}
export default InformationButton
