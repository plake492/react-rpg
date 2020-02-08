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
          defense: "25",
          attack: "100",
          img: images.aragorn,
          attacker: false,
          defender: false,
          defeated: false
        },
        {
          name: "Gandalf",
          health: "200",
          defense: "25",
          attack: "100",
          img: images.gandalf,
          attacker: false,
          defender: false,
          defeated: false
        },
        {
          name: "Sauron",
          health: "200",
          defense: "25",
          attack: "100",
          img: images.sauron,
          attacker: false,
          defender: false,
          defeated: false
        },
        {
          name: "Witch King",
          health: "200",
          defense: "25",
          attack: "100",
          img: images.witchKing,
          attacker: false,
          defender: false,
          defeated: false
        }
      ],
      attackerChoosen: false,
      defenderChoosen: false,
      attacker: [],
      defender: [],
      defenderIndex: ""
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
    console.log(i);
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
      defender: charactersCopy[i],
      defenderIndex: i
    });
  }

  attack() {
    const { attacker, defender } = this.state;

    let attackerAttack = attacker.attack;
    let attackerHealth = attacker.health;
    let defenderDefense = defender.defense;
    let defenderHealth = defender.health;

    let defenderCopy = JSON.parse(JSON.stringify(defender));
    defenderCopy.health = defenderHealth - attackerAttack;

    let attackerCopy = JSON.parse(JSON.stringify(attacker));
    attackerCopy.health = attackerHealth - defenderDefense;

    this.setState({
      defender: defenderCopy,
      attacker: attackerCopy
    });
    this.checkScore();
  }

  checkScore() {
    if (this.state.defender.health <= 0) {
      this.defenderDefeated();
    }
  }

  defenderDefeated() {
    let charactersCopy = JSON.parse(JSON.stringify(this.state.characters));
    charactersCopy[this.state.defenderIndex].defender = false;
    charactersCopy[this.state.defenderIndex].defeated = true;
    this.setState({
      defender: [],
      defenderChoosen: false,
      characters: charactersCopy
    });
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
              !x.defender &&
              !x.defeated && (
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
          <button
            onClick={() => this.attack()}
            onMouseUp={() => this.checkScore()}
          >
            Attack
          </button>
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
