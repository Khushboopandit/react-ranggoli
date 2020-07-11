import React, { Component } from "react";
import "../css/main.css";

var canvas = document.getElementById("mycanvas"),
  ctx = canvas.getContext("2d"),
  canwidth = canvas.width,
  canheight = canvas.height,
  i = 0,
  m = 0,
  myvar,
  rancolor = "",
  x = [],
  y = [];

var drawfun = () => {
  if (m > 62) {
    clearInterval(myvar);
    m = 0;
  } else {
    ctx.save();
    ctx.translate(canwidth / 3, canheight / 3);
    ctx.rotate(0.1 * m);
    ctx.translate(-canwidth / 3, -canheight / 3);

    for (var n = 0; n <= x.length; n++) {
      if (n === 0) {
        ctx.beginPath();
        ctx.moveTo(x[n], y[n] - 150);
      } else if (n === x.length) {
        ctx.closePath();
        ctx.stroke();
      } else {
        ctx.lineTo(x[n], y[n] - 150);
        ctx.stroke();
      }
    }
    ctx.restore();
    m++;
  }
};
class Main extends Component {
  state = {
    isStart: false,
    color: "",
  };
  componentWillMount = () => {
    this.generateColor();
  };
  drawstart = () => {
    this.setState({ isStart: true });
    ctx.closePath();
    myvar = setInterval(drawfun, 100);
  };

  clearfun = () => {
    this.setState({ isStart: false });
    ctx.clearRect(0, 0, canwidth, canheight);
    x = [];
    y = [];
    i = 0;
    m = 0;
    clearInterval(myvar);
    this.generatecolor();
  };

  generateColor = () => {
    let colorarr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "a", "b", "c", "d", "e", "f"];
    ctx.strokeStyle = "'" + colorarr[Math.floor(Math.random() * 16)] + "'";
    rancolor = "";
    Array(6)
      .fill()
      .map((_) => (rancolor += colorarr[Math.floor(Math.random() * 16)]));
    ctx.strokeStyle = "#" + rancolor;
    this.setState({ color: "#" + rancolor });
  };

  render() {
    canvas.addEventListener("click", (e) => {
      if (this.state.isStart !== true) {
        x[i] = e.pageX;
        y[i] = e.pageY;
      }
      if (i === 0 && this.state.isStart !== true) {
        ctx.beginPath();
        ctx.moveTo(x[i], y[i] - 150);
      }
      if (this.state.isStart !== true) {
        ctx.lineTo(x[i], y[i] - 150);
        ctx.stroke();
      }
      i++;
    });

    return (
      <div>
        <h4>
          Click on different points on screen and then click on button GENERATE
          PATTERN
        </h4>
        <button
          type="button"
          className={
            this.state.isStart
              ? "btn btn-danger  rounded-circle p-4"
              : "btn btn-success rounded-circle p-4"
          }
          style={{ display: "inline-grid" }}
          onClick={this.state.isStart ? this.clearfun : this.drawstart}
        >
          {this.state.isStart ? (
            <i className="fa fa-circle text-light"></i>
          ) : (
            <i className="fa fa-stop text-light"></i>
          )}
        </button>
        <div className="mx-3 d-inline-block" id="color-msg">
          <p className="mb-0 text-secondary">Click to change the color</p>
          <button
            className="btn rounded-circle p-3"
            style={{ backgroundColor: `${this.state.color}` }}
            onClick={this.generateColor}
          ></button>
        </div>
      </div>
    );
  }
}

export default Main;
