import React from 'react';
import ReactDOM from 'react-dom/client';

class Ex1 extends React.Component {
    state = {
        employees: [
            { id: 1, firstName: 'Eren', lastName: 'Jager', daysWorked: 20, dailyRate: 200 },
            { id: 2, firstName: 'Naruto', lastName: 'Uzumaki', daysWorked: 25, dailyRate: 180 },
            { id: 3, firstName: 'Sasuke', lastName: 'Uchiha', daysWorked: 22, dailyRate: 190 },
        ],
    };

    handleDaysWorkedChange = (id, event) => {
        const value = event.target.value;
        this.setState(prevState => {
            const employees = prevState.employees.map(employee => {
                if (employee.id === id) {
                    return { ...employee, daysWorked: value };
                }
                return employee;
            });
            return { employees };
        });
    };

    handleDailyRateChange = (id, event) => {
        const value = event.target.value;
        this.setState(prevState => {
            const employees = prevState.employees.map(employee => {
                if (employee.id === id) {
                    return { ...employee, dailyRate: value };
                }
                return employee;
            });
            return { employees };
        });
    };

    render() {
        const { employees } = this.state;
        const totalSalary = employees.reduce((acc, employee) => {
            return acc + employee.daysWorked * employee.dailyRate;
        }, 0);

        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Ім'я</th>
                            <th>Прізвище</th>
                            <th>Днів відпрацьовано</th>
                            <th>Ставка</th>
                            <th>Зарплата</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map(employee => (
                            <tr key={employee.id}>
                                <td>{employee.firstName}</td>
                                <td>{employee.lastName}</td>
                                <td>
                                    <input type="number" value={employee.daysWorked} onChange={(e) => this.handleDaysWorkedChange(employee.id, e)} />
                                </td>
                                <td>
                                    <input type="number" value={employee.dailyRate} onChange={(e) => this.handleDailyRateChange(employee.id, e)} />
                                </td>
                                <td>{employee.daysWorked * employee.dailyRate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <p>Сумарна зарплата: {totalSalary}</p>
            </div>
        );
    }
}


class Ex2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            answers: [],
            isSubmitted: false,
        };
    }

    handleChange = (event, index) => {
        const { answers } = this.state;
        answers[index] = event.target.value;

        this.setState({ answers });
    };

    handleSubmit = () => {
        this.setState({ isSubmitted: true });
    };

    renderQuestion = (question, index) => {
        const { answers } = this.state;
        const isCorrect = answers[index] === question.answer;
        return (
            <div key={index}>
                <h3>{question.question}</h3>
                <input type="text" value={answers[index] || ''} onChange={(e) => this.handleChange(e, index)} />
                <br />
                {this.state.isSubmitted && (
                    <div style={{ color: isCorrect ? 'green' : 'red' }}>
                        Ваша відповідь {isCorrect ? 'Pravulna' : 'ne pravulna, pravulna vidpovid: ' + question.answer}
                    </div>
                )}
                <hr />
            </div>
        );
    };

    render() {
        const { questions } = this.props;
        return (
            <div>
                {questions.map((question, index) => this.renderQuestion(question, index))}
                {!this.state.isSubmitted && (
                    <button type="submit" onClick={this.handleSubmit}>
                        Скласти тест
                    </button>
                )}
            </div>
        );
    }
}

const questions = [
    {
        question: 'Skilku byde 6 + 1?',
        answer: '7',
    },
    {
        question: 'Kakii tupu e v JavaScript?',
        answer: 'string, number, boolean, null, undefined, object, symbol',
    },
    {
        question: 'Komanda dlia zminu statysy v React?',
        answer: 'setState',
    },
];

