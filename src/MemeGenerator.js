import React, { Component } from "react";

class MemeGenerator extends React.Component {
  constructor() {
    super();
    this.state = {
      topText: "",
      bottomText: "",
      randomImage: "http://i.imgflip.com/1bij.jpg",
      allMemeImgs: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    fetch("https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((response) => {
        const { memes } = response.data;
        this.setState({ allMemeImgs: memes });
      });
  }
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    const RanNum = Math.floor(Math.random() * this.state.allMemeImgs.length);
    const ranImg = this.state.allMemeImgs[RanNum].url;
    this.setState({
      randomImage: ranImg,
    });
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="topText"
            value={this.state.topText}
            placeholder="Top Text"
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="bottomText"
            value={this.state.bottomText}
            placeholder="Bottom Text"
            onChange={this.handleChange}
          />
          <button>GEn</button>
        </form>
        <div className="container">
          <img src={this.state.randomImage} alt="uo" className="memeImg" />
          <h2 className="tt">{this.state.topText}</h2>
          <h2 className="bt">{this.state.bottomText}</h2>
        </div>
      </div>
    );
  }
}
export default MemeGenerator;
