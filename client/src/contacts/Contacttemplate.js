import React,{useState} from 'react'
import { AddContacticon, CallPhoneicon, Checkboxicon, Exportoutlineicon, Importoutlineicon, Swapicon, Tripledotverticalicon } from '../assets/icons/Reacticons'
import Contactdetail from './Contactdetail'
import './contacttemplate.css'

export default function Contacttemplate() {
    const [selectvalue,setselectvalue] = useState("");

    const changeHandler = (e)=> {
      setselectvalue(e.target.value)
    }

    return (
    <div className='template'>
        <div className="contact_header">
            <div className="contact_header_sub">
            <p className='contact_header_left'>Contacts</p>
            <div className='contact_header_right'>
                <button className='contact_header_right_export_button'><Exportoutlineicon/>Export</button>
                <button className='contact_header_right_import_button'><Importoutlineicon/>Import</button>
                <button className='contact_header_right_newcontact_button'><AddContacticon/>New Contact</button>
                <button className='contact_header_right_dotted_button'><Tripledotverticalicon/></button>
            </div>
            </div>
        </div>
        <div className="template_new">
        <div className="template_main">
        <div className='template_searchbar'>
            <input type="text" placeholder="Search" className="template_searchbar_input"/>
        </div>
        <div className="template_call_detail_table_sub">
        <table className="table">
        <thead className="template_table_thead">
        <tr className="template_table_header">
        <th className="template_table_body_check"><Checkboxicon/></th>
        <th>Date</th>
        <th>Ticket ID</th>
        <th>Ticket title</th>
        <th>Priority</th>
        <th>contact</th>
        <th>Queue</th>
        <th>Assigned to</th>
        <th>Status</th>
        <th>Action</th>
        </tr>
        </thead>
        <tbody className="template_table_tbody">
        {Contactdetail.map((value,index)=>(
        <tr key={index} className="template_table_body">
        <td className="template_table_body_check">{value.checkboxicon}</td>
        <td>{value.ContactNumber}</td>
        <td>{value.Name}</td>
        <td>{value.Email}</td>
        <td>{value.Address}</td>
        <td>{value.Company}</td>
        <td>{value.Designation}</td>
        <td>{value.Lastinteraction}</td>
        <td className="template_table_body_action">
          <CallPhoneicon/>
          <button className='contact_header_right_dotted_button'><Tripledotverticalicon/></button>
          </td>
        </tr>
       ))}
       </tbody>
      </table>
        </div>
        <div className="template_pagination">
        <ul className="template_pagination_list">
        <li className="template_pagination_list_item_one">Prev</li>
        <li className="template_pagination_list_item_two">1</li>
        <li className="template_pagination_list_item_three">2</li>
        <li className="template_pagination_list_item_four">3</li>
        <li className="template_pagination_list_item_five">Next</li>
        </ul>
        <div className="template_pagination_filter">
          <select className="template_pagination_filter_select" name="totallist" value={selectvalue} onChange={changeHandler}>
            <option value="Showing 25">Showing 25</option>
            <option value="Showing 50">Showing 50</option>
            <option value="Showing 100">Showing 100</option>
          </select>
        </div>
        </div>
        </div>
        </div>
        </div>
  )
}
