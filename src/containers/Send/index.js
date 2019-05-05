import React, { Component } from 'react';
import Sidebar from "react-sidebar";
import Button from 'react-bootstrap/Button';

class CheckBox extends Component {
  render() {
    return (
        <div className="form-check contact">
        <label>
          <input
            type="checkbox"
            name="react-tips"
            value="option1"
            // checked={this.state.selectedOption === "option1"}
            onChange={this.handleOptionChange}
            className="form-check-input"
          />
          <b> {this.props.label} </b> <br/>
          <i className="tab"> (123) 456-7890</i>
          <br/>
        </label>
      </div>
    )
  }
}

class RadioButton extends Component {
  render() {
    return (
        <div className="form-check contact template">
        <label>
          <input
            type="radio"
            name="react-tips"
            value="option1"
            // checked={this.state.selectedOption === "option1"}
            onChange={this.handleOptionChange}
            className="form-check-input"
          />
          {this.props.content}
        </label>
      </div>
    )
  }
}

class Contacts extends Component {
  createTable(){
      let table = []

      // Outer loop to create parent
      for (let i = 0; i < 20; i++) {
        // let children = []
        // //Inner loop to create children
        // for (let j = 0; j < 5; j++) {
        //   children.push(<td>{`Column ${j + 1}`}</td>)
        // }
        // //Create the parent and add the children
        const labelname = "Contact Name " + i
        table.push(<CheckBox label={labelname}/>)
      }
      return table
  }
  render() {

    return (
      <div>
        {this.createTable()}
        </div>
    )

  }
}

const mql = window.matchMedia(`(min-width: 800px)`);

class Send extends Component {
  constructor(props) {
      super(props);
      this.state = {
        sidebarDocked: mql.matches,
        sidebarOpen: false
      };

      this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
      this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    }

    componentWillMount() {
      mql.addListener(this.mediaQueryChanged);
    }

    componentWillUnmount() {
      mql.removeListener(this.mediaQueryChanged);
    }

    onSetSidebarOpen(open) {
      this.setState({ sidebarOpen: open });
    }

    mediaQueryChanged() {
      this.setState({ sidebarDocked: mql.matches, sidebarOpen: false });
    }
  render() {
    return(
      <Sidebar
      sidebar={ <Contacts/> }
      open={this.state.sidebarOpen}
      docked={this.state.sidebarDocked}
      onSetOpen={this.onSetSidebarOpen}
      styles={{
        sidebar: {
          zIndex: 2,
          position: "absolute",
          top: 0,
          bottom: 0,
          transition: "transform .3s ease-out",
          WebkitTransition: "-webkit-transform .3s ease-out",
          willChange: "transform",
          overflowY: "auto",
          paddingLeft: 0,
          paddingRight: 0,
          paddingTop: 51,
          backgroundColor: 'white',
          color: 'grey'
        },
        content: {
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflowY: "auto",
          WebkitOverflowScrolling: "touch",
          transition: "left .3s ease-out, right .3s ease-out"
        }
      }}>
      <div className="App">
        <header className="templates">
          <b style={{'color': '#FF7F11', 'textAlign': 'center'}}>
              Choose from one of the templates below, or write your own custom message:</b>
          <br/> <br/>
          <RadioButton  content="Hey! This is Theresa. I'm texting to ask you whether or
              not you have registered to vote, or have a plan to vote. The deadline is coming up soon!"/>
          <RadioButton className="template" content="Hey there! This is Theresa. Have you registered to vote yet?
          Let me know if you have, and if you haven't I can send you some resources to help you register.
           The deadline is coming up soon!" />
           <div className="form-check contact template">
           <label>

             <input
               type="radio"
               name="react-tips"
               value="option1"
               // checked={this.state.selectedOption === "option1"}
               onChange={this.handleOptionChange}
               className="form-check-input"
             />
             Enter your custom message here: <br/> <br/>
             <textarea rows="4" cols="100"></textarea>
           </label>
         </div>
         <div className="right">
            <Button variant="outline-primary"> Send </Button>
         </div>

        </header>
      </div>

    </Sidebar>
    );
  }
}

export default Send;
