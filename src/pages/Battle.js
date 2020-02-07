import React, { Component } from "react";
import Playercard from "../components/Playercard";
import images from "../assets/images";

export default class Battle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      characters: [
        {
          name: "Aragon",
          health: "200",
          defense: "100",
          attack: "100",
          img: images.aragorn,
          attacker: false,
          defender: false
        },
        {
          name: "Gandalf",
          health: "200",
          defense: "100",
          attack: "100",
          img: images.gandalf,
          attacker: false,
          defender: false
        },
        {
          name: "Sauron",
          health: "200",
          defense: "100",
          attack: "100",
          img: images.sauron,
          attacker: false,
          defender: false
        },
        {
          name: "Witch King",
          health: "200",
          defense: "100",
          attack: "100",
          img: images.witchKing,
          attacker: false,
          defender: false
        }
      ],
      attackerChoosen: false,
      defenderChoosen: false,
      attacker: [],
      defender: []
    };
    this.selectAttacker = this.selectAttacker.bind(this);
    this.selectDefender = this.selectDefender.bind(this);
  }

  selectAttacker(i) {
    if (
      this.state.characters.some(x => {
        return x.attacker;
      })
    ) {
      return;
    }
    let charactersCopy = JSON.parse(JSON.stringify(this.state.characters));
    charactersCopy[i].attacker = true;
    this.setState({
      characters: charactersCopy,
      attackerChoosen: true,
      attacker: charactersCopy[i]
    });
  }

  selectDefender(i) {
    if (
      this.state.characters.some(x => {
        return x.defender;
      })
    ) {
      return;
    }
    let charactersCopy = JSON.parse(JSON.stringify(this.state.characters));
    charactersCopy[i].defender = true;
    this.setState({
      characters: charactersCopy,
      defenderChoosen: true,
      defender: charactersCopy[i]
    });
  }

  attack() {
    let attack = this.state.attacker.attack;
    let health = this.state.defender.health;
    let charactersCopy = JSON.parse(JSON.stringify(this.state.defender));
    charactersCopy.health = health - attack;
    this.setState({
      defender: charactersCopy
    });
    if (this.state.attacker.health <= 0 || this.state.defender.health <= 0) {
      alert("dead");
    }
  }

  render() {
    const {
      characters,
      attackerChoosen,
      defenderChoosen,
      attacker,
      defender
    } = this.state;

    return (
      <div>
        <div className="player-card-container">
          {characters.map(
            (x, i) =>
              !x.attacker &&
              !x.defender && (
                <div key={i}>
                  <Playercard
                    name={x.name}
                    img={x.img}
                    attack={x.attack}
                    health={x.health}
                    defense={x.defense}
                    selectCharacter={
                      !attackerChoosen
                        ? this.selectAttacker
                        : this.selectDefender
                    }
                    i={i}
                  />
                </div>
              )
          )}
        </div>
        <div className="attacker-card">
          {attackerChoosen === true && (
            <div>
              <Playercard
                name={attacker.name}
                img={attacker.img}
                attack={attacker.attack}
                health={attacker.health}
                defense={attacker.defense}
              />
            </div>
          )}
        </div>
        {attackerChoosen && defenderChoosen ? (
          <button onClick={() => this.attack()}>Attack</button>
        ) : (
          <h3>Select Attacker and Defender</h3>
        )}
        <div className="defender-card">
          {defenderChoosen === true && (
            <div>
              <Playercard
                name={defender.name}
                img={defender.img}
                attack={defender.attack}
                health={defender.health}
                defense={defender.defense}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}
