import React, { Component } from 'react';
import api from '../services/api'
import socket from 'socket.io-client';

import twitterLogo from '../twitter.svg'
import './Timeline.css';

import Tweet from '../components/Tweet';

export default class Login extends Component {
    state = {
        tweets: [],
        newTweet: '',       //armazena o valor digitado no 'textarea'.
    };

    async componentDidMount() {       //e executado automaticamente quando a página é exibido em tela.
        this.subscribeToEvents();

        const response = await api.get('tweets');

        this.setState({ tweets: response.data })
    }

    // Apply realtime sinc.
    subscribeToEvents = () => {     //cria uma conexao com o nosso 'websocket'.
        const io = socket('http://localhost:3000');

        io.on('tweet', data => {
            this.setState({ tweets: [data, ...this.state.tweets] })
        })

        io.on('like', data => {
            this.setState({ tweets: this.state.tweets.map(tweet =>          //percorre todos os tweets, e verifica se é igual ao que recebeu like, se 'true' ele atualiza a qtd de likes.
                tweet._id === data._id ? data : tweet    
            ) })
        })
    };

    handleNewTweet = async e => {     //o evento que recebemos como parâmetro tem uma variável chamada 'keyCode', que retorna o código da tecla.
        if (e.keyCode !== 13) return;

        const content = this.state.newTweet;                            //tweet digitado pelo usuario
        const author = localStorage.getItem('@GoTwitter:username');     //author do tweet.

        await api.post('tweets',{ content, author });

        this.setState({ newTweet: '' });
    };

    handleinputChange = e => {
        this.setState({ newTweet: e.target.value });
    }

    render() {
        return (
            <div className="timeline-wrapper">
                <img height={24} src={twitterLogo} alt="GoTwitter" />

                <form>
                    <textarea 
                        value={this.state.newTweet}
                        onChange={this.handleinputChange}
                        onKeyDown={this.handleNewTweet}        //evento chamado toda vez que é apertado uma tecla.
                        placeholder="O que está acontecendo?" />
                </form>

                <ul className="tweet-list">
                    { this.state.tweets.map(tweet => (
                        <Tweet key={tweet._id} tweet={tweet} />
                    ))}
                </ul>
            </div>
        );
    }
}