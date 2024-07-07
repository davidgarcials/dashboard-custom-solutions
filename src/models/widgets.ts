export interface Widget {
  id: string
  type: 'bar' | 'pie graphics' | 'images'
  position: {
    x: number
    y: number
  }
  size: {
    width: number
    height: number
  }
  settings: {
    dataSource: string
    xAxis: string
    yAxis: string
  }
}
