import React,{Fragment} from 'react'
import spinner from './spinner.gif'

export default  () => {
   return (<Fragment>
       <img
        src={spinner}
        style={{width: '200px', margin: '0 auto', display: 'block'}}
        alt = 'Loading'
        >
       </img>
   </Fragment>
   )
}
