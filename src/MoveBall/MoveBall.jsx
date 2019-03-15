import React from "react";
import "./MoveBall.scss"

let
    t = 0,
    width = 480,
    height = 320,
    x = width / 2,
    dx = 1,
    y = height - 30,
    dy = -1,
    tempWidth = 0,
    tempHeight = 0,
//  posBall=0,
    radius = 10;

class MoveBall extends React.Component {
    constructor(props) {
        super(props);
        this.intervalId = 0;
        this.intervalId2 = 0;
        this.state = {
            x:Math.random() * this.props.x,
            y:Math.random() * this.props.y,
            startB: true,
            startC: true
        };

    }
    componentDidUpdate() {
        this.context = this.refs.canvas.getContext("2d");
    }

     get_random_color() {
        let letters = 'ABCDE'.split('');
        let color = '#';
        for (let i = 0; i < 3; i++) {
            color += letters[Math.floor(Math.random() * letters.length)];
        }
        return color;
    }

    drawBall = (x,y) => {
        radius =this.props.radius;
        this.context.clearRect(0, 0, width, height);
        this.context.beginPath();
        this.context.arc(x, y, radius, 0, Math.PI * 2);
        this.context.fillStyle = t;
        this.context.fill();
        this.drawVerticalLine();
        this.drawHorizontalLine();
        this.context.stroke();
        this.context.closePath()
    };

    drawVerticalLine() {
        this.context.moveTo(tempWidth, 0);
        this.context.lineTo(tempWidth, height);
    }

    drawHorizontalLine(){
        this.context.moveTo(0, tempHeight);
        this.context.lineTo(width, tempHeight);
    }

    moveBall=(x,y)=> {
        radius =this.props.radius;
        this.drawBall(x,y);
        if (y + dy > height - radius ) {
            dy = -dy;
            t=this.get_random_color();
        }
        if ( y + dy < radius ) {
            dy = -dy;
            t=this.get_random_color();
        }
        if ( y + dy < radius + tempHeight  && y+radius >tempHeight ) {
            dy = -dy;
            t=this.get_random_color();
        }
        if (x + dx > width - radius) {
            dx = -dx;
            t=this.get_random_color();
        }
        if (x + dx < radius) {
            dx = -dx;
            t=this.get_random_color();
        }
        if (x + dx < radius + tempWidth && x + radius > tempWidth) {
            dx = -dx;
            t=this.get_random_color();
        }
        this.setState({
            x :x + dx,
            // posBall= x;
            y :y +  dy
        });
    };

    getPosition(e) {
        let rect = e.target.getBoundingClientRect();
        tempWidth = e.clientX - rect.left;
        tempHeight = e.clientY - rect.top;
        console.log("tempWidth: " + tempWidth + " tempHeight: " + tempHeight + "radius " + radius+ " height: " + height + "width "+ width);
    }
    forInterval=()=>{
        this.moveBall(this.state.x,this.state.y)
    };
    forInterval2=()=>{
        this.moveBall(this.state.x,this.state.y)
    };

    start = () => {
        this.intervalId = setInterval(this.forInterval, 10);
        this.setState({
            startB: false
        })
    };

    stop = () => {
        clearInterval(this.intervalId);
        this.setState({
            startB: true
        })
    };

    start2 = () => {
        this.intervalId2 = setInterval(this.forInterval2, 10);
        this.setState({
            startC: false
        })
    };

    stop2 = () => {

        clearInterval(this.intervalId2);

        this.setState({
            startC: true
        })
    };


    render() {
        // this.context = this.refs.canvas.getContext("2d");
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
                    ? <button type='button' onClick={() => this.start()}>Start/Increase Speed </button>
                    : <button type='button' onClick={() => this.stop()}>Stop/Decrease Speed </button>
                }
                {this.state.startC === true
                    ? <button type='button' onClick={() => this.start2()}>Start/Increase Speed </button>
                    : <button type='button' onClick={() => this.stop2()}>Stop/Decrease Speed </button>
                }
            </div>
        );
    }
}

export default MoveBall;