class Ex3 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: [
                {
                    id: 1,
                    text: "Skilku byde 6 + 1?",
                    correctAnswer: "7",
                    userAnswer: "",
                },
                {
                    id: 2,
                    text: "Kakii tupu e v JavaScript?",
                    correctAnswer: "string, number, boolean, null, undefined, object, symbol",
                    userAnswer: "",
                },
                {
                    id: 3,
                    text: "Komanda dlia zminu statysy v React?",
                    correctAnswer: "setState",
                    userAnswer: "",
                },
            ],
            currentQuestionIndex: 0,
            showAnswers: false,
        };

        this.handleAnswerChange = this.handleAnswerChange.bind(this);
        this.handlePreviousQuestion = this.handlePreviousQuestion.bind(this);
        this.handleNextQuestion = this.handleNextQuestion.bind(this);
        this.handleCheckAnswers = this.handleCheckAnswers.bind(this);
    }

    handleAnswerChange(event) {
        const value = event.target.value;
        const updatedQuestions = [...this.state.questions];
        updatedQuestions[this.state.currentQuestionIndex].userAnswer = value;
        this.setState({ questions: updatedQuestions });
    }

    handlePreviousQuestion() {
        this.setState({ currentQuestionIndex: this.state.currentQuestionIndex - 1 });
    }

    handleNextQuestion() {
        this.setState({ currentQuestionIndex: this.state.currentQuestionIndex + 1 });
    }

    handleCheckAnswers() {
        this.setState({ showAnswers: true });
    }

    renderQuestion(question) {
        return (
            <div key={question.id}>
                <h3>{question.text}</h3>
                <input type="text" value={question.userAnswer} onChange={this.handleAnswerChange} />
            </div>
        );
    }

    renderAnswer(question) {
        const isCorrect = question.userAnswer === question.correctAnswer;
        return (
            <div key={question.id}>
                <h3>{question.text}</h3>
                <div style={{ color: isCorrect ? "green" : "red" }}>
                    Ваша відповідь {isCorrect ? "правильна" : "не правильна"}. Правильна відповідь: {question.correctAnswer}.
                </div>
            </div>
        );
    }

    render() {
        const { questions, currentQuestionIndex, showAnswers } = this.state;

        return (
            <div>
                {showAnswers ? (
                    questions.map((question) => this.renderAnswer(question))
                ) : (
                    <>
                        {this.renderQuestion(questions[currentQuestionIndex])}
                        <button onClick={this.handlePreviousQuestion} disabled={currentQuestionIndex === 0}>
                            Назад
                        </button>
                        <button onClick={this.handleNextQuestion} disabled={currentQuestionIndex === questions.length - 1}>
                            Вперед
                        </button>
                        {currentQuestionIndex === questions.length - 1 && (
                            <button onClick={this.handleCheckAnswers}>Перевірити відповіді</button>
                        )}
                    </>
                )}
            </div>
        );
    }
}

