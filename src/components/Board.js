import React from 'react'
import Square from "./Square"
import "../style.css"
class Board extends React.Component{
    renderSquare(i,j){
        return(
            <Square 
            value={this.props.squares[i]}
            onClick = {() => this.props.onClick(i)}
            classname={j}
            />
        )
    }
    render() {
        let classname=Array(9).fill(null)
        for(let i=0;i<9;i++){
            for(let j=0;j<3;j++){
                if(this.props.winline!==null && this.props.winline[j]===i) classname[i]=("win")
            }
        }
        // console.log(classname)
        return (
          <div className="grid">
               {this.renderSquare(0,classname[0])}
               {this.renderSquare(1,classname[1])}
               {this.renderSquare(2,classname[2])}
               {this.renderSquare(3,classname[3])}
               {this.renderSquare(4,classname[4])}
               {this.renderSquare(5,classname[5])}
               {this.renderSquare(6,classname[6])}
               {this.renderSquare(7,classname[7])}
               {this.renderSquare(8,classname[8])}
          </div>
        )
      }
}
export default Board