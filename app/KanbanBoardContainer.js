import React, { Component } from "react";
import KanbanBoard from "./KanbanBoard";
import update from "react-addons-update";
import "whatwg-fetch";
import "babel-polyfill";

const API_URL = "http://kanbanapi.pro-react.com";
const API_HEADERS = {
	"Content-Type": "application/json",
	Authorization: "nesoy2"
};

class KanbanBoardContainer extends Component {
	constructor() {
		super(...arguments);
		this.state = {
			cards: []
		};
	}
	addTask(cardId, taskName) {
		// 카드의 인덱스를 찾는다.
		let cardIndex = this.state.cards.findIndex(card => card.id == cardId);

		let newTask = {
			id: Date.now(),
			name: taskName,
			done: false
		};

		// 새로운 task 추가
		let prevState = this.state;
		let nextState = update(this.state.cards, {
			[cardIndex]: {
				tasks: {
					$push: [newTask]
				}
			}
		});

		this.setState({
			cards: nextState
		});

		// API 호출해 서버에서 해당 태스크를 제거한다.
		fetch(`${API_URL}/cards/${cardId}/tasks`, {
			method: "post",
			headers: API_HEADERS,
			body: JSON.stringify(newTask)
		})
			.then(response => {
				if (response.ok) {
					return response.json();
				} else {
					throw new Error("Server response wasn't Ok");
				}
			})
			.then(responseData => {
				console.log(responseData);
				newTask.id = responseData.id;
				this.setState({
					card: nextState
				});
			})
			.catch(error => {
				this.setState(prevState);
				console.error("fetch Error", error);
			});
	}

	toggleTask(cardId, taskId, taskIndex) {
		// 카드의 인덱스를 찾는다.
		let cardIndex = this.state.cards.findIndex(card => card.id == cardId);

		// 태스크의 'done'값에 대한 참조를 저장한다.
		let newDoneValue;

		// $apply 명령을 이용해 done값을 현재와 반대로 변경한다.
		let prevState = this.state;
		let nextState = update(this.state.cards, {
			[cardIndex]: {
				tasks: {
					[taskIndex]: {
						done: {
							$apply: done => {
								newDoneValue = !done;
								return newDoneValue;
							}
						}
					}
				}
			}
		});

		// 변경된 객체로 컴포넌트 상태를 설정
		this.setState({
			cards: nextState
		});

		// API 호출해 서버에서 해당 태스크를 토글한다.
		fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`, {
			method: "put",
			headers: API_HEADERS,
			body: JSON.stringify({
				done: newDoneValue
			})
		})
			.then(response => {
				if (!response.ok) {
					throw new Error("Server Response wasn't ok");
				}
			})
			.catch(error => {
				console.error("fetch Error", error);
				this.setState(prevState);
			});
	}

	deleteTask(cardId, taskId, taskIndex) {
		//카드의 인덱스를 찾는다.
		let cardIndex = this.state.cards.findIndex(card => card.id == cardId);

		// 해당 테스크를 제외한 새로운 객체를 생성한다.
		let prevState = this.state;
		let nextState = update(this.state.cards, {
			[cardIndex]: {
				tasks: {
					$splice: [[taskIndex, 1]]
				}
			}
		});

		// 변경된 객체로 컴포넌트 상태 변경
		this.setState({
			cards: nextState
		});

		// API 호출해 서버에서 해당 태스크를 제거한다.
		fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`, {
			method: "delete",
			headers: API_HEADERS
		})
			.then(response => {
				if (!response.ok) {
					throw new Error("Server Response wasn't ok");
				}
			})
			.catch(error => {
				console.error("fetch Error", error);
				this.setState(prevState);
			});
	}

	componentDidMount() {
		fetch(API_URL + "/cards", {
			headers: API_HEADERS
		})
			.then(reponse => reponse.json())
			.then(responseData => {
				this.setState({
					cards: responseData
				});
			})
			.catch(error => {
				console.log("Error Fetching and parsing data", error);
			});
	}

	render() {
		return (
			<KanbanBoard
				cards={this.state.cards}
				taskCallbacks={{
					toggle: this.toggleTask.bind(this),
					delete: this.deleteTask.bind(this),
					add: this.addTask.bind(this)
				}}
			/>
		);
	}
}

export default KanbanBoardContainer;
