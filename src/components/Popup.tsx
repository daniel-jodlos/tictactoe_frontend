import { Component } from 'react';

export class Popup extends Component {
    render() {
        return (
            <div style={{
                background: '#000000aa',
                padding: 'auto auto',
                position: 'absolute',
                width: '100%',
                height: '100%',
                top: '0',
                left: '0',
                textAlign: 'center'
            }}>
                <div style={{
                    verticalAlign: 'middle',
                    margin: '50px auto',
                    background: 'white',
                    padding: '10px',
                    maxWidth: '40%'
                }}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}