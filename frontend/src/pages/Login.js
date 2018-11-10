import React, { Component } from 'react';

import twitterLogo from '../twitter.svg'
import './Login.css';

export default class Login extends Component {
    state = {           //estado reconhecido pelo React
        username: '',
    };

    handleInputSubmit = e => {
        e.preventDefault();                                         //evita qualquer comportamento padrão do form.

        const { username } = this.state;                            //busca o 'username' dentro do 'state'.

        if (!username.length) return;                               //se não tiver nada digitado, cancela a função.

        localStorage.setItem('@GoTwitter:username', username)       //se tiver digitado, acessa o storage do navegador e salva uma informção lá.

        this.props.history.push('/timeline');                       //redireciona o usuario par a próxima página.
    };

    handleInputChange = (e) => {
        this.setState({ username: e.target.value });                //chama a funçãode stado e atualiza a informação nele. 'e.target.value', pega os valores digitados dentro do campo.
    };

    render() {
        return (
            <div className="login-wrapper">
                <img src={twitterLogo} alt="GoTwitter" />
                <form onSubmit={this.handleInputSubmit}>
                    <input 
                        value={this.state.username}                 //input assume o valor, one-way-databind.
                        onChange={this.handleInputChange}           //evento no input.
                        placeholder="Nome de usuário">
                    </input>
                    <button type="submit">Entrar</button>
                </form>
            </div>
        );
    }
}