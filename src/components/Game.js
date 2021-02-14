
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
          sub:""
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
                mysymb:'O',
                oppsymb:'X'
            })
        }
        else{
            this.setState({
                xIsNext:true,
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
              }],
              sub:""
          })
      }
       onchange(event) {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
       }
       submitf(e){
           e.preventDefault()
           const n1=this.state.name1
           const n2=this.state.name2
           if(n1==0 || n2==0){
               alert("Both fields are must to proceed!")
           }
           else{
               this.setState({
                sub:"finished"
               })
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
        const name=((winner.winner===mysymb)?name1:name2)
        let info=(winner.winner!==null)?
        'The winner is: ' + name
        :(winner.cnt===9)?"Drawed Game!":"Next turn by: " +(this.state.xIsNext?name1:name2) + " And symbol is : " + (this.state.xIsNext?mysymb:opp);
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
        if(winner.winner!==null){
            alert("The winner is " + name + '!')
        }
        console.log(this.state.sub)
    return(
        <div>
             {
            sub===""?(
                <div className="nameDisplay">
                    <h1>Enter Names of Players</h1>
                    <form>
                    <label>First name : 
                    <input
                    type="text"
                    name="name1"
                    value={this.state.name1}
                    onChange={this.onchange}
                    className="form"
                    required
                    />
                    </label>
                    <br/><br/>
                    <label>Second name : 
                        <input
                        type="text"
                        name="name2"
                        value={this.state.name2}
                        onChange={this.onchange}
                        className="form"
                        required 
                        />
                    </label>
                    <br/><br/>
                    <button type="submit" className="displayName"
                    onClick={(e)=>this.submitf(e)}
                    >Submit</button>
                    </form>
                </div>
            )     
            :
            symb===''?(
            <div>
                 <div className="entry">
                         <h1>Select symbol</h1>
                         <button onClick={()=>this.handleStart(0)}>X</button>
                         <button onClick={()=>this.handleStart(1)}>O</button>
                    </div>
            </div>
            )
            :
            enemy===""?
            (<div>
                 <div>
                 <div className="entry">
                         <h1>Select Opponent</h1>
                         <button onClick={()=>this.handleEnemy(0)}>Human</button>
                         <button onClick={()=>this.handleEnemy(1)}>Computer</button>
                    </div>
            </div>
                </div>)
            :
            <div>
             <div>
                 {
                     (winner.winner===null && winner.cnt!==9)?
                     <div>
                     <Board squares={current.squares} onClick={(i)=>this.handleClick(i)} winline={winner.line}/>
                     <div className="grid-info">
                     <div className="info">{info}</div>
                     <button class="restart" onClick={()=>this.playAgain()}>Restart</button>
                     <div className="dropdown">
                        <button class="dropbtn">Past Moves</button>
                        <ol className="list">{prevMoves}</ol> 
                     </div>
                  </div>
                  </div>
                    :
                    <div>
                        <Board squares={current.squares} onClick={(i)=>this.handleClick(i)} winline={winner.line}/>
                        <div className="info2">{info}</div>
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