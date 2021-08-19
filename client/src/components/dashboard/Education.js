import React,{Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Moment from 'react-moment'
import { deleteEducation } from '../../actions/profile'

const Education = ({education, deleteEducation}) => {
    const educations = education.map((edu=>(
        <tr key={edu.id}>
            <td>
                {edu.school}
            </td>
            <td className='hidden-sm'>
                {edu.degree}
            </td>
            <td className='hidden-sm'>
                {edu.fieldofstudy}
            </td>
            <td>
                <Moment format='YYYY/MM/DD'>{edu.from}</Moment> - {edu.to===null?('Now'):(
                    <Moment format='YYYY/MM/DD'>{edu.to}</Moment>
                )}
            </td>
            <td>
                <button className="btn btn-danger" onClick={()=>deleteEducation(edu._id)}>Delete</button>
            </td>
        </tr>
    )))
    return (
        <Fragment>
            <h2 className="my-2">Education</h2>
            <table className="table">
                <thead>
                    <tr>
                    <th>School</th>
                    <th className='hidden-sm'>Degree</th>
                    <th className='hidden-sm'>Field of Study</th>
                    <th className='hidden-sm'>Years</th>
                    <th className='hidden-sm'></th>
                    </tr>
                    
                </thead>
                <tbody>
                    {educations}
                </tbody>
            </table>
        </Fragment>
    )
}

Education.propTypes = {
 education: PropTypes.array.isRequired,
 deleteEducation: PropTypes.func.isRequired,
}

export default connect(null, {deleteEducation})(Education)