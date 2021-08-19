import React,{Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Moment from 'react-moment'
import { deleteExpereince } from '../../actions/profile'

const Experience = ({experience, deleteExpereince}) => {
    const experiences = experience.map((exp=>(
        <tr key={exp.id}>
            <td>
                {exp.company}
            </td>
            <td className='hidden-sm'>
                {exp.title}
            </td>
            <td>
                <Moment format='YYYY/MM/DD'>{exp.from}</Moment> - {exp.to===null?('Now'):(
                    <Moment format='YYYY/MM/DD'>{exp.to}</Moment>
                )}
            </td>
            <td>
                <button className="btn btn-danger" onClick={()=>deleteExpereince(exp._id)}>Delete</button>
            </td>
        </tr>
    )))
    return (
        <Fragment>
            <h2 className="my-2">Experience</h2>
            <table className="table">
                <thead>
                    <tr>
                    <th>Company</th>
                    <th className='hidden-sm'>Title</th>
                    <th className='hidden-sm'>Years</th>
                    <th className='hidden-sm'></th>
                    </tr>
                    
                </thead>
                <tbody>
                    {experiences}
                </tbody>
            </table>
        </Fragment>
    )
}

Experience.propTypes = {
 experience: PropTypes.array.isRequired,
 deleteExpereince: PropTypes.func.isRequired,
}

export default connect(null,{deleteExpereince}) (Experience)
