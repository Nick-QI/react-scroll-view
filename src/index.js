import React, { Component } from 'react'
import './index.css'

const Animate = function () {


}
const Attr = function (dom) {
  return window.getComputedStyle(dom, null)
}
export default class ScrollView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      scrollX: props.scrollX,
      scrollY: props.scrollY,
      itemIndex: props.itemIndex || 0,
      scrollMethod: props.scrollMethod, // 滚动中返回的数据
      upThreshold: props.upThreshold,  // 到达顶部的一定距离时 触发事件
      lowThreshold: props.lowThreshold, // 到达底部的一定距离时, 触发事件
      scrollToUp: props.scrollToUp,  // 到达顶部触发
      scrollToLow: props.scrollToLow,// 到达底部触发
      rootHeight: props.rootHeight,  // scorllY时 设置高度
      limit: props.limit || 50, // 到顶部和底部  的限制
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.itemIndex !== state.itemIndex) {
      return {
        itemIndex: props.itemIndex
      }
    }
    return null
  }

  componentDidMount() {
    let { scrollX } = this.state
    this.attr = scrollX ? 'scrollLeft' : 'scrollTop'
    this.container.addEventListener('scroll', this.scroll)
  }

  scroll = () => {
    let { scrollMethod, upThreshold, lowThreshold, scrollToUp, scrollToLow, scrollX, limit } = this.state
    let scrollValue = this.container[this.attr]
    let scrollAttr = this.container[scrollX ? 'scrollWidth' : 'scrollHeight']
    scrollMethod && scrollMethod({ scrollAttr, scrollValue })
    let clientAttr = parseFloat(Attr(this.container)[scrollX ? 'width' : 'height'])

    // 到顶 执行
    if (scrollValue === 0) scrollToUp && scrollToUp()
    // 到底 执行
    if (clientAttr + scrollValue === scrollAttr) scrollToLow && scrollToLow()
    // 距离顶部多远时执行
    if (scrollValue === limit) upThreshold && upThreshold()
    // 距离底部多远时执行
    if (scrollValue === scrollAttr - clientAttr - limit) lowThreshold && lowThreshold()
  }

  scrollToItem = (itemIndex) => {
    let { scrollX } = this.state
    if (this.container) {
      let child = this.container.children
      if (itemIndex > child.length - 1) return
      let offsetAttr = child[itemIndex][scrollX ? 'offsetLeft' : 'offsetTop']
      this.container[this.attr] = offsetAttr
    }
  }

  render() {
    let { children } = this.props
    let { scrollX, rootHeight, itemIndex } = this.state
    this.scrollToItem(itemIndex)

    return <div
      className={`scroll_view_root ${scrollX ? 'scroll_view_x' : 'scroll_view_y'}`}
      style={{ height: rootHeight ? rootHeight + 'px' : '100%' }}
      ref={node => this.container = node}
    >
      {
        children.map((item, index) => {
          return <div key={index} className="scroll_view_item">
            {item}
          </div>
        })
      }
    </div>
  }
}
