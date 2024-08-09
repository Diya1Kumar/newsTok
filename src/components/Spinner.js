import React, { Component } from 'react'
import loading from './Spinner.gif'
export class Spinner extends Component {
  render() {
    return (
      <div className='text-center my-2'>
        <img src={loading} alt='image'/>
      </div>
    )
  }
}

export default Spinner
