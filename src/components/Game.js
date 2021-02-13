
import React from 'react'
import Board from "./Board"
import "../style.css"
class Game extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          history: [{
            squares: Array(9).fill(null)
          }
        ],
          xIsNext:true,
          stepNo:0,
          winline:Array(3).fill(null),
          mysymb:""
        };
      }
      jump(step){
            this.setState({
                stepNo:step,
                xIsNext:(step%2===0)
            })
      }
      handleClick(i) {
        const history = this.state.history.slice(0,this.state.stepNo+1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (checkwin(squares).winner!==null || squares[i]) {
          return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
          history: history.concat([{
            squares: squares
          }]),
          xIsNext: !this.state.xIsNext,
          stepNo:history.length,
        });
      }
      handleStart(i){
        if(i){
            this.setState({
                xIsNext:false,
                mysymb:'O'
            })
        }
        else{
            this.setState({
                xIsNext:true,
                mysymb:'X'
            })
        }
      }
    render(){
        const history = this.state.history.slice(0,this.state.stepNo+1);
        const current = history[history.length - 1];
        const winner=checkwin(current.squares)
        let info=(winner.winner!==null)?
        'The winner is: ' + winner.winner 
        :"Next turn by: " +(this.state.xIsNext?'X':'O');
        const prevMoves= history.map((no,move)=>{
            const exp=move?"Go to step #" +move : "Go to starting move"; 
            return(
                <li>
                    <button onClick={() => this.jump(move)}>{exp}</button>
                </li>
            )
        })
        let sym=this.state.mysymb
    return(
        <div>
            {
                sym===''?(
                    <div className="entry">
                         <h1>Select symbol</h1>
                         <button onClick={()=>this.handleStart(0)}>X</button>
                         <button onClick={()=>this.handleStart(1)}>O</button>
                    </div>
                ):
                <div className="grid">
                    <div className="grid-table">
                        <Board squares={current.squares} onClick={(i)=>this.handleClick(i)} winline={winner.line}/>
                    </div>
                    <div className="grid-info">
                         <div>
                             {info}
                         </div>
                         <div className="dropdown">
                              <button class="dropbtn">Past Moves</button>
                              <ul className="list">{prevMoves}</ul> 
                         </div>
                    </div>
                </div>
            }
        </div>
    )
    }
}
function checkwin(squares){
    let f=true;
    const win=[
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]
    for(let i=0;i<win.length;i++){
        f=true;
        for(let j=1;j<win[0].length;j++){
            if(squares[win[i][j]]!=squares[win[i][0]]){
                f=false;
                break
            }
        }
        if(f && squares[win[i][0]]!==null) return {winner:squares[win[i][0]], line:win[i]};
    }
    return {winner:null,line:null};
}
export default Game