class Ex4 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: [
                {
                    id: 1,
                    text: "Skilku byde 6 + 1?",
                    correctAnswer: "7",
                    userAnswer: "",
                    options: [
                        { id: 1, text: "2" },
                        { id: 2, text: "3" },
                        { id: 3, text: "4" },
                        { id: 4, text: "5" },
                    ],
                },
                {
                    id: 2,
                    text: "Kakii tupu e v JavaScript?",
                    correctAnswer: "string, number, boolean, null, undefined, object, symbol",
                    userAnswer: "",
                    options: [
                        { id: 1, text: "string, number, boolean" },
                        { id: 2, text: "null, undefined, object" },
                        { id: 3, text: "symbol" },
                        { id: 4, text: "all pravulno" },
                    ],
                },
                {
                    id: 3,
                    text: "Komanda dlia zminu statysy v React?",
                    correctAnswer: "setState",
                    userAnswer: "",
                    options: [
                        { id: 1, text: "setState" },
                        { id: 2, text: "getState" },
                        { id: 3, text: "changeState" },
                        { id: 4, text: "modifyState" },
                    ],
                },
            ],
            currentQuestionIndex: 0,
            showAnswers: false,
        };
    }

    handleAnswerChange = (event) => {
        const value = event.target.value;
        const updatedQuestions = [...this.state.questions];
        updatedQuestions[this.state.currentQuestionIndex].userAnswer = value;
        this.setState({ questions: updatedQuestions });
    };

    handlePreviousQuestion = () => {
        const currentQuestionIndex = this.state.currentQuestionIndex;
        if (currentQuestionIndex > 0) {
            this.setState({ currentQuestionIndex: currentQuestionIndex - 1 });
        }
    };

    handleNextQuestion = () => {
        const currentQuestionIndex = this.state.currentQuestionIndex;
        if (currentQuestionIndex < this.state.questions.length - 1) {
            this.setState({ currentQuestionIndex: currentQuestionIndex + 1 });
        }
    };

    handleCheckAnswers = () => {
        this.setState({ showAnswers: true });
    };

    renderQuestion = (question) => {
        return (
            <div key={question.id}>
                <h3>{question.text}</h3>
                {question.options.map((option) => (
                    <div key={option.id}>
                        <input
                            type="radio"
                            id={option.id}
                            name={"question-" + question.id}
                            value={option.text}
                            checked={option.text === question.userAnswer}
                            onChange={this.handleAnswerChange}
                        />
                        <label htmlFor={option.id}>{option.text}</label>
                    </div>
                ))}
            </div>
        );
    };

    renderAnswer = (question) => {
        const isCorrect = question.userAnswer === question.correctAnswer;
        return (
            <div key={question.id + "-answer"}>
                <h3>{question.text}</h3>
                {question.options.map((option) => (
                    <div key={option.id}>
                        <input
                            type="radio"
                            id={option.id}
                            name={"question-" + question.id + "-answer"}
                            value={option.text}
                            disabled={true}
                            checked={option.text === question.correctAnswer}
                        />
                        <label htmlFor={option.id}>{option.text}</label>
                    </div>
                ))}
                {isCorrect ? (
                    <div style={{ color: isCorrect ? "green" : "red" }} className="correct">
                        Відповідь вірна
                    </div>
                ) : (
                    <div style={{ color: isCorrect ? "green" : "red" }} className="incorrect">
                        Відповідь невірна. Правильна відповідь: {question.correctAnswer}
                    </div>
                )}
            </div>
        );
    };

    render() {
        const currentQuestion = this.state.questions[this.state.currentQuestionIndex];
        return (
            <div>
                {this.state.showAnswers ? (
                    <div>
                        <h2>Відповіді на запитання:</h2>
                        {this.state.questions.map((question) => this.renderAnswer(question))}
                    </div>
                ) : (
                    <div>
                        {this.renderQuestion(currentQuestion)}
                        <div>
                            <button onClick={this.handleCheckAnswers}>Перевірити відповіді</button>
                            <button onClick={this.handlePreviousQuestion}>Попереднє запитання</button>
                            <button onClick={this.handleNextQuestion}>Наступне запитання</button>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

class Ex5 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: [
                {
                    id: 1,
                    text: "Skilku byde 6 + 1?",
                    correctAnswers: ["7"],
                    userAnswers: [],
                    options: [
                        { id: 1, text: "2" },
                        { id: 2, text: "3" },
                        { id: 3, text: "7" },
                        { id: 4, text: "5" },
                    ],
                },
                {
                    id: 2,
                    text: "Kakii tupu e v JavaScript?",
                    correctAnswers: ["string", "number", "boolean", "null", "undefined", "object", "symbol"],
                    userAnswers: [],
                    options: [
                        { id: 1, text: "string, number, boolean" },
                        { id: 2, text: "null, undefined, object" },
                        { id: 3, text: "symbol" },
                        { id: 4, text: "all pravulno" },
                    ],
                },
                {
                    id: 3,
                    text: "Komanda dlia zminu statysy v React?",
                    correctAnswers: ["setState"],
                    userAnswers: [],
                    options: [
                        { id: 1, text: "setState" },
                        { id: 2, text: "getState" },
                        { id: 3, text: "changeState" },
                        { id: 4, text: "modifyState" },
                    ],
                },
            ],
            currentQuestionIndex: 0,
            showAnswers: false,
        };
    }

    handleAnswerChange = (event) => {
        const value = event.target.value;
        const questionIndex = this.state.currentQuestionIndex;
        const question = this.state.questions[questionIndex];
        const isChecked = event.target.checked;
        let updatedAnswers = [...question.userAnswers];
        if (isChecked) {
            updatedAnswers.push(value);
        } else {
            updatedAnswers = updatedAnswers.filter(answer => answer !== value);
        }
        const updatedQuestions = [...this.state.questions];
        updatedQuestions[questionIndex].userAnswers = updatedAnswers;
        this.setState({ questions: updatedQuestions });
    };

    handlePreviousQuestion = () => {
        const currentQuestionIndex = this.state.currentQuestionIndex;
        if (currentQuestionIndex > 0) {
            this.setState({ currentQuestionIndex: currentQuestionIndex - 1 });
        }
    };

    handleNextQuestion = () => {
        const currentQuestionIndex = this.state.currentQuestionIndex;
        const lastQuestionIndex = this.state.questions.length - 1;
        if (currentQuestionIndex < lastQuestionIndex) {
            this.setState({ currentQuestionIndex: currentQuestionIndex + 1 });
        }
    };

    handleCheckAnswers = () => {
        const questions = [...this.state.questions];
        questions.forEach(question => {
            question.options.forEach(option => {
                if (question.correctAnswers.includes(option.text)) {
                    option.isCorrect = true;
                } else
                    option.isCorrect = false;
            });
            const userAnswers = question.userAnswers.sort();
            const correctAnswers = question.correctAnswers.sort();
            if (JSON.stringify(userAnswers) === JSON.stringify(correctAnswers)) {
                question.isCorrect = true;
            } else {
                question.isCorrect = false;
            }
        });
        this.setState({ questions: questions, showAnswers: true });
    };
    render() {
        const currentQuestion = this.state.questions[this.state.currentQuestionIndex];
        const showAnswers = this.state.showAnswers;
        return (
            <div>
                <h1>Тестування знань</h1>
                <h2>Питання {currentQuestion.id}:</h2>
                <p>{currentQuestion.text}</p>
                <form>
                    {currentQuestion.options.map(option => (
                        <div key={option.id}>
                            <label>
                                <input
                                    type="checkbox"
                                    value={option.text}
                                    checked={currentQuestion.userAnswers.includes(option.text)}
                                    onChange={this.handleAnswerChange}
                                    disabled={showAnswers}
                                />
                                {option.text}
                            </label>
                            {showAnswers && option.isCorrect && <span style={{ color: 'green' }}> - вірна відповідь</span>}
                            {showAnswers && !option.isCorrect && <span style={{ color: 'red' }}> - неправильна відповідь</span>}
                        </div>
                    ))}
                </form>
                <div>
                    <button onClick={this.handlePreviousQuestion} disabled={this.state.currentQuestionIndex === 0}>Попереднє питання</button>
                    <button onClick={this.handleNextQuestion} disabled={this.state.currentQuestionIndex === this.state.questions.length - 1}>Наступне питання</button>
                    {!showAnswers && <button onClick={this.handleCheckAnswers}>Перевірити відповіді</button>}
                </div>
            </div>
        );
    }
}

class Ex6 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tasks: [
                { id: 1, text: "Перше завдання", isCompleted: false },
                { id: 2, text: "Друге завдання", isCompleted: true },
                { id: 3, text: "Третє завдання", isCompleted: false },
            ],
            newTaskText: "",
        };
    }

    handleNewTaskTextChange = (event) => {
        this.setState({ newTaskText: event.target.value });
    };

    handleAddTask = () => {
        const newTask = {
            id: Date.now(),
            text: this.state.newTaskText,
            isCompleted: false,
        };
        this.setState({
            tasks: [...this.state.tasks, newTask],
            newTaskText: "",
        });
    };

    handleDeleteTask = (taskId) => {
        const updatedTasks = this.state.tasks.filter((task) => task.id !== taskId);
        this.setState({ tasks: updatedTasks });
    };

    handleToggleTask = (taskId) => {
        const updatedTasks = this.state.tasks.map((task) => {
            if (task.id === taskId) {
                return { ...task, isCompleted: !task.isCompleted };
            }
            return task;
        });
        this.setState({ tasks: updatedTasks });
    };

    render() {
        return (
            <div>
                <ul>
                    {this.state.tasks.map((task) => (
                        <li key={task.id}>
                            <input
                                type="checkbox"
                                checked={task.isCompleted}
                                onChange={() => this.handleToggleTask(task.id)}
                            />
                            <span style={{ textDecoration: task.isCompleted ? "line-through" : "none" }}>
                                {task.text}
                            </span>
                            <button onClick={() => this.handleDeleteTask(task.id)}>Видалити</button>
                        </li>
                    ))}
                </ul>
                <div>
                    <input
                        type="text"
                        value={this.state.newTaskText}
                        onChange={this.handleNewTaskTextChange}
                    />
                    <button onClick={this.handleAddTask}>Додати завдання</button>
                </div>
            </div>
        );
    }
}

const root = ReactDOM.createRoot(document.getElementById("root")).render(
    <div>
        <p>Ex1</p>
        <Ex1 />

        <p>Ex2</p>
        <Ex2 questions={questions} />

        <p>Ex3</p>
        <Ex3 />

        <p>Ex4</p>
        <Ex4 />

        <p>Ex5</p>
        <Ex5 />

        <p>Ex6</p>
        <Ex6 />


    </div>

);