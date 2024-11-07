import React, { Component, useEffect, useState } from "react"
import logo from './logo.svg';
import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

async function loadGreeting() {
  const response = await fetch('http://localhost:9000/graphql', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ query: '{greeting}' })
  })
  const rsponseBody = await response.json();
  return rsponseBody.data.greeting;
  // console.log("end of function")
}

async function loadSayhello(name) {
  const response = await fetch('http://localhost:9000/graphql', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ query: `{sayHello(name:"${name}")}` })
  })
  const rsponseBody = await response.json();
  return rsponseBody.data.sayHello;
}

function App() {

  const [updateName, setUpdateName] = useState('')
  const [showSayHelloMessage, setShowSayHelloMessage] = useState('')
  const [showGreeting, setShowGreeting] = useState('')

  function showGreetingFn () { 
    loadGreeting().then(g => setShowGreeting(g + " :-)"))
  }

  function showSayHelloMessageFn () {
    const name = updateName
    console.log(name)
    loadSayhello(name).then(m => setShowSayHelloMessage(m))
  }

  function updateNameFn (e) {
    setUpdateName(e.target.value)
    // e ? setUpdateName(e.target.value) : setUpdateName("")
  }

  useEffect(() => {
    // showGreetingFn()
    // showSayHelloMessageFn()
    // updateNameFn()
  }, [])

  

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to React</h1>
      </header>
      <br /><br />
      <section>
        <button id="btnGreet" onClick={showGreetingFn}>Greet</button>
        <br /> <br />
        <div id="greetingDiv">
          <h1>{showGreeting}</h1>
        </div>
      </section>

      <hr />

      <section>
        Enter a name:<input id="txtName" type="text" onChange={updateNameFn}
          value={updateName} />
        <button id="btnSayhello" onClick={showSayHelloMessageFn}>SayHello</button>
        <br />
        user name is:{updateName}    <br />
        <div id="SayhelloDiv">
          <h1>{showSayHelloMessage}</h1>
        </div>
      </section>
    </div>
  )
}

//-------------------------------------------------------------------------------

// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { greetingMessage: '', sayHelloMessage: '', userName: '' }
//     this.updateName = this.updateName.bind(this);
//     this.showSayHelloMessage = this.showSayHelloMessage.bind(this);
//     this.showGreeting = this.showGreeting.bind(this);
//   }

//   showGreeting() {
//     loadGreeting().then(g => this.setState({ greetingMessage: g + " :-)" }))
//   }

//   showSayHelloMessage() {
//     const name = this.state.userName;
//     console.log(name)
//     loadSayhello(name).then(m => this.setState({ sayHelloMessage: m }))
//   }

//   updateName(event) {
//     this.setState({ userName: event.target.value })
//   }
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h1 className="App-title">Welcome to React</h1>
//         </header>
//         <br /><br />
//         <section>
//           <button id="btnGreet" onClick={this.showGreeting}>Greet</button>
//           <br /> <br />
//           <div id="greetingDiv">
//             <h1>{this.state.greetingMessage}</h1>
//           </div>
//         </section>

//         <hr />

//         <section>
//           Enter a name:<input id="txtName" type="text" onChange={this.updateName}
//             value={this.state.userName} />
//           <button id="btnSayhello" onClick={this.showSayHelloMessage}>SayHello</button>
//           <br />
//           user name is:{this.state.userName}    <br />
//           <div id="SayhelloDiv">
//             <h1>{this.state.sayHelloMessage}</h1>
//           </div>
//         </section>
//       </div>
//     );
//   }
// }

export default App;