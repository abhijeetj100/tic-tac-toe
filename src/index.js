import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

class ShoppingList extends React.Component {
    render() {
        return (
            <div className="shopping-list">
                <h1>Shopping List for {this.props.name}</h1>
                <ul>
                    <li>
                        Instagram
                    </li>
                    <li>
                        WhatsApp
                    </li>
                    <li>
                        Oculus
                    </li>
                </ul>
            </div>

        )
    }
}

// Example usage <ShoppingList name="Abhijeet" />

// class Square extends React.Component {
//     // constructor(props) {
//     //     super(props);
//     //     this.state = {
//     //         // value: null
//     //     };
//     // }
//     render() {
//         return (
//             <button
//                 className="square"
//                 // onClick={() => this.setState({ value: 'X' })}
//                 onClick={() => this.props.onClick()}
//             >
//                 {/* {this.state.value} */}
//                 {this.props.value}
//             </button>
//         );
//     }
// }

function Square(props) {
    return (
        <button
            className='square'
            onClick={props.onClick}>
            {props.value}
        </button>
    )
}

class Board extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         squares: Array(9).fill(null),
    //         xIsNext: true,
    //     }
    // }

    // handleClick(i) {
    //     const squares = this.state.squares.slice();
    //     if (this.calculateWinner(squares) || squares[i]) {
    //         return;
    //     }
    //     squares[i] = this.state.xIsNext ? 'X' : 'O';
    //     this.setState({
    //         squares: squares,
    //         xIsNext: !this.state.xIsNext,
    //     });
    // }

    // calculateWinner(squares) {
    //     const lines = [
    //       [0, 1, 2],
    //       [3, 4, 5],
    //       [6, 7, 8],
    //       [0, 3, 6],
    //       [1, 4, 7],
    //       [2, 5, 8],
    //       [0, 4, 8],
    //       [2, 4, 6],
    //     ];
    //     for (let i = 0; i < lines.length; i++) {
    //       const [a, b, c] = lines[i];
    //       if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
    //         return squares[a];
    //       }
    //     }
    //     return null;
    //   }

    renderSquare(i) {
        return (<Square
            value={this.props.squares[i]}
            onClick={() => this.props.onClick(i)}
        />)
    }

    render() {
        console.log("handle click function from board => ", this.props.onClick);
        // const winner = this.calculateWinner(this.props.squares);
        // let status;
        // if (winner) {
        //     status = `The winner is: ${winner}`;
        // } else {
        //     status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
        // }

        return (
            <div>
                {/* <div className="status">{status}</div> */}
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            xIsNext: true,
        }
        console.log(this.state);
    }
    // render() {
    //     return React.createElement(
    //         'div',
    //         { className: 'shopping-list' },
    //         React.createElement(
    //             'h1',
    //             null,
    //             'Shopping list for ',
    //             this.props.name
    //         ),
    //         React.createElement('ul', null,
    //             React.createElement('li', null, 'Facebook'),
    //             React.createElement('li', null, 'WhatsApp'),
    //             React.createElement('li', null, 'Oculus'))
    //     )
    // }

    handleClick(i) {
        const history = this.state.history;
        const currentSquares = history[history.length - 1].squares.slice();
        if (this.calculateWinner(currentSquares) || currentSquares[i]) {
            return;
        }
        currentSquares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{ squares: currentSquares }]),
            xIsNext: !this.state.xIsNext,
        });
    }

    calculateWinner(squares) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    };

    render() {
        console.log("handle click function => ", this.handleClick);
        const history = this.state.history;
        const current = history[history.length - 1].squares;
        const winner = this.calculateWinner(current);

        let status;
        if (winner) {
            status = `The winner is: ${winner}`;
        }
        else {
            status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
        }

        return (
            <div className="game">
                <div className="game-board">
                    {/* Directly passing this.handleClick was passing the exact definition 
                    because of which, when handleCLick is called in Board 
                    via onClick(), it was looking for this.state.history in Board and not 
                    Game component 
                    
                    Hence, you need to pass in a function as prop that calls this.handleClick(i)*/}
                    <Board squares={current} onClick={(i) => this.handleClick(i)} />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game name="Abhijeet" />);
