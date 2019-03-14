import React from "react";
import "./MoveBall.scss"

let
    x = 480 / 2,
    dx = 1,
    y = 320 - 30,
    dy = -1,
    t = 0,
    width = 480,
    height = 320,
    tempWidth = 0,
    tempHeight = 0,
//  posBall=0,
    radius = 10;

class MoveBall extends React.Component {
    constructor(props) {
        super(props);
        this.drawBall = this.drawBall.bind(this);
        this.moveBall = this.moveBall.bind(this);
        this.intervalId = 0;
        this.state = {
            startB: true
        };

    }

    // componentDidMount() {
    //     this.drawHorizontalLine()
    // }

    drawBall = () => {
        const context = this.refs.canvas.getContext("2d");

        context.clearRect(0, 0, width, height);
        context.beginPath();
        context.arc(x, y, radius, 0, Math.PI * 2);
        context.fillStyle = "blue";
        context.fill();
        this.drawVerticalLine();
        this.drawHorizontalLine();
        context.stroke();
        context.closePath()

        // this.moveBall(x, dx, y, dy, height, width, tempWidth,radius)

    };

    drawVerticalLine() {
        const context = this.refs.canvas.getContext("2d");
        context.moveTo(tempWidth, 0);
        context.lineTo(tempWidth, height);
    }

    drawHorizontalLine(){
        const context = this.refs.canvas.getContext("2d");
        context.moveTo(0, tempHeight);
        context.lineTo(width, tempHeight);

    }

    moveBall() {
        this.drawBall();
        if (y + dy > height - radius ) {
            dy = -dy;
        }
        if ( y + dy < radius ) {
            dy = -dy;
        }
        if ( y + dy < radius + tempHeight) {
            dy = -dy;
        }
        if (x + dx > width - radius) {
            dx = -dx;
        }
        if (x + dx < radius) {
            dx = -dx;
        }
        if (x + dx < radius + tempWidth && x + radius > tempWidth) {
            dx = -dx;
        }
        x += dx;
        // posBall= x;
        y += dy;
        console.log('x'+x +'y'+y )
    }

    getPosition(e) {
        let rect = e.target.getBoundingClientRect();
        tempWidth = e.clientX - rect.left;
        tempHeight = e.clientY - rect.top;
        console.log("tempWidth: " + tempWidth + " tempHeight: " + tempHeight);
    }

    start = () => {
        this.intervalId = setInterval(this.moveBall, 10)
        this.setState({
            startB: false
        })
    };

    stop = () => {
        clearInterval(this.intervalId)
        this.setState({
            startB: true
        })
    };


    render() {
        return (
            <div className=" bg ">
                <div>
                    <canvas
                        ref="canvas"
                        width={width}
                        height={height}
                        onMouseDown={(e) => this.getPosition(e)}
                    />
                </div>
                {this.state.startB === true
                    ? <button type='button' onClick={() => this.start()}>Start </button>
                    : <button type='button' onClick={() => this.stop()}>Stop </button>
                }
            </div>

        );
    }
}

export default MoveBall;