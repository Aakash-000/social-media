import React,{useContext} from 'react'
import './leftbar.css'
import LeftImageCont from '../../assets/images/LeftImageCont'
import LeftImageContSub from '../../assets/images/LeftImageContSub'
import LeftImageContOther from '../../assets/images/LeftImageContOther'
import { AuthContext } from '../../context/AuthContext'

export function Leftbar() {

  const[state] = useContext(AuthContext);

  return (
    <div className='leftbar'>
      <div className="container">
        <div className="container_menu">
          <div className="container_menu_user">
            <img src="https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Image" className="container_menu_user_image" />
            <span className="container_menu_user_span">{state.info.username}</span>
          </div>
          {LeftImageCont.map((value,index)=>(
            <div className="container_menu_user_item" key={index}>
            <img src={value.imagepath}
            alt="" className="container_menu_user_item_image" />
            <span className="container_menu_user_item_span">
              {value.imagename}
            </span>
          </div>
          ))}
        </div>
        <hr/>
        <div className="container_menu_sub">
          <span className="container_menu_sub_span">
            Your Shortcuts
          </span>
          {LeftImageContSub.map((value,index)=>(
            <div className="container_menu_sub_item" key={index}>
              <img src={value.imagepath} alt="" className="container_menu_sub_item_image" />
              <span className="container_menu_sub_item_span">
                {value.imagename}
              </span>
            </div>
          ))}
        </div>
        <hr/>
        <div className="container_menu_others">
          <span className="container_menu_others_span">
            Others
          </span>
          {
            LeftImageContOther.map((value,index)=>(
              <div className='container_menu_others_item' key={index}>
                <img src={value.imagepath} className='container_menu_others_item_image' alt=""/>
                <span className='container_menu_others_item_span'>{value.imagename}</span>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}
