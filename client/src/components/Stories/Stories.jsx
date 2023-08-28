import React from 'react'
import './stories.css'

export function Stories() {


    const stories = [
        {
          id: 1,
          name: "John Doe",
          img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
        },
        {
          id: 2,
          name: "John Doe",
          img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
        },
        {
          id: 3,
          name: "John Doe",
          img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
        },
        {
          id: 4,
          name: "John Doe",
          img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
        },
      ];
  return (
    <div className='stories'>
      <div className="story">
        <img src="https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600"
         alt="" className="stories_user_image" />
        <button className="stories_user_button">+</button>
        <span className="stories_user_span">User</span>
        </div>
        {stories.map((value)=>(
            <div className="story" key={value.id}>
                <img src={value.img} alt="" className="stories_story_image" />
                <span className="stories_story_span">{value.name}</span>
            </div>
        ))}
    </div>
  )
}
