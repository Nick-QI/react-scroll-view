import React, { Component } from 'react'
import { render } from 'react-dom'
import Example from '../../src'


class Demo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ind: 0
    }
  }
  render() {
    const list = [1, 2, 3, 4, 5, 6, 7, 8]
    let { ind } = this.state
    return <div>

      <button
        onClick={() => {
          this.setState({
            ind: ind + 1
          })
        }}
      >ind++
  
      </button>
      <Example
        scrollX={true}
        itemIndex={ind}
        scrollToUp={()=> console.log('到达顶部')}
        scrollToLow={()=>console.log('到达底部')}
    // scrollMethod ={item=>console.log(item)}
    upThreshold={()=>console.log('到达指定距离  顶部')}
    lowThreshold={()=>console.log('到达指定距离  底部')}
      >
        {
          list.map((item, index) => {
            return <div key={index} style={{  height: '100px', background: "red" }}>
              {item}
            </div>
          })
        }

      </Example>
      <h1>react-scroll-view Demo</h1>
     {true&& <Example
        // scrollX ={true}
        rootHeight={300}
        itemIndex={ind}
        scrollToUp={()=> console.log('到达顶部')}
        scrollToLow={()=>console.log('到达底部')}
    // scrollMethod ={item=>console.log(item)}
    upThreshold={()=>console.log('到达指定距离  顶部')}
    lowThreshold={()=>console.log('到达指定距离  底部')}
      >
        {
          list.map((item, index) => {
            return <div key={index} style={{ width: '200px', height: '100px', background: "red" }}>
              {item}
            </div>
          })
        }

      </Example>}
    </div>
  }
}

render(<Demo />, document.querySelector('#demo'))
