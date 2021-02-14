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
          xIsNext: true,
          stepNo:0,
          winline:Array(3).fill(null),
          mysymb:"",
          oppsymb:"",
          enem:"",
          name1:"",
          name2:"",
          sub:"",
          ch:false
        };
        this.onchange = this.onchange.bind(this)
        this.submitf = this.submitf.bind(this)
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
        const opp=this.state.oppsymb
        // console.log(this.state.ch)
        if (checkwin(squares).winner!==null || squares[i]) {
          return;
        }
       if(this.state.ch===false){
           squares[i] = this.state.xIsNext ? this.state.mysymb: opp;
        this.setState({
            history: history.concat([{
              squares: squares
            }]),
            stepNo:history.length,
            xIsNext:!this.state.xIsNext,
          });
          if (checkwin(squares).winner!==null) {return;}
        if(this.state.enem==='C'){
            this.setState({ch:!this.state.ch})
            let randomNumber=0
            while(true){
                randomNumber=Math.floor(Math.random()*9)
                if(squares[randomNumber]===null) break;
            }
            setTimeout(function(){
                squares[randomNumber]=opp;
                this.setState({
                history: history.concat([{
                  squares: squares
                }]),
                stepNo:history.length,
                xIsNext:!this.state.xIsNext,
                ch:!this.state.ch
              });
            //   console.log("computer has moved")
            }.bind(this)
            ,1000);
        }
    }
      }
      handleStart(i){
        if(i){
            this.setState({
                mysymb:'O',
                oppsymb:'X'
            })
        }
        else{
            this.setState({
                mysymb:'X',
                oppsymb:'O'
            })
        }
      }
      handleEnemy(i){
        i===0?this.setState({enem:'H'}):this.setState({enem:'C'})
      }
      playAgain(){
          this.setState({
            history: [{
                squares: Array(9).fill(null)
              }
            ],
              xIsNext: true,
              stepNo:0,
              winline:Array(3).fill(null),
              mysymb:"",
              oppsymb:"",
              enem:"",
              sub:"",
              ch:false
          })
      }
      restart(){
        this.setState({
            history: [{
                squares: Array(9).fill(null)
              }
            ],
            ch:false
          })
      }
       onchange(event) {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
       }
       submitf(e,x){
           e.preventDefault()
           const n1=this.state.name1
           const n2=this.state.name2
          if(x=='H'){
              if(n1==="" || n2===""){
                  alert("Both names are required for 2 player mode!")
              }
              else{
                  this.setState({
                      sub:"finished"
                  })
              }
          }
          else{
              if(n1==''){
                  alert("Name of player is required to play!")
              }
              else{
                this.setState({
                    sub:"finished",
                    name2:"Computer"
                })
              }
          }
       }
    render(){
        const history = this.state.history.slice(0,this.state.stepNo+1);
        const current = history[history.length - 1];
        const winner=checkwin(current.squares)
        const name1=this.state.name1
        const name2=this.state.name2
        const mysymb=this.state.mysymb
        const opp=this.state.oppsymb
        let name=((winner.winner===mysymb)?name1:name2)
        if(winner.winner===null && winner.cnt!==9){
            name=(this.state.xIsNext?name1:name2)
        }
        if(winner.winner==null && winner.cnt===9){
            name=""
        }
        let info=(winner.winner!==null)?
        'The winner is: ':(winner.cnt===9)?"Drawed Game!":"Next turn by: "
        const prevMoves= history.map((no,move)=>{
            const exp="Go to step #" +move;
            if(move){ 
            return(
                <li>
                    <button onClick={() => this.jump(move)}>{exp}</button>
                </li>
            )
            }
        })
        const symb=this.state.mysymb
        const enemy=this.state.enem
        const sub=this.state.sub
    return(
        <div>
             {
           enemy===""?
           (<div>
                <div className="nameDisplay">
                <h1>TIC-TAC-TOE</h1>
                <div className="entry">
                        <h2>Select Opponent:</h2>
                        <button onClick={()=>this.handleEnemy(0)}>Human</button>
                        <button onClick={()=>this.handleEnemy(1)}>Computer</button>
                   </div>
           </div>
               </div>)
            :
            symb===''?(
            <div className="nameDisplay">
                 <div className="entry">
                         <h1>Player 1 symbol:</h1>
                         <button onClick={()=>this.handleStart(0)}>X</button>
                         <button onClick={()=>this.handleStart(1)}>O</button>
                    </div>
            </div>
            )
            :
            sub===""?(
                <div className="nameDisplay">
                    <div>
                    </div>   
                   {enemy==='H'?<h2>Enter Names of Players</h2> :<h2>Enter Names of Player</h2> }
                    <form>
                    <label>First name : 
                    <input
                    type="text"
                    name="name1"
                    value={this.state.name1}
                    onChange={this.onchange}
                    className="form"
                    />
                    </label>
                    <br/><br/>
                   { enemy==='H'?
                   <div>
                        <label>Second name : 
                        <input
                        type="text"
                        name="name2"
                        value={this.state.name2}
                        onChange={this.onchange}
                        className="form"
                        />
                    </label>
                    <br/><br/>
                   </div>:(<div></div>)}
                    <button type="submit" className="displayName"
                    onClick={(e)=>this.submitf(e,this.state.enem)}
                    >Submit</button>
                    </form>
                </div>
            )     
            :
            <div>
             <div>
                 {
                     (winner.winner===null && winner.cnt!==9)?
                     <div>
                     <Board squares={current.squares} onClick={(i)=>this.handleClick(i)} winline={winner.line}/>
                     <div className="grid-info">
                     <div className="info">{info} 
                        {name!==""?<span 
                        className="infoname"
                        >{name}
                        </span>:(<div></div>)}
                        And the symbol is: 
                        <span className="infoname">
                        {this.state.xIsNext?this.state.mysymb:this.state.oppsymb}
                            </span>
                     </div>
                     <button class="restart" onClick={()=>this.restart()}>Restart</button>
                     <button class="restart" onClick={()=>this.playAgain()}>Quit Game</button>
                     <div className="dropdown">
                        <button class="dropbtn">Past Moves</button>
                        <ol className="list">{prevMoves}</ol> 
                     </div>
                  </div>
                  </div>
                    :
                    <div>
                        <Board squares={current.squares} onClick={(i)=>this.handleClick(i)} winline={winner.line}/>
                        <div className="info2">{info}
                        {name!==""?<span 
                        className="infoname"
                        >{name}
                        </span>:(<div></div>)}
                        </div> 
                        <button className="playAgain" onClick={()=>this.playAgain()}>Play Again!</button>
                    </div>
                    }
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
    let cnt=0
    for(let i=0;i<9;i++){
        if(squares[i]!==null) cnt+=1
    }
    for(let i=0;i<win.length;i++){
        f=true;
        for(let j=1;j<win[0].length;j++){
            if(squares[win[i][j]]!=squares[win[i][0]]){
                f=false;
                break
            }
        }
        if(f && squares[win[i][0]]!==null) return {winner:squares[win[i][0]], line:win[i],cnt:cnt};
    }
    return {winner:null,line:null,cnt:cnt};
}
export default